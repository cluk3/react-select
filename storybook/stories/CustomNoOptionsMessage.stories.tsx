import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { NoticeProps, StylesConfig } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomNoOptionsMessage',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomNoOptionsMessage() {
  return (
    <Field
      label="Custom No Options Message"
      htmlFor="custom-no-options-message-id"
    >
      <Select
        inputId="custom-no-options-message-id"
        components={{ NoOptionsMessage }}
        styles={styles}
        options={[]}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig = {
  noOptionsMessage: (base) => ({
    ...base,
    background: colourOptions[2].color,
    color: 'white',
  }),
};

// =============================================================================
// Components
// =============================================================================

function NoOptionsMessage(props: NoticeProps) {
  return (
    <Tooltip content="Custom NoOptionsMessage Component">
      <components.NoOptionsMessage {...props} />
    </Tooltip>
  );
}
