import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_ALL_USERS } from '../../queries';
import { Icon, Spin } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 44 }} />;

class SingleCourse extends Component {
    
    render() {
        console.log(this.props)
        const { _id, name, User, image, description, duration } = this.props.tutorial;
        return (
            <div className="col-md-4 col-sm-6 col-xs-6" >
                <div className="welcome-box">
                    {image && <img src={image} alt="" width="370" height="440" />}
                    <div className="welcome-title">
                        <h3>{name}</h3>
                    </div>
                    <div className="welcome-content">
                        <Query
                            query={GET_ALL_USERS}
                        >
                            {({ loading, error, data }) => {
                                if (loading) return <Spin indicator={antIcon} className="text-center" />
                                const users = data.getAllUsers
                                    return users.map(user => {
                                        if (user.userName === User.userName) {
                                            return (<span key={user._id}>{user.firstName} {user.lastName}</span>)
                                        }
                                        return null
                                    })
                            }}
                        </Query>
                        <p className="welcome-box-paragraph">{description}</p>
                        <ul className="course-detail">
                            <li><i className="fa fa-calendar" aria-hidden="true"></i>Course duration : <span>{duration} Hours</span></li>
                            <li><i className="fa fa-graduation-cap" aria-hidden="true"></i>Degree Level : <span>Beginner</span></li>
                        </ul>
                        <Link to={{
                            pathname: `/course/${_id}`,
                            state: {
                                name,
                                User,
                                image
                            }
                        }}>Apply now</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleCourse;