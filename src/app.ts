import puppeteer from 'puppeteer';
import $ from 'cheerio';
import { CronJob } from 'cron';
import express from 'express';

const url = 'https://www.amazon.com.br/';

const app = express();

async function configureBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function checkPrice(page: any) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);

  $('#priceblock_ourprice', html).each(function (this: HTMLElement) {
    let realPrice = $(this).text();
    console.log(realPrice);
  });
}

async function search(page: any) {
  await page.type('.nav-search-field input', 'notebook');
  const input = '.nav-search-submit .nav-sprite';
  await page.waitForSelector(input);
  await page.click(input);

  const screenshot = async () => await page.screenshot({ path: 'example.png' });

  setTimeout(screenshot, 5000);
}

async function monitor() {
  const page = await configureBrowser();
  await search(page);
}

monitor();

// async function startTracking() {
//   const page = await configureBrowser();

//   let job = new CronJob('* * * * * *', () => { //runs every 30 minutes in this config
//     checkPrice(page);
//   }, null, true, 'America/Sao_Paulo');
//   job.start();
// }

// startTracking();

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started!');
});