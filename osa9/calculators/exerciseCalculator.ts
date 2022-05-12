interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exercises: Array<number>, target: number): Result => {
  if (isNaN(Number(target))) {
    throw new Error(`Given target is not a number!`);
  }
  if (exercises.length === 0) {
    return {
      periodLength: 0,
      trainingDays: 0,
      success: false,
      rating: 0,
      ratingDescription: 'No exercise hours given',
      target: 0,
      average: 0,
    };
  }
  const average = exercises.reduce((a, b) => a + b, 0)/exercises.length;
  let rating;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great, you met the target hours!';
  } else if (average <= target/2) {
    rating = 1;
    ratingDescription = 'Get your shit together man :/';
  } else {
    rating = 2;
    ratingDescription = 'Unfortunately you did not reach the target :(';
  }

  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter(e => e !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

const exercises: number[] = [];
process.argv.slice(3).forEach((arg) => {
  if (!isNaN(Number(arg))) {
    exercises.push(Number(arg));
  }
});

try {
  console.log(calculateExercises(exercises, Number(process.argv[2])));
} catch (error: unknown) {
  console.log(`Error: ${error}`);
}

export { calculateExercises };