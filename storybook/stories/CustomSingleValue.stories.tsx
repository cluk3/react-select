import type { Meta } from '@storybook/react';
import type { ClassNamesConfig, SingleValueProps } from 'react-select';
import Select, { components } from 'react-select';
import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomSingleValue',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomSingleValue() {
  return (
    <Field label="Custom Single Value" htmlFor="custom-single-value-id">
      <Select
        inputId="custom-single-value-id"
        components={{ SingleValue }}
        defaultValue={colourOptions[0]}
        isClearable
        isSearchable
        options={colourOptions}
        classNames={classNames}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const classNames: ClassNamesConfig<ColourOption> = {
  singleValue: 'p-1 flex text-white rounded-md bg-purple-500',
};

// =============================================================================
// Components
// =============================================================================

function SingleValue({ children, ...props }: SingleValueProps<ColourOption>) {
  return <components.SingleValue {...props}>{children}</components.SingleValue>;
}
