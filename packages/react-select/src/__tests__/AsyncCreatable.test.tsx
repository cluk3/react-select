import React from 'react';
import '@testing-library/jest-dom';

import AsyncCreatable from '../AsyncCreatable';
import { type Option, OPTIONS } from './constants';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('defaults - snapshot', () => {
  const { container } = render(<AsyncCreatable />);
  expect(container).toMatchSnapshot();
});

test('creates an inner Select', () => {
  const { container } = render(
    <AsyncCreatable className="react-select" classNamePrefix="react-select" />
  );
  expect(container.querySelector('.react-select')).toBeInTheDocument();
});

test('render decorated select with props passed', () => {
  const { container } = render(
    <AsyncCreatable className="foo" classNamePrefix="foo" />
  );
  expect(container.querySelector('.foo')).toBeInTheDocument();
});

test('to show the create option in menu', async () => {
  const user = userEvent.setup();

  let { container, rerender } = render(
    <AsyncCreatable className="react-select" classNamePrefix="react-select" />
  );
  let input = container.querySelector('input.react-select__hidden-input');
  rerender(
    <AsyncCreatable
      className="react-select"
      classNamePrefix="react-select"
      inputValue="a"
    />
  );
  await user.type(input!, 'a');
  expect(container.querySelector('.react-select__option')!.textContent).toBe(
    'Create "a"'
  );
});

test('to show loading and then create option in menu', async () => {
  let loadOptionsSpy = vi.fn(
    (inputValue: string, callback: (options: readonly Option[]) => void) => {
      setTimeout(() => callback(OPTIONS), 200);
    }
  );
  const user = userEvent.setup();
  let { container } = render(
    <AsyncCreatable
      className="react-select"
      classNamePrefix="react-select"
      loadOptions={loadOptionsSpy}
    />
  );
  let input = container.querySelector('input.react-select__hidden-input');
  await user.type(input!, 'a');

  // to show a loading message while loading options
  expect(container.querySelector('.react-select__menu')!.textContent).toBe(
    'Loading...'
  );
  await waitFor(() => {
    // show create options once options are loaded
    let options = container.querySelectorAll('.react-select__option');
    expect(options[options.length - 1].textContent).toBe('Create "a"');
  });
});
