import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_CLAIMS } from '../../../queries';
import ClaimDetail from './claimDetail';

class ClaimList extends Component {
    render() {
        return (
            <div>
                <Query
                    query={GET_ALL_CLAIMS}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const allClaims = data.getClaims
                        const ClaimTable = () => {
                            if (allClaims !== null) {
                                return allClaims.map((claim) => <ClaimDetail key={claim._id} claim={claim} />)
                            } else {
                                return 'No data found'
                            }
                        }
                        return (
                            
                            <div>
                                <h1>Claims List</h1>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">E-mail</th>
                                            <th scope="col">Subject</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Read</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(data)}
                                        {ClaimTable()}
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

export default ClaimList;