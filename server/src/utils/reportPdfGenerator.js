const ejs = require("ejs");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const createPdf = async (ejsFilePath, dataObj = {}) => {
  try {
    console.log("Chromium path:", await chromium.executablePath());

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      timeout: 0, // IMPORTANT for Render
    });

    const page = await browser.newPage();

    // Render EJS template
    const html = await ejs.renderFile(ejsFilePath, dataObj);

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    return {
      buffer: pdfBuffer,
    };
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
};

module.exports = createPdf;
