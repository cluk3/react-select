import type { Meta } from '@storybook/react';
import AsyncSelect from 'react-select/async';

import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/AsyncMulti',
  component: AsyncSelect,
} as Meta<typeof AsyncSelect>;

export function AsyncMulti() {
  return (
    <Field label="Async Multi" htmlFor="async-multi-id">
      <AsyncSelect
        inputId="async-multi-id"
        isMulti
        cacheOptions
        defaultOptions
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
