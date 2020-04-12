import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Grid from "../../client/components/Game/Grid/Grid";
import { Board } from "../../Shared/models/Board";

configure({ adapter: new Adapter() });

describe("<Grid />", () => {
  let wrapper: any, props: any;
  beforeEach(() => {
    props = {
      board: new Board("L")
    };
    wrapper = shallow(<Grid {...props} />);
  });
  it("Should render one Grid", () => {
    expect(wrapper.find('.Grid')).toHaveLength(1);
  })

  it("Should render one Grid with 20 lines", () => {
    expect(wrapper.find(".Line")).toHaveLength(20);
  });

  it("Should render for each line 200 cases", () => {
    expect(wrapper.find(".Case")).toHaveLength(200);
  });

});
