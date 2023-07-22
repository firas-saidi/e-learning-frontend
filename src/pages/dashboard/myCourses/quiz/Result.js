import React from 'react';

class Result extends React.Component {
  state = {
    count: 0,
    percentage: 0,
    TotalAnswers: 0
  }
  renderQuestins() {
    return this.props.quizResult.map((_data, index) => {
      console.log(_data.correctAnswer)
      return (
        <div key={index} className="list-grp">{_data.question} <br />
          correct answer is: {this.props.quizResult[index].correctAnswer}, you have selcted {this.props.answers[index]}
          {((this.props.answers[index]) === _data.correctAnswer) ? (<span className="status"> Correct Answer!</span>) : (<span className="Wrongstatus"> Wrong Answer!</span>)}
        </div>)
    })
  }
  // ObjectSize = function (obj) {
  //   var size = 0, key;
  //   for (key in obj) {
  //     if (obj.hasOwnProperty(key)) size++;
  //   }
  //   return size;
  // };
  // correctAnswersCounter = () => {
  //   this.props.quizResult.map((_data, index) => {
  //     console.log(this.ObjectSize(this.props.answers))
  //     console.log(Boolean(this.props.answers[index] === _data.correctAnswer))
  //     if (this.props.answers[index] === _data.correctAnswer) {
  //       return this.setState({
  //         count: this.state.count + 1,
  //         TotalAnswers: this.ObjectSize(this.props.answers)
  //       })
  //     }
  //     return this.state.count
  //   })
  // }
  // renderPercentage = () => {
  //   this.correctAnswersCounter();
  //   const percentage = (this.state.count / this.state.TotalAnswers) * 100
  //   console.log(percentage)
  //   return this.setState({
  //     percentage
  //   })
  // }
  render() {
    console.log(this.props)
    console.log(this.state.count)
    return (
      <div className="quiz-story">
        <div>
          <strong>Lets see your results</strong>!
          <div>{this.renderQuestins()}</div>
        </div>
      </div>
    )
  }
}

export default Result;
