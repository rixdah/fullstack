const express = require('express');
const router = express.Router();
const diagnosisService = require('../services/diagnosisService');

router.get('/', (_request: any, response: any) => {
  response.send(diagnosisService.getDiagnoses());
});

router.post('/', (_request: any, _response: any) => {

});

module.exports = router;