import React, { Component } from 'react';
import AddMentor from './addMentor';
import MentorsList from './mentorsList';

class Mentors extends Component {
    state = { visible: false }

    showAddMentor = () => {
        this.setState({
            visible: true,
        });
    }

    hideAddMentor = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Mentors <b>List</b></h2></div>
                        <div className="col-sm-4 text-right">
                            {this.state.visible ? (<button type="button" onClick={this.hideAddMentor} className="btn btn-info add-new"><i className="fa fa-minus"></i> Hide</button>): (<button type="button" onClick={this.showAddMentor} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>)}
                        </div>
                    </div>
                </div>
                {this.state.visible ? <AddMentor /> : null}
                <MentorsList />
            </div>
        );
    }
}

export default Mentors;


