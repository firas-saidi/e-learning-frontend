import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_Tutorial, GET_ALL_TUTORIALS } from '../../../../queries';
import { Link } from 'react-router-dom';
import { message } from 'antd';

class TutorialDetail extends Component {

    render() {
        const { _id, name, description, User } = this.props.tutorial;
        const handleDelete = deleteTutorial => {
            const confirmDelete = window.confirm(
                `Are you sure to delete: ${name}`
            );
            if (confirmDelete) {
                deleteTutorial(_id.toString()).then(({ data }) => {
                    console.log(_id.toString());
                    message.success(`Tutorial ${name} was deleted`)
                });
            }
        };
        return (
            <tr>
                <td className="rowElip">{name}</td>
                <td className="rowElip">{description}</td>
                <td>{User.userName}</td>

                <Mutation
                    mutation={DELETE_Tutorial}
                    variables={{ _id }}
                    refetchQueries={() => [
                        { query: GET_ALL_TUTORIALS }
                    ]}
                >

                    {(deleteTutorial, attrs) => (
                        <td>
                            <Link className="editBtn" to={{
                                pathname: `/edit-tutorial/${_id}`,
                                state: {
                                    tutorialName: { name },
                                    tutorialDescription: { description }
                                }
                            }}><i className="fas fa-edit" />Edit</Link>
                            <span>|</span>
                            {attrs.loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteTutorial)} > Delete </i>}
                        </td>
                    )}

                </Mutation>
            </tr>
        );
    }
}

export default TutorialDetail;