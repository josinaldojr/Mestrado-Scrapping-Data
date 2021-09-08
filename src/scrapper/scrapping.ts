import puppeteer from 'puppeteer';
import $ from 'cheerio';

class ScrappingPriceProducts {
    public async scrapping(request: RequestModel) {
        if(request.shops.amazon) {
            let productName = request.products.eletronic.map(product => product.name);

            async function configureBrowser() {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(request.shops.amazon.url);
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
                await page.type('.nav-search-field input', productName);
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
        }
    } 
}

export default ScrappingPriceProducts;