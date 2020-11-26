import * as React from "react";
import * as ReactDOM from "react-dom";
import DockPanel from "lumino-dockpanel-react";
import "./index.css";

const layout: any = {
  main: {
    type: "split-area",
    orientation: "vertical",
    children: [
      {
        type: "split-area",
        orientation: "horizontal",
        children: [
          {
            type: "tab-area",
            widgets: ["yellow"],
            currentIndex: 0,
          },
          {
            type: "tab-area",
            widgets: ["blue"],
            currentIndex: 0,
          },
        ],
        sizes: [0.5, 0.5],
      },
      {
        type: "tab-area",
        widgets: ["red"],
        currentIndex: 0,
      },
    ],
    sizes: [0.5, 0.5],
  },
};

const App = (): React.ReactElement => {
  return (
    <DockPanel onLayoutChange={console.log} layout={layout}>
      <div key="yellow" title="Yellow Title" className="yellow"></div>
      <div key="red" title="Red Title" className="red"></div>
      <div key="blue" className="blue"></div>
    </DockPanel>
  );
};
window.addEventListener("load", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
