import type { NextApiHandler } from "next";

import { getHtml } from "@sentrei/og-sentrei-com/lib/getHtml";
import { getScreenshot } from "@sentrei/og-sentrei-com/lib/getScreenshot";
import { parseRequest } from "@sentrei/og-sentrei-com/lib/parseRequest";

const isDev = !process.env.AWS_REGION;

const handler: NextApiHandler = async (req, res) => {
  try {
    const config = parseRequest(req);
    console.log(`\n--- /api/image---\nCONFIG: ${JSON.stringify(config)}\n`);
    const html = getHtml(config);
    const { fileType } = config;
    const file = await getScreenshot(html, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default handler;
