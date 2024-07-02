import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { SingleValueProps, StylesConfig } from 'react-select';
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
        styles={styles}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  singleValue: (base) => ({
    ...base,
    padding: 5,
    borderRadius: 5,
    background: colourOptions[2].color,
    color: 'white',
    display: 'flex',
  }),
};

// =============================================================================
// Components
// =============================================================================

function SingleValue({ children, ...props }: SingleValueProps<ColourOption>) {
  return <components.SingleValue {...props}>{children}</components.SingleValue>;
}
