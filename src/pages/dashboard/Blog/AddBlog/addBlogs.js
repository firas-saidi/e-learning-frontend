import React, { Component } from 'react';
import { ADD_BLOGS, GET_CURRENT_USER, GET_BLOGS } from '../../../../queries';
import { message, Progress } from 'antd';
import classNames from 'classnames';
import CKEditor from "react-ckeditor-component";
import { Mutation, Query } from 'react-apollo';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const initialState = {
  title: '',
  UserID: '',
  category: '',
  subject: '',
  content: '',
  error: '',
  image: '',
  selectedFile: null,
  progress: 0
}


class Editor extends Component {


  state = {
    ...initialState,
  }

  clearState() {
    this.setState({ ...initialState })
  }

  onChange(event) {
    console.log(
      "onChange fired with event info: ",
      event,
      "and data: ",
      event.editor.getData()
    );
  }

  handleEditorChange = event => {
    const content = event.editor.getData();
    this.setState({ content: content });
  };

  handleSubmit(event, addBlogs) {
    event.preventDefault();
    addBlogs().then(async () => {
      message.success('Section added successfuly')
      this.clearState();

    }).catch(error => {
      this.setState({
        error: "couldn't add blog"
      })
    });
  }

  handleSubmit = async (event, addBlogs) => {
    event.preventDefault();
    const data = new FormData();
    const file = this.state.selectedFile
    data.append('file', file);
    data.append('upload_preset', 'ml_default');
    await axios.post('https://api.cloudinary.com/v1_1/levelupsp/image/upload', data, {
      onUploadProgress: (progressBar) => {
        console.log(progressBar.loaded)
        console.log(progressBar.total)
        //progressBar.loaded is number of bytes loaded
        //progressBar.total is the total number of bytes of the file
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
      console.log(this.state.image)
      addBlogs({
        variables: { image: this.state.image }
      }).then(async () => {
        message.success('Blog added successfuly')
        this.clearState();
      }).catch(error => {
        console.log(error.graphQLErrors.map(x => x.message))
        this.setState({
          error: "couldn't add blog"
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
    const { title, category, subject, content } = this.state;
    const isInvalid = !title || !category || subject || content;
    return isInvalid;
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { title, category, subject, content, progress } = this.state
    return (
      <div className="text-center border border-light p-5">
        <p className="h4 mb-4">Add New Blog</p>
        <div className="card-body px-lg-5 pt-0">
          <Query query={GET_CURRENT_USER}>
            {({ data }) => {
              const UserID = data.getCurrentUser._id;

              return (
                <Mutation
                  mutation={ADD_BLOGS}
                  variables={{ title, category, subject, content, User: UserID }}
                  refetchQueries={() => {
                    return [{
                      query: GET_BLOGS
                    }];
                  }}
                >
                  {(addBlogs) => {

                    return (

                      <form className="text-center" onSubmit={event => this.handleSubmit(event, addBlogs)} noValidate>
                        <div className={classNames({ 'error-label': this.state.error !== '' })}>
                          {this.state.error}
                        </div>

                        <div className="form-row mb-4">
                          <div className="col">
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              placeholder="Blog title"
                              value={title}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>

                        <div className="form-row mb-4">
                          <div className="col">
                            <input
                              type="text"
                              name="category"
                              className="form-control"
                              placeholder="Blog category"
                              onChange={this.handleChange}
                              value={category} />
                          </div>
                        </div>

                        <div className="form-row mb-4">
                          <div className="col">
                            <textarea
                              className="form-control"
                              name="subject"
                              rows="4"
                              cols="50"
                              placeholder="Short description"
                              onChange={this.handleChange}
                              value={subject}
                            >
                            </textarea>
                          </div>
                        </div>

                        <CKEditor
                          name="content"
                          content={content}
                          events={{ change: this.handleEditorChange }}
                        />

                        <div style={{ marginRight: '50px', marginLeft: '50px' }}>
                          {/* <input type="file" onChange={this.handleFilesChange} accept="*" required /> */}
                          <Dropzone onDrop={this.handleFilesChange} className="dropzone" accept="image/*">
                            {({ getRootProps, getInputProps }) => (
                              <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} required />
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
                          Add Blog
                </button>
                        <div className="media-body">
                          <div className="media-content">
                            <h4 className="media-heading">
                            </h4>
                          </div>
                        </div>
                      </form>
                    );

                  }}
                </Mutation>
              )

            }}
          </Query >

        </div>
      </div>

    )

  }
};


export default Editor;