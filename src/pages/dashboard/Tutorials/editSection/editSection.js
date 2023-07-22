import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import withAuth from '../../../../HOC/withAuth';
import { EDIT_SECTION, GET_SECTIONS } from '../../../../queries';
import {
    Layout, Menu, Icon,
} from 'antd';
import Lectures from '../addLecture';


const { Content, Sider } = Layout;

class EditSection extends Component {
    state = {
        id: this.props.match.params.id,
        name: this.props.location.state.sectionName.name,
        description: this.props.location.state.sectionDescription.description,
        collapsed: false,
        current: 'EditSection',
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

    handleSubmit(event, editSection) {
        event.preventDefault();
        editSection(this.state.id).then(async ({ data }) => {
            message.success("update was sucess");
            console.log(data)
        }).catch(error => {
            this.setState({
                error: "couldn't update tutorial"
            })
        });

    }

    layoutContent = (props) => {
        if (this.state.current === "EditSection") {
            const SectionName = this.props.location.state.sectionName.name
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <h2 className="text-center">Edit {SectionName} Section</h2>
                    <Mutation
                        mutation={EDIT_SECTION}
                        variables={{ _id: this.state.id, newName: this.state.name, newDescription: this.state.description }}
                        refetchQueries={() => {
                            return [{
                                query: GET_SECTIONS,
                                variables: { TutorialID: this.state.id }
                            }];
                        }}
                    >
                        {(editSection) => {
                            return (
                                <form className="text-center mt-5" onSubmit={event => this.handleSubmit(event, editSection)}>
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
        } else if (this.state.current === "AddLectures") {
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <Lectures section={this.state} />
                </Content>

            )
        }
    }

    render() {
        console.log(this.props)
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
                                <Menu.Item key="EditSection">
                                    <Icon type="plus" />
                                    <span>Edit Section</span>
                                </Menu.Item>
                                <Menu.Item key="AddLectures">
                                    <Icon type="plus" />
                                    <span>Add Lectures</span>
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(EditSection));