import type { Meta } from '@storybook/react';
import type { IndicatorsContainerProps } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomIndicatorsContainer',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomIndicatorsContainer() {
  return (
    <Field
      label="Custom Indicators Container"
      htmlFor="custom-indicators-container-id"
    >
      <Select
        inputId="custom-indicators-container-id"
        closeMenuOnSelect={false}
        components={{ IndicatorsContainer, IndicatorSeparator: null }}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={colourOptions}
      />
    </Field>
  );
}

function IndicatorsContainer(props: IndicatorsContainerProps) {
  return (
    <div style={{ background: colourOptions[2].color }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
}
