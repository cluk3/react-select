import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { OptionProps, StylesConfig } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomOption',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomOption() {
  return (
    <Field label="Custom Option" htmlFor="custom-option-id">
      <Select
        inputId="custom-option-id"
        components={{ Option }}
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
  option: (base) => ({
    ...base,
    border: `1px dotted ${colourOptions[2].color}`,
    height: '100%',
  }),
};

// =============================================================================
// Components
// =============================================================================

function Option(props: OptionProps<ColourOption>) {
  return (
    <Tooltip content="Customise your option component!" position="top" truncate>
      <components.Option {...props} />
    </Tooltip>
  );
}
