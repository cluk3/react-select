import type { Meta } from '@storybook/react';
import type { ControlProps } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomControl',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomControl() {
  return (
    <Field label="Custom Control" htmlFor="custom-control-id">
      <Select
        inputId="custom-control-id"
        components={{ Control: ControlComponent }}
        defaultValue={colourOptions[0]}
        options={colourOptions}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function ControlComponent(props: ControlProps) {
  return (
    <div
      style={{
        border: '1px solid black',
        padding: '5px',
        background: colourOptions[2].color,
        color: 'white',
      }}
    >
      <components.Control {...props} />
      <p>This is the Custom Control</p>
    </div>
  );
}
