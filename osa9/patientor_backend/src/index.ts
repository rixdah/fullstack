import express from 'express';
const diagnosisRouter = require('./routes/diagnoses.ts');
const patientRouter = require('./routes/patients.ts');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});