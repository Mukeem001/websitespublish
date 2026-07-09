import path from "path";

export const ROOT_DIR = path.resolve(__dirname, "../../..");

export const TEMPLATES_DIR = path.join(
  ROOT_DIR,
  "templates"
); // root-level templates folder under websites-builder

export const PUBLISHED_DIR = process.env.PUBLISH_ROOT
  ? path.resolve(process.env.PUBLISH_ROOT)
  : path.join(ROOT_DIR, "published");

export const UPLOADS_DIR = path.join(
  ROOT_DIR,
  "uploads"
);