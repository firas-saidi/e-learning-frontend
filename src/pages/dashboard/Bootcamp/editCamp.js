import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import DatePicker from 'react-datepicker';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import withAuth from '../../../HOC/withAuth'
import { EDIT_CAMP } from '../../../queries';
import 'react-datepicker/dist/react-datepicker.css';

class EditCamp extends Component {
    state = {
        DateAndTime: new Date(this.props.location.state.DateAndTime),
        url: this.props.location.state.url,
        CampName: this.props.location.state.CampName,
        id: this.props.match.params.id
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event, editCamp) {
        event.preventDefault();
        editCamp(this.state.id).then(async () => {
            message.success("update was sucess");
        }).catch(error => {
            this.setState({
                error: "couldn't update camp"
            })
        });
    }

    render() {
        const { url, CampName, DateAndTime, id } = this.state;
        console.log(this.props)
        return (
            <div className="container">
                <h2 className="text-center mb-5 mt-5">Edit Live Session</h2>
                <Mutation
                    mutation={EDIT_CAMP}
                    variables={{ url, CampName, DateAndTime, id }}
                >
                    {(editCamp) => {
                        return (
                            <form className="text-center" onSubmit={event => this.handleSubmit(event, editCamp)}>
                                <div className="form-row mb-4">
                                    <div className="col">
                                        <input
                                            type="text"
                                            name="CampName"
                                            className="form-control"
                                            placeholder="Camp name"
                                            value={CampName}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            name="url"
                                            className="form-control"
                                            placeholder="Camp URL"
                                            value={url}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="mr-1">Select Date: </label>
                                    <DatePicker
                                        selected={DateAndTime}
                                        onChange={this.handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="d MMMM, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </div>
                                <button
                                    className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                    type="submit">
                                    Save changes</button>
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(EditCamp));