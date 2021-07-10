import * as React from "react";
import { Button, Dialog, Flex, Text } from "@fluentui/react-northstar";
import { CloseIcon } from "@fluentui/react-icons-northstar";

interface props {
  text: string;
  children: any;
}

const ModalComponent: React.FC<props> = ({ text, children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Dialog
        open={open}
        onOpen={() => setOpen(true)}
        content={children}
        style={{ height: "700px", width: "600px" }}
        headerAction={{
          icon: <CloseIcon />,
          title: "Close",
          onClick: () => setOpen(false),
        }}
        trigger={
          <Text
            color="brand"
            weight="semibold"
            styles={{ width: "100%" }}
            className="leaveOptionText"
          >
            {text}
          </Text>
        }
      />
    </div>
  );
};

export default ModalComponent;
