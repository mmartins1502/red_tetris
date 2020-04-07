import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Grid from "../client/components/Game/Grid/Grid";

configure({ adapter: new Adapter() });

describe("<Grid />", () => {
  it("Should render one Grid with 20 lines", () => {
    const wrapper = shallow(<Grid />);
    expect(wrapper.find(Line)).toHaveLength(20);
  });

  it("Should render for each line 10 cases", () => {
    const wrapper = shallow(<Line />);
    expect(wrapper.find(Case)).toHaveLength(10);
  });

  it("Should render for each case 1 div", () => {
    const wrapper = shallow(<Case />);
    expect(wrapper.find("div")).toHaveLength(1);
  });
});
