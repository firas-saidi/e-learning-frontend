import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import moment from "moment";
import { message } from "antd";
import { Link } from 'react-router-dom';
import { GET_CAMPS, CANCEL_CAMP } from '../../../queries';

class BootCampList extends Component {
    state = {
        Canceled: false
    }

    handleUnCancel = (event, cancelCamp) => {
        event.preventDefault();
        this.setState({
            Canceled: true
        })
        cancelCamp({ variables: { Canceled: false } }).then(async () => {
            message.success('Live Session Has Been Uncanceled')
        })
    }

    handleCancel = (event, cancelCamp) => {
        event.preventDefault();
        
        let canceled = window.confirm(
            `Are you sure to cancel this camp`
        )
        
        if(canceled === true) {
            this.setState({
                Canceled: true
            })
            cancelCamp({ variables: { Canceled: true } }).then(async () => {
                message.success('Live Session Has Been Canceled')
            })
        }
    }

    showTableHead = () => {
        console.log(this.props)
        if (this.props.session.getCurrentUser.isAdmin || this.props.session.getCurrentUser.isMentor) {
            return (
                <tr>
                    <th scope="col">Session Name</th>
                    <th scope="col">Session URL</th>
                    <th scope="col">Mentor Username</th>
                    <th scope="col">Date and Time</th>
                    <th scope="col">Action</th>
                </tr>
            )
        } else if (this.props.session.getCurrentUser.isUser) {
            return (
                <tr>
                    <th scope="col">Session Name</th>
                    <th scope="col">Session URL</th>
                    <th scope="col">Mentor Username</th>
                    <th scope="col">Date and Time</th>
                    <th scope="col">Cancelation</th>
                </tr>
            )
        }
    }

    showTableBody = () => {
        if (this.props.session.getCurrentUser.isAdmin) {
            return (
                <Query
                    query={GET_CAMPS}
                >
                    {({ loading, error, data }) => {
                        const allcamps = data.getCamps
                        if (allcamps) {
                            console.log(allcamps)
                            return allcamps.map((camp) => {
                                let dateComponent = moment(camp.DateAndTime).utc().format('YYYY-MM-DD');
                                let timeComponent = moment(camp.DateAndTime).utc().format('HH:mm A');
                                console.log(this.props.session.getCurrentUser)
                                console.log(camp.Mentor.isMentor)
                                return (
                                    <tr key={camp._id}>
                                        <td className="rowElip">{camp.CampName}</td>
                                        <td className="rowElip">{camp.url}</td>
                                        <td className="rowElip">{camp.Mentor.userName}</td>
                                        <td>{dateComponent} at {timeComponent}</td>
                                        <td>
                                            <Link className="editBtn mr-3" to={{
                                                pathname: `/edit-LiveSession/${camp._id}`,
                                                state: {
                                                    CampName: camp.CampName,
                                                    url: camp.url,
                                                    DateAndTime : camp.DateAndTime
                                                }
                                            }}><i className="fas fa-edit" />Edit</Link>
                                            {!camp.Canceled ? (<Mutation
                                                mutation={CANCEL_CAMP}
                                                variables={{ _id: camp._id }}
                                                refetchQueries={() => {
                                                    return [{
                                                        query: GET_CAMPS
                                                    }];
                                                }}
                                            >
                                                {(cancelCamp) => {
                                                    return <button className="Cancelbutton" onClick={(event) => { this.handleCancel(event, cancelCamp) }}>Cancel</button>
                                                }}
                                            </Mutation>) : (<Mutation
                                                mutation={CANCEL_CAMP}
                                                variables={{ _id: camp._id }}
                                                refetchQueries={() => {
                                                    return [{
                                                        query: GET_CAMPS
                                                    }];
                                                }}
                                            >
                                                {(cancelCamp) => {
                                                    return <button className="UnCancelbutton" onClick={(event) => { this.handleUnCancel(event, cancelCamp) }}>Uncancel</button>

                                                }}
                                            </Mutation>)}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        return null
                    }}
                </Query>
            )
        } else if (this.props.session.getCurrentUser.isMentor) {
            return (
                <Query
                    query={GET_CAMPS}
                >
                    {({ loading, error, data }) => {
                        const allcamps = data.getCamps
                        if (allcamps) {
                            console.log(allcamps)
                            return allcamps.map((camp) => {
                                if (this.props.session.getCurrentUser.userName === camp.Mentor.userName) {
                                    let dateComponent = moment(camp.DateAndTime).utc().format('YYYY-MM-DD');
                                    let timeComponent = moment(camp.DateAndTime).utc().format('HH:mm A');
                                    console.log(this.props.session.getCurrentUser)
                                    console.log(camp.Mentor.isMentor)
                                    return (
                                        <tr key={camp._id}>
                                            <td className="rowElip">{camp.CampName}</td>
                                            <td className="rowElip">{camp.url}</td>
                                            <td className="rowElip">{camp.Mentor.userName}</td>
                                            <td>{dateComponent} at {timeComponent}</td>
                                            <td>
                                                <Link className="editBtn mr-3" to={{
                                                    pathname: `/edit-LiveSession/${camp._id}`,
                                                    state: {
                                                        CampName: camp.CampName,
                                                        url: camp.url,
                                                        DateAndTime : camp.DateAndTime
                                                    }
                                                }}><i className="fas fa-edit" />Edit</Link>
                                                {!camp.Canceled ? (<Mutation
                                                    mutation={CANCEL_CAMP}
                                                    variables={{ _id: camp._id }}
                                                >
                                                    {(cancelCamp) => {
                                                        return <button className="Cancelbutton" onClick={(event) => { this.handleCancel(event, cancelCamp) }}>Cancel</button>
                                                    }}
                                                </Mutation>) : (<Mutation
                                                    mutation={CANCEL_CAMP}
                                                    variables={{ _id: camp._id }}
                                                >
                                                    {(cancelCamp) => {
                                                        return <button className="UnCancelbutton" onClick={(event) => { this.handleUnCancel(event, cancelCamp) }}>Uncancel</button>

                                                    }}
                                                </Mutation>)}
                                            </td>
                                        </tr>
                                    )
                                }
                                return null
                            })
                        }
                        return null
                    }}
                </Query>
            )
        } else if (this.props.session.getCurrentUser.isUser) {
            return (
                <Query
                    query={GET_CAMPS}
                >
                    {({ loading, error, data }) => {
                        const allcamps = data.getCamps
                        if (allcamps) {
                            console.log(allcamps)
                            return allcamps.map((camp) => {
                                let dateComponent = moment(camp.DateAndTime).utc().format('YYYY-MM-DD');
                                let timeComponent = moment(camp.DateAndTime).utc().format('HH:mm A');
                                console.log(this.props.session.getCurrentUser)
                                console.log(camp.Mentor.isMentor)
                                return (
                                    <tr key={camp._id}>
                                        <td className="rowElip">{camp.CampName}</td>
                                        <td className="rowElip">{camp.url}</td>
                                        <td className="rowElip">{camp.Mentor.userName}</td>
                                        <td>{dateComponent} at {timeComponent}</td>
                                        {camp.Canceled ? <td>Canceled</td> : <td></td>}
                                    </tr>
                                )
                            })
                        }
                        return null
                    }}
                </Query>
            )
        }
    }

    render() {
        return (
            <div>
                <div>
                    <table className="table">
                        <thead>
                            {this.showTableHead()}
                        </thead>
                        <tbody>
                            {this.showTableBody()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default BootCampList;