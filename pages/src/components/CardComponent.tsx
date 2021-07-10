import * as React from "react";
import { Flex, Text, Segment, Avatar } from "@fluentui/react-northstar";
 

interface props {
  title: string;
  children: React.ReactNode;
}

const CardComponent: React.FC<props> = ({ title, children }) => {
  return (
    <Segment className="cardSegment" styles={{ width: "100%" }}>
      <div className="welcomeHeader">
        <Text weight="semibold" className="fontFix">
          {title}
        </Text>
      </div>
      {children}
    </Segment>
  );
};

export default CardComponent;
