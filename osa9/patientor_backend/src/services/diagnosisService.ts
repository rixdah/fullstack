import diagnosisData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosisData;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

module.exports = { getDiagnoses };