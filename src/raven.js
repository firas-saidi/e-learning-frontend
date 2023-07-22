import React, {Component} from 'react'
import * as Sentry from '@sentry/browser';
import {Link} from 'react-router-dom';

// Sentry.init({
//  dsn: "https://bdeb59c30bca4a94b4826567cd04a792@sentry.io/1409109"
// });
// should have been called before using it here
// ideally before even rendering your react app 

class SentryError extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ error });
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
              <Link onClick={() => Sentry.showReportDialog()}>Report feedback</Link>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }

    }
    
}

export default SentryError;
