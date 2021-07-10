import * as React from "react";
import {
  Button,
  Segment,
  Text,
  Dropdown,
  Datepicker,
  Pill,
  PillGroup,
  Flex,
  RadioGroup,
  TextArea,
  CodeSnippetIcon,
} from "@fluentui/react-northstar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SuccessToast, ErrorToast } from "./errorComponent";
import "./applyleave.css";
import { connect } from "react-redux";
import {
  getEmployeeManagerAction,
  IEmployeeManager,
  ILeaveQuota,
  ILeaveValidPayload,
  IToken,
  ILeaveValidate,
  postLeaveAction,
  postTokenAction,
  postValidLeaveAction, 
  ILeave,
} from "./../redux/actions/LeaveActions";
import { RootSchema } from "../redux/reducer";
import axios from 'axios';

interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
  leaveQuota: ILeaveQuota;
  userToken: IToken;
  leaveValid: ILeaveValidate;
  applyLeave: ILeave;
  postTokenAction: (token: string, empId: string) => void;
  postValidLeaveAction: (
    access_token: string,
    payload: ILeaveValidPayload
  ) => void;
  postLeaveAction: (access_token: string, payload: any) => void;
  userManagerData: IEmployeeManager;
  getEmployeeManagerAction: (token: string, empId: string) => void;
}
interface IState {
  data: any[];
  leaveType: string;
  leaveDay: string;
  leaveDateFrom: string;
  leaveDateTo: string;
  validation: boolean;
  remark: { text: string; error: string };
  addNewLeave: boolean;
  inputItems: string[];
  currentDate: Date;
  access_token: string;
  leaveValidData: any;
  managerData:any;
  diffDays:any;
}
enum LeaveTypeCatogary {
  "work from home" = "WFH",
  "sick leave" = "M0",
  "casual leave" = "L0",
  "privilege leave" = "P0",
}
enum LeaveTypeCode {
  "fullday" = "FD",
  "secondhalf" = "SH",
  "firsthalf" = "FH",
}
export class ApplyLeaveContainer extends React.Component<IProps, IState> {
  /**
   *
   */
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      leaveType: "Sick Leave",
      leaveDay: "fullday",
      leaveDateFrom: this.setDateDefault(),
      leaveDateTo: this.setDateDefault(),
      validation: false,
      remark: { text: "", error: "" },
      addNewLeave: false,
      inputItems: [
        "Sick Leave",
        "Work From Home",
        "Casual Leave",
        "Privilege Leave",
      ],
      currentDate: new Date(),
      access_token: "",
      leaveValidData: {},
      managerData:"",
      diffDays:"",
    };
  }

  setDateDefault = (data_ob?: Date): string => {
    let date_obj = data_ob ? data_ob : new Date();
    let date = "";
    let day = ("0" + date_obj.getDate()).slice(-2);
    let month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
    let year = date_obj.getFullYear();
    date = year + "-" + month + "-" + day;
    return date;
  };
  findDiffDate = (userData)=>{
    var difference=1; 
    var d1 = new Date(userData.leaveDateFrom);
    var d2 = new Date(userData.leaveDateTo);
    var diff; 
   
    if(userData.leaveDay==="fullday"){
      diff = d2.getTime() - d1.getTime(); 
      difference = diff / (1000 * 60 * 60 * 24)+1; 
    }
    else{
      difference=0.5;
    }
    return difference;
  }
  async componentDidMount() {
    this.props.postTokenAction(this.props.token, this.props.employeeId); 
  }
  componentWillReceiveProps(nextProps: IProps) {
    let { data, leaveValidData } = { ...this.state };
    if (nextProps.leaveValid.isSuccess) {
      // if (nextProps.leaveValid.status_code == "200"){
      //   data.push({data: leaveValidData, valid: true})
      //   this.setState({data:data});
      //   SuccessToast(nextProps.leaveValid.message);
      // }
      // else
      //   ErrorToast(nextProps.leaveValid.message);
    }
     
    let managerDetail="";
    
    if(nextProps.userManagerData.isSuccess){
      for(let i in nextProps.userManagerData.manager_details)
      {
        managerDetail=nextProps.userManagerData.manager_details[i].CompName;
      }
     
    } 
    this.setState({managerData:managerDetail});
    
  }
  
  validate = (userData) => {  
    if(userData.leaveDay !=="fullday"){
      userData.leaveDateTo=userData.leaveDateFrom;
    } 
    var diffDays = this.findDiffDate(userData); 
    var leaveData=[];
    let payload: ILeaveValidPayload = {
      emp_id: this.props.employeeId,
      data: [
        {
          leave_type_code: LeaveTypeCode[userData.leaveDay],
          approver: "509862",
          approver_email: "GIFTSON.JEYAKUMAR@TATAMOTORS.COM",
          requestor_email: "GIFTSON.JEYAKUMAR@TATAMOTORS.COM",
          from_date: userData.leaveDateFrom,
          to_date: userData.leaveDateTo,
          leave_category_code:
            LeaveTypeCatogary[String(userData.leaveType).toLowerCase()],
          leave_category_text: userData.leaveType,
          reason: userData.remark.text,
        },
      ],
    }; 
    this.setState({ leaveValidData: payload,diffDays:diffDays  }); 
    this.props.postValidLeaveAction(
      this.props.userToken.token.access_token,
      payload
    );
     
  };
  applyLeave = () => { 
    let { data } = { ...this.state };
    let { userManagerData } = { ...this.props }; 
    if (data.length) { 
      let postLeaveCollection = [];
      let payload = {}; 
      for (let k in data) {  
        postLeaveCollection.push(data[k].data.data[k]);
      } 
      payload = {
        emp_id: "509862",
        data: postLeaveCollection,
        emp_name: userManagerData.user_details[0].CompName,
        pa: userManagerData.user_details[0].PersArea,
        psa: userManagerData.user_details[0].PSubarea,
      };  
      this.props.postLeaveAction(
        this.props.userToken.token.access_token,
        payload
      );
    }
  };
  componentDidUpdate(prevProps: IProps, prevState: IState) {
    let { data, leaveValidData } = { ...this.state };
    let { leaveValid, userManagerData, applyLeave } = { ...this.props };
    if (prevProps.leaveValid.isSuccess !== leaveValid.isSuccess) {
      if (leaveValid.isSuccess && leaveValid.status_code == "200") {
        leaveValidData.data[0] = {
          ...leaveValidData.data[0],
          total_days: leaveValid.total_days,
          unique_quota_id: leaveValid.unique_quota_id,
          is_lwop: leaveValid.is_lwop,
        };
        // leaveValidData={...leaveValidData,  }
        data.push({ data: leaveValidData, valid: true });
        this.setState({ data: data, validation: true });
        SuccessToast(leaveValid.message);
      } else if (
        leaveValid.isSuccess &&
        leaveValid.status_code &&
        leaveValid.status_code !== "200"
      )
        ErrorToast(leaveValid.message);
    } 
    if (prevProps.applyLeave.isSuccess !== applyLeave.isSuccess) {
      
      if (applyLeave.isSuccess && applyLeave.status_code == "200") {
    
        SuccessToast(applyLeave.message);
      } 
      else if (applyLeave.isSuccess && applyLeave.status_code && applyLeave.status_code !== "200"){
     
        ErrorToast(applyLeave.message);
      }  
        
    }
  }
  cancelTaskModule() { 
    microsoftTeams.tasks.submitTask();
  } 
  getLeaveDay = (e, props) => {
    this.setState({ leaveDay: props.value });
  };
  getLeaveType = (item) => {
    this.setState({ leaveType: item });
  };
  checkleaveType = () => {
    if (this.state.leaveDay == "fullday") {
      return (
        <div>
          <Text color="grey" content="To" weight="light" />
          <Datepicker
            minDate={
              new Date(
                this.state.currentDate.getFullYear(),
                this.state.currentDate.getMonth(),
                this.state.currentDate.getDay(),
                0,
                0,
                0,
                0
              )
            }
            defaultSelectedDate={
              new Date(
                this.state.currentDate.getFullYear(),
                this.state.currentDate.getMonth(),
                this.state.currentDate.getDay(),
                0,
                0,
                0,
                0
              )
            }
            onDateChange={(e, v) => {
              this.setState({ leaveDateTo: this.setDateDefault(v.value) });
            }}
            today={
              new Date(
                this.state.currentDate.getFullYear(),
                this.state.currentDate.getMonth(),
                this.state.currentDate.getDay(),
                0,
                0,
                0,
                0
              )
            }
          />
        </div>
      );
    }
  };
  addNewLeave() {
    this.setState({ addNewLeave: true, validation: false });
  }
  resetLeave=()=>{
    this.setState({leaveDateFrom: this.setDateDefault(),
      leaveDateTo: this.setDateDefault(),
      validation: false,
      remark: { text: "", error: "" }})
  }
  onRemarkChange = (e) => {
    let textValue = e.target.value;
    if (String(textValue).trim() === "") {
      this.setState({ remark: { text: "", error: "Remark should not be blank"} });
    } else if (String(textValue).length == 100) {
      this.setState({
        remark: { text: textValue, error: "Remark text will not allow more then 100 characters." },
      });
    } else {
      this.setState({ remark: { text: textValue, error: "" } });
    } 
  };

  getLeaveForm() {
    return (
      <div>
        {/* <div>
              <PillGroup aria-disabled={true} aria-label="group of pill" className="btnContainer">
                <Pill style={{ minWidth: "0px" }}>PL</Pill>
                <Pill style={{ minWidth: "0px" }}>CL</Pill>
                <Pill style={{ minWidth: "0px" }}>SL</Pill>
                <Pill style={{ minWidth: "0px" }}>WFH</Pill>
              </PillGroup>
            </div> */}
        <div className="breaker"></div>
        <div className="dropdowContainer">
          <Dropdown
            items={this.state.inputItems}
            defaultValue={this.state.inputItems[0]}
            placeholder="Select Leave Type"
            getA11ySelectionMessage={{
              onAdd: (item) => `${this.getLeaveType(item)}`,
            }}
            noResultsMessage="We couldn't find any matches."
            a11ySelectedItemsMessage="Press Delete or Backspace to remove"
            fluid
          />
        </div>
        <div className="breaker"></div>

        <div className="leaveRadioBtns">
          <RadioGroup
            defaultCheckedValue="fullday"
            onCheckedValueChange={(e, props) => this.getLeaveDay(e, props)}
            items={[
              {
                key: "1",
                label: "Full Day",
                value: "fullday",
              },
              {
                key: "2",
                label: "First Half",
                value: "firsthalf",
              },
              {
                key: "3",
                label: "Second Half",
                value: "secondhalf",
              },
            ]}
          />
        </div>

        <div className="breaker"></div>
        <div className="datepickerContainer">
          <div>
            <Text color="grey" content="From" weight="light" />
            <Datepicker
              minDate={
                new Date(
                  this.state.currentDate.getFullYear(),
                  this.state.currentDate.getMonth(),
                  this.state.currentDate.getDay(),
                  0,
                  0,
                  0,
                  0
                )
              }
              defaultSelectedDate={
                new Date(
                  this.state.currentDate.getFullYear(),
                  this.state.currentDate.getMonth(),
                  this.state.currentDate.getDay(),
                  0,
                  0,
                  0,
                  0
                )
              }
              onDateChange={(e, v) => {
                this.setState({ leaveDateFrom: this.setDateDefault(v.value) });
              }}
              today={
                new Date(
                  this.state.currentDate.getFullYear(),
                  this.state.currentDate.getMonth(),
                  this.state.currentDate.getDay(),
                  0,
                  0,
                  0,
                  0
                )
              }
            />
          </div>
          {this.checkleaveType()}
        </div>
        <div className="breaker"></div>
        <div className="reasonTextAreaContainer">
          <div style={{position: "absolute"}}>
            {this.state.remark.error}
          </div>
          <div style={{paddingTop:"20px"}}>
          <TextArea
            id="text-area1"
            fluid
            style={{ height: "50px" }}
            error
            placeholder="Enter your remark"
            maxLength={100}
            value={this.state.remark.text}
            onChange={(e) => this.onRemarkChange(e)}
            required
          />
          </div>
          
        </div>
        <div>
          {this.state.validation && (
            <div className="">
              <div>
                <Segment className="approverContainer">
                  <div className="">
                    <Text
                      color="grey"
                      content="Total Days: "
                      weight="bold"
                      className=""
                    />
                  </div>
                  <div className="">
                    <Text
                      color="grey"
                      content={this.state.diffDays+" day"}
                      weight="bold"
                      className=""
                    />
                  </div>
                </Segment>
              </div>
              <div>
                <Segment className="approverContainer">
                  <div className="">
                    <Text
                      color="grey"
                      content="Note: Number of days can change in case of weekly off/holiday calendar changes "
                      weight="bold"
                      className=""
                    />
                  </div>
                </Segment>
              </div>
              <div>
                <Segment className="approverContainer">
                  <div>
                    <Text
                      color="grey"
                      content="Approver"
                      weight="bold"
                      className=""
                    />
                  </div>
                  <div className="">
                    <Text
                      color="grey"
                      content={this.state.managerData}
                      weight="bold"
                      className=""
                    />
                  </div>
                </Segment>
              </div>
              <div>
                <div>
                  <div
                    className="validateBtns"
                    style={{ paddingBottom: "10px" }}
                  >
                    <Button
                      style={{ float: "right" }}
                      content="Add Other Leave"
                      onClick={(e) => this.addNewLeave()}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{ paddingBottom: "5px" }}
                    className="validateBtns"
                  >
                    <Flex gap="gap.smaller">
                      <Button
                        secondary
                        content="Cancel"
                        onClick={(e) => this.resetLeave()}
                      />
                      <Button
                        primary
                        content="Apply"
                        onClick={(e) => this.applyLeave()}
                      />
                    </Flex>
                  </div>
                </div>
              </div>
              <div className="breaker"></div>
            </div>
          )}
        </div>
        <div>
          {!this.state.validation && (
            <div>
              <div style={{ marginTop: "10rem" }}>
                <Segment className="approverContainer">
                  <div>
                    <Text
                      color="grey"
                      content="Approver"
                      weight="bold"
                      className=""
                    />
                  </div>
                  <div className="">
                    <Text
                      color="grey"
                      content={this.state.managerData}
                      weight="bold"
                      className=""
                    />
                  </div>
                </Segment>
              </div>
              <div
                style={{display:"flex",justifyContent:"flex-end",marginTop:"0.5rem" }}
                // 
              >
                <Flex gap="gap.smaller">
                  <Button
                    secondary
                    content="Reset"
                    onClick={(e) => this.resetLeave()}
                  />
                  <Button
                    primary
                    disabled={
                      this.state.remark.text == "" ||
                      this.state.remark.error !== ""
                    }
                    content="Validation"
                    onClick={(e) => this.validate(this.state)}
                  />
                </Flex>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  render() {
    const getA11ySelectionMessage = {
      onAdd: (item) =>
        `${item} selected. Press left or right arrow keys to navigate selected items.`,
      onRemove: (item) => `${item} has been removed.`,
    };

    return (
      <div style={{ padding: "10px ", height: "100vh" }}>
        {!this.state.addNewLeave && <div>{this.getLeaveForm()}</div>}
        {this.state.addNewLeave && <div>{this.getLeaveForm()}</div>}
        <ToastContainer
          position="top-right"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootSchema) => ({
  userToken: state.leaveData.tokenData,
  userManagerData: state.leaveData.employeeManager,
  leaveQuota: state.leaveData.leaveQuota,
  leaveValid: state.leaveData.vaildLeave,
  applyLeave: state.leaveData.applyLeave,
});

const mapDispatchToProps = (dispatch: any) => ({
  postTokenAction: (token: string, empId: string) =>
    dispatch(postTokenAction(token, empId)),
  getEmployeeManagerAction: (accessToken: string, empId: string) =>
    dispatch(getEmployeeManagerAction(accessToken, empId)),
  postLeaveAction: (access_token: string, payload: any) =>
    dispatch(postLeaveAction(access_token, payload)),
  postValidLeaveAction: (access_token: string, payload: ILeaveValidPayload) =>
    dispatch(postValidLeaveAction(access_token, payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyLeaveContainer);
