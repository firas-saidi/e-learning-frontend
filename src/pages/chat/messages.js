import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import withAuth from '../../HOC/withAuth'
import { SEND_MESSAGE, GET_ALL_MESSAGES } from '../../queries';
import SingleMessage from './SingleMessage';

class Messages extends Component {
    state = {
        userID: this.props.session.getCurrentUser._id,
        message: ''
    };

    sendMessage = (ev, addMessages) => {
        ev.preventDefault();
        addMessages().then(async () => {
            this.setState({ message: '' });
        })
    }

    render() {
        console.log(this.props)
        const { userID, message } = this.state;
        return (
            <div className="container" style={{ position: 'fixed', bottom: '0px', MarginLeft: "10%" }}>
                <Helmet bodyAttributes={{ class: "logInPage" }}>
                    <title>Messages - Level Up Space</title>
                </Helmet>
                <div className="row" style={{ paddingTop: '40px' }}>
                    <div className="col-md-12">
                        <div className="panel panel-info">
                            <div className="panel-heading mb-3">
                                RECENT CHAT HISTORY
                        </div>
                            <div className="panel-body">
                                <ul className="media-list">
                                    <li className="media">
                                        <div className="media-body">
                                            <Query
                                                query={GET_ALL_MESSAGES}
                                                pollInterval={1000}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <div>fetching</div>
                                                    if (data.getMessages) {
                                                        const allMsg = data.getMessages;
                                                        console.log(allMsg)
                                                        console.log(data.getMessages)
                                                        console.log(Boolean(allMsg))
                                                        return data && (<SingleMessage message={allMsg} />)
                                                    }
                                                    return null
                                                }}
                                            </Query>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <Mutation
                                mutation={SEND_MESSAGE}
                                variables={{ message, _id: userID }}
                                refetchQueries={() => [
                                    { query: GET_ALL_MESSAGES }
                                ]}>
                                {(addMessages) => {
                                    return (
                                        <div className="panel-footer">
                                            <form onSubmit={event => this.sendMessage(event, addMessages)}>
                                                <div className="input-group" style={{ marginBottom: '10px' }}>
                                                    <input
                                                        type="text"
                                                        className="mesg"
                                                        placeholder="Enter Message"
                                                        value={message}
                                                        onChange={event => this.setState({ message: event.target.value })}
                                                    />
                                                    <span className="input-group-btn">
                                                        <button className="btn btn-info">SEND</button>
                                                    </span>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                }}
                            </Mutation>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Messages));