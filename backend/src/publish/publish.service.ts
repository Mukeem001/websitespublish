import fs from "fs-extra";
import path from "path";

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

  await installAndBuild(
    projectPath,
    website.slug
  );

  const builtIndex = path.join(
    projectPath,
    "dist",
    "index.html"
  );

  if (!(await fs.pathExists(builtIndex))) {
    throw new Error(
      "Publish failed: built site output not found."
    );
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