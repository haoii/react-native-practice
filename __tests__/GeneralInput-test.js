import React from 'react';
import GeneralInput from '../src/RX_account/forms/GeneralInput';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<GeneralInput />).toJSON();
  expect(tree).toMatchSnapshot();
});