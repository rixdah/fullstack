import express from 'express';
const router = express.Router();
const patientService = require('../services/patientService');


router.get('/', (_request, response) => {
  response.send(patientService.getCensoredPatients());
});

router.post('/', (request, response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = request.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  response.json(newPatient);
});

module.exports = router;