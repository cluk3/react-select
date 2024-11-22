import type { Meta } from '@storybook/react';
import type { ClassNamesConfig, ClearIndicatorProps } from 'react-select';
import Select, { useGetClassNames } from 'react-select';
import { cn } from '@/utils';

import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomClearIndicator',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomClearIndicator() {
  return (
    <Field label="Custom Clear Indicator" htmlFor="custom-clear-indicator-id">
      <Select<ColourOption, true>
        id="custom-clear-indicator-id"
        components={{ ClearIndicator }}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={colourOptions}
        classNames={classNames}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const classNames: ClassNamesConfig<ColourOption, true> = {
  clearIndicator: ({ isFocused }) =>
    cn({
      'cursor-pointer': true,
      'text-blue-400': isFocused,
      'text-black': !isFocused,
    }),
};

// =============================================================================
// Components
// =============================================================================

function ClearIndicator(props: ClearIndicatorProps) {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;
  const className = useGetClassNames('clearIndicator', props);
  return (
    <div {...restInnerProps} ref={ref} className={className}>
      <span style={{ padding: '0px 5px' }}>clear all</span>
    </div>
  );
}
