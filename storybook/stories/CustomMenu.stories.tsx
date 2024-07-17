import type { Meta } from '@storybook/react';
import type { MenuProps } from 'react-select';
import Select, { components, useInternalSelectContext } from 'react-select';

import { Field } from '../components';
import type { ColourOption, FlavourOption, GroupedOption } from '../data';
import { colourOptions, groupedOptions } from '../data';

export default {
  title: 'Select/CustomMenu',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomMenu() {
  return (
    <Field label="Custom Menu" htmlFor="custom-menu-id">
      <Select<ColourOption | FlavourOption, false, GroupedOption>
        inputId="custom-menu-id"
        defaultValue={colourOptions[1]}
        options={groupedOptions}
        components={{ Menu }}
      />
    </Field>
  );
}

function Menu(props: MenuProps) {
  const { getFocusableOptions } = useInternalSelectContext();
  const optionsLength = getFocusableOptions().length;
  return (
    <>
      <div
        style={{
          padding: '8px 12px',
        }}
      >
        Custom Menu with {optionsLength} options
      </div>
      <components.Menu {...props} />
    </>
  );
}
