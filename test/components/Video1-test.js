import Video1 from '../../client/components/Video1.js';
var expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';

describe("Video1 Component", function() {
  it("renders without issue", function() {
    expect(mount(<Video1 />).find('.video1').length).toBe(1);
  });
});
