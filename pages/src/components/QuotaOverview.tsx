import * as React from "react";
import { Flex, Text, Segment } from "@fluentui/react-northstar";

interface quotaProps {
  quotaName: string;
  quotaNumber: string;
}

const QuotaOption: React.FC<quotaProps> = ({ quotaName, quotaNumber }) => {
  return (
    <div className="quotaOptionParent">
      <div className="quotaOption">
        <Text weight="semibold" color="brand" className="quotaName">
          {quotaName}
        </Text>
        <Text weight="semibold" className="qoutaNo">
          {quotaNumber}
        </Text>
      </div>
    </div>
  );
};

function QuotaOverview() {
  return (
    <div className="quotaOverviewContainer">
      <Segment className="leavequotaSegmentContainer">
        <div className="quotaHeader">
          <Text
            color="grey"
            weight="semibold"
            size="large"
            className="headerQouta"
          >
            Quota Overview
          </Text>
        </div>
        <div className="quotaOptionContainer">
          <QuotaOption quotaName="Privilege Leaves:" quotaNumber="3.0/9.0" />
          <QuotaOption quotaName="Casual Leaves:" quotaNumber="3.0/9.0" />
          <QuotaOption quotaName="Paternal Leaves:" quotaNumber="3.0/9.0" />
          <QuotaOption quotaName="Sick Leaves:" quotaNumber="3.0/9.0" />
          <QuotaOption quotaName="WFH:" quotaNumber="3.0/9.0" />
        </div>
      </Segment>
    </div>
  );
}

export default QuotaOverview;
