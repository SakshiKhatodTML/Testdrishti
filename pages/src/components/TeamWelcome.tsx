import * as React from "react";
import { Flex, Text, Segment, Avatar } from "@fluentui/react-northstar";
import { CalendarIcon, ChatIcon } from "@fluentui/react-icons-northstar";
import CardComponent from "./CardComponent";
 

const TeamWelcome = () => {
  return (
    <Flex className="teamWelcomeContainer" style={{ minHeight: "25vh" }}>
      <Flex.Item>
        <CardComponent title="Welcome!">
          <div>
            <Flex vAlign="center" gap="gap.large">
              <div className="imageContainer">
                <Avatar
                  image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
                  size="larger"
                />
              </div>
              <div className="teamPersonName">
                <Text className="fontFix">George Paul</Text>
              </div>
            </Flex>
            <Flex hAlign="center">
              <Text color="brand" className="fontFix">
                Tech Lead
              </Text>
            </Flex>
          </div>
        </CardComponent>
      </Flex.Item>
    </Flex>
  );
};

export default TeamWelcome;
