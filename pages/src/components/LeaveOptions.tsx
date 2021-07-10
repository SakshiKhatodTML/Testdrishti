import * as React from "react";
import { Flex, Segment, Text } from "@fluentui/react-northstar";
import {
  CircleIcon,
  SearchIcon,
  ApprovalsAppbarIcon,
  GroupVideoCallGridIcon,
} from "@fluentui/react-icons-northstar";
import AttendanceEnquiryModal from "./AttendanceEnquiryModal";
import ModalComponent from "./ModalComponent";
import ApplyLeaveContainer from "./ApplyLeaveContainer";
import ApproveLeaveContainer from "./ApproveLeaveContainer";

interface leaveOptionProps {
  icon: any;
  modal?: any;
}

const LeaveOption: React.FC<leaveOptionProps> = ({ icon, modal }) => {
  return (
    <Flex
      gap="gap.small"
      padding="padding.medium"
      styles={{
        margin: "2rem 0",
        backgroundColor: "#e1dfdd",
        cursor: "pointer",
      }}
    >
      <Flex.Item>{icon}</Flex.Item>

      {modal && <Flex.Item>{modal}</Flex.Item>}
    </Flex>
  );
};
interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
}

const LeaveOptions: React.FC<IProps> = (props) => {
  console.log(props);

  return (
    <Flex
      gap="gap.small"
      className="leaveOptionContainer"
      style={{ minHeight: "43vh" }}
    >
      <Flex.Item styles={{ width: "100%" }}>
        <Segment>
          <LeaveOption
            icon={<CircleIcon size="large" />}
            modal={
              <ModalComponent
                text="Apply Leave"
                children={<ApplyLeaveContainer />}
              />
            }
          />

          <LeaveOption
            icon={<ApprovalsAppbarIcon size="large" />}
            modal={
              <ModalComponent
                text="My Approvals"
                children={<ApproveLeaveContainer />}
              />
            }
          />
          <LeaveOption
            icon={<SearchIcon size="large" />}
            modal={
              <AttendanceEnquiryModal
                employeeId={props.employeeId}
                token={props.token}
                domain={props.domain}
                appId={props.appId}
              />
            }
          />
        </Segment>
      </Flex.Item>
    </Flex>
  );
};

export default LeaveOptions;
