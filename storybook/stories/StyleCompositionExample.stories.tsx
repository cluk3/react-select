import type { Meta } from '@storybook/react';
import type { OptionProps } from 'react-select';
import Select from 'react-select';

import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/StyleCompositionExample',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function StyleCompositionExample() {
  return (
    <Field label="Style Composition" htmlFor="style-composition-id">
      <Select
        inputId="style-composition-id"
        closeMenuOnSelect={false}
        components={{ Option }}
        styles={styles}
        defaultValue={colourOptions[4]}
        options={colourOptions}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  option: (base) => ({
    ...base,
    border: `1px dotted ${colourOptions[2].color}`,
    height: '100%',
  }),
};

// =============================================================================
// Components
// =============================================================================

function Option(props: OptionProps<ColourOption>) {
  return (
    <div
      ref={props.innerRef}
      css={props.getStyles('option', props)}
      className={props.cx(
        {
          option: true,
          'option--is-disabled': props.isDisabled,
          'option--is-focused': props.isFocused,
          'option--is-selected': props.isSelected,
        },
        props.className
      )}
      {...props.innerProps}
    >
      {props.children}
    </div>
  );
}
