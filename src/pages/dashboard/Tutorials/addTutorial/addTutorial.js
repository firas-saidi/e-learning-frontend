import React, { Component } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { message, Progress } from 'antd';
import { ADD_TUTORIAL, GET_CURRENT_USER, GET_ALL_TUTORIALS } from '../../../../queries';
import { Mutation, Query } from 'react-apollo'
import Dropzone from 'react-dropzone';
import axios from 'axios';


const initialState = {
    name: '',
    userID: '',
    description: '',
    userName: '',
    price: '',
    duration: '',
    error: '',
    image: '',
    selectedFile: null,
    progress: 0
}



class AddTutorial extends Component {

    state = {
        ...initialState
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

    handleSubmit = async (event, addTutorial) => {
        event.preventDefault();
        const data = new FormData();
        const file = this.state.selectedFile
        data.append('file', file);
        data.append('upload_preset', 'ml_default');
        await axios.post('https://api.cloudinary.com/v1_1/levelupsp/image/upload', data, {
            onUploadProgress: (progressBar) => {
                let progress = Math.round(progressBar.loaded * 100 / progressBar.total)
                this.setState({
                    progress
                })
            }
        }).then(({ data: { secure_url } }) => {
            console.log(secure_url)
            this.setState({
                image: secure_url
            });
            console.log(this.state)
            console.log('- add tutorial here -');
            
            addTutorial({
                variables: {
                    image: this.state.image,
                    name: this.state.name,
                    description: this.state.description,
                    userID: this.state.userID,
                    price: this.state.price,
                    duration: this.state.duration,
                }
            }).then(async (d) => {
                console.log(d)
                message.success('Tutorial added successfuly')
                this.clearState();
            }).catch(error => {
                this.setState({
                    error: "couldn't add tutorial"
                })
            });
        });
        console.log(this.state.progress)
    }

    handleFilesChange = (image) => {
        console.log(image[0])
        const selectedFile = image[0]
        console.log(selectedFile)
        this.setState({
            selectedFile
        })
    }

    validateForm() {
        const { name, description, userName, price, duration } = this.state;
        const isInvalid = !name || !description || !price || !duration || userName;
        return isInvalid;
    }

    head() {
        return (
            <Helmet bodyAttributes={{ class: "addMentor" }}>
                <title>Add Tutorial - Level Up Space</title>
            </Helmet>
        );
    }

    onCompleted = (response) => console.log("complete: ", response)

    onError = error => console.log("Error: ", error)

    render() {
        const { name, description, price, duration, progress } = this.state;
        console.log(progress)
        return (
            <div className="text-center border border-light p-5">

                <p className="h4 mb-4">Add New Tutorial</p>

                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Query query={GET_CURRENT_USER}>
                        {({ data }) => {

                            const UserID = data?.getCurrentUser?._id;
                            this.state.userID = UserID
                            return (
                                <Mutation
                                    mutation={ADD_TUTORIAL}
                                    variables={{ name, description, price, duration, UserID }}
                                    onCompleted={this.onCompleted}
                                    onError={this.onError}
                                    refetchQueries={() => [
                                        { query: GET_ALL_TUTORIALS }
                                    ]}
                                >
                                    {(addTutorial, { data, loading, error }) => {
                                        return (
                                            <form className="text-center" onSubmit={event => this.handleSubmit(event, addTutorial)} noValidate>
                                                <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                                    {this.state.error}
                                                </div>
                                                <div className="form-row mb-4">
                                                    <div className="col">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            placeholder="Tutorial name"
                                                            value={name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row mb-4">
                                                    <div className="col">
                                                        <input
                                                            type="text"
                                                            name="price"
                                                            className="form-control"
                                                            placeholder="Price"
                                                            value={price}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row mb-4">
                                                    <div className="col">
                                                        <input
                                                            type="text"
                                                            name="duration"
                                                            className="form-control"
                                                            placeholder="Duration"
                                                            value={duration}
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
                                                            maxLength="100"
                                                            placeholder="Short description"
                                                            value={description}
                                                            onChange={this.handleChange}
                                                        >
                                                        </textarea>
                                                    </div>
                                                </div>

                                                <div style={{ marginRight: '50px', marginLeft: '50px' }}>
                                                    {/* <input type="file" onChange={this.handleFilesChange} accept="*" required /> */}
                                                    <Dropzone onDrop={this.handleFilesChange} className="dropzone" accept="image/*">
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                                <input {...getInputProps()} name="addTutorial" required />
                                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                                            </div>
                                                        )}
                                                    </Dropzone>

                                                    {this.state.progress !== 0 ? (<Progress percent={progress} />) : null}<br />
                                                    {this.state.image && <img src={this.state.image} alt={this.state.image} width={200} />}
                                                </div>

                                                <button
                                                    className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                                    type="submit">
                                                    Add Tutorial
                                                </button>
                                            </form>
                                        );

                                    }}
                                </Mutation>
                            )
                        }}
                    </Query>
                </div>

            </div>
        )
    }
};

export default AddTutorial;