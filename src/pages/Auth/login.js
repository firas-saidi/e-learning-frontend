import React from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries/';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Breadcrumb, Spin, Icon } from 'antd';

const initialState = {
    email: '',
    password: '',
    error: ''
}
const antIcon = <Icon type="loading" style={{ fontSize: 44 }} />;

class Signin extends React.Component {
    state = {
        ...initialState

    }

    componentWillUnmount() {
        this.setState({ ...initialState })
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

    handleSubmit(event, signinUser) {
        event.preventDefault();
        signinUser().then(async ({ data }) => {
            localStorage.setItem('token', data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            // console.log(data.)
            this.props.history.push('/dashboard');

        }).catch(error => {
            this.setState({
                error: error.graphQLErrors.map(x => x.message)
            })
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    }

    validateForm() {
        const { email, password } = this.state;
        const isInvalid = !email || !password;
        return isInvalid;
    }

    head() {
        return (
            <Helmet bodyAttributes={{ class: "logInPage" }}>
                <title>LogIn - Level Up Space</title>
            </Helmet>
        );
    }

    render() {
        const { email, password } = this.state;
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
                                Login
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="signUp authForm">

                    <h1 className="dark_headline">
                        LogIn
                    </h1>

                    <Mutation
                        mutation={SIGNIN_USER}
                        variables={{ email, password }}
                    >

                        {(signinUser, { data, loading, error }) => {

                            return loading ? <Spin indicator={antIcon} className="text-center" /> : (

                                <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>

                                    <div className="form_wrap">

                                        <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                            {this.state.error}
                                        </div>

                                        <div className="form_row">

                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="email" name="email" placeholder="Email" autoComplete="email" value={email} onChange={this.handleChange} />
                                                    <span className="bottom_border"></span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="form_row">

                                            <div className="form_item">
                                                <div className="form_input">
                                                    <input type="password" name="password" autoComplete="current-password" placeholder="Password" value={password} onChange={this.handleChange} />
                                                    <span className="bottom_border"></span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="formBottomLinks">
                                            <p>
                                                Don't have an account? <NavLink to="/register" className="signuplink">Join now!</NavLink>
                                            </p>
                                            <p>
                                                Forgot your password? <Link to="/account-recovery" className="anchor-black">Reset here</Link>
                                            </p>
                                        </div>
                                        <div className="form_buttons">
                                            <button type="submit" className="btn-custom"
                                                disabled={loading || this.validateForm()}>
                                                LogIn
                                            </button>
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

export default withRouter(Signin);
