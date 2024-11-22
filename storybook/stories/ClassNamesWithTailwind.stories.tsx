import '../styles/tailwind.css';

import type { Meta } from '@storybook/react';
import { cn } from '@/utils';
import Select from 'react-select';

import { Field } from '../components/field';
import { defaultArgs } from '../data';

export default {
  title: 'Select/ClassNamesWithTailwind',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template = ({ inputId = 'react-select', ...props }) => {
  return (
    <Field htmlFor={inputId} label="ClassNames With Tailwind">
      <Select
        inputId={inputId}
        {...props}
        classNames={{
          control: ({ isDisabled, isFocused }) =>
            cn(
              !isDisabled && isFocused && 'border-purple-800',
              isFocused && 'shadow-[0_0_0_1px] shadow-purple-800',
              isFocused && 'hover:border-purple-800'
            ),
          downChevron: () => 'text-purple-800',
          option: ({ isDisabled, isFocused, isOptionSelected }) =>
            cn(
              isOptionSelected && 'bg-purple-800',
              !isOptionSelected && isFocused && 'bg-purple-300',
              !isDisabled && isOptionSelected && 'active:bg-purple-800',
              !isDisabled && !isOptionSelected && 'active:bg-purple-500'
            ),
        }}
      />
    </Field>
  );
};

export const ClassNamesWithTailwind = {
  render: Template,
  args: {
    ...defaultArgs,
  },
};
