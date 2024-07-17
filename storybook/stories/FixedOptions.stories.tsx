import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { ActionMeta, ClassNamesConfig, OnChangeValue } from 'react-select';
import Select from 'react-select';
import { Field } from '../components';

import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/FixedOptions',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function FixedOptions() {
  const [value, setValue] = React.useState<readonly ColourOption[]>(
    orderOptions([colourOptions[0], colourOptions[1], colourOptions[3]])
  );

  function handleChange(
    newValue: OnChangeValue<ColourOption, true>,
    actionMeta: ActionMeta<ColourOption>
  ) {
    switch (actionMeta.action) {
      case 'remove-value':
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        newValue = colourOptions.filter((v) => v.isFixed);
        break;
    }

    setValue(orderOptions(newValue));
  }

  return (
    <Field label="Fixed options" htmlFor="fixed-options-id">
      <Select
        inputId="fixed-options-id"
        isClearable={value.some((v) => !v.isFixed)}
        isMulti
        onChange={handleChange}
        options={colourOptions}
        classNames={classNames}
        value={value}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const classNames: ClassNamesConfig<ColourOption, true> = {
  multiValue: ({ data }) => (data.isFixed ? 'bg-gray-300' : ''),
  multiValueLabel: ({ data }) =>
    data.isFixed ? 'font-bold text-white pr-1.5' : '',
  multiValueRemove: ({ data }) => (data.isFixed ? 'hidden' : ''),
};

// =============================================================================
// Utils
// =============================================================================

function orderOptions(values: readonly ColourOption[]) {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
}
