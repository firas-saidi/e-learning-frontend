import React, { Component } from 'react';
import {Mutation } from 'react-apollo';
import {DELETE_USER, GET_ALL_TEACHERS} from '../../../../queries'

class TeacherDetail extends Component {

    render() {
        const { _id, userName, firstName, lastName } = this.props.teacher;
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
                    variables={{_id}}
                    refetchQueries={() => {
                        return [{
                            query: GET_ALL_TEACHERS
                        }];
                    }}
                >
                
                    {(deleteUser, {loading} = {}) => (
                        <td>
                            {loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteUser)} />}
                        </td>
                    )}
                </Mutation>
            </tr>
        );
    }
}

export default TeacherDetail;