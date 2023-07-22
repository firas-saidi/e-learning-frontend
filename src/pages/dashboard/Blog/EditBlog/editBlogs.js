import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import withAuth from '../../../../HOC/withAuth';
import { EDIT_BLOGS, GET_BLOGS } from '../../../../queries';
import CKEditor from "react-ckeditor-component";
import {
    Layout, Menu, Icon,
} from 'antd';
import classNames from 'classnames';

const { Content, Sider } = Layout;

class EditBlog extends Component {
    state = {
        id: this.props.match.params.id,
        title: this.props.location.state.title,
        subject: this.props.location.state.subject,
        category: this.props.location.state.category,
        content: this.props.location.state.content,
        createdDate: this.props.location.state.createdDate,
        collapsed: false,
        current: 'EditBlog',
        error: '',
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    handleSubmit(event, EDIT_BLOGS) {
        event.preventDefault();
        EDIT_BLOGS(this.state.id).then(async ({ data }) => {
            message.success("update was sucess");
            console.log(data)
        }).catch(error => {
            this.setState({
                error: "couldn't update blog"
            })
        });
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

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    layoutContent = (props) => {
        if (this.state.current === "EditBlog") {
            const blogName = this.props.location.state.name
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <h2 className="text-center">Edit {blogName} Blog</h2>
                    <Mutation
                        mutation={EDIT_BLOGS}
                        variables={{ _id: this.state.id, newTitle: this.state.title, newCategory: this.state.category, newSubject: this.state.subject, newContent: this.state.content }}
                        refetchQueries={() => {
                            return [{
                                query: GET_BLOGS
                            }];
                        }}
                    >
                        {(EDIT_BLOGS) => {
                            return (

                                <form className="text-center mt-5" onSubmit={event => this.handleSubmit(event, EDIT_BLOGS)}>
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
                                                value={this.state.title}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="category"
                                                rows="10"
                                                cols="50"
                                                placeholder="blog category"
                                                value={this.state.category}
                                                onChange={this.handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="subject"
                                                rows="10"
                                                cols="50"
                                                placeholder="blog subject"
                                                value={this.state.subject}
                                                onChange={this.handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <CKEditor
                                        name="content"
                                        content={this.state.content}
                                        events={{ change: this.handleEditorChange }}
                                    />
                                    <button
                                        className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                        type="submit">
                                        Save Changes</button>
                                </form>
                            )
                        }}
                    </Mutation>
                </Content>
            )
        }
    }

    render() {
        console.log(this.props)
        console.log(this.state.title)
        console.log(this.state.category)
        console.log(this.state.subject)
        console.log(this.state.content)
        console.log(this.state.createdDate)
        console.log(this.state.id)
        return (

            <Layout>
                <Content>
                    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                selectedKeys={[this.state.current]}
                                onClick={this.handleClick}
                                style={{ height: '100%' }}
                            >
                                <Menu.Item key="EditBlog">
                                    <Icon type="plus" />
                                    <span>Edit Blog</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        {this.layoutContent()}
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(EditBlog));