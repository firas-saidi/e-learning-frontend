import React, { Component } from 'react';
import AddLecture from './addLecture';
import LecturesList from '../lectureList/lecturesList';

class Lectures extends Component {
    state = { visible: false }

    showAddLecture = () => {
        this.setState({
            visible: true
        });
    }
    hideAddLecture = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Lectures <b>List</b></h2></div>
                        <div className="col-sm-4 text-right">
                        {this.state.visible ? (<button type="button" onClick={this.hideAddLecture} className="btn btn-info add-new"><i className="fa fa-minus"></i> Hide</button>): (<button type="button" onClick={this.showAddLecture} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>)}
                        </div>
                    </div>
                    {this.state.visible ? <AddLecture lecture={this.props} /> : null}
                </div>
                <LecturesList lecture={this.props} />
            </div>
        );
    }
}

export default Lectures;