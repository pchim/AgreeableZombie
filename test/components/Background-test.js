import Background from '../../client/components/Background.js';
var expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe("Background Component", function() {
  it("renders without issue", function() {
    expect(mount(<Background />).find('.background').length).toBe(1);
  });

});
