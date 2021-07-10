import * as React from "react";

import { Doughnut } from "react-chartjs-2";

const state = {
  // labels: ["January", "February", "March"],

  datasets: [
    {
      label: "Rainfall",

      backgroundColor: ["#6264A7", "#A6A7DC", "#605E5C"],

      hoverBackgroundColor: ["#6264A7", "#A6A7DC", "#605E5C"],

      data: [65, 59, 80],
    },
  ],
};

class GraphComponent extends React.Component {
  render() {
    return (
      <>
        <div
          style={{
            position: "relative",
            height: "12rem",
            width: "10vw",
          }}
        >
          <Doughnut
            data={state}
            type="Doughnut"
            options={{
              title: {
                display: true,

                text: "Average Rainfall per month",

                fontSize: 20,
              },

              responsive: true,
              maintainAspectRatio: false,

              legend: {
                display: true,

                position: "bottom",
              },
            }}
          />
        </div>
      </>
    );
  }
}

export default GraphComponent;
