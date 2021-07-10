import * as React from "react";
import {
  Flex,
  Segment,
  ItemLayout,
  Image,
  Input,
  Loader,
  Text,
} from "@fluentui/react-northstar";
import { SearchIcon } from "@fluentui/react-icons-northstar";
 

function TeamMember() {
  return (
    <Flex style={{ minHeight: "40vh" }}>
      <Segment className="teamSegmentMember">
        <Flex column gap="gap.small">
          <Flex gap="gap.small" column>
            <div>
              <Text className="headerFont">Your Team Members</Text>
            </div>
            <div className="inputteamMember">
              <Input
                icon={<SearchIcon size="large" />}
                placeholder="Search..."
                fluid
              />
            </div>
          </Flex>
          <Flex column>
            <Flex gap="gap.small" vAlign="center">
              <Flex className="imageTeamMember">
                <Image
                  avatar
                  src={
                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
                  }
                  fluid
                />
              </Flex>
              <Flex>
                <Text weight="bold" className="fontFix">
                  Alexa Stallon
                </Text>
              </Flex>
            </Flex>

            <Flex gap="gap.small" vAlign="center">
              <Flex className="imageTeamMember">
                <Image
                  avatar
                  src={
                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
                  }
                  fluid
                />
              </Flex>
              <Flex>
                <Text weight="bold" className="fontFix">
                  Alexa Stallon
                </Text>
              </Flex>
            </Flex>

            <Flex gap="gap.small" vAlign="center">
              <Flex className="imageTeamMember">
                <Image
                  avatar
                  src={
                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
                  }
                  fluid
                />
              </Flex>
              <Flex>
                <Text weight="bold" className="fontFix">
                  Alexa Stallon
                </Text>
              </Flex>
            </Flex>

            <Flex gap="gap.small" vAlign="center">
              <Flex className="imageTeamMember">
                <Image
                  avatar
                  src={
                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
                  }
                  fluid
                />
              </Flex>
              <Flex>
                <Text weight="bold" className="fontFix">
                  Alexa Stallon
                </Text>
              </Flex>
            </Flex>
            <Flex gap="gap.small" vAlign="center">
              <Flex className="imageTeamMember">
                <Image
                  avatar
                  src={
                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
                  }
                  fluid
                />
              </Flex>
              <Flex>
                <Text weight="bold" className="fontFix">
                  Alexa Stallon
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Segment>
    </Flex>
  );
}

export default TeamMember;
