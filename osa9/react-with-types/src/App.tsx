const Header = ({ header }: { header: string }) => (
  <div>
    <h1>{header}</h1>
  </div>
)

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <div>
    {courseParts.map(course => <Part key={course.name} coursePart={course} />)}
  </div>
)

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <div>
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </div>
)

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.type) {
      case "normal":
        return (
          <div>
            <br/><strong>{coursePart.name} {coursePart.exerciseCount}</strong><br/>
            <i>{coursePart.description}</i>
          </div>
        )
      case "groupProject":
        return (
          <div>
            <br/><strong>{coursePart.name} {coursePart.exerciseCount}</strong><br/>
            project exercises {coursePart.groupProjectCount}
          </div>
        )
      case "submission":
        return (
          <div>
            <br/><strong>{coursePart.name} {coursePart.exerciseCount}</strong><br/>
            <i>{coursePart.description}</i><br/>
            submit to {coursePart.exerciseSubmissionLink}
          </div>
        )
      case "special":
        return (
          <div>
            <br/><strong>{coursePart.name} {coursePart.exerciseCount}</strong><br/>
            <i>{coursePart.description}</i><br/>
            required skills: {coursePart.requirements[0]}, {coursePart.requirements[1]}
          </div>
        )
      default:
        return assertNever(coursePart);
    }
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWithDescription {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header header={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;