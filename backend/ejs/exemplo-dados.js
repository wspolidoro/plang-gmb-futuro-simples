// Exemplo de como usar o template EJS
// Este arquivo mostra a estrutura de dados necessária para renderizar o relatório



const dadosRelatorio = async (id) => {
  const Proposal = require('../models/table_proposal');
  const Projetions = require('../models/table_projetions');
  const Planos = require('../models/table_plans');

  const listPlanos = await Planos.findAll({raw: true});

  const proposals = await Proposal.findAll({
    where: {
      id: id
    },
    include: [{
      model: Projetions,
      as: 'projections'
    }]
  });

  let proposal = proposals[0].dataValues;
  console.log(listPlanos)

  return {
    nomeEmpresa: proposal.businessName,
    receitaAtual: proposal.projections[0].currentRevenue,
    vendasAtuais: proposal.monthlyVolume,
    ticketMedio: proposal.averageTicket,

    cenarios: {
      pessimista: {
        crescimento: 30,
        novasVendas: proposal.projections[0].newVolume,
        novaReceita: proposal.projections[0].newRevenue,
        receitaExtra: proposal.projections[0].extraRevenue,
        extraAnual: proposal.projections[0].yearlyExtra,
      },
      medio: {
        crescimento: 50,
        novasVendas: proposal.projections[1].newVolume,
        novaReceita: proposal.projections[1].newRevenue,
        receitaExtra: proposal.projections[1].extraRevenue,
        extraAnual: proposal.projections[1].yearlyExtra,
      },
      otimista: {
        crescimento: 75,
        novasVendas: proposal.projections[2].newVolume,
        novaReceita: proposal.projections[2].newRevenue,
        receitaExtra: proposal.projections[2].extraRevenue,
        extraAnual: proposal.projections[2].yearlyExtra,
      },
      personalizado: {
        crescimento: 100,
        novasVendas: proposal.projections[3].newVolume,
        novaReceita: proposal.projections[3].newRevenue,
        receitaExtra: proposal.projections[3].extraRevenue,
        extraAnual: proposal.projections[3].yearlyExtra,
      },
    },

    servicos: [
      {
        nome: "Análise Completa + Relatório de Otimização Self",
        descricao: "Ajuda o cliente a começar sozinho com instruções detalhadas",
        preco: 230.0,
        impacto: 5,
        adicionado: true,
        promocional: false,
      },
      {
        nome: "Tour Virtual 360° com Publicação no Google Maps",
        descricao: "Fotos imersivas ajudam a aumentar o tempo de permanência e ranqueamento",
        preco: 390.0,
        precoOriginal: 590.0,
        impacto: 8,
        adicionado: false,
        promocional: true,
      },
      {
        nome: "Criação de Site Local com SEO Básico",
        descricao: "Site profissional otimizado para busca local",
        preco: 690.0,
        impacto: 12,
        adicionado: true,
        promocional: false,
      },
      {
        nome: "Serviço Avançado de SEO para Sites Existentes",
        descricao: "Diagnóstico + otimização técnica e de conteúdo",
        preco: "Sob consulta",
        impacto: 15,
        adicionado: false,
        promocional: false,
      },
    ],

    planos: [
      {
        nome: listPlanos[0].planName,
        preco: listPlanos[0].planValue,
        recursos: [
          "Otimização completa do perfil GMB",
          "Gestão de avaliações e respostas",
          "Posts semanais personalizados",
          "Relatório mensal de performance",
        ],
        popular: false,
        selecionado: false,
      },
      {
         nome: listPlanos[1].planName,
        preco: listPlanos[1].planValue,
        recursos: [
          "Tudo do Plano Básico",
          "Gestão de múltiplas localizações",
          "Criação de conteúdo premium",
          "Análise da concorrência",
          "Suporte prioritário via WhatsApp",
        ],
        popular: true,
        selecionado: true,
      },
      {
        nome: listPlanos[2].planName,
        setup: listPlanos[2].setup,
        preco: listPlanos[2].planValue,
        recursos: [
          "Tudo do Plano Intermediário",
          "Estratégias de SEO local avançado",
          "Campanhas de review marketing",
          "Consultoria estratégica mensal",
          "Integração com redes sociais",
          "Dashboard executivo personalizado",
        ],
        popular: false,
        selecionado: false,
      },
    ],
  }

}

// Para renderizar o template:
// const ejs = require('ejs');
// const html = ejs.render(templateString, dadosRelatorio);

module.exports = dadosRelatorio
