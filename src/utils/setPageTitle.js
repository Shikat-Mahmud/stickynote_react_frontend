import { viteAppName } from "../config";

export const appName = viteAppName || "StickyNote";

export function setPageTitle(pageTitle) {
  document.title = pageTitle ? `${pageTitle} - ${appName}` : appName;
}
