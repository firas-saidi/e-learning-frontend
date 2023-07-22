import React, { Component } from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { ADD_LECTURE, GET_LECTURES } from '../../../../queries';
import { message, Progress } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const initialState = {
    name: '',
    description: '',
    error: '',
    video: '',
    selectedVideo: null,
    progress: 0
}

class AddLecture extends Component {
    state = {
        ...initialState,
        ID: this.props.lecture.section.id
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

    handleSubmit = async (event, addLecture) => {
        event.preventDefault();
        const data = new FormData();
        const file = this.state.selectedVideo
        data.append('file', file);
        data.append('upload_preset', 'ml_default');
        await axios.post('https://api.cloudinary.com/v1_1/levelupsp/video/upload', data, {
            onUploadProgress: (progressBar) => {
                let progress = Math.round(progressBar.loaded * 100 / progressBar.total)
                console.log(progress)
                this.setState({
                    progress
                })
            }
        }).then(({ data: { secure_url } }) => {
            console.log(data)
            console.log(secure_url)
            this.setState({
                video: secure_url
            });
            addLecture({ variables: { video: this.state.video } }).then(async ({ data }) => {
                message.success('Lecture added successfuly')
                this.clearState();
            }).catch(error => {
                this.setState({
                    error: "couldn't add lecture"
                })
            });
        });
        console.log(this.state.progress)
        console.log(file)
    }

    handleFilesChange = (video) => {
        const selectedVideo = video[0];
        this.setState({
            selectedVideo
        });
    }

    render() {
        const { name, description, ID, progress } = this.state;
        console.log(this.props.lecture.section.id)
        return (
            <div className="text-center border border-light p-5">
                <p className="h4 mb-4">Add New Lecture</p>
                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Mutation
                        mutation={ADD_LECTURE}
                        variables={{ name, description, ID }}
                        refetchQueries={() => {
                            return [{
                                query: GET_LECTURES,
                                variables: { SectionID: ID }
                            }];
                        }}
                    >
                        {(addLecture) => {
                            return (
                                <form className="text-center" onSubmit={event => this.handleSubmit(event, addLecture)} noValidate>
                                    <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                        {this.state.error}
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Lecture name"
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

                                    <div style={{ marginRight: '50px', marginLeft: '50px' }}>
                                        {/* <input type="file" onChange={this.handleFilesChange} accept="*" required /> */}
                                        <Dropzone onDrop={this.handleFilesChange} className="dropzone" accept="video/*">
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps()} required />
                                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        {this.state.progress !== 0 ? (<Progress percent={progress} />) : null}<br />
                                    </div>

                                    <button
                                        className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                        type="submit"
                                    >
                                        Add Lecture
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

export default AddLecture;