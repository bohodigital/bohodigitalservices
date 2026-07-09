import { execFileSync } from "node:child_process";

export interface BuildInfo {
  app: string;
  commit: string;
  shortCommit: string;
  branch: string;
  source: string;
  dirty: boolean | "unknown";
}

let cachedBuildInfo: BuildInfo | undefined;

const readGit = (args: string[]): string | undefined => {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return undefined;
  }
};

const hasDirtyGitState = (): boolean | "unknown" => {
  const status = readGit(["status", "--porcelain"]);

  if (status === undefined) {
    return "unknown";
  }

  return status.length > 0;
};

const getSource = (): string => {
  if (process.env.CF_PAGES) return "cloudflare-pages";
  if (process.env.GITHUB_ACTIONS) return "github-actions";
  return "local";
};

export const getBuildInfo = (): BuildInfo => {
  if (cachedBuildInfo) {
    return cachedBuildInfo;
  }

  const commit =
    process.env.CF_PAGES_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    readGit(["rev-parse", "HEAD"]) ||
    "unknown";

  cachedBuildInfo = {
    app: "boho-digital-site",
    commit,
    shortCommit: commit === "unknown" ? "unknown" : commit.slice(0, 7),
    branch:
      process.env.CF_PAGES_BRANCH ||
      process.env.GITHUB_REF_NAME ||
      readGit(["rev-parse", "--abbrev-ref", "HEAD"]) ||
      "unknown",
    source: getSource(),
    dirty: hasDirtyGitState(),
  };

  return cachedBuildInfo;
};
