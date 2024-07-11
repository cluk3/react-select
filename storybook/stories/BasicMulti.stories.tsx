import type { Meta } from '@storybook/react';
import Select from 'react-select';

import { Field } from '../components';
import { colourOptions, defaultArgs } from '../data';

export default {
  title: 'Select/BasicMulti',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template = ({ inputId = 'react-select', ...props }) => {
  return (
    <Field htmlFor={inputId} label="Basic Multi Select">
      <Select inputId={inputId} {...props} />
    </Field>
  );
};

export const BasicMulti = {
  render: Template,
  args: {
    ...defaultArgs,
    defaultValue: [colourOptions[0], colourOptions[1], colourOptions[2]],
    isMulti: true,
    hideSelectedOptions: false,
    // menuIsOpen: true,
    // options: Array.from({ length: 1000 }, (_, i) => ({
    //   label: `Option ${i}`,
    //   value: `option-${i}`,
    // })),
  },
};
