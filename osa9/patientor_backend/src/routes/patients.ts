import express from 'express';
import { Entry, Patient } from '../types';
const router = express.Router();
const patientService = require('../services/patientService');


router.get('/', (_request, response) => {
  response.send(patientService.getCensoredPatients());
});

router.get('/:id', (request, response) => {
  const id = request.params['id'];
  const patient = patientService.getPatientById(id);
  patient ? response.send(patient) : response.send(`No patient matched id ${id}`);
  response.send();
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

router.post('/:id/entries', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {id, ...entry}: Entry = request.body;
  if (!(entry.type)) {
    throw new Error('No entry type given!');
  }
  if (entry.type !== "HealthCheck" && entry.type !== "Hospital" && entry.type !== "OccupationalHealthcare") {
    throw new Error('Incorrect entry type given');
  }
  if (!(entry.date) || !(entry.description) || !(entry.specialist)) {
    throw new Error('Date, description, id or specialist missing!');
  }
  if (entry.type === "HealthCheck") {
    if (!(entry.healthCheckRating)) {
      throw new Error('Missing required field healthCheckRating for type HealthCheck');
    }
  }
  else if (entry.type === "Hospital") {
    if (!(entry.discharge)) {
      throw new Error('Missing required field discharge for type Hospital');
    }
  }
  else if (entry.type === "OccupationalHealthcare") {
    if (!(entry.employerName)) {
      throw new Error('Missing required field employerName');
    }
  }
  const patients: Patient[] = patientService.getPatients();
  const patient: Patient | undefined = patients.find(patient => patient.id === request.params['id']);
  const updatedPatient = patientService.addEntry(entry, patient);
  response.json(updatedPatient);
});

module.exports = router;