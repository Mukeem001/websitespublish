import dns from "dns";
import Domain from "./domain.model";

const resolver = dns.promises;

class DomainService {
  // ==========================
  // Connect Custom Domain
  // ==========================

  async connectDomain(
    websiteId: string,
    domain: string,
    cnameHost?: string,
    cnameTarget?: string
  ) {
    // Check existing domain
    const exists = await Domain.findOne({
      domain: domain.toLowerCase(),
    });

    if (exists) {
      throw new Error(
        "This domain is already connected."
      );
    }

    const newDomain = await Domain.create({
      websiteId,

      domain: domain.toLowerCase(),

      type: "custom",

      cnameHost: cnameHost || "www",

      cnameTarget:
        cnameTarget || "builder.buildhub.app",

      verificationStatus: "pending",

      sslStatus: "pending",
    });

    return newDomain;
  }

  // ==========================
  // Verify Domain DNS
  // ==========================

  async verifyDomain(websiteId: string) {
    const domainRecord = await Domain.findOne({
      websiteId,
    });

    if (!domainRecord) {
      throw new Error(
        "No connected domain found for this website."
      );
    }

    const host =
      domainRecord.cnameHost === "@" ||
      !domainRecord.cnameHost
        ? domainRecord.domain
        : `${domainRecord.cnameHost}.${domainRecord.domain}`;

    const target =
      domainRecord.cnameTarget ||
      "builder.buildhub.app";
    let verified = false;
    let reason = "";

    try {
      if (/^[0-9.]+$/.test(target)) {
        const addresses = await resolver.resolve4(
          host
        );
        verified = addresses.includes(target);
      } else {
        try {
          const cnames = await resolver.resolveCname(
            host
          );
          verified = cnames.some(
            (cname) =>
              cname.toLowerCase() ===
                target.toLowerCase() ||
              cname
                .toLowerCase()
                .endsWith(target.toLowerCase())
          );
        } catch (err) {
          reason = String(err);
        }

        if (!verified) {
          const hostA = await resolver.resolve4(
            host
          );
          const targetA = await resolver.resolve4(
            target
          );
          verified = hostA.some((ip) =>
            targetA.includes(ip)
          );
        }
      }
    } catch (error: any) {
      reason = error.message || String(error);
    }

    domainRecord.verificationStatus =
      verified ? "verified" : "pending";
    await domainRecord.save();

    return {
      ...domainRecord.toObject(),
      verified,
      reason,
    };
  }

  // ==========================
  // Get Website Domain
  // ==========================

  async getDomain(
    websiteId: string
  ) {
    return await Domain.findOne({
      websiteId,
    });
  }

  // ==========================
  // Delete Domain
  // ==========================

  async removeDomain(
    websiteId: string
  ) {
    return await Domain.findOneAndDelete({
      websiteId,
    });
  }
}

export default new DomainService();