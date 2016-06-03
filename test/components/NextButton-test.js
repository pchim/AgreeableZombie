import NextButton from '../../client/components/NextButton.js';
var expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe("NextButton Component", function() {
  it("renders without issue", function() {
    expect(mount(<NextButton />).find('.next-button').length).toBe(1);
  });

});
