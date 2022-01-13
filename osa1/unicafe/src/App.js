import React, { useState } from 'react'

const Header = ({header}) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  if(text === 'Positive'){
    return (
      <tr>
        <td>
          {text}: {value} %
        </td>
      </tr>
    )
  }
  return (
    <tr>
      <td>
        {text}: {value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.value_good === 0 && props.value_neutral === 0 && props.value_bad === 0) {
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
            <StatisticLine text='Good' value={props.value_good} />
            <StatisticLine text='Neutral' value={props.value_neutral} />
            <StatisticLine text='Bad' value={props.value_bad} />
            <StatisticLine text='All' value={props.value_all} />
            <StatisticLine text='Average' value={props.value_average} />
            <StatisticLine text='Positive' value={props.value_positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)

  const header1 = 'Give feedback'
  const header2 = 'Statistics'

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setSum(sum + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setSum(sum - 1)
  }

  return (
    <div>
      <Header header={header1} />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header header={header2} />
      <Statistics
        value_good={good}
        value_neutral={neutral}
        value_bad={bad}
        value_all={all}
        value_average={sum/all}
        value_positive={good/all*100}
      />
    </div>
  )
}

export default App