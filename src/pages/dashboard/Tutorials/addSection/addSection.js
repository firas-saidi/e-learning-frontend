import React, { Component } from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { ADD_SECTION, GET_SECTIONS } from '../../../../queries';
import { message } from 'antd';

const initialState = {
    name: '',
    description: '',
    error: ''
}

class AddSection extends Component {

    state = {
        ...initialState,
        ID: this.props.section.id
    }

    clearState() {
        this.setState({ ...initialState })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event, addSection) {
        event.preventDefault();
        addSection().then(async ({ data }) => {
            message.success('Section added successfuly')
            this.clearState();

        }).catch(error => {
            this.setState({
                error: "couldn't add Section"
            })
        });

    }

    validateForm() {
        const { name, description, } = this.state;
        const isInvalid = !name || !description;
        return isInvalid;
    }

    render() {
        const { name, description, ID } = this.state;
        console.log(this.props.section.id)
        return (
            <div className="text-center border border-light p-5">
                <p className="h4 mb-4">Add New Section</p>

                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Mutation
                        mutation={ADD_SECTION}
                        variables={{ name, description, ID }}
                        refetchQueries={() => {
                              return [{
                                  query: GET_SECTIONS,
                                  variables: { TutorialID: ID }
                              }];
                          }}
                    >
                        {(addSection) => {
                            return (
                                <form className="text-center" onSubmit={event => this.handleSubmit(event, addSection)}>
                                    <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                        {this.state.error}
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Section name"
                                                value={name}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                rows="4"
                                                cols="50"
                                                placeholder="Short description"
                                                value={description}
                                                onChange={this.handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <input type="hidden" name="TutorialID" value={this.state.ID} readOnly />
                                    <button
                                        className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                        type="submit">
                                        Add Section
                                    </button>
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </div>
        );
    }
}

export default AddSection;