import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { CHANGE_EMAIL, CHANGE_PASSWORD, GET_CURRENT_USER, CHANGE_PROFILE_IMAGE } from '../../queries/';
import { withRouter } from 'react-router-dom';
import withAuth from '../../HOC/withAuth';
import { message } from 'antd';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const initialState = {
    newEmail: '',
    password: '',
    passwordConfirm: '',
    error: '',
    passwordMatch: null,
    profileImage: '',
    selectedFile: null,
    progress: 0
}

class UserProfile extends React.Component {

    state = {
        ...initialState
    }

    componentDidMount() {
        message.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
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

    confirmPW = () => {
        const { password, passwordConfirm } = this.state
        const isMatch = password !== passwordConfirm && password.length <= 7;
        this.setState({
            passwordMatch: isMatch
        });
    }

    validateEmail() {
        const { newEmail } = this.state;
        const isInvalid = !newEmail;
        return isInvalid;
    }

    validatePassword() {
        const { password, passwordConfirm } = this.state;
        const isInvalid = !password || password !== passwordConfirm || password.length <= 2;
        return isInvalid;
    }

    validateImage() {
        const { selectedFile } = this.state;
        const isInvalid = !selectedFile;
        return isInvalid;
    }

    handleChangeEmail(event, changeEmail) {
        event.preventDefault();
        changeEmail().then(async ({ data }) => {
            message.success('We have updated your email!', 'Saved!');
            this.clearState();
        }).catch(error => {
            this.setState({
                error: 'An error has occured.'
            })
        });
    }

    handleChangePassword(event, changePassword) {
        event.preventDefault();
        changePassword().then(async ({ data }) => {
            message.success('We have updated your password!', 'Saved!');
            this.clearState();
        }).catch(error => {
            this.setState({
                error: 'An error has occured.'
            })
        });
    }

    selectedFile = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0]
        console.log(selectedFile)
        this.setState({
            selectedFile
        })
    }

    handleChangeProfileImage = async (e, editProfileImage) => {
        e.preventDefault();
        const data = new FormData();
        const file = this.state.selectedFile;
        console.log(file)
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
            console.log(data)
            this.setState({
                profileImage: secure_url
            })
            console.log(this.state.profileImage)
            editProfileImage({ variables: { email: this.props.session.getCurrentUser.email, profileImage: this.state.profileImage } }).then(async ({ data }) => {
                console.log(data)
                this.props.history.push(`/profile/${this.props.session.getCurrentUser.userName}`);
                message.success('We have updated your profile image!');

            }).catch(err => console.log(err))
        })
    }

    head() {
        return (
            <Helmet bodyAttributes={{ class: "updateAccountPage" }}>
                <title>My Account - Level Up Space</title>
            </Helmet>
        );
    }

    render() {
        const { newEmail, password, passwordConfirm } = this.state;
        return (
            <Fragment>
                {this.head()}
                <div className="column column_12_12">
                    <div className="signUp authForm">
                        <h1 className="dark_headline">
                            Update your email
                    </h1>
                        <Mutation
                            mutation={CHANGE_EMAIL}
                            variables={{ currentEmail: this.props.session.getCurrentUser.email, newEmail }}
                            refetchQueries={() => [
                                { query: GET_CURRENT_USER }
                            ]}>
                            {(changeEmail, { data, loading, error }) => {
                                return (
                                    <form onSubmit={event => this.handleChangeEmail(event, changeEmail)}>
                                        <div className="form_wrap updateAccountEmailForm">
                                            <div className="form_row">
                                                <div className="form_item">
                                                    <p>Account holder: {this.props.session.getCurrentUser.firstName} {this.props.session.getCurrentUser.lastName}</p>
                                                    <p>Username: {this.props.session.getCurrentUser.userName}</p>
                                                    <p>Current email: {this.props.session.getCurrentUser.email}</p>
                                                    <div className="form_input">
                                                        <input type="email" name="newEmail" placeholder="Email" value={newEmail} onChange={this.handleChange} />
                                                        <span className="bottom_border"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form_buttons">
                                                <button className="btn btn-custom" type="submit"
                                                    disabled={loading || this.validateEmail()}>
                                                    Update email</button>
                                            </div>
                                        </div>
                                    </form>
                                );
                            }}
                        </Mutation>
                    </div>
                </div>

                <div className="column column_12_12">
                    <div className="signUp authForm">
                        <h1 className="dark_headline">
                            Update your Profile Image
                    </h1>
                        <Mutation
                            mutation={CHANGE_PROFILE_IMAGE}
                            refetchQueries={() => [
                                { query: GET_CURRENT_USER }
                            ]}>
                            {(editProfileImage, { data, loading, error }) => {
                                return (
                                    <form onSubmit={event => this.handleChangeProfileImage(event, editProfileImage)}>
                                        <div className="form_wrap updateAccountEmailForm mt-2">
                                            <div className="form_row">
                                                <div className="form_item">
                                                    <div className="form_input button-wrapper">
                                                        <span className="label">
                                                            Upload File
                                                        </span>
                                                        <input type="file" onChange={this.selectedFile} accept="image/*" required id="upload" className="upload-box" placeholder="Upload File" />
                                                        <span className="bottom_border"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form_buttons">
                                                <button className="btn btn-custom" type="submit"
                                                    disabled={loading || this.validateImage()}>
                                                    Update Profile Image
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                );
                            }}
                        </Mutation>
                    </div>
                </div>

                <div className="column column_12_12">
                    <div className="signUp authForm">
                        <h1 className="dark_headline">
                            Change your password
                    </h1>
                        <Mutation
                            mutation={CHANGE_PASSWORD}
                            variables={{ email: this.props.session.getCurrentUser.email, password: password }}
                            refetchQueries={() => [
                                { query: GET_CURRENT_USER }
                            ]}>
                            {(changePassword, { data, loading, error }) => {
                                return (
                                    <form onSubmit={event => this.handleChangePassword(event, changePassword)}>
                                        <div className="form_wrap updateAccountPasswordForm">
                                            <div className="form_row">
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
                                                <button className="btn btn-custom" type="submit"
                                                    disabled={loading || this.validatePassword()}>
                                                    Update Password</button>
                                            </div>
                                        </div>
                                    </form>
                                );
                            }}
                        </Mutation>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default withAuth(session => session && session.getCurrentUser)(withRouter(UserProfile));