import Book from '../../client/components/Book.js';
var expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe("Book Component", function() {
  it("renders without issue", function() {
    expect(mount(<Book />).find('.book').length).toBe(1);
  });

});
