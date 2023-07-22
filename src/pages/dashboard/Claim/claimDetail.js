import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ClaimDetail extends Component {
    render() {
        const { _id, firstName, lastName, email, subject, description } = this.props.claim
        return (
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{subject}</td>
                <td className="rowElip">{description}</td>
                <td>
                    <Link className="editBtn" to={{
                        pathname: `/claim/${_id}`,
                    }}><i className="" />View</Link>
                </td>
            </tr>
        );
    }
}

export default ClaimDetail;