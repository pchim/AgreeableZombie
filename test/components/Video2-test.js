//this is a react-test-utils test


//
import Video2 from '../../client/components/Video2.js';
var expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';

describe("Video2 Component", function() {
  it("renders without issue", function() {
    expect(mount(<Video2 />).find('.video2').length).toBe(1);
  });

});
