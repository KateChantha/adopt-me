// reference from https://reactjs.org/docs/error-boundaries.html

import React, { ErrorInfo } from "react";
import {Link, Redirect} from "@reach/router";

class ErrorBoundary extends React.Component {
  state = { hasError: false, redirect: false};

  // this will run when some error is caugth inside of it
  static getDerivedStateFromError () {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // can be sent off to log service such as Azure monitor, TrackJS or Sentry
    console.error("ErrorBoundary cought an error", error, info);
  }

  /** resirect to home page in 5 sec after error */
  // it will run everytime state change or props change
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    /** Redirect is a component from reach-router */
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click Here</Link> to go back to the home page or wait five second.
        </h1>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;