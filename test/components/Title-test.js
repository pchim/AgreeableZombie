import Title from '../../client/components/Title.js';
var expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe("Title Component", function() {
  it("renders without issue", function() {
    expect(mount(<Title />).find('.title').length).toBe(1);
  });

});
