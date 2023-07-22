import React from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { RESET_PASSWORD } from './../../queries';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const initialState = {
    email: '',
    error: ''
}

class ForgotPassword extends React.Component {

    constructor(props) {
        super();
        this.state = {
            ...initialState
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

    handleSubmit(event, passwordReset) {
        event.preventDefault();
        passwordReset().then(async ({ data }) => {
            this.clearState();
            this.props.history.push('/login');
            message.success('email was send successfully')
        }).catch(error => {
            this.setState({
                error: error.graphQLErrors.map(x => x.message)
            })
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    }

    validateForm() {
        const { email } = this.state;
        const isInvalid = !email;
        return isInvalid;
    }

    head() {
        return (
            <Helmet bodyAttributes={{ class: "accountRecoveryPage" }}>
                <title>Account recovery - Level Up Space</title>
            </Helmet>
        );
    }

    render() {

        const { email } = this.state;

        return (
            <div className="column column_12_12">
                {this.head()}
                <div className="signUp authForm">

                    <h1 className="dark_headline">
                        Account recovery
                    </h1>

                    <Mutation
                        mutation={RESET_PASSWORD}
                        variables={{ email }}
                    >

                        {(passwordReset, { data, loading, error }) => {

                            return (

                                <form className="form" onSubmit={event => this.handleSubmit(event, passwordReset)}>

                                    <div className="form_wrap">

                                        <p>Please enter the email address associated with your account and we will email you a temporary password.</p>

                                        <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                            {this.state.error}
                                        </div>

                                        <div className="form_row">

                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                                                    <span className="bottom_border"></span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="formBottomLinks">
                                            <p>
                                                Remembered your password? <Link to="/login" className="anchor-black">Sign-in</Link>
                                            </p>
                                        </div>

                                        <div className="form_buttons">
                                            <button type="submit" className="btn-custom"
                                                disabled={loading || this.validateForm()}>
                                                Reset</button>
                                        </div>

                                    </div>

                                </form>

                            );
                        }}

                    </Mutation>

                </div>
            </div>
        )
    }
}

export default withRouter(ForgotPassword);