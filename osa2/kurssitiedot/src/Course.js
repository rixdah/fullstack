import React from 'react'

const Header = ({name}) => {
    return (
      <div>
        <h2>
          {name}
        </h2>
      </div>
    )
}

const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
    )
}

const Part = ({name, exercises}) => {
    return (
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    )
}

const Total = ({parts}) => {
    return (
      <div>
        <p><strong>
          Total of {parts.reduce((p, c) => p + c.exercises, 0)} exercises
        </strong></p>
      </div>
    )
}

const Course = ({courses}) => {
    return (
      <div>
      {courses.map(course =>
        <React.Fragment key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </React.Fragment>
      )}
      </div>
    )
}

export default Course