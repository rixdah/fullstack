const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return 'malformatted parameters';
  }
  const BMI = weight/((height/100)**2);
  if (BMI <= 16) {
    return 'Underweight (Severe thinness)';
  } else if (BMI <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (BMI <= 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (BMI <= 24.9) {
    return 'Normal range';
  } else if (BMI <= 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (BMI <= 34.9) {
    return 'Obese (Class I)';
  } else if (BMI <= 39.9) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (height && weight) {
  console.log(calculateBmi(height, weight));
} else {
  console.log(`Weight or height cannot be 0.`);
}

export { calculateBmi };