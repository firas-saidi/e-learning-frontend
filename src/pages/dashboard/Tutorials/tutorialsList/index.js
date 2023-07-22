import React, { Component } from 'react';

import { Query } from 'react-apollo';
import { GET_ALL_TUTORIALS, GET_CURRENT_USER } from '../../../../queries';
import TutorialDetail from './tutorialDetail';

class TutorialsList extends Component {
    render() {
        return (
            <div>
                <Query
                    query={GET_CURRENT_USER}
                >
                    {(data, loading, error) => {
                        return (
                            <Query
                                query={GET_ALL_TUTORIALS}
                            >
                                {({ data, loading, error }) => {
                                    if (loading) return <div>fetching</div>
                                    const AllTut = data.getAllTutorials;
                                    const AllTutorials = () => {
                                        if (AllTut !== null) {
                                            return AllTut.map((tutorial) => {
                                                const verif = ()=>{
                                                    return <TutorialDetail key={tutorial._id} tutorial={tutorial} />
                                                }
                                                return verif()
                                            })
                                        }
                                    }
                                    return (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Tutorial Name</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {AllTutorials()}
                                            </tbody>
                                        </table>
                                    )
                                }}
                            </Query>
                        )

                    }}
                </Query>
            </div>
        );
    }
}

export default TutorialsList;