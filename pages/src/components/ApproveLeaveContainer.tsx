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
  ILeaveHistoryList,
  postLeaveRequestApprovalHistoryAction,
  ILeaveRequestApprovalHistoryPayLaod
} from "./../redux/actions/LeaveActions";
import { RootSchema } from "../redux/reducer";
import "./viewleave.css";

interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
  userToken: IToken;
  leaveApprovalHistory:any;
  postTokenAction: (token: string, empId: string) => void;
  userManagerData: IEmployeeManager;
  getEmployeeManagerAction: (token: string, empId: string) => void; 
  getLeaveHistory:(accessToken: string, payload: ILeaveHistoryPayload)=>void; 
  postLeaveRequestApprovalHistoryAction : (access_token: string, payload:ILeaveRequestApprovalHistoryPayLaod) => void;

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
class ApproveLeaveContainer extends React.Component<IProps, IState> {
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
 
    if(nextProps.userManagerData.isSuccess && nextProps.userToken.isSuccess){
      const payload: ILeaveRequestApprovalHistoryPayLaod={
         
        emp_id: this.props.employeeId,
        approval_type:"Leave Request",
        leave_category_code:"All",
        leave_status_code:"2",
        emp_id_value:"All",
        filter_type:"leave_status",
        approver_id:"00509862",
        pa:"PNCV",
        psa:"CV9W"
       
      } 
      this.props.postLeaveRequestApprovalHistoryAction(nextProps.userToken.token.access_token, payload); 
    } 
    let data = [] 
    if(nextProps.leaveApprovalHistory.isSuccess && !this.state.isChecked){  
      for(let i in nextProps.leaveApprovalHistory.data.leave_requests_approval){ 
        data.push({...nextProps.leaveApprovalHistory.data.leave_requests_approval[i],isActive:false,isChecked:false,isDisabled:true,isApproved:false,isReject:false})
      }
      this.setState({data:data})
    }
  //   // console.log("data",data)  
 
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
        data[i].isChecked = true;
      }
    }
    else {
      for (let i in data) {

        data[i].isChecked = false;
      }
    }
    console.log("after select all",data)
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
    console.log("after select item ",dataObj)
    this.setState({ data: dataObj, isChecked: isChecked });
  }
  cancelTaskModule=()=> {
    console.log("cancel done");
    microsoftTeams.tasks.submitTask();
  } 
   
  onApprove = async (index) => {
    const dataObj = this.state.data;
    let selectedData = [];
    // if (typeof index === 'undefined') {
    //   this.state.isLoaderAllApprove = true;
    //   for (let i in dataObj) {
    //     if (dataObj[i].isChecked)
    //       selectedData.push(dataObj[i]);
    //   }
    //   if (selectedData.length) {
    //     let customerInfo = {
    //       pageType: "benefit registrations",
    //       selectedData: selectedData,
    //       status: true,
    //       sendFor: "approve",
    //       remark: " test remark"
    //     }
    //     this.setState({data:dataObj});
    //     // await this.postData("approved",customerInfo);
    //     //microsoftTeams.tasks.submitTask(customerInfo, this.props.appId);
    //     return true;
    //   }
    // } else {
    //   dataObj[index].isLoaderApprove = true;
    //   selectedData.push(dataObj[index]);
    //   if (selectedData.length) {
    //     let customerInfo = {
    //       pageType: "benefit registrations",
    //       selectedData: selectedData,
    //       status: true,
    //       sendFor: "approve",
    //       remark: " test remark"
    //     }
    //     this.setState({data:dataObj});
    //     // await this.postData("approved",customerInfo);
    //     //microsoftTeams.tasks.submitTask(customerInfo, this.props.appId);
    //     return true;
    //   }
    // }
  }
  // onReject = async (index) => {
  //   const dataObj = this.state.data;
  //   let selectedData = [];
  //   if (typeof index === 'undefined') {
  //     this.state.isLoaderAllReject = true;
  //     for (let i in dataObj) {
  //       if (dataObj[i].isChecked)
  //         selectedData.push(dataObj[i]);
  //     }
  //     if (selectedData.length) {
  //       let customerInfo = {
  //         pageType: "benefit registrations",
  //         selectedData:  selectedData ,
  //         status: false,
  //         remark: " test remark",
  //         sendFor: "reject"
  //       }
  //       this.setState({data:dataObj});
  //       // await this.postData("reject",customerInfo);
  //       //microsoftTeams.tasks.submitTask(customerInfo, this.props.appId);
  //       return true;
  //     }
  //   } else {
  //     dataObj[index].isLoaderReject = true;
  //     selectedData.push(dataObj[index]);
  //     if (selectedData.length) {
  //       let customerInfo = {
  //         pageType: "benefit registrations",
  //         selectedData:  selectedData ,
  //         status: false,
  //         sendFor: "reject",
  //         remark: " test remark"
  //       }
  //       this.setState({data:dataObj});
  //       // await this.postData("reject",customerInfo);
  //       //microsoftTeams.tasks.submitTask(customerInfo, this.props.appId);
  //       return true;
  //     }
  //   }
  // }
  render() {
    
    return (
      
      <div style={{padding:"1rem"}}>
        <div>
          <div style={{ overflow: "scroll",height: "471px" }}>
          <Table aria-label="Static table" style={{marginTop: "10px"}}>
          <TableRow >
                            <TableCell><BellIcon /></TableCell> 
                            <TableCell>Name</TableCell>
                            <TableCell>Leave Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
          {this.state.data && this.state.data.map((item, index) =>{
                if(!item.isActive)
                  return <TableRow key={item.key}>
                            <TableCell onClick={e=>this.toggle(index)}><ChevronEndIcon /></TableCell> 
                            <TableCell>{item.requestor_name}</TableCell>
                            <TableCell>{item.leave_category}</TableCell>
                            <TableCell>{ item.leave_status}</TableCell> 
                            <TableCell><Checkbox style={{paddingTop: "3px"}} onChange={item.isChecked} onClick={e=>this.selectItem(index)}/></TableCell>
                        </TableRow>
                else 
                  return <>
                  <TableRow key={item.key} selected>
                            <TableCell onClick={e=>this.toggle(index)}><ChevronDownIcon /></TableCell> 
                            <TableCell>{item.requestor_name}</TableCell>
                            <TableCell>{item.leave_category}</TableCell>
                            <TableCell>{ item.leave_status}</TableCell> 
                            <TableCell><Checkbox style={{paddingTop: "3px"}}  onChange={item.isChecked} onClick={e=>this.selectItem(index)} /></TableCell>
                  </TableRow>
                  <TableRow className={"child-row"} key={item.key+"child"} selected>
                      <Table className={"child-table"}>
                        <TableRow>
                          <TableCell>{"Name"}</TableCell>
                          <TableCell>{item.requestor_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{"Leave Category"}</TableCell>
                          <TableCell>{item.leave_category}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{"Leave Day"}</TableCell>
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
                          <TableCell style={{ justifyContent: "flex-end"}}>
                             <Button primary content="Approve" onClick={(e) => this.onApprove(index)}/>
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
                      <Button
                        secondary
                        content="Cancel"
                        onClick={(e) => this.cancelTaskModule()}
                      />
                      <Button
                        primary
                        content="Approve"
                        onClick={(e) => this.onApprove(undefined)}
                      />
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
  leaveHistory: state.leaveData.leaveHistory,
  leaveApprovalHistory: state.leaveData.leaveApprovalHistory

});

const mapDispatchToProps = (dispatch: any) => ({
  postTokenAction: (token: string, empId: string) =>
    dispatch(postTokenAction(token, empId)),
  getEmployeeManagerAction: (accessToken: string, empId: string) =>
    dispatch(getEmployeeManagerAction(accessToken, empId)),
  getLeaveHistory:(accessToken: string, payload: ILeaveHistoryPayload)=> dispatch(postLeaveHistoryAction(accessToken,payload)),
  postLeaveRequestApprovalHistoryAction : (access_token: string, payload:ILeaveRequestApprovalHistoryPayLaod) =>
    dispatch(postLeaveRequestApprovalHistoryAction(access_token, payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproveLeaveContainer);
