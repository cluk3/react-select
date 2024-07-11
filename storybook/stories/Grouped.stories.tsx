import type { Meta } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components';
import { defaultArgs, groupedOptions } from '../data';

export default {
  title: 'Select/Grouped',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template = ({ inputId = 'react-select', ...props }) => {
  return (
    <Field
      htmlFor={inputId}
      label="Grouped"
      secondaryLabel="Options can be grouped if the value of the option key is an array of options instead of a string."
    >
      <Select {...props} inputId={inputId} />
    </Field>
  );
};

export const Grouped = {
  render: Template,
  args: {
    ...defaultArgs,
    options: groupedOptions,
  },
};
