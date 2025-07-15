const Proposal = require('../../models/table_proposal');
const Projetions = require('../../models/table_projetions');

module.exports = {
    createProposal: async (req, res) => {
        // const { businessName, averageTicket, monthlyVolume, niche } = req.body.body;
         const { businessName, averageTicket, monthlyVolume, niche } = req.body.businessData;
            
        try {
           
            // Validação simples (pode ser expandida)
            if (!businessName || !averageTicket || !monthlyVolume || !niche) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            try {
                const newProposal = await Proposal.create({
                    businessName: businessName,
                    averageTicket: averageTicket,
                    monthlyVolume: monthlyVolume,
                    niche: niche
                });

                console.log(newProposal.id)

                const dadosProjecao = req.body.projections.map((proj) => ({
                    ...proj,
                    proposalId: newProposal.id,
                    currentRevenue: req.body.currentRevenue,
                }))

                const newProjetion = await Projetions.bulkCreate(dadosProjecao);

                 return res.status(201).json({success: true, message: 'Proposta criada com sucesso!', proposal: newProposal.id });

            } catch (error) {
                console.error('Erro ao criar proposta:', error);
                return res.status(400).json({ success: false, message: 'Erro de validação.', error: error });
            }

           
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao criar proposta.', error: error.message });
        }
    },
    readProposal: async (req, res) => {
        try {
            const proposals = await Proposal.findAll();
            return res.status(200).json({success: true, data: proposals});
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar propostas.', error: error.message });
        }
    },
    readProposalId: async (req, res) => {
        try {
            const proposals = await Proposal.findAll({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Projetions,
                    as: 'projections'
                }]
            });
            return res.status(200).json({success: true, data: proposals});
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar propostas.', error: error.message });
        }
    },
}

