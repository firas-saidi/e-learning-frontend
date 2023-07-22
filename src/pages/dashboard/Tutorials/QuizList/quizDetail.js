import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { DELETE_QUIZ, GET_QUIZZES } from '../../../../queries';

class QuizDetail extends Component {
    render() {
        const { _id, QuizName, QuizQuestion, answers, correctAnswer } = this.props.quiz;
        const handleDelete = deleteQuiz => {
            const confirmDelete = window.confirm(
                `Do You want to delete this quiz?: ${QuizName}`
            );
            if (confirmDelete) {
                deleteQuiz(_id.toString()).then(({ data }) => { 
                    message.success(`Quiz ${QuizName} was deleted`);
                });
            }
        };
        return (
            <tr>
                <td>{QuizName}</td>
                <td className="rowElip">{QuizQuestion}</td>
                <Mutation
                    mutation={DELETE_QUIZ}
                    variables={{ _id }}
                    refetchQueries={() => {
                        return [{
                            query: GET_QUIZZES,
                            variables: { LectureID: _id }
                        }];
                    }}
                >
                    {(deleteQuiz, attrs) => {
                        return (
                            <td>
                                <Link className="editBtn" to={{
                                    pathname: `/edit-quiz/${_id}/`,
                                    state: {
                                        QuizName,
                                        QuizQuestion,
                                        answers,
                                        correctAnswer
                                    }
                                }}><i className="fas fa-edit" />Edit</Link>
                                <span>|</span>
                                {attrs.loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteQuiz)} > Delete </i>}
                            </td>
                        )
                    }}
                </Mutation>
            </tr>
        );
    }
}

export default QuizDetail;