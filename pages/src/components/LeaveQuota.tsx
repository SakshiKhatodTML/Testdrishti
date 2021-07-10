import * as React from "react";
import { Flex, Segment, Text } from "@fluentui/react-northstar";
import { connect } from "react-redux";
import { RootSchema } from "../redux/reducer";
import {
  postTokenAction,
  ILeaveQuota,
  IToken,
} from "../redux/actions/LeaveActions";

interface quotaProps {
  quotaName: string;
  quotaNumber: string;
}

const QuotaOption: React.FC<quotaProps> = ({ quotaName, quotaNumber }) => {
  return (
    <Flex gap="gap.small" padding="padding.medium">
      <Text weight="semibold" color="brand" className="quotaName">
        {quotaName}
      </Text>
      <Text weight="semibold" className="qoutaNo">
        {quotaNumber}
      </Text>
    </Flex>
  );
};

interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
  userToken: IToken;
  leaveQuota: ILeaveQuota;
  postQuotaLeaveAction: (access_token: string, emp_id: string) => void;
  postTokenAction: (token: string, empId: string) => void;
}
interface IState {}
class LeaveQuota extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  componentDidMount() {
    this.props.postTokenAction(this.props.token, this.props.employeeId);
  }
  render() {
    {
      console.log(this.props.leaveQuota);
    }
    return (
      <Flex
        gap="gap.small"
        className="leaveQuotaContainer"
        style={{ minHeight: "43vh" }}
      >
        <Flex.Item styles={{ width: "100%" }}>
          <Segment>
            <Flex column>
              <div className="quotaHeader">
                <Text
                  color="grey"
                  weight="semibold"
                  size="large"
                  className="headerQouta"
                >
                  Leave Quota Overview
                </Text>
              </div>
              <div
                style={{
                  height: "15rem",
                  overflow: "scroll",
                  marginTop: "0.5rem",
                }}
              >
                <div className="quotaOptionContainer">
                  {this.props.leaveQuota.isSuccess
                    ? this.props.leaveQuota.leave_quota_details.map(
                        (item, index) => {
                          return (
                            <QuotaOption
                              quotaName={item.leave_quota_text}
                              quotaNumber={`${item.available_leaves}/${item.total_leaves}`}
                            />
                          );
                        }
                      )
                    : "Loading..."}
                </div>
              </div>
            </Flex>
          </Segment>
        </Flex.Item>
      </Flex>
    );
  }
}
const mapStateToProps = (state: RootSchema) => ({
  userToken: state.leaveData.tokenData,
  leaveQuota: state.leaveData.leaveQuota,
});

const mapDispatchToProps = (dispatch: any) => ({
  postTokenAction: (token: string, empId: string) =>
    dispatch(postTokenAction(token, empId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaveQuota);

// <QuotaOption
//   quotaName="Sick Leaves:"
//   quotaNumber={
//     this.props.leaveQuota.isSuccess
//       ? `${this.props.leaveQuota.leave_quota_details[6].available_leaves}/${this.props.leaveQuota.leave_quota_details[6].total_leaves}`
//       : "Loading"
//   }
// />;
