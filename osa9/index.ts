/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const bmiMessage = calculateBmi(Number(request.query.height), Number(request.query.weight));
  if (bmiMessage === 'malformatted parameters') {
    response.status(400).send({
      error: bmiMessage
    });
  } else {
    response.send({
      weight: Number(request.query.weight),
      height: Number(request.query.height),
      bmi: bmiMessage
    });
  }
});

app.post('/exercises', (request, response) => {
  const body = request.body;
  if (!body.daily_exercises || !body.target) {
    response.send({error: 'parameters missing'});
  } else if (isNaN(Number(body.target))) {
    response.send({error: 'malformatted parameters'});
  } else if (!(Array.isArray(body.daily_exercises))) {
    response.send({error: 'malformatted parameters'});
  } else if (Array.isArray(body.daily_exercises)) {
    let allElementsAreNumbers = true;
    body.daily_exercises.forEach((e: unknown) => {
      if (typeof e !== 'number'){
        allElementsAreNumbers = false;
      }
    });
    if (!allElementsAreNumbers) {
      response.send({error: 'malformatted parameters'});
    } else {
      const exerciseObject = calculateExercises(body.daily_exercises, body.target);
      response.send(exerciseObject);
    }
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});