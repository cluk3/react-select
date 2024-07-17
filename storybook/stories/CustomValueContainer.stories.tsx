import type { Meta } from '@storybook/react';
import type { ClassNamesConfig, ValueContainerProps } from 'react-select';
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
        classNames={classNames}
      />
    </Field>
  );
}

const classNames: ClassNamesConfig<ColourOption> = {
  singleValue: 'text-white',
  valueContainer: 'bg-purple-500 text-white w-full',
};

function ValueContainer({ children, ...props }: ValueContainerProps) {
  return (
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  );
}
