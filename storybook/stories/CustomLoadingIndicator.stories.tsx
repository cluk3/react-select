import Spinner from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import type { LoadingIndicatorProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomLoadingIndicator',
  component: AsyncSelect,
  argTypes: {},
} as Meta<typeof AsyncSelect>;

export function CustomLoadingIndicator() {
  return (
    <Field
      label="Custom Loading Indicator"
      htmlFor="custom-loading-indicator-id"
    >
      <AsyncSelect
        inputId="custom-loading-indicator-id"
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        components={{ LoadingIndicator }}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function LoadingIndicator(props: LoadingIndicatorProps) {
  return (
    <Tooltip content="Custom Loader">
      <Spinner {...props} delay={0} />
    </Tooltip>
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
