import * as React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

function ColorDecoding() {
  return (
    <div style={{ textAlign: "center" }}>
      <DayPicker
        initialMonth={new Date(2021, 6)}
        selectedDays={[
          new Date(2021, 6, 12),
          new Date(2021, 6, 2),
          {
            after: new Date(2021, 6, 4),
            before: new Date(2021, 6, 25),
          },
        ]}
      />
      {/* <h1>Hii</h1> */}
    </div>
  );
}

export default ColorDecoding;
