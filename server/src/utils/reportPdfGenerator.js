const ejs = require("ejs");
const puppeteer = require("puppeteer");

const createPdf = async (ejsFilePath,dataObj = {}) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Render EJS with data (dataObj can be empty if you don't need it)
    const html = await ejs.renderFile(ejsFilePath, dataObj);

    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px" },
    });

    await browser.close();

    return {
      buffer: pdfBuffer
    };

  } catch (error) {
    console.log("PDF generation error:", error);
    throw error;
  }
};

module.exports = createPdf;
