const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/admin/control-usuario');
const planosController = require('../controllers/admin/control-planos');
const proposalController = require('../controllers/admin/proposalController');

router.post('/api/auth', usuarioController.login);
router.get('/api/planos', planosController.read);
router.put('/api/planos/:idd', planosController.update);
router.post('/api/proposal', proposalController.createProposal);
router.get('/api/proposal', proposalController.readProposal);
router.get('/api/proposal/:id', proposalController.readProposalId);

module.exports = router;