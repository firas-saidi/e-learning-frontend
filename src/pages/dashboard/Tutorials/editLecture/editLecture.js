import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import withAuth from '../../../../HOC/withAuth';
import { EDIT_LECTURE, GET_LECTURES } from '../../../../queries';
import {
    Layout, Menu, Icon,
} from 'antd';
import Quiz from '../addQuiz';


const { Content, Sider } = Layout;

class EditLecture extends Component {
    state = {
        id: this.props.match.params.id,
        name: this.props.location.state.lectureName.name,
        description: this.props.location.state.lectureDescription.description,
        collapsed: false,
        current: 'EditLecture',
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
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event, editLecture) {
        event.preventDefault();
        editLecture(this.state.id).then(async ({ data }) => {
            message.success("update was sucess");
            console.log(data)
        }).catch(error => {
            this.setState({
                error: "couldn't update tutorial"
            })
        });
    }

    layoutContent = () => {
        if (this.state.current === "EditLecture") {
            const LectureName = this.props.location.state.lectureName.name
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <h2 className="text-center">Edit {LectureName} Section</h2>
                    <Mutation
                        mutation={EDIT_LECTURE}
                        variables={{ _id: this.state.id, newName: this.state.name, newDescription: this.state.description }}
                        refetchQueries={() => [
                            { query: GET_LECTURES }
                        ]}
                    >
                        {(editLecture) => {
                            return (
                                <form className="text-center mt-5" onSubmit={event => this.handleSubmit(event, editLecture)}>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Tutorial name"
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                rows="10"
                                                cols="50"
                                                placeholder="Short description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
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
        } else if (this.state.current === "AddQuiz") {
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <Quiz section={this.state} />
                </Content>

            )
        }
    }

    render() {
        console.log(this.props)
        console.log(this.props.location.state.lectureName.name)
        console.log(this.state.name)
        console.log(this.state.description)
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
                                <Menu.Item key="EditLecture">
                                    <Icon type="plus" />
                                    <span>Edit Lecture</span>
                                </Menu.Item>
                                <Menu.Item key="AddQuiz">
                                    <Icon type="plus" />
                                    <span>Add Quiz</span>
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(EditLecture));