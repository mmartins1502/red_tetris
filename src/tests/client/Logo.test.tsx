import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Logo from "../../client/components/UI/Logo/Logo";

configure({ adapter: new Adapter() });
const wrapper = shallow(<Logo />);
describe("Logo", () => {
  it("should render my Logo component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
