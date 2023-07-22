import React, { Component } from 'react';
import { GET_ALL_TEACHERS } from '../../../../queries';
import { Query } from 'react-apollo';
import TeacherDetail from './teacherDetail';

class TeachersList extends Component {
    render() {
        return (
            <div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Query
                                query={GET_ALL_TEACHERS}
                            >
                                {({ loading, error, data }) => {
                                    const allTeach = data.getAllTeachers
                                    if (allTeach) {
                                        return allTeach.map((teacher) => <TeacherDetail key={teacher._id} teacher={teacher} />)
                                    }
                                    return null
                                }}
                            </Query>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TeachersList;



