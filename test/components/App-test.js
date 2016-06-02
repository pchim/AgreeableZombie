import Karma from '../../client/components/Karma.js';
var TestUtils = require('react-addons-test-utils');
var React = require('react');
var expect = require('expect');

describe('root', function () {
  it('renders without problems', function () {
    var root = TestUtils.renderIntoDocument(<Karma/>);
    expect(root).toExist();
  });
});
