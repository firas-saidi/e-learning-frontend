import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';



class SingleMessage extends Component {

    render() {
        console.log(this.props.message)
        return this.props.message.map(message => {
            let dateComponent = moment(message.createdDate).utc().format('YYYY-MM-DD');
            let timeComponent = moment(message.createdDate).utc().format('hh:mm A');
            return (
                <div className="media" key={message._id}>
                    <Link className="pull-left" to="#">
                        <img className="rounded-circle mr-3" alt="messageImage" src={message.User.profileImage} width="50px" height="50px" />
                    </Link>
                    <div className="media-body">
                        {message.message}
                        <br />
                        <small className="text-muted">{message.User.userName} | {dateComponent} at {timeComponent}</small>
                        <hr />
                    </div>
                </div>
            )
        })
    }
}
export default SingleMessage;