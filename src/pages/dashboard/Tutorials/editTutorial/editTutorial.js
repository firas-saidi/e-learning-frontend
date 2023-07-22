import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import withAuth from '../../../../HOC/withAuth';
import { CHANGE_TUTORIAL_NAME, GET_ALL_TUTORIALS } from '../../../../queries';
import Section from '../addSection';
import {
    Layout, Menu, Icon,
} from 'antd';

const { Content, Sider } = Layout;

class EditTutorial extends Component {
    state = {
        id: this.props.match.params.id,
        name: this.props.location.state.tutorialName.name,
        description: this.props.location.state.tutorialDescription.description,
        collapsed: false,
        current: 'EditTutorial',
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

    handleSubmit(event, changeTutorialName) {
        event.preventDefault();
        changeTutorialName(this.state.id).then(async ({ data }) => {
            message.success("update was sucess");
            console.log(data)
        }).catch(error => {
            this.setState({
                error: "couldn't update tutorial"
            })
        });

    }

    layoutContent = (props) => {
        if (this.state.current === "EditTutorial") {
            const TutorialName = this.props.location.state.tutorialName.name
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <h2 className="text-center">Edit {TutorialName} Tutorial</h2>
                    <Mutation
                        mutation={CHANGE_TUTORIAL_NAME}
                        variables={{ _id: this.state.id, newName: this.state.name, newDescription: this.state.description }}
                        refetchQueries={() => [
                            { query: GET_ALL_TUTORIALS }
                        ]}
                    >
                        {(changeTutorialName) => {
                            return (
                                <form className="text-center mt-5" onSubmit={event => this.handleSubmit(event, changeTutorialName)}>
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
        } else if (this.state.current === "AddSections") {
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <Section tutorial={this.state} />
                </Content>

            )
        }
    }

    render() {
        console.log(this.props)
        console.log(this.state.name)
        console.log(this.state.description)
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
                                <Menu.Item key="EditTutorial">
                                    <Icon type="plus" />
                                    <span>Edit Tutorial</span>
                                </Menu.Item>
                                <Menu.Item key="AddSections">
                                    <Icon type="plus" />
                                    <span>Add Sections</span>
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(EditTutorial));