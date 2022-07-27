export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
/*
interface NewBaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}
*/
enum healthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry{
  type: "HealthCheck";
  healthCheckRating: healthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry{
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  };
}
/*
interface NewHealthCheckEntry extends NewBaseEntry{
  type: "HealthCheck";
  healthCheckRating: healthCheckRating;
}

interface NewOccupationalHealthcareEntry extends NewBaseEntry{
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface NewHospitalEntry extends NewBaseEntry{
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  };
} */

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export type NewEntry =
  | Omit<HealthCheckEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HospitalEntry, 'id'>;

export type CensoredPatientData = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;