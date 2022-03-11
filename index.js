const puppeteer = require('puppeteer');
//const cheerio = require('cheerio');
const fs = require('fs');
let rt = [];
let end;
//Получение из файлов списков ссылок по всем магазинам и преобразование в массив

//gdematerial.ru 
const GdeMaterialLinks = fs.readFileSync("gdematerial.json", "utf8");
const GdeMaterialLinksParsed = JSON.parse(GdeMaterialLinks);
const GdeMaterialArray = Object.values(GdeMaterialLinksParsed);
//leroymerlin.ru
const LeroyLinks = fs.readFileSync("leroy.json", "utf8");
const LeroyLinksParsed = JSON.parse(LeroyLinks);
const LeroyArray = Object.values(LeroyLinksParsed);
//tstn.ru
const TstnLinks = fs.readFileSync("tstn.json", "utf8");
const TstnLinksParsed = JSON.parse(TstnLinks);
const TstnArray = Object.values(TstnLinksParsed);
//Основная функция на tstn.ru атрибут - линк
async function tstn(link) {
  const browser = await puppeteer.launch({
    headless: false,    
  });
  const page = await browser.newPage();
  await page.goto(link);

//Наименование
 // const name = await page.evaluate(element0 => element0.textContent, await page.$("#main > main > div.container > div > div > div.page-heading > h1"));
//Первая цена и единица измерения
  const data1 = await page.evaluate(element1 => element1.textContent, await page.$("#b-product-info > section.product-main > div.grid.-justify-between > div.column-right > div > span")); 
  const price1 = data1.match(/[0-9]+/g);
/*   let PriceSum;
  if (price1[1]) {
    PriceSum = `${price1[0]}.${price1[1]}`;
  } else {
    PriceSum = `${price1[0]}`;
  }
  const units1 = data1.match(/[а-я]²|[а-я]+/); */
//Вторая цена и единица измерения
  /* const data2 = await page.evaluate(element2 => element2.textContent, await page.$("body > div.page-wrapper > div.top-page-wrapper > div.content.pinned-footer > div.line-body > div.product-content > div > div > div > div > uc-pdp-card-ga-enriched > uc-pdp-price-view.second-price"));
  const price2 = data2.match(/[0-9]+/g);
  let Price2Sum;
  if (price2[1]) {
    Price2Sum = `${price2[0]}.${price2[1]}`;
  } else {
    Price2Sum = `${price2[0]}`;
  }
  const units2 = data2.match(/[а-я]²|[а-я]+/); */
//Артикул и получение только цифр артикула
  //const art = await page.evaluate(element3 => element3.textContent, await page.$("#main > main > div.container > div.aside > div > div.redesign.section_b > div.product-detail > div.product-detail__top-properties > div > div > div:nth-child(1) > span.inline-property__value"));
  //const article = art.match(/[0-9]+/);
//Закрытие экземпляра браузера  

browser.close();

 // console.log(name);
  console.log(price1);
  //console.log(art);
 

//Создание JSON объекта и запись в файл
  /* const obj = {
    Name : name,
    FirstPrice : PriceSum,
    FirstUnits : units1[0],
    SecondPrice : Price2Sum || "",
    SecondUnits : units2[0] || "",
    ArticleNumber : article[0]
  };

  const data = JSON.stringify(obj, null, 4);
  
  fs.writeFile('./TstnDone.json', data, 'utf8', (err) => {
    if (err) {
        console.log(`Ошибка записи файла: ${err}`);
    } else {
        console.log(`Запись успешно завершена`);
    }
  });
   */
}

//Основная функция на leroymerlin.ru атрибут - линк
async function leroy(link) {
  const browser = await puppeteer.launch({
    headless: false,    
  });
  const page = await browser.newPage();
  await page.goto(link);

//Наименование
  const name = await page.evaluate(element0 => element0.textContent, await page.$("body > div.page-wrapper > div.top-page-wrapper > div.content.pinned-footer > div.line-body > div.product-content > div > div > div > div > uc-pdp-card-ga-enriched > h1"));
//Первая цена и единица измерения
  const data1 = await page.evaluate(element1 => element1.textContent, await page.$("body > div.page-wrapper > div.top-page-wrapper > div.content.pinned-footer > div.line-body > div.product-content > div > div > div > div > uc-pdp-card-ga-enriched > uc-pdp-price-view.primary-price")); 
  const price1 = data1.match(/[0-9]+/g);
  let PriceSum;
  if (price1[1]) {
    PriceSum = `${price1[0]}.${price1[1]}`;
  } else {
    PriceSum = `${price1[0]}`;
  }
  const units1 = data1.match(/[а-я]²|[а-я]+/);
//Вторая цена и единица измерения
  const data2 = await page.evaluate(element2 => element2.textContent, await page.$("body > div.page-wrapper > div.top-page-wrapper > div.content.pinned-footer > div.line-body > div.product-content > div > div > div > div > uc-pdp-card-ga-enriched > uc-pdp-price-view.second-price"));
  const price2 = data2.match(/[0-9]+/g);
  let Price2Sum;
  if (price2[1]) {
    Price2Sum = `${price2[0]}.${price2[1]}`;
  } else {
    Price2Sum = `${price2[0]}`;
  }
  const units2 = data2.match(/[а-я]²|[а-я]+/);
//Артикул и получение только цифр артикула
  const art = await page.evaluate(element3 => element3.textContent, await page.$("body > div.page-wrapper > div.top-page-wrapper > div.content.pinned-footer > div.line-body > div.product-content > div > div > div > div > uc-pdp-card-ga-enriched > span"));
  const article = art.match(/[0-9]+/);
//Закрытие экземпляра браузера  
  browser.close();

  //console.log(PriceSum);
 

//Создание JSON объекта и запись в файл
  const obj = {
    Name : name,
    FirstPrice : PriceSum,
    FirstUnits : units1[0],
    SecondPrice : Price2Sum || "",
    SecondUnits : units2[0] || "",
    ArticleNumber : article[0]
  };

  const data = JSON.stringify(obj, null, 4);
  
  fs.writeFile('./LeroyDone.json', data, 'utf8', (err) => {
    if (err) {
        console.log(`Ошибка записи файла: ${err}`);
    } else {
        console.log(`Запись успешно завершена`);
    }
  });
  
}
//Основная функция на gdematerial.ru атрибут - линк
async function GdeMaterial(link) {
  const browser = await puppeteer.launch({
    headless: true,    
  });
  const page = await browser.newPage();
  await page.goto(link);
//Текуший урл 
  const url = page.url();
//Наименование
  const name = await page.evaluate(element0 => element0.textContent, await page.$("#layout-default > div > main > section > section.product__section.product__section--resume.section.section--product > div > section > div.product-header > div > h1"));
//Первая цена и единица измерения
  const data1 = await page.evaluate(element1 => element1.textContent, await page.$("#layout-default > div > main > section > section.product__section.product__section--resume.section.section--product > div > section > div.product-resume__inner > div.product-resume__sidebar > div.resume-sidebar > div > div > div > div.resume-sidebar-controls__price > div.resume-sidebar-controls__price-row > div > div > div:nth-child(1)"));  
  const price1 = data1.match(/[0-9]+/g);
  let PriceSum;
  if (price1[1]) {
    PriceSum = `${price1[0]}.${price1[1]}`;
    } else {
    PriceSum = `${price1[0]}`;
  }
  const units1 = await page.evaluate(element1 => element1.textContent, await page.$("#layout-default > div > main > section > section.product__section.product__section--resume.section.section--product > div > section > div.product-resume__inner > div.product-resume__sidebar > div.resume-sidebar > div > div > div > div.resume-sidebar-controls__price > div.resume-sidebar-controls__price-row > div > div > div:nth-child(1) > span.product-price__unit > span"));
//Артикул и получение только цифр артикула
  const art = await page.evaluate(element3 => element3.textContent, await page.$("#layout-default > div > main > section > section.product__section.product__section--resume.section.section--product > div > section > div.product-header > div > span > span"));
  const article = art.match(/[0-9]+/);
//Закрытие экземпляра браузера  
  browser.close();
//Получение даты
  const date = new Date();
//Создание JSON объекта и запись в файл
  const obj = {
    Url : url,
    Name : name,
    FirstPrice : PriceSum,
    FirstUnits : units1,
    ArticleNumber : article[0],
    Date : date.toLocaleString()
  }; 
  
  rt.push(obj);
  end = JSON.stringify(rt, null, 4);
  
  fs.writeFile('./GdeMaterialDone.json', end, 'utf8', (err) => {
    if (err) {
        console.log(`Ошибка записи файла: ${err}`);
    } else {
       console.log(`Запись успешно завершена`);
    }
   
  });

}

/* GdeMaterialArray.forEach(async (o, i) => {
  await GdeMaterial(o);
}); */

/* LeroyArray.forEach(async (o, i) => {
  await leroy(o);
}); */

leroy(LeroyArray[0]);
