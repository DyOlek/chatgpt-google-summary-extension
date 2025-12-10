
import puppeteer from 'puppeteer';

(async () => {
  const extensionPath = './dist';
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('https://www.youtube.com/watch?v=rVmx2QsUfpY', {
    waitUntil: 'networkidle2',
  });

  // Check if the transcript is correctly extracted by looking for a specific element
  const transcriptSelector = '.glarity--subtitle-container';
  try {
    await page.waitForSelector(transcriptSelector, { timeout: 10000 });
    console.log('Test passed: Transcript found!');
  } catch (error) {
    console.error('Test failed: Transcript not found.');
  }

  await browser.close();
})();
