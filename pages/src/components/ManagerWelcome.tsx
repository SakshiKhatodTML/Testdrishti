import * as React from "react";
import { Flex, Text, Segment, Avatar } from "@fluentui/react-northstar";
import { CalendarIcon, ChatIcon } from "@fluentui/react-icons-northstar";
import CardComponent from "./CardComponent";
 

const ManagerWelcome = () => {
  return (
    <Flex style={{ minHeight: "25vh", marginTop: "1rem" }}>
      <CardComponent title="Your Manager">
        <div>
          <Flex vAlign="center" gap="gap.large">
            <div className="managerImageContainer">
              <Avatar
                image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg"
                size="larger"
              />
            </div>
            <div className="managerDetail">
              <Flex column>
                <Text className="fontFix">David Thomas</Text>
                <div className="teamManagerPosition">
                  <Text color="brand" className="fontFix">
                    Product Manager
                  </Text>
                </div>
              </Flex>
            </div>
          </Flex>
          <Flex gap="gap.small" style={{ marginTop: "1rem" }} hAlign="center">
            <Flex>
              <CalendarIcon size="large" />
            </Flex>
            <Flex>
              <ChatIcon size="large" />
            </Flex>
          </Flex>
        </div>
      </CardComponent>
    </Flex>
  );
};

export default ManagerWelcome;
