import * as playwright from "playwright-aws-lambda";
import type { Page, LaunchOptions } from "playwright-core";

import { OG_HEIGHT, OG_WIDTH } from "@sentrei/og-sentrei-com/const/og";
import type { FileType } from "@sentrei/og-sentrei-com/types";

let _page: Page | null;

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export const getOptions = (isDev: boolean): LaunchOptions => {
  let options: LaunchOptions;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: playwright.getChromiumArgs(true),
      headless: true,
    };
  }

  return options;
};

const getPage = async (isDev: boolean) => {
  if (_page) {
    return _page;
  }

  const options = getOptions(isDev);
  await playwright.loadFont(
    "https://raw.githack.com/minoryorg/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Regular.ttf",
  );
  await playwright.loadFont(
    "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf",
  );
  const browser = await playwright.launchChromium(options);
  const context = await browser.newContext();

  _page = await context.newPage();
  return _page;
};

export const getScreenshot = async (
  html: string,
  type: FileType,
  isDev: boolean,
): Promise<string | void | Buffer> => {
  const page = await getPage(isDev);
  await page.setViewportSize({ width: OG_WIDTH, height: OG_HEIGHT });
  await page.setContent(html);
  const file = await page.screenshot({ type });
  return file;
};
