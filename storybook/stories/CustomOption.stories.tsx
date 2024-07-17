import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import type { ClassNamesConfig, OptionProps } from 'react-select';
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
        classNames={classNames}
      />
    </Field>
  );
}

const classNames: ClassNamesConfig<ColourOption> = {
  option: 'border border-dotted border-purple-500 h-full',
};

function Option(props: OptionProps<ColourOption>) {
  return (
    <Tooltip content="Customise your option component!" position="top" truncate>
      <components.Option {...props} />
    </Tooltip>
  );
}
