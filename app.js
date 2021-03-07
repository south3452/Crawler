const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://instagram.com/rocketseat_oficial');
    //await page.screenshot({ path: 'instagram.png' });

    const imglist = await page.evaluate(() => {
        const nodelist = document.querySelectorAll('article img')

        const imgarray = [...nodelist]

        const imglist = imgarray.map( img => ({
            src: img.src
        }))
        
        return imglist
    });

    fs.writeFile('instagram.json', JSON.stringify(imglist, null, 2), err => {
        if(err){throw new Error('alguma coisa deu errado')}

        console.log('deu certo')
    })

    
    await browser.close();
})();
