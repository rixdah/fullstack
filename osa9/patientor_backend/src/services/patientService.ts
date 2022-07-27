import PatientData from '../../data/patients';
import { Patient, CensoredPatientData, NewPatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = PatientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined=> {
  const foundPatient = patients.find(patient => patient.id === id);
  return foundPatient;
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

const addEntry = (entry: NewEntry, patient: Patient): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

module.exports = { getPatients, getPatientById, getCensoredPatients, addPatient, addEntry };