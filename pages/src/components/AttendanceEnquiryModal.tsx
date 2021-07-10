import * as React from "react";
import {
  Portal,
  Avatar,
  Text,
  Flex,
  Button,
  Dropdown,
  Table,
  Dialog,
  TableRow,
  TableCell,
} from "@fluentui/react-northstar";
import { CloseIcon } from "@fluentui/react-icons-northstar";
import ColorDecoding from "./ColorDecoding";
import { connect } from "react-redux";
import { RootSchema } from "../redux/reducer";
import {
  postAttendanceAction,
  IAttendancePayload,
  IAttendanceList,
} from "./../redux/actions/AttendanceAction";
import { postTokenAction, IToken } from "./../redux/actions/LeaveActions";

interface IState {
  // text: string;
  open: boolean;
  visible: boolean;
  access_token: string;
  rows: any;
}
interface IProps {
  employeeId: string;
  token: string;
  domain: string;
  appId: string;
  attendance: IAttendanceList;
  parentState: RootSchema;
  postAttendanceAction: (
    access_token: string,
    payload: IAttendancePayload
  ) => void;
  postTokenAction: (token: string, empId: string) => void;
}
const inputItems = [
  "January",
  "Febraury",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class AttendanceEnquiryModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
      visible: false,
      access_token: "",
      rows: [],
    };
  }

  async componentDidMount() {
    this.props.postTokenAction(this.props.token, this.props.employeeId);
  }
  validate = () => {
    let d = new Date();
    let month = d.getMonth().toString();
    let year = d.getFullYear().toString();
    if (month.length === 1) {
      month = "0" + month;
    }

    const payload = {
      emp_id: this.props.employeeId,
      month,
      year,
    };
    if (this.props.parentState.leaveData.tokenData.isSuccess) {
      console.log("parent token triggered");
      console.log(
        this.props.parentState.leaveData.tokenData.token.access_token
      );
      this.props.postAttendanceAction(
        this.props.parentState.leaveData.tokenData.token.access_token,
        payload
      );
    }
  };
  componentDidUpdate(prevProps: IProps, prevState: IState) {
    console.log(prevProps);
    console.log(prevState);
    let row = [];
    let key = "";
    if (prevProps.attendance.isSuccess !== this.props.attendance.isSuccess) {
      // console.log(this.props.attendance.attendance_enquiry_details);

      for (let value in this.props.attendance.attendance_enquiry_details) {
        let items = [
          this.props.attendance.attendance_enquiry_details[value].LDATE,
          this.props.attendance.attendance_enquiry_details[value].SWIPE_IN,
          this.props.attendance.attendance_enquiry_details[value].SWIPE_OUT,
          this.props.attendance.attendance_enquiry_details[value].SHIFT,
          this.props.attendance.attendance_enquiry_details[value].DAY_TYPE,
          this.props.attendance.attendance_enquiry_details[value].FH,
          this.props.attendance.attendance_enquiry_details[value].SH,
        ];

        key = value;
        row.push({ key, items });
      }
      this.setState({ rows: row });
    }

    // console.log(row);
  }
  render() {
    console.log(this.props.parentState.leaveData);

    return (
      <div>
        <Dialog
          open={this.state.open}
          onOpen={() => this.setState({ open: true })}
          content={
            <div className="modalContainer">
              <Flex column>
                <div className="enquiryHeader">
                  <div>
                    <Text weight="bold" size="large">
                      Attendance Enquiry Detail
                    </Text>
                  </div>

                  <div
                    className="closePortal"
                    onClick={() => this.setState({ open: false })}
                  >
                    <CloseIcon />
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ marginLeft: "1rem" }}>
                    <Button
                      primary
                      onClick={() =>
                        this.setState({ visible: !this.state.visible })
                      }
                    >
                      {!this.state.visible ? "Color Coding" : "Table View"}
                    </Button>
                  </div>
                  <div>
                    <Dropdown
                      items={inputItems}
                      placeholder="Select Your Month"
                      checkable
                      getA11ySelectionMessage={{
                        onAdd: (item) => `${item} has been selected.`,
                      }}
                    />
                  </div>
                </div>
                <div className="underline"></div>
                {!this.state.visible ? (
                  <div className="tableContainer">
                    <div>
                      <div style={{ overflow: "scroll", height: "471px" }}>
                        <Table
                          aria-label="Static table"
                          style={{ marginTop: "10px" }}
                        >
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>In Time</TableCell>
                            <TableCell>Out Time</TableCell>
                            <TableCell>Shift</TableCell>
                            <TableCell>Day Type</TableCell>
                            <TableCell>First Half</TableCell>
                            <TableCell>Second Half</TableCell>
                          </TableRow>

                          {/* {this.state.rows && this.state.rows.map((item, index) =>{ */}
                          {this.state.rows &&
                            this.state.rows.map((item, index) => {
                              return (
                                <TableRow key={item.key}>
                                  <TableCell>{item.items[0]}</TableCell>
                                  <TableCell>{item.items[1]}</TableCell>
                                  <TableCell>{item.items[2]}</TableCell>
                                  <TableCell>{item.items[3]}</TableCell>
                                  <TableCell>{item.items[4]}</TableCell>
                                  <TableCell>{item.items[5]}</TableCell>
                                  <TableCell>{item.items[6]}</TableCell>
                                </TableRow>
                              );
                            })}
                        </Table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ColorDecoding />
                  // <h1>Hii</h1>
                )}
              </Flex>
            </div>
          }
          trigger={
            <Text
              color="brand"
              weight="semibold"
              styles={{ width: "100%" }}
              className="leaveOptionText"
              onClick={() => this.validate()}
            >
              Attendance Enquiry Detail
            </Text>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootSchema) => ({
  attendance: state.attendanceData.attendance,
  parentState: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  postAttendanceAction: (accessToken: string, payload: IAttendancePayload) =>
    dispatch(postAttendanceAction(accessToken, payload)),
  postTokenAction: (token: string, empId: string) =>
    dispatch(postTokenAction(token, empId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceEnquiryModal);
