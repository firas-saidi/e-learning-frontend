import React from 'react';
import { message } from 'antd';
import { Mutation } from 'react-apollo';
import { ADD_CLAIM, GET_ALL_CLAIMS } from '../../../queries';

class Claims extends React.Component {
  state = {
    value: '',
    firstName: this.props.session.getCurrentUser.firstName,
    lastName: this.props.session.getCurrentUser.lastName,
    email: this.props.session.getCurrentUser.email,
    subject: '',
    description: ''
  }

  clearState() {
    this.setState({
      subject: '',
      description: ''
    })
  }
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event, addClaim) {
    event.preventDefault();
    addClaim().then(async () => {
      this.clearState();
      message.success(`Your claim was send`);
    })
  }

  render() {
    const { firstName, lastName, email, subject, description } = this.state
    console.log(this.props.session.getCurrentUser.firstName)

    return (
      <Mutation
        mutation={ADD_CLAIM}
        variables={{ firstName, lastName, email, subject, description }} 
        refetchQueries={() => {
          return [{
              query: GET_ALL_CLAIMS
          }];
      }}>
        {(addClaim) => {
          return (
            <div className="container">
              <div className="bg-primaryc py-5">
                <div className="d-flex justify-content-center">
                  <form onSubmit={event => this.handleSubmit(event, addClaim)} className="col-md-8 d-block">
                    <h2 className="display-4 d-block">Claim</h2>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control-lg claimInput"
                        name="subject" value={subject}
                        onChange={this.handleChange}
                        placeholder="Subject"
                      />
                    </div>
                    <div className="form-group mb-5">
                      <textarea
                        name="description"
                        cols="40"
                        rows="10"
                        value={description}
                        onChange={this.handleChange}
                        className="sform-control claimTxtArea"
                        placeholder="Write your claim...what do you need (quiz?! /you have problem?!)"
                      />
                    </div>
                    <button className="btn px-4 btn-primary">Publish/Send/Feedback</button>
                  </form>
                </div>
              </div>
            </div>
          )
        }}
      </Mutation>


    );
  }
}
export default Claims;