import PatientData from '../../data/patients.json';
import { Patient, CensoredPatientData, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = PatientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getCensoredPatients = (): CensoredPatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

module.exports = { getPatients, getCensoredPatients, addPatient };