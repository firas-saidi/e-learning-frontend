import { Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from './../../queries';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import generator from 'generate-password';
import Clipboard from 'clipboard'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    passwordConfirm: '',
    error: '',
    passwordMatch: null,
    isUser: false,
    isAdmin: false,
    isTeacher: false,
    isMentor: false,
    profileImage: 'https://res.cloudinary.com/levelupsp/image/upload/v1617569164/profil_image_qzxpo9.png'
}
new Clipboard('.copypassgen');


class Signup extends Component {

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
            [name]: value,
            isUser: true
        });
    }

    confirmPW = () => {
        const { password, passwordConfirm } = this.state
        const isMatch = password !== passwordConfirm && password.length <= 7;
        this.setState({
            passwordMatch: isMatch
        });
    }

    handleSubmit(event, signupUser) {
        event.preventDefault();
        signupUser().then(async ({ data }) => {
            localStorage.setItem('token', data.signupUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/dashboard');

        }).catch(error => {
            this.setState({
                error: 'Either your email or username is already taken. Please adjust and try again.'
            })
        });

    }

    validateForm() {
        const { firstName, lastName, email, userName, password, passwordConfirm } = this.state;
        const isInvalid = !firstName || !lastName || !email || !userName || !password || password !== passwordConfirm || password.length <= 7;
        return isInvalid;
    }

    head() {
        return (
            <Helmet bodyAttributes={{ class: "signUpPage" }}>
                <title>Join now! - Level Up Space</title>
            </Helmet>
        );
    }

    gen = () => {
        const pwd = generator.generate({
            length: 14,
            numbers: true
        });
        console.log(pwd)
        this.setState({
            password: pwd,
            passwordConfirm: pwd,
        });

    }

    render() {

        const { firstName, lastName, email, userName, password, passwordConfirm, isUser, isAdmin, isTeacher, isMentor, profileImage } = this.state;

        return (
            <div className="column column_12_12">
                {this.head()}
                <div className="breadcrumbs">
                    <div className="container">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Register
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="signUp authForm">

                    <h1 className="dark_headline">
                        Join now
                    </h1>

                    <Mutation
                        mutation={SIGNUP_USER}
                        variables={{ firstName, lastName, email, userName, password, isUser, isAdmin, isTeacher, isMentor, profileImage }}
                    >

                        {(signupUser, { data, loading, error }) => {

                            return (
                                <form onSubmit={event => this.handleSubmit(event, signupUser)}>

                                    <div className="form_wrap">
                                        <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                            {this.state.error}
                                        </div>

                                        <div className="form_row">
                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={this.handleChange} />
                                                    <span className="bottom_border"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form_row">
                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={this.handleChange} />
                                                    <span className="bottom_border"></span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="form_row">
                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                                                    <span className="bottom_border"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form_row">
                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="text" name="userName" placeholder="Username" value={userName} onChange={this.handleChange} autoComplete="username" />
                                                    <span className="bottom_border"></span>
                                                </div>

                                                <div className="helperText">
                                                    Please note that you will not be able to change this after your registration.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form_row">
                                            <div className={classNames({ 'error-label': true, 'passwordMatch': !this.state.passwordMatch })}>
                                                Please check that your passwords match and are at least 8 characters.
                                            </div>
                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} autoComplete="new-password" />
                                                    <span className="bottom_border"></span>
                                                </div>

                                                <div className="helperText">
                                                    Password must be a minium of 8 characters in length.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form_row">
                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="password" name="passwordConfirm" placeholder="Password confirm" value={passwordConfirm} onChange={this.handleChange} onBlur={this.confirmPW} autoComplete="new-password" />
                                                    <span className="bottom_border"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form_buttons">
                                            <button className="btn-custom" type="submit"
                                                disabled={loading || this.validateForm()}>
                                                Register</button>
                                        </div>
                                    </div>
                                </form>
                            );

                        }}
                    </Mutation>
                    <div className="text-center mt-2">
                        <button className="passgen Button2" onClick={this.gen}>generate password</button>
                        <button className="copypassgen Button2" data-clipboard-text={password}>copy password</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signup);