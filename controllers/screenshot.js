import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { sendResponse } from "../utils/util.js";

const capture = async (url, width = 1080, height = 1920) => {
  const options = process.env.AWS_REGION
    ? {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--single-process",
        ],
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreDefaultArgs: ["--disable-extensions"],
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32" || process.platform === "win64"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      };

  const browser = await puppeteer.launch(options);

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: "networkidle0" });
    return await page.screenshot({ type: "png", omitBackground: true });
  } finally {
    await browser.close();
  }
};

export const ScreenShot = async (req, res) => {
  const { url, environmentKey } = req.body;

  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match")
  // }

  try {
    const file = await capture(url);
    console.log(typeof file);
    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.statusCode = 200;
    res.end(file);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
