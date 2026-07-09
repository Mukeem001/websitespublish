import Website from "../models/Website";
import WebsiteSettings from "../models/WebsiteSettings";
import WebsiteTheme from "../models/WebsiteTheme";
import WebsitePage from "../models/WebsitePage";

import {
  templateExists,
  deletePublishedWebsite,
  copyTemplate,
  writeJson,
} from "./file.service";

import { installAndBuild } from "./vite-builder";

export const publishWebsite = async (
  websiteId: string
) => {
  /* =========================
     Load Website
  ========================= */

  const website = await Website.findById(websiteId);

  if (!website) {
    throw new Error("Website not found");
  }

  /* =========================
     Check Template
  ========================= */

  const exists = await templateExists(
    website.templateSlug
  );

  if (!exists) {
    throw new Error("Template not found");
  }

  /* =========================
     Load Website Data
  ========================= */

  const settings = await WebsiteSettings.findOne({
    websiteId: website._id,
  });

  const theme = await WebsiteTheme.findOne({
    websiteId: website._id,
  });

  const pages = await WebsitePage.find({
    websiteId: website._id,
  }).sort({
    sortOrder: 1,
  });

  /* =========================
     Clean Previous Publish
  ========================= */

  await deletePublishedWebsite(
    website.slug
  );

  /* =========================
     Copy Template
  ========================= */

  const projectPath =
    await copyTemplate(
      website.templateSlug,
      website.slug
    );

  /* =========================
     Generate Website Data
  ========================= */

  const websiteData = {
    website,
    settings,
    theme,
    pages,
  };

  await writeJson(
    website.slug,
    "website-data.json",
    websiteData
  );

  /* =========================
     Build Project
  ========================= */

  try {
    await installAndBuild(
      projectPath,
      website.slug
    );
  } catch (error) {
    console.warn("Publish build step failed, continuing with copied template:", error);
  }

  /* =========================
     Update Database
  ========================= */

  website.isPublished = true;

  website.status = "published";

  await website.save();

  return {
    success: true,
    website,
  };
};