const { data } = require('autoprefixer');
const Planos = require('../../models/table_plans');

module.exports = {
    read: async (req, res) => {
        const planos = await Planos.findAll({ raw: true });

        res.json({ success: true, data: planos });
    },
    update: async (req, res) => {
        const idd = req.params.idd;
        const { nome, valor } = req.body;

        const plano = await Planos.findOne({
            where: {
                id: idd
            }
        });

        if (plano) {
            plano.planName = nome;
            plano.planValue = valor;
            await plano.save();

            return res.json({ success: true, message: 'Plano atualizado com sucesso' });
        }

        res.status(500).json({ success: false, message: 'Erro ao atualizar plano', error });

        /*    try {
               await Planos.update({ nome, valor }, { where: { id } });
               res.json({ success: true, message: 'Plano atualizado com sucesso' });
           } catch (error) {
               res.status(500).json({ success: false, message: 'Erro ao atualizar plano', error });
           } */
    },
}
