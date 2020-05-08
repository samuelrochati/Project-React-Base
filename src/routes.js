import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import GoogleAnalytics from "react-ga";

// Config environment variables
import { googleAnalytics } from "./config/config.example";

// Pages
import Logon from "./pages/Logon";
import Exemplo from "./pages/Exemplo";

// Verify session auth
import { isAuthenticated } from "./services/session";

// Google Analytics
GoogleAnalytics.initialize(googleAnalytics());

// Private Route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

// Google Analitycs per Router
const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  // eslint-disable-next-line
  const HOC = class extends Component {
    componentDidMount() {
      // eslint-disable-next-line
      const page = this.props.location.pathname + this.props.location.search;
      trackPage(page);
    }

    componentDidUpdate(prevProps) {
      const currentPage =
        prevProps.location.pathname + prevProps.location.search;
      const nextPage =
        this.props.location.pathname + this.props.location.search;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* routes public */}
        <Route path="/" exact component={withTracker(Logon)} />

        {/* routes private */}
        <PrivateRoute path="/exemplo" component={withTracker(Exemplo)} />
        <PrivateRoute
          path="/exemplo/:exemplo"
          component={withTracker(Exemplo)}
        />
      </Switch>
    </BrowserRouter>
  );
}
