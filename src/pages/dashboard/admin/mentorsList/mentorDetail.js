import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_USER, GET_ALL_MENTORS } from '../../../../queries'

class MentorDetail extends Component {
    render() {
        const { _id, userName, firstName, lastName } = this.props.mentor;
        const handleDelete = deleteUser => {
            const confirmDelete = window.confirm(
                `Are you sure to delete: ${userName}`
            );
            if (confirmDelete) {
                deleteUser(_id.toString()).then(({ data }) => {
                    console.log(_id.toString());
                });
            }
        };

        return (
            <tr>
                <td>{userName}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <Mutation
                    mutation={DELETE_USER}
                    variables={{ _id }}
                    refetchQueries={() => {
                        return [{
                            query: GET_ALL_MENTORS
                        }];
                    }}
                >

                    {(deleteUser, attrs = {}) => (
                        <td>
                            {attrs.loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteUser)} />}
                        </td>
                    )}
                </Mutation>
            </tr>
        );
    }
}

export default MentorDetail;