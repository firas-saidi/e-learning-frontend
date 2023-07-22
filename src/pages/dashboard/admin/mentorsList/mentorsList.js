import React, { Component } from 'react';
import { GET_ALL_MENTORS } from '../../../../queries';
import { Query } from 'react-apollo';
import MentorDetail from './mentorDetail';

class MentorsList extends Component {
    render() {
        return (
            <div>
                <Query
                    query={GET_ALL_MENTORS}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const allMentor = data.getAllMentors
                        const MentorTable = () => {
                            if (allMentor !== null) {
                                return allMentor.map((mentor) => <MentorDetail key={mentor._id} mentor={mentor} />)
                            } else {
                                return 'No data found'
                            }
                        }
                        return (
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
                                        {console.log(data.getAllMentors)}
                                        {MentorTable()}

                                    </tbody>
                                </table>
                            </div>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default MentorsList;



