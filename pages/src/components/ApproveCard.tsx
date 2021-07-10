import * as React from "react";
import {
  Flex,
  Text,
  Segment,
  Menu,
  Avatar,
  Button,
  Checkbox,
} from "@fluentui/react-northstar"; 

interface props {
  image: string;
  name: string;
}

const ApproveCard: React.FC<props> = ({ image, name }) => {
  return (
    <Flex column className="lStatusSegmentContainer">
      <Segment>
        <div className="appStudiodesc">
          <Text size="small" weight="semibold" className="fontFix">
            App Studio
          </Text>
          <Text size="small" className="fontFix">
            18:05
          </Text>
        </div>
        <div className="lStatusFlex">
          <div>
            <Avatar size="largest" image={image} className="fontFix" />
          </div>
          <Flex column className="ldescPerson">
            <div>
              <Text weight="semibold" size="large" className="fontFix">
                {name}
              </Text>
            </div>
            <div>
              <Text size="medium" weight="semibold" className="fontFix">
                Privilege Leave
              </Text>
            </div>
            <div>
              <Text size="small" weight="light">
                From 26 March to 30 March 2021
              </Text>
            </div>
          </Flex>
        </div>
        <div className="lStatusBtn">
          <Button>
            <Text color="brand" className="fontFix">
              Chat
            </Text>
          </Button>
          <Button style={{ margin: "0 0.2rem" }}>
            <Text color="brand" className="fontFix">
              Approve
            </Text>
          </Button>
          <Button>
            <Text color="brand" className="fontFix">
              Reject
            </Text>
          </Button>
        </div>
      </Segment>
    </Flex>
  );
};

export default ApproveCard;
