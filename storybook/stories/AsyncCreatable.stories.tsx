import type { Meta } from '@storybook/react';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/AsyncCreatable',
  component: AsyncCreatableSelect,
} as Meta<typeof AsyncCreatableSelect>;

export function AsyncCreatable() {
  return (
    <Field label="Async Creatable" htmlFor="async-creatable-id">
      <AsyncCreatableSelect
        inputId="async-creatable-id"
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
    </Field>
  );
}

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
