import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { ClearIndicatorProps, StylesConfig } from 'react-select';
import Select from 'react-select';

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
      <Select
        id="custom-clear-indicator-id"
        components={{ ClearIndicator }}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={colourOptions}
        styles={styles}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  clearIndicator: (base, state) => ({
    ...base,
    cursor: 'pointer',
    color: state.isFocused ? 'blue' : 'black',
  }),
};

// =============================================================================
// Components
// =============================================================================

function ClearIndicator(props: ClearIndicatorProps<ColourOption, true>) {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props) as React.CSSProperties}
    >
      <span style={{ padding: '0px 5px', color: colourOptions[2].color }}>
        clear all
      </span>
    </div>
  );
}
