const puppeteer = require('puppeteer');

console.log("Bem vindo ao Bot de endereço\n");

//Criando o robô
async function robo() {
    //Declarando variáveis que usarei
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = 'https://buscacepinter.correios.com.br/app/endereco/index.php';
    const cep = '60346070';
    await page.goto(url); //Indo para a página

    //Preenchendo o CEP na página
    await page.type('[name="endereco"]', cep);
    await page.keyboard.press('Enter');

    //Pegando cada um dos texto com as informações de endereço, bairro, cep e cidade.
    await page.waitForSelector('#resultado-DNEC > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)');
    let element1 = await page.$('#resultado-DNEC > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)');
    let rua = await page.evaluate(el => el.textContent, element1);
    
    await page.waitForSelector('#resultado-DNEC > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)');
    let element2 = await page.$('#resultado-DNEC > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)');
    let bairro = await page.evaluate(el => el.textContent, element2);

    await page.waitForSelector('#resultado-DNEC > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(3)');
    let element3 = await page.$('#resultado-DNEC > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(3)');
    let cidade = await page.evaluate(el => el.textContent, element3);
    
    await page.waitForSelector('#resultado-DNEC > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(4)');
    let element4 = await page.$('#resultado-DNEC > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(4)');
    let cepGerado = await page.evaluate(el => el.textContent, element4);
    
    // Imprimindo todas as informações para o usuário
    console.log('================ ENDEREÇO ENCONTRADO ================');
    console.log(`Rua: ${rua}`);
    console.log(`Bairro: ${bairro}`);
    console.log(`Cidade: ${cidade}`);
    console.log(`CEP: ${cepGerado}`);
    console.log('=====================================================');

    // Fechando o navegador
    await browser.close();
}

//Inicializando o robô
robo();
