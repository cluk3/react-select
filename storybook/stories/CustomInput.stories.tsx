import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import type { InputProps } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomInput',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomInput() {
  return (
    <Field label="Custom Input" htmlFor="custom-input-id">
      <Select
        inputId="custom-input-id"
        components={{ Input }}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={colourOptions}
      />
    </Field>
  );
}

function Input(props: InputProps) {
  const component = <components.Input {...props} />;
  if (props.isHidden) return component;
  return (
    <div style={{ border: `1px dotted ${colourOptions[2].color}` }}>
      <Tooltip content="Custom Input" position="top">
        {component}
      </Tooltip>
    </div>
  );
}
