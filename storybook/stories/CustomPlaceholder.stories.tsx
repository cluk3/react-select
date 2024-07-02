import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { PlaceholderProps, StylesConfig } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomPlaceholder',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomPlaceholder() {
  return (
    <Field label="Custom Placeholder" htmlFor="custom-placeholder-id">
      <Select
        inputId="custom-placeholder-id"
        components={{ Placeholder }}
        options={colourOptions}
        placeholder={'custom placeholder component'}
        styles={styles}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  placeholder: (base) => ({
    ...base,
    fontSize: '1em',
    color: colourOptions[2].color,
    fontWeight: 400,
  }),
};

// =============================================================================
// Components
// =============================================================================

function Placeholder(props: PlaceholderProps<ColourOption>) {
  return <components.Placeholder {...props} />;
}
