import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../../../HOC/withAuth'
import { Query } from 'react-apollo';
import { GET_CLAIM } from '../../../queries';

class SingleClaim extends Component {
    state = {
        ID: this.props.match.params.id
    }
    render() {
        const { ID } = this.state;
        return (
            <div>
                <Query
                    query={GET_CLAIM}
                    variables={{ ClaimID: ID }}
                >
                    {({ data }) => {
                        if (data.getClaim) {
                            const claim = data.getClaim;
                            return (
                                <div className="container mt-5 pt-5">
                                    <h1 className="text-center">Claim</h1>
                                    <p>This claim was sent by: {claim.firstName} {claim.lastName}</p>
                                    <p>Email: {claim.email}</p>
                                    <p>Subject: {claim.subject}</p>
                                    <p className="text-justify">{claim.description}</p>
                                </div>
                            )
                        }
                        return null
                    }}

                </Query>
            </div>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(SingleClaim));