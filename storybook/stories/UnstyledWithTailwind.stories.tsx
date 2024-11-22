import '../styles/tailwind.css';

import type { Meta } from '@storybook/react';
import { cn } from '@/utils';

import Select from 'react-select';

import { Field } from '../components/field';
import { defaultArgs } from '../data';

export default {
  title: 'Select/UnstyledWithTailwind',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template = ({ inputId = 'react-select', ...props }) => {
  return (
    <Field htmlFor={inputId} label="Unstyled With Tailwind">
      <Select
        inputId={inputId}
        {...props}
        unstyled // Remove all non-essential styles
        classNames={{
          clearIndicator: ({ isFocused }) =>
            cn(
              isFocused ? 'text-neutral-600' : 'text-neutral-200',
              'p-2',
              isFocused ? 'hover:text-neutral-800' : 'hover:text-neutral-400'
            ),
          // container: () => classNames(),
          control: ({ isDisabled, isFocused }) =>
            cn(
              isDisabled ? 'bg-neutral-50' : 'bg-white',
              isDisabled
                ? 'border-neutral-100'
                : isFocused
                  ? 'border-purple-800'
                  : 'border-neutral-200',
              'rounded border',
              isFocused && 'shadow-[0_0_0_1px] shadow-purple-800',
              isFocused ? 'hover:border-purple-800' : 'hover:border-neutral-300'
            ),
          dropdownIndicator: ({ isFocused }) =>
            cn(
              isFocused ? 'text-neutral-600' : 'text-neutral-200',
              'p-2',
              isFocused ? 'hover:text-neutral-800' : 'hover:text-neutral-400'
            ),
          group: 'py-2',
          groupHeading: () =>
            cn(
              'text-neutral-400',
              'text-xs',
              'font-medium',
              'mb-1',
              'px-3',
              'uppercase'
            ),
          indicatorSeparator: ({ isDisabled }) =>
            cn(isDisabled ? 'bg-neutral-100' : 'bg-neutral-200', 'my-2'),
          input: 'm-0.5 py-0.5 text-neutral-800',
          loadingIndicator: ({ isFocused }) =>
            cn(isFocused ? 'text-neutral-600' : 'text-neutral-200', 'p-2'),
          loadingMessage: 'text-neutral-400 py-2 px-3',
          menu: 'bg-white rounded shadow-[0_0_0_1px_rgba(0,0,0,0.1)] my-1',
          menuList: 'py-1',
          multiValue: 'bg-neutral-100 rounded-sm m-0.5',
          multiValueLabel: 'rounded-sm text-neutral-800 text-sm p-[3] pl-[6]',
          multiValueRemove: ({ isFocused }) =>
            cn(
              'rounded-sm',
              isFocused && 'bg-red-500',
              'px-1',
              'hover:bg-red-500',
              'hover:text-red-800'
            ),
          noOptionsMessage: 'text-neutral-400 py-2 px-3',
          option: ({ isOptionDisabled, isOptionFocused, isOptionSelected }) =>
            cn(
              isOptionSelected
                ? 'bg-purple-800'
                : isOptionFocused
                  ? 'bg-purple-300'
                  : 'bg-transparent',
              isOptionDisabled
                ? 'text-neutral-200'
                : isOptionSelected
                  ? 'text-white'
                  : 'text-inherit',
              'py-2',
              'px-3',
              !isOptionDisabled &&
                (isOptionSelected
                  ? 'active:bg-purple-800'
                  : 'active:bg-purple-500')
            ),
          placeholder: 'text-neutral-500 mx-0.5',
          singleValue: ({ isDisabled }) =>
            cn(isDisabled ? 'text-neutral-400' : 'text-neutral-800', 'mx-0.5'),
          valueContainer: 'py-0.5 px-2',
        }}
      />
    </Field>
  );
};

export const UnstyledWithTailwind = {
  render: Template,
  args: {
    ...defaultArgs,
  },
};
