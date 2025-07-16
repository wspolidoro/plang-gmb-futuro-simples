const express = require('express');
const app = express();
const port = 3333;
const bodyParser = require('body-parser');
const cors = require('cors');

const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf')
const dadosRelatorio = require('./ejs/exemplo-dados'); // Importando os dados de exemplo

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public')); // Serve arquivos estáticos (CSS, imagens etc.)

app.get('/template-pdf/:id', async (req, res) => {
  const Proposal = require('./models/table_proposal');
  const Projetions = require('./models/table_projetions');


  const passengers = [
    {
      name: "Joyce",
      flightNumber: 7859,
      time: "18h00",
    },
    {
      name: "Brock",
      flightNumber: 7859,
      time: "18h00",
    },
    {
      name: "Eve",
      flightNumber: 7859,
      time: "18h00",
    },
  ];

/*    const proposals = await Proposal.findAll({
    where: {
      id: req.params.id
    },
    include: [{
      model: Projetions,
      as: 'projections'
    }]
  });

  <!-- <pre><%= JSON.stringify(proposals, null, 2) %></pre> --> */

  //console.log(await dadosRelatorio(23)) 

  ejs.renderFile(
    path.join(__dirname, 'ejs', 'print.ejs'),
     {
    dadosRelatorio: await dadosRelatorio(req.params.id),
    //proposals: proposals[0].dataValues
  }, (err, html) => {
      if (err) {
        console.log(err)
        return res.send('Erro na leitura do arquivo')
      }

      const options = {
        height: "11.25in",
        width: "8.3in",
        header: {
          height: "20mm",
        },
        footer: {
          height: "20mm",
        }
      }

      //criar o PDF
      pdf.create(html, options).toFile('./ejs/relatorio.pdf', (err, res) => {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });

      // enviar para o navegador
      return res.send(html)

    }
  )

  //res.send('API is running');
});

app.get('/pdf/:id', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3333/template-pdf/' + req.params.id, { waitUntil: 'networkidle0' });

  const pdf = await page.pdf({
    printBackground: true,
    format: 'A4',
    margin: {
      top: '20px',
      right: '20px',
      bottom: '40px',
      left: '20px'
    }
  });

  await browser.close();

  res.contentType("application/pdf");

  //res.json({success: true, message: 'PDF gerado com sucesso!' });
  res.send(pdf);

})

app.get('/api', (req, res) => {
  res.send('API is running');
});

app.post('/gerar-pdf', async (req, res) => {
  const { html } = req.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Length': pdf.length
  });

  res.send(pdf);
});

//rota principal
const route = require('./routes/Routes');
app.use(route);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

