import { getCurrentUser } from "./auth.service";

const API_URL = "http://localhost:5000/api";

const mapTemplateSlugForBackend = (templateId: any) => {
  const value = String(templateId ?? "").trim().toLowerCase();

  const aliases: Record<string, string> = {
    "1": "ecommerce",
    "2": "restaurant",
    "3": "portfolio",
    "4": "hospital",
    "5": "school",
    "6": "gym",
    "7": "agency",
    "8": "blog",
    "modern-ecommerce": "ecommerce",
    "restaurant-pro": "restaurant",
    "business": "agency",
    "portfolio-x": "portfolio",
  };

  return aliases[value] || value;
};

export const createWebsite = async (data: any) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error(
      "Please log in before creating your website."
    );
  }

  const response = await fetch(
    `${API_URL}/websites/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token || ""}`,
      },
      body: JSON.stringify({
        userId: user.id,
        templateSlug: mapTemplateSlugForBackend(
          data.templateId
        ),
        name: data.websiteName,
        subdomain: data.subdomain,
        customDomain: data.customDomain,
        domainType: data.domainType,
      }),
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message ||
        "Failed to create website"
    );
  }

  return payload?.data;
};

export const publishWebsite = async (data: any) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error(
      "Please log in before publishing your website."
    );
  }

  let website: any = undefined;

  if (!data.websiteId) {
    website = await createWebsite(data);
  }

  const websiteId = data.websiteId || website?._id;

  if (!websiteId) {
    throw new Error(
      "Website ID is required for publishing."
    );
  }

  const publishResponse = await fetch(
    `${API_URL}/publish/${websiteId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token || ""}`,
      },
    }
  );

  const publishPayload = await publishResponse
    .json()
    .catch(() => null);

  if (!publishResponse.ok) {
    throw new Error(
      publishPayload?.message ||
        "Failed to publish website"
    );
  }

  return {
    success: true,
    website: website || { _id: data.websiteId },
    publish: publishPayload,
    message:
      publishPayload?.message ||
      "Website published successfully",
  };
};


export const verifyDomain = async (
  websiteId: string
) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error(
      "Please log in before verifying a domain."
    );
  }

  const response = await fetch(
    `${API_URL}/domain/verify/${websiteId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token || ""}`,
      },
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message ||
        "Failed to verify domain"
    );
  }

  return payload?.data;
};

export const connectDomain = async (data: any) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error(
      "Please log in before connecting a domain."
    );
  }

  const response = await fetch(
    `${API_URL}/domain/connect`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token || ""}`,
      },
      body: JSON.stringify({
        websiteId: data.websiteId,
        domain: data.customDomain,
        cnameHost: data.dnsHost,
        cnameTarget: data.dnsTarget,
      }),
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message ||
        "Failed to connect custom domain"
    );
  }

  return payload?.data;
};