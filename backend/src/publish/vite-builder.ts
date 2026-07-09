import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

/* ==========================
   Install Dependencies
========================== */

export const installDependencies = async (
  projectPath: string
) => {
  await execa("npm", ["install", "--include=dev"], {
    cwd: projectPath,
    stdio: "inherit",
    shell: true,
  });
};

/* ==========================
   Build Vite Project
========================== */

export const buildProject = async (
  projectPath: string
) => {
  await execa("npm", ["run", "build"], {
    cwd: projectPath,
    stdio: "inherit",
    shell: true,
  });
};

/* ==========================
   Update Vite Base
========================== */

export const updateViteBase = async (
  projectPath: string,
  websiteSlug: string
) => {
  const viteTs = path.join(projectPath, "vite.config.ts");
  const viteJs = path.join(projectPath, "vite.config.js");

  let viteConfigPath = "";

  if (await fs.pathExists(viteTs)) {
    viteConfigPath = viteTs;
  } else if (await fs.pathExists(viteJs)) {
    viteConfigPath = viteJs;
  } else {
    throw new Error(
      "vite.config.ts or vite.config.js not found"
    );
  }

  let content = await fs.readFile(
    viteConfigPath,
    "utf8"
  );

  const baseConfig = `base: "/sites/${websiteSlug}/",`;

  if (/base\s*:/.test(content)) {
    content = content.replace(
      /base\s*:\s*['"`][^'"`]*['"`]\s*,?/,
      baseConfig
    );
  } else {
    content = content.replace(
      /defineConfig\s*\(\s*\{/,
      `defineConfig({\n  ${baseConfig}`
    );
  }

  await fs.writeFile(viteConfigPath, content, "utf8");
};

/* ==========================
   Install + Build
========================== */

export const installAndBuild = async (
  projectPath: string,
  websiteSlug: string
) => {
  await updateViteBase(
    projectPath,
    websiteSlug
  );

  await installDependencies(projectPath);

  await buildProject(projectPath);

  return true;
};