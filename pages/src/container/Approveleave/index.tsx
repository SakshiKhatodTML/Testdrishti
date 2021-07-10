import * as React from 'react';
import ApproveLeaveContainer from "../../Components/ApproveLeaveContainer";
interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
}
class ApproveLeave extends React.Component<IProps,{}> {
  /**
   *
   */
  constructor(props: IProps) {
    super(props);
    
  }
  render() {
    
    return <ApproveLeaveContainer employeeId={this.props.employeeId} token={this.props.token} domain={this.props.domain} appId={this.props.appId}/>
  }

}
export default ApproveLeave;
