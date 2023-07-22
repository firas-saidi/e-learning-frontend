import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { message } from 'antd';
import withAuth from '../../../../HOC/withAuth';

import {
    Layout, Menu, Icon,
} from 'antd';
import { EDIT_QUIZ, GET_QUIZZES } from '../../../../queries';
const { Content, Sider } = Layout;


class EditQuiz extends Component {
    state = {
        QuizName: this.props.location.state.QuizName,
        QuizQuestion: this.props.location.state.QuizQuestion,
        answers: [],
        option1: this.props.location.state.answers[0],
        option2: this.props.location.state.answers[1],
        option3: this.props.location.state.answers[2],
        option4: this.props.location.state.answers[3],
        correctAnswer: this.props.location.state.correctAnswer,
        id: this.props.match.params.id,
        collapsed: false,
        current: 'EditQuiz',
        error: ''
    };
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    handleChange = (event) => {
        console.log(this.state)
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
            answers: [this.state.option1, this.state.option2, this.state.option3, this.state.option4]
        });
    }

    handleSubmit(event, editSection) {
        event.preventDefault();
        editSection(this.state.id).then(async ({ data }) => {
            message.success("update was sucess");
            console.log(data)
        }).catch(error => {
            this.setState({
                error: "couldn't update tutorial"
            })
        });

    }

    layoutContent = (props) => {
        if (this.state.current === "EditQuiz") {
            const { QuizQuestion, QuizName, option1, option2, option3, option4, answers, correctAnswer } = this.state;
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <h2 className="text-center">Edit {QuizName}</h2>
                    <Mutation
                        mutation={EDIT_QUIZ}
                        variables={{ _id: this.state.id, QuizQuestion, QuizName, answers, correctAnswer }}
                        refetchQueries={() => {
                            return [{
                                query: GET_QUIZZES
                            }];
                        }}
                    >
                        {(editQuiz) => {
                            return (
                                <form className="text-center" onSubmit={event => this.handleSubmit(event, editQuiz)}>
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
                                        Save Changes</button>
                                </form>
                            )
                        }}
                    </Mutation>
                </Content>
            )
        } else if (this.state.current === "AddLectures") {
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>

                </Content>

            )
        }
    }

    render() {
        console.log(this.props)
        return (

            <Layout>
                <Content>
                    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                selectedKeys={[this.state.current]}
                                onClick={this.handleClick}
                                style={{ height: '100%' }}
                            >
                                <Menu.Item key="EditQuiz">
                                    <Icon type="plus" />
                                    <span>Edit Quiz</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        {this.layoutContent()}
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(EditQuiz));