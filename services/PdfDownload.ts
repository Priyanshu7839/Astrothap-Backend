import puppeteer from "puppeteer";

export async function downloadPdf(
  req,
  res
) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "URL is required",
      });
    }

    const browser =
      await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
        ],
      });

    const page =
      await browser.newPage();

    await page.setViewport({
      width: 1440,
      height: 2000,
      deviceScaleFactor: 2,
    });

    // OPEN ACTUAL FRONTEND PAGE
    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    // optional extra wait
    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    const pdfBuffer =
      await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          right: "20px",
          bottom: "20px",
          left: "20px",
        },
      });

    await browser.close();

    res.set({
      "Content-Type":
        "application/pdf",

      "Content-Disposition":
        'attachment; filename="report.pdf"',
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "PDF generation failed",
    });
  }
}