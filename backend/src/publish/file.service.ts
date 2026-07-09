import fs from "fs-extra";
import path from "path";

import {
  TEMPLATES_DIR,
  PUBLISHED_DIR,
} from "../config/paths";

const resolveTemplateSlug = (templateSlug: string) => {
  const normalized = (templateSlug || "").toLowerCase();

  const aliases: Record<string, string> = {
    "modern-ecommerce": "ecommerce",
  };

  return aliases[normalized] || normalized;
};

/* ==========================
   Template Path
========================== */

export const getTemplatePath = (
  templateSlug: string
) => {
  const resolvedSlug = resolveTemplateSlug(templateSlug);

  return path.join(
    TEMPLATES_DIR,
    resolvedSlug
  );
};

/* ==========================
   Published Path
========================== */

export const getPublishedPath = (
  websiteSlug: string
) => {
  return path.join(
    PUBLISHED_DIR,
    websiteSlug
  );
};

/* ==========================
   Check Template Exists
========================== */

export const templateExists = async (
  templateSlug: string
) => {
  return fs.pathExists(
    getTemplatePath(templateSlug)
  );
};

/* ==========================
   Delete Published Website
========================== */

export const deletePublishedWebsite =
  async (websiteSlug: string) => {
    const publishPath =
      getPublishedPath(websiteSlug);

    if (await fs.pathExists(publishPath)) {
      await fs.remove(publishPath);
    }
  };

/* ==========================
   Copy Template
========================== */

export const copyTemplate = async (
  templateSlug: string,
  websiteSlug: string
) => {
  const source =
    getTemplatePath(templateSlug);

  const destination =
    getPublishedPath(websiteSlug);

  await fs.copy(source, destination);

  return destination;
};

/* ==========================
   Write JSON File
========================== */

export const writeJson = async (
  websiteSlug: string,
  fileName: string,
  data: any
) => {
  const filePath = path.join(
    getPublishedPath(websiteSlug),
    fileName
  );

  await fs.writeJson(filePath, data, {
    spaces: 2,
  });

  return filePath;
};

/* ==========================
   Read JSON File
========================== */

export const readJson = async (
  websiteSlug: string,
  fileName: string
) => {
  const filePath = path.join(
    getPublishedPath(websiteSlug),
    fileName
  );

  return fs.readJson(filePath);
};

/* ==========================
   Ensure Directory
========================== */

export const ensureDirectory =
  async (websiteSlug: string) => {
    await fs.ensureDir(
      getPublishedPath(websiteSlug)
    );
  };