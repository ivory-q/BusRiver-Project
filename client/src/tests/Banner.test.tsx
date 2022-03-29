import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from '../container/Banner';

test('renders learn react link', () => {
  render(<Banner ><></></Banner >);
  const titleElement = screen.getByText(/Let's Drive/i);
  expect(titleElement).toBeInTheDocument();
});
