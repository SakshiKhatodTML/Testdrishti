import "@babel/polyfill";
import * as microsoftTeams from "@microsoft/teams-js";
import * as csstips from "csstips";
import {
  Provider,
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from "@fluentui/react-northstar";
import * as React from "react";
import { Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Spinner from "./components/spinner";
import configureStore from "./store";
import {Provider as SProvider} from "react-redux";
const ApplyLeave = React.lazy(()=> import("./container/Applyleave"));
const Dasboard = React.lazy(()=> import("./container/Dashboard"));
const ViewLeave = React.lazy(()=> import("./container/Viewleave"));
const ApproveLeave = React.lazy(()=> import("./container/Approveleave"))
csstips.normalize();
const store = configureStore();
export interface IContentState {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
  theme: any;
}
const routes = [
  {
    path: "/apply-leave.html",
    component: (
      employeeId: string,
      token: string,
      domain: string,
      appId: string
    ): JSX.Element => (
      <Suspense fallback={<Spinner />}>
        <ApplyLeave
          employeeId={employeeId}
          token={token}
          domain={domain}
          appId={appId}
        ></ApplyLeave>
      </Suspense>
    ),
  },
  {
    path: "/dashboard.html",
    component: (
      employeeId: string,
      token: string,
      domain: string,
      appId: string
    ): JSX.Element => (
      <Suspense fallback={<Spinner />}>
        <Dasboard
          employeeId={employeeId}
          token={token}
          domain={domain}
          appId={appId}
        ></Dasboard>
      </Suspense>
    ),
  },
  {
    path: "/view-leave.html",
    component: (
      employeeId: string,
      token: string,
      domain: string,
      appId: string
    ): JSX.Element => (
      <Suspense fallback={<Spinner />}>
        <ViewLeave
          employeeId={employeeId}
          token={token}
          domain={domain}
          appId={appId}
        ></ViewLeave>
      </Suspense>
    ),
  },
   
  {
    path: "/approve-leave.html",
    component: (
      employeeId: string,
      token: string,
      domain: string,
      appId: string
    ): JSX.Element => (
      <Suspense fallback={<Spinner />}>
        <ApproveLeave
          employeeId={employeeId}
          token={token}
          domain={domain}
          appId={appId}
        ></ApproveLeave>
      </Suspense>
    ),
  },
];
export class GHPages extends React.Component<{}, IContentState> {
  state = {
    theme: teamsTheme,
    employeeId: "",
    token: "",
    domain: "",
    appId: "",
  };
  componentDidMount() {
    const emp_id = this.getQueryVariable("employeeId");
    const token = this.getQueryVariable("token");
    const domain = this.getQueryVariable("domain");
    const appId = this.getQueryVariable("appId");
    this.setState({
      employeeId: emp_id,
      token: token,
      appId: appId,
      domain: domain,
    });
    this.updateTheme(this.getQueryVariable("theme"));

    microsoftTeams.initialize();
    if (this.inTeams()) {
      microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
    }
  }

  render() {
    const { appId, domain, token, employeeId } = { ...this.state };
    return (
      <Router>
        <Suspense fallback={<Spinner></Spinner>}>
          <Provider theme={this.state.theme} lang="en-US">
            <Switch>
              {routes.map((route, i) => (
                <Route
                  path={route.path}
                  render={() =>
                    route.component(employeeId, token, domain, appId)
                  }
                />
              ))}
            </Switch>
          </Provider>
        </Suspense>
      </Router>
    );
  }

  private updateTheme = (themeStr?: string | null): void => {
    let theme;
    switch (themeStr) {
      case "dark":
        theme = teamsDarkTheme;
        break;
      case "contrast":
        theme = teamsHighContrastTheme;
        break;
      case "default":
      default:
        theme = teamsTheme;
    }
    this.setState({ theme });
  };

  private inTeams = (): boolean => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  private getQueryVariable = (variable: string): string | null => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (const varPairs of vars) {
      const pair = varPairs.split("=");
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  };
}

render(
  <SProvider store={store}>
    <GHPages />
  </SProvider>,
  document.getElementById("root")
);
