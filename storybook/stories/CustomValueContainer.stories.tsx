import type { Meta } from '@storybook/react';
import type { StylesConfig, ValueContainerProps } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomValueContainer',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomValueContainer() {
  return (
    <Field label="Custom Value Container" htmlFor="custom-value-container-id">
      <Select
        inputId="custom-value-container-id"
        components={{ ValueContainer }}
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
  singleValue: (base) => ({ ...base, color: 'white' }),
  valueContainer: (base) => ({
    ...base,
    background: colourOptions[2].color,
    color: 'white',
    width: '100%',
  }),
};

// =============================================================================
// Components
// =============================================================================

function ValueContainer({
  children,
  ...props
}: ValueContainerProps<ColourOption>) {
  return (
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  );
}
