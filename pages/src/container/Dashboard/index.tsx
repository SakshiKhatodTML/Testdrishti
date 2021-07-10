import * as React from "react";
import LeaveOptions from "./../../components/LeaveOptions";
import LeaveQuota from "./../../components/LeaveQuota";
import LeaveStatus from "./../../components/LeaveStatus";
import TeamWelcome from "./../../components/TeamWelcome";
import ManagerWelcome from "./../../components/ManagerWelcome";
import TeamMember from "./../../components/TeamMember";
import "./dashboard.css";
import * as microsoftTeams from "@microsoft/teams-js";

interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
}

const Dashboard: React.FC<IProps> = (props) => {
  microsoftTeams.initialize();

  React.useEffect(() => {
    microsoftTeams.getContext((context) => {
      microsoftTeams.appInitialization.notifySuccess();
    });
  }, []);
  console.log(props);
  return (
    <div>
      <div className="homeScreen">
        <div className="leaveContainer">
          <div className="leaveOption">
            <LeaveOptions
              employeeId={props.employeeId}
              token={props.token}
              domain={props.domain}
              appId={props.appId}
            />
          </div>

          <div className="quotaOverview">
            <LeaveQuota
              employeeId={props.employeeId}
              token={props.token}
              domain={props.domain}
              appId={props.appId}
            />
          </div>
        </div>

        <div className="leaveStatus">
          <LeaveStatus />
        </div>

        <div className="teamMembersContainer">
          <div className="teamWelcome">
            <TeamWelcome />
          </div>

          <div className="managerWelcome">
            <ManagerWelcome />
          </div>
        </div>
        <div className="teamMembers">
          <TeamMember />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
