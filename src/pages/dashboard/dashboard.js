import React, { Component } from 'react';
import withAuth from '../../HOC/withAuth';
import { withRouter } from 'react-router-dom';
import Admin from './admin/admin';
import NotFound from '../error_404';
import Teacher from './teacher';
import Mentor from './mentor';
import User from './user';

class Dashboard extends Component {
    userRole = (props)=>{
        if(this.props.session.getCurrentUser.isAdmin){
            return <Admin {...props}/>;
        }else if(this.props.session.getCurrentUser.isUser){
            return <User {...props}/>
        }else if(this.props.session.getCurrentUser.isTeacher){
            return <Teacher {...props}/>
        }else if(this.props.session.getCurrentUser.isMentor){
            return <Mentor {...props}/>
        }else{
            return <NotFound />
        }
    }

    render() {
        return (
            <div>
                {this.userRole(this.props)}
            </div>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Dashboard));