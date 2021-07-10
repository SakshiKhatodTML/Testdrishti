import * as React from 'react';
import ViewLeaveContainer from "../../components/ViewLeaveContainer";
interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
}
class ViewLeave extends React.Component<IProps,{}> {
  constructor(props: IProps) {
    super(props);
    
  }
  render() {
    return <ViewLeaveContainer employeeId={this.props.employeeId} token={this.props.token} domain={this.props.domain} appId={this.props.appId}/>
  }

}
export default ViewLeave;
