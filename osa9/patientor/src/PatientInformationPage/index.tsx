/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React from 'react';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Entry, Gender, NewEntry, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import assertNever from "assert-never";
import './index.css';
import { Button } from "@material-ui/core";
import { AddEntryForm } from "./AddEntryForm";
import { AddEntryModal } from "../AddPatientModal";


const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: { [code: string]: Diagnosis } }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div className="entry">
          <p>{entry.date} {entry.type}</p>
          <i>{entry.description}</i>
          <p>Diagnose by {entry.specialist}</p>
          {entry.diagnosisCodes?.map((code: string) => (
          <ul key={code}>
            <li>
              {code} {diagnoses[code].name}
            </li>
          </ul>
          ))}
          <p>Discharge:</p>
          <ul>
            <li>Date: {entry.discharge.date}</li>
            <li>Criteria: {entry.discharge.criteria}</li>
          </ul>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div className="entry">
          <p>{entry.date} <strong>{entry.type}</strong> <i>{entry.employerName}</i></p>
          <i>{entry.description}</i>
          <p>Diagnose by {entry.specialist}</p>
          {entry.diagnosisCodes?.map((code: string) => (
          <ul key={code}>
            <li>
              {code} {diagnoses[code].name}
            </li>
          </ul>
          ))}
          {entry.sickLeave !== undefined && Object.keys(entry.sickLeave).length !== 0 ?
          <div><p>Sick Leave: </p>
            <ul>
              <li>Start date: {entry.sickLeave.startDate}</li>
              <li>End date: {entry.sickLeave.endDate}</li>
            </ul>
          </div> : <p>No sick leave</p>}
        </div>
      );
    case "HealthCheck":
      return (
        <div className="entry">
          <p>{entry.date} <strong>{entry.type}</strong></p>
          <i>{entry.description}</i>
          <div>Health check rating (0-3): {entry.healthCheckRating}</div>
          <p>Diagnose by {entry.specialist}</p>
        </div>
        );
    default:
      return assertNever(entry);
  }
};

/*
const HealthCheckEntry = (entry: HealthCheckEntry) => {
  return (
    <div>
      <p>{entry.date} {entry.type}</p>
      <i>{entry.description}</i>
      <div>{entry.healthCheckRating}</div>
    </div>
    );
};*/

const PatientInformationPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const onSubmit = (values: NewEntry) => {
    const submit = values;
  };

  const onCancel = () => {
    return null;
  };

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log(patient);
        dispatch({ type: 'ADD_PATIENT', payload: patient });
      } catch (error: unknown) {
        console.error(error);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch({ type: 'SET_DIAGNOSIS_LIST', payload: diagnoses });
        console.log(diagnoses);
      } catch (error: unknown) {
        console.log(error);
      }
    };
    if (id) {
      void fetchPatient(id);
      void fetchDiagnoses();
    }
  }, [dispatch]);
  console.log(patients);
  console.log(diagnoses);

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: newEntry });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (id && patients[id] && Object.keys(diagnoses).length !== 0) {
    return (
      <div className="App">
        <h2>{patients[id].name}{patients[id].gender === Gender.Male ? <MaleIcon></MaleIcon> : <FemaleIcon></FemaleIcon> }</h2>
        <p>ssn: {patients[id].ssn}</p>
        <p>occupation: {patients[id].occupation}</p>
        <h3>Entries:</h3>
        {patients[id].entries.map((entry: Entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </div>
        ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
      </div>
    );
  }
  return (
    <h2>No patient found.</h2>
  );
  
};

export default PatientInformationPage;