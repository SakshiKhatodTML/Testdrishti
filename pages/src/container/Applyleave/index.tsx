import * as React from 'react';
import ApplyLeaveContainer from "../../Components/ApplyLeaveContainer";
interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
}
class ApplyLeave extends React.Component<IProps,{}> {
  /**
   *
   */
  constructor(props: IProps) {
    super(props);
    
  }
  render() {
    
    return <ApplyLeaveContainer employeeId={this.props.employeeId} token={this.props.token} domain={this.props.domain} appId={this.props.appId}/>
  }

}
export default ApplyLeave;
