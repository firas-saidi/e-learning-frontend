import React from 'react';

function AnswerOption(props) {
console.log(props)
  return (
    <li className="answerOption">
      <button
        type="button"
        id={props.answerType}
        value={props.answerContent}
        className="QuizBtn"
        onClick={props.onAnswerSelected}
      >{props.answerContent}</button>
    </li>
  );

}

export default AnswerOption;
