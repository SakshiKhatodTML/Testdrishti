import * as React from "react";
import { Table,TableRow, TableCell, Button, Checkbox, Flex } from "@fluentui/react-northstar";
import {
  GalleryNewLargeIcon,
  TrashCanIcon,
  ChevronEndIcon,
  ChevronDownIcon,
  BellIcon
} from "@fluentui/react-icons-northstar";
import { connect } from "react-redux";
import {
  getEmployeeManagerAction,
  IEmployeeManager,
  IToken,
  postTokenAction,
  postLeaveHistoryAction,
  ILeaveHistoryPayload,
  ILeaveHistoryList
} from "./../redux/actions/LeaveActions";
import { RootSchema } from "../redux/reducer";
import "./viewleave.css";

interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
  userToken: IToken;
  postTokenAction: (token: string, empId: string) => void;
  userManagerData: IEmployeeManager;
  getEmployeeManagerAction: (token: string, empId: string) => void;
  leaveHistory: ILeaveHistoryList;
  getLeaveHistory:(accessToken: string, payload: ILeaveHistoryPayload)=>void;
}
interface IRow{
  key: string;
  index: number; 
  isActive: boolean;
  isChekced:boolean;
  error: string;
}
interface IState {
  header: any;
  rows: IRow[];
  data:any;
  isChecked:any;
}
class ViewLeaveContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      header: {
        items: ["", "Name", "Leave Type", "", ""]
      },
      rows: [
        {
          key: "0",
          index: 0,
          isActive:false,
          isChekced:false,
          error: ""
        } 

      ],
      data : [],
      isChecked:false
    }
  }
  componentDidMount(){
    this.props.postTokenAction(this.props.token, this.props.employeeId);
  }
  componentWillReceiveProps(nextProps: IProps){
    
    if(nextProps.userManagerData.isSuccess && nextProps.userToken.isSuccess && !nextProps.leaveHistory.isSuccess){
      const payload: ILeaveHistoryPayload={
        emp_id: this.props.employeeId,
        leave_category_code:"WFH",
        leave_status_code:"All",
        filter_type:"",
        month:"07",
        pa: nextProps.userManagerData.user_details[0].PersArea,
        psa: nextProps.userManagerData.user_details[0].PSubarea,
      } 
      this.props.getLeaveHistory(nextProps.userToken.token.access_token, payload); 
    } 
    let data = [] 
    if(nextProps.leaveHistory.isSuccess){ 
      for(let i in nextProps.leaveHistory.data.leave_requests){
        console.log(nextProps.leaveHistory.data.leave_requests[i])
        data.push({...nextProps.leaveHistory.data.leave_requests[i],isActive:false,isChecked:false})
      }
      this.setState({data:data})
    } 
 
  }
  componentDidUpdate(prevProps: IProps, prevState: IState){
  }
  toggle=(index)=> {
    const dataObj = this.state.data;
    for (let i in dataObj) {
      if (index == i) {
        continue;
      }
      dataObj[i].isActive = false;
    }
    dataObj[index].isActive = !dataObj[index].isActive;
    this.setState({ data: dataObj });
    
  }
  selectAll = (e) => {
    const { isChecked, data } = { ...this.state };
    if (!isChecked) {
      for (let i in data) {
        data[i].isActive = false;
        data[i].isChecked = data[i].isDisabled?false:true;
      }
    }
    else {
      for (let i in data) {

        data[i].isChecked = false;
      }
    }
    this.setState({ isChecked: !isChecked, data: data });
  }
  selectItem = (index) => {
    const dataObj: any[any] = this.state.data;
    let isChecked
    dataObj[index].isChecked = !dataObj[index].isChecked;
    let dataIndex = dataObj.findIndex(x => x.isChecked === false);
    if (dataIndex === -1) {
      isChecked = true
    }
    if (dataIndex !== -1) {
      isChecked = false
    }
    this.setState({ data: dataObj, isChecked: isChecked });
  }
  render() {
    
    return (
      
      <div style={{padding:"1rem"}}>
        <div>
          <div style={{ overflow: "scroll",height: "471px" }}>
          <Table aria-label="Static table" style={{marginTop: "10px"}}>
          <TableRow >
                            <TableCell><BellIcon /></TableCell> 
                            <TableCell>Leave Category</TableCell>
                            <TableCell>Leave Status</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
          {this.state.data && this.state.data.map((item, index) =>{
                if(!item.isActive)
                  return <TableRow key={item.key}>
                            <TableCell onClick={e=>this.toggle(index)}><ChevronEndIcon /></TableCell> 
                            <TableCell>{ item.leave_category }</TableCell>
                            <TableCell>{ item.leave_status }</TableCell>
                            <TableCell><TrashCanIcon /></TableCell>
                            <TableCell><Checkbox style={{paddingTop: "3px"}} onChange={item.isChecked} onClick={e=>this.selectItem(index)}/></TableCell>
                        </TableRow>
                else 
                  return <>
                  <TableRow key={item.key} selected>
                            <TableCell onClick={e=>this.toggle(index)}><ChevronDownIcon /></TableCell> 
                            <TableCell>{ item.leave_category }</TableCell>
                            <TableCell>{ item.leave_status }</TableCell>
                            <TableCell><TrashCanIcon /></TableCell>
                            <TableCell><Checkbox style={{paddingTop: "3px"}}  onChange={item.isChecked} onClick={e=>this.selectItem(index)} /></TableCell>
                  </TableRow>
                  <TableRow className={"child-row"} key={item.key+"child"} selected>
                      <Table className={"child-table"}>
                        <TableRow>
                          <TableCell>{"Type of leave"}</TableCell>
                          <TableCell>{item.leave_category}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{"Request Type"}</TableCell>
                          <TableCell>{item.leave_type}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{"From"}</TableCell>
                          <TableCell>{item.from_date}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{"To"}</TableCell>
                          <TableCell>{item.to_date}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{"Total Days"}</TableCell>
                          <TableCell>{item.total_days}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{"Reason"}</TableCell>
                          <TableCell>{item.reason}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ justifyContent: "flex-end"}}>
                             <Button primary content="Delete Leave"/>
                          </TableCell>
                        </TableRow>
                      </Table>
                  </TableRow>     
            </>  
          })}
            </Table>
          </div>
        </div>
        <div>
          <div>
            <Flex gap="gap.smaller">
              <Checkbox onChange={this.state.isChecked} onClick={e=>this.selectAll(e)}/>
            </Flex>
          </div>

          <div className="validateBtns">
            <Flex gap="gap.smaller">
              <Button primary content="Delete Leave"/>
            </Flex>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: RootSchema) => ({
  userToken: state.leaveData.tokenData,
  userManagerData: state.leaveData.employeeManager,
  leaveHistory: state.leaveData.leaveHistory
});

const mapDispatchToProps = (dispatch: any) => ({
  postTokenAction: (token: string, empId: string) =>
    dispatch(postTokenAction(token, empId)),
  getEmployeeManagerAction: (accessToken: string, empId: string) =>
    dispatch(getEmployeeManagerAction(accessToken, empId)),
  getLeaveHistory:(accessToken: string, payload: ILeaveHistoryPayload)=> dispatch(postLeaveHistoryAction(accessToken,payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLeaveContainer);
