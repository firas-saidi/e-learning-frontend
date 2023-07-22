import React from "react";
import { withRouter } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";

const handleSignout = (client, history) => {
  localStorage.removeItem("token");
  localStorage.removeItem("cart");
  client.resetStore();
  history.push("/login");
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <button onClick={() => handleSignout(client, history)} className="btn-sm" >Signout</button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);