import React, { Component } from 'react';
import Quiz from './Quiz';
import Result from './Result';

class QuizIndex extends Component {

  state = {
    counter: 0,
    questionId: 1,
    question: '',
    answerOptions: [],
    allQuestions: [],
    answer: '',
    selectedAnswers: {},
    result: ''
  }
  
  handleAnswerSelected = (e) => {
    let obj = this.state.selectedAnswers;
    let index = e.target.value;
    console.log(index)
    console.log("for selected question number " + (this.state.counter + 1) + " answer is " + index + " selected");
    let Qindex = (this.state.counter)
    // create map and store all selected answers with quiz Questions
    obj[Qindex] = index;
    this.setState({ selectedAnswers: obj })

  }

  componentWillMount() {
    this.setState({
      question: this.props.quiz[0].QuizQuestion,
      answerOptions: this.props.quiz[0].answers,
      allQuestions: this.props.quiz
    });
  }


  setNextQuestion = () => {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.props.quiz[counter].QuizQuestion,
      answerOptions: this.props.quiz[counter].answers,
      answer: ''
    });
  }
  setPreviousQuestion = () => {
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.props.quiz[counter].QuizQuestion,
      answerOptions: this.props.quiz[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      <Quiz viewreults={this.viewreults}
        setNextQuestion={this.setNextQuestion}
        counter={this.state.counter}
        setPreviousQuestion={this.setPreviousQuestion}
        answer={this.state.answer}
        selectedAnswer={this.state.selectedAnswers[this.state.counter]}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.props.quiz.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.allQuestions} answers={this.state.selectedAnswers} />
    );
  }
  viewreults = (e) => {
    e.preventDefault();
    this.setState({ result: true })
  }
  // decide to render result or quiz
  render() {
    console.log(this.props.quiz)
    console.log(this.props.quiz[0].answers)
    return (
      <div className="App">
        <div className="App-header">
          <h2>Quiz Assignment : </h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}


      </div>

    );
  }

}

export default QuizIndex;
