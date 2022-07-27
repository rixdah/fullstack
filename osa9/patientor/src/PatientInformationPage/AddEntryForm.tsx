/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, DiagnosisSelection } from "../AddPatientModal/FormField";
import { NewEntry } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
    initialValues={{
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      type: "HealthCheck",
      healthCheckRating: 0,
    }}
    onSubmit={onSubmit}>
    {({ dirty, setFieldValue, setFieldTouched }) => {
      return (
        <Form className="form ui">
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Date"
            placeholder="Date"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Type"
            placeholder="Type"
            name="type"
            component={TextField}
          />
          <Field
            label="HealthCheckRating"
            placeholder="HealthCheckRating"
            name="healthcheckrating"
            component={TextField}
          />
          <SelectField label="Entry type" name="type" options={entryTypeOptions} />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
        </Form>
      );
    }}
    </Formik>
  );
};