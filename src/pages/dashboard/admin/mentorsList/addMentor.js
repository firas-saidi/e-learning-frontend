import React, { Component } from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER, GET_ALL_MENTORS } from '../../../../queries';
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
    profileImage: 'https://res.cloudinary.com/levelupsp/image/upload/v1617922370/ccvqgljtzmxfzq8shcav_l4x5cf.png'
}
new Clipboard('.copypassgen');


class AddMentor extends Component {

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
            isMentor: true
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
        console.log(typeof(signupUser()))
        signupUser().then(async ({ data }) => {
            this.clearState();
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
            <Helmet bodyAttributes={{ class: "addMentor" }}>
                <title>Add Mentor - Level Up Space</title>
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
            <div className="text-center border border-light p-5">

                <p className="h4 mb-4">Add New Mentor</p>

                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Mutation
                        mutation={SIGNUP_USER}
                        variables={{ firstName, lastName, email, userName, password, isUser, isAdmin, isTeacher, isMentor, profileImage }}
                        refetchQueries={() => {
                            return [{
                                query: GET_ALL_MENTORS
                            }];
                        }}
                    >

                        {(signupUser, { data, loading, error }) => {
                            console.log(typeof(signupUser))
                            return (
                                <form className="text-center" onSubmit={event => this.handleSubmit(event, signupUser)}>
                                    <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                        {this.state.error}
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="form-control"
                                                placeholder="First name"
                                                value={firstName}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control"
                                                placeholder="Last name"
                                                value={lastName}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="E-mail"
                                                value={email}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="userName"
                                                placeholder="Username"
                                                value={userName}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row mb-4">

                                        <div className="col">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                name="password"
                                                value={password}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Repeat Password"
                                                name="passwordConfirm"
                                                value={passwordConfirm}
                                                onChange={this.handleChange}
                                                onBlur={this.confirmPW}
                                            />
                                        </div>
                                    </div>
                                    <input type="hidden" name="isMentor" value="true" />
                                    <button
                                        className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                        type="submit"
                                        disabled={loading || this.validateForm()}>
                                        Add Mentor
                                    </button>
                                </form>
                            );
                        }}
                    </Mutation>
                    <button className="passgen Button2" onClick={this.gen}>generate password</button>
                    <button className="copypassgen Button2" data-clipboard-text={password}>copy password</button>
                </div>

            </div>
        )
    }
};

export default AddMentor;