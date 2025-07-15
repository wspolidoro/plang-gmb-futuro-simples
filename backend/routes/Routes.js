const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/admin/control-usuario');
const planosController = require('../controllers/admin/control-planos');
const proposalController = require('../controllers/admin/proposalController');

router.post('/auth', usuarioController.login);
router.get('/planos', planosController.read);
router.put('/planos/:idd', planosController.update);
router.post('/proposal', proposalController.createProposal);
router.get('/proposal', proposalController.readProposal);
router.get('/proposal/:id', proposalController.readProposalId);

module.exports = router;