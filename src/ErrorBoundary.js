// reference from https://reactjs.org/docs/error-boundaries.html

import React from "react";
import {Link} from "@reach/router";

class ErrorBoundary extends React.Component {
  state = { hasError: false}
  static getDerivedStateFromError () {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // can be sent off to log service such as Azure monitor, TrackJS or Sentry
    console.error("ErrorBoundary cought an error", error, info);
  }

  render() {
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