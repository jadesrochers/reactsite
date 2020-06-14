import React from 'react';
import { Circle } from '../components/circletext';
import renderer from 'react-test-renderer';

test('See if provided text ends up displayed', ()=>{
  const rslt = renderer.create(
    <Circle text="Your Text Here" />
  )
  let jsonContent = rslt.toJSON()
  expect(jsonContent).toMatchSnapshot();

})
