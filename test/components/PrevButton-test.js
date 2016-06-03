import PrevButton from '../../client/components/PrevButton.js';
var expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe("PrevButton Component", function() {
  it("renders without issue", function() {
    expect(mount(<PrevButton />).find('.prev-button').length).toBe(1);
  });

});
