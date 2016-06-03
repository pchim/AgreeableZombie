//this is a react-test-utils test
//this style of test only works on react classes and will not work on stateless functional components

import WebCam from '../../client/components/WebCam.js';
var TestUtils = require('react-addons-test-utils');
var React = require('react');
var expect = require('expect');
var $ = require('jquery');

describe('Webcam Component', function () {
  it('renders without issue', function () {
    var root = TestUtils.renderIntoDocument(<WebCam/>);
    expect(root).toExist();
  });
});
