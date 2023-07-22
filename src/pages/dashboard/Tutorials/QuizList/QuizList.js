import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_QUIZZES } from '../../../../queries';
import QuizDetail from './quizDetail';

class QuizzesList extends Component {
    state = {
        ID: this.props.section.section.id
    }
    render() {
        console.log(this.props)
        const { ID } = this.state;
        return (
            <div>
                <Query
                    query={GET_QUIZZES}
                    variables={{ LectureID: ID }}
                >
                    {({ data, loading, error }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const Quizzes = data.getQuizzes;
                        console.log(Quizzes)
                        const Quiz = () => {
                            if (Quizzes) {
                                return Quizzes.map(
                                    (quiz) => {
                                        return <QuizDetail key={quiz._id} quiz={quiz} />
                                    }
                                )
                            }
                        }
                        return (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Quiz Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Quiz()}
                                </tbody>
                            </table>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default QuizzesList;