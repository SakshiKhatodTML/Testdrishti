import * as React from "react";
import {
  Flex,
  Text,
  Segment,
  Menu,
  Avatar,
  Button,
  Checkbox,
  Carousel,
  Image,
} from "@fluentui/react-northstar";
import {
  FilterIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@fluentui/react-icons-northstar";
 
import data from "./data";
import ApproveCard from "./ApproveCard";
import GraphComponent from "./GraphComponent";

const items = [
  {
    key: "approved",
    content: "Approved",
  },
  {
    key: "sentForApproval",
    content: "Sent For Approval",
  },
  {
    key: "rejected",
    content: "Rejected",
  },
  {
    key: "myApproval",
    content: "My Approvals",
  },
];
const covidItem = [
  {
    key: "dose1",
    content: "Dose 1 Details",
  },
  {
    key: "addDose2",
    content: "Add Dose 2 Details",
  },
];

function LeaveStatus() {
  const [myApprove, setMyApprove] = React.useState(false);
  const [people, setPeople] = React.useState(data);
  const [index, setIndex] = React.useState(0);

  const handleMyApprove = (e: any) => {
    //e.nativeEvent.toElement.innerText
    // console.log(e.nativeEvent.toElement.innerText);
    if (e.nativeEvent.toElement.innerText === "My Approvals") {
      setMyApprove(true);
    } else {
      setMyApprove(false);
    }
  };

  React.useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  return (
    <Flex
      gap="gap.small"
      className="leaveStatusContainer"
      style={{ minHeight: "95vh" }}
    >
      <Flex.Item styles={{ width: "100%" }}>
        <Segment>
          <Flex column>
            <div className="lStatusHeader">
              <div>
                <Text size="large" weight="semibold" className="fontFix">
                  Leave Status
                </Text>
              </div>
              <div className="filterContainer">
                <div>
                  <FilterIcon size="largest" />
                </div>
                <div>
                  <Text weight="semibold" className="fontFix">
                    Leave Type & Emp Name
                  </Text>
                </div>
              </div>
            </div>
            <Flex>
              <Menu
                // defaultActiveIndex={count.one}
                defaultActiveIndex={0}
                items={items}
                underlined
                primary
                onClick={(e: any) => handleMyApprove(e)}
              />
            </Flex>
            {myApprove ? (
              <div>
                <Checkbox label={<Text weight="bold">Select All</Text>} />
              </div>
            ) : null}
            <div className="lStatusContents">
              <div className="section-center">
                {people.map((person, personIndex) => {
                  const { id, image, name, title, quote } = person;

                  let position = "nextSlide";
                  if (personIndex === index) {
                    position = "activeSlide";
                  }
                  if (
                    personIndex === index - 1 ||
                    (index === 0 && personIndex === people.length - 1)
                  ) {
                    position = "lastSlide";
                  }

                  return (
                    <article className={position} key={id}>
                      <div>
                        <ApproveCard image={image} name={name} />
                      </div>
                    </article>
                  );
                })}
                <ArrowLeftIcon
                  className="prev"
                  onClick={() => setIndex(index - 1)}
                />
                <ArrowRightIcon
                  className="next"
                  onClick={() => setIndex(index + 1)}
                />
              </div>
              <div className="graphContainer">
                <GraphComponent />
              </div>
            </div>
            {myApprove ? (
              <div style={{ marginTop: "0.2rem" }}>
                <Button style={{ margin: "0 0.5rem" }}>
                  <Text color="brand" className="fontFix">
                    Approve All
                  </Text>
                </Button>
                <Button>
                  <Text color="brand" className="fontFix">
                    Reject All
                  </Text>
                </Button>
              </div>
            ) : null}
            <div className="lbreakPoint"></div>
            <div className="lCovidContainer">
              <div className="lCovidHeader">
                <div>
                  <Text size="large" weight="semibold" className="fontFix">
                    COVID Vaccination Status
                  </Text>
                </div>
                <Flex gap="gap.small" vAlign="center">
                  <div>
                    <Text color="red" weight="bold" className="fontFix">
                      Dose 2 Pending
                    </Text>
                  </div>
                </Flex>
              </div>

              <div className="lCovidMenuContainer">
                <Menu
                  defaultActiveIndex={0}
                  items={covidItem}
                  underlined
                  primary
                />
              </div>

              <div
                style={{
                  height: "19vh",
                  width: "60%",
                  marginLeft: "0.5rem",
                  marginTop: "2rem",
                }}
              >
                <Segment className="lCovidDeatailSegmentApproval">
                  <div className="vacineDetailContainer">
                    <div className="vaccineDetailElements">
                      <Text weight="bold" className="fontFix">
                        Vaccination Date
                      </Text>
                      <Text className="fontFix">23/06/2021</Text>
                    </div>
                    <div className="vaccineDetailElements">
                      <Text weight="bold" className="fontFix">
                        Brand
                      </Text>
                      <Text className="fontFix">COVISHIELD</Text>
                    </div>
                  </div>
                  <div className="lCovidbtnContainer">
                    <Button>
                      <Text className="fontFix" color="brand">
                        Edit
                      </Text>
                    </Button>
                  </div>
                </Segment>
              </div>
            </div>
          </Flex>
        </Segment>
      </Flex.Item>
    </Flex>
  );
}

export default LeaveStatus;
