import type { Meta } from '@storybook/react';
import AsyncSelect from 'react-select/async';
import { Field } from '../components';

import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/AsyncSelectWithDefaultOptions',
  component: AsyncSelect,
  argTypes: {},
} as Meta<typeof AsyncSelect>;

export function AsyncSelectWithDefaultOptions() {
  return (
    <Field
      label="Async Select With Default Options"
      htmlFor="async-select-with-default-options-id"
    >
      <AsyncSelect
        inputId="async-select-with-default-options-id"
        cacheOptions={false}
        defaultOptions={colourOptions}
        loadOptions={promiseOptions}
      />
    </Field>
  );
}

// =============================================================================
// Utils
// =============================================================================

function filterColors(inputValue: string) {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

function promiseOptions(inputValue: string) {
  return new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });
}
