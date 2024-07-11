import type { Meta } from '@storybook/react';
import Select from 'react-select';

import { Field } from '../components';
import { defaultArgs } from '../data';

export default {
  title: 'Select/BasicSingle',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template = ({ inputId = 'react-select', ...props }) => {
  return (
    <Field htmlFor={inputId}>
      <Select inputId={inputId} {...props} />
    </Field>
  );
};

export const BasicSingle = {
  render: Template,
  args: {
    ...defaultArgs,
    closeMenuOnSelect: false,
  },
};
