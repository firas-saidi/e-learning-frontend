import React from 'react';
import { Link } from 'react-router-dom'

function QuestionCount(props) {
  console.log(props)
  return (
    <div className="questionCount">
      <div className="ProgressAndScore">
        Question <span>{props.counter + 1}</span> of <span>{props.total}</span>
        {props.counter === props.total - 1 && props.selectedAnswer ? (<Link className="result-link" to="" onClick={props.viewreults}>View Results</Link>) : (<div></div>)}
      </div>
    </div>
  );

}

export default QuestionCount;
