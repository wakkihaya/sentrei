import type { NextApiHandler } from "next";

import { getHtml } from "@sentrei/og-sentrei-com/lib/getHtml";
import { parseRequest } from "@sentrei/og-sentrei-com/lib/parseRequest";

// eslint-disable-next-line @typescript-eslint/require-await
const html: NextApiHandler = async (req, res) => {
  try {
    const config = parseRequest(req);
    console.log(`\n--- /api/html ---\nCONFIG: ${JSON.stringify(config)}\n`);
    const html = getHtml(config);
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default html;
