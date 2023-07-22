import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { message } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import { Mutation, Query } from 'react-apollo';
import { ADD_CAMP, GET_CURRENT_USER, GET_CAMPS } from '../../../queries';

const initialState = {
    DateAndTime: moment()._d,
    url: "",
    CampName: ""
}

class AddCamp extends Component {

    state = {
        ...initialState
    };

    clearState() {
        this.setState({ ...initialState })
    }

    handleChange = (event) => {
        console.log(event);
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleDateChange = (date) => {
        console.log(date);
        const DateAndTime = new Date(date);
        this.setState({
            DateAndTime
        })
    }

    handleSubmit = (event, addCamp) => {
        event.preventDefault();
        addCamp().then(() => {
            message.success('Camp added successfuly')
            this.clearState();
        });
        const main = this.state.DateAndTime
        console.log(typeof (main));
    }

    render() {
        const { url, CampName, DateAndTime } = this.state;
        return (
            <div className="text-center border border-light p-5">
                <p className="h4 mb-4">Add New Camp</p>
                <div className="card-body px-lg-5 pt-0">
                    <Query
                        query={GET_CURRENT_USER}
                    >
                        {({ data }) => {
                            const _id = data.getCurrentUser._id;
                            console.log(_id);
                            return (
                                <Mutation
                                    mutation={ADD_CAMP}
                                    variables={{ url, CampName, DateAndTime, _id }}
                                    refetchQueries={() => {
                                        return [{
                                            query: GET_CAMPS
                                        }];
                                    }}
                                >
                                    {(addCamp) => {
                                        return (
                                            <form className="text-center" onSubmit={event => this.handleSubmit(event, addCamp)}>
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
                                                    Add Camp</button>
                                            </form>
                                        )
                                    }}
                                </Mutation>
                            )
                        }}
                    </Query>
                </div>

            </div>
        );
    }
}

export default AddCamp;