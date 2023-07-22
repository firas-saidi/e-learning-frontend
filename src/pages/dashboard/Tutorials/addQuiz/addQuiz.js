import React, { Component } from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { ADD_QUIZ, GET_QUIZZES } from '../../../../queries';

const initialState = {
    QuizName: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answers: [],
    correctAnswer: '',
    QuizQuestion: '',
    error: ''
}

class AddQuiz extends Component {
    state = {
        ...initialState,
        LectureID: this.props.lecture.section.id
    }


    clearState() {
        this.setState({ ...initialState })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
            answers: [this.state.option1, this.state.option2, this.state.option3, this.state.option4]
        });
    }

    handleSubmit(event, addQuiz) {
        event.preventDefault();
        addQuiz().then(async ({ data }) => {
            message.success('Quiz added successfuly')
            this.clearState();

        }).catch(error => {
            this.setState({
                error: "couldn't add quiz"
            })
        });

    }

    validateForm() {
        const { name, description, } = this.state;
        const isInvalid = !name || !description;
        return isInvalid;
    }

    render() {
        const { LectureID, QuizQuestion, QuizName, option1, option2, option3, option4, answers, correctAnswer } = this.state;
        console.log(this.props.lecture.section.id)
        return (
            <div className="text-center border border-light p-5">
                <p className="h4 mb-4">Add New Quiz</p>

                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Mutation
                        mutation={ADD_QUIZ}
                        variables={{ LectureID, QuizQuestion, QuizName, answers, correctAnswer }}
                        refetchQueries={() => {
                            return [{
                                query: GET_QUIZZES,
                                variables: { LectureID }
                            }];
                        }}
                    >
                        {(addQuiz) => {
                            return (
                                <form className="text-center" onSubmit={event => this.handleSubmit(event, addQuiz)}>
                                    <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                        {this.state.error}
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="QuizName"
                                                className="form-control"
                                                placeholder="Quiz name"
                                                value={QuizName}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="QuizQuestion"
                                                className="form-control"
                                                placeholder="Question"
                                                value={QuizQuestion}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="option1"
                                                className="form-control"
                                                placeholder="option1"
                                                value={option1}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="option2"
                                                className="form-control"
                                                placeholder="option2"
                                                value={option2}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="option3"
                                                className="form-control"
                                                placeholder="option3"
                                                value={option3}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="option4"
                                                className="form-control"
                                                placeholder="option4"
                                                value={option4}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="correctAnswer"
                                                className="form-control"
                                                placeholder="correctAnswer"
                                                value={correctAnswer}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                        type="submit">
                                        Add Quiz
                                    </button>
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </div>
        );
    }
}

export default AddQuiz;
