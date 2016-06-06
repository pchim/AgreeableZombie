//this is an enzyme test
//https://github.com/airbnb/enzyme

import App from '../../client/components/App.js';
const expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';

describe("App Component", function() {
  it("renders without issue", function() {
    expect(mount(<App />).find('.app').length).toBe(0);
  });
});
