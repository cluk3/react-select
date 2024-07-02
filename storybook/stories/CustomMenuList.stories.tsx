import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { MenuListProps } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import type { ColourOption, FlavourOption, GroupedOption } from '../data';
import { colourOptions, groupedOptions } from '../data';

export default {
  title: 'Select/CustomMenuList',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomMenuList() {
  return (
    <Field label="Custom Menu List" htmlFor="custom-menu-list-id">
      <Select<ColourOption | FlavourOption, false, GroupedOption>
        inputId="custom-menu-list-id"
        defaultValue={colourOptions[1]}
        options={groupedOptions}
        components={{ MenuList }}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function MenuList(
  props: MenuListProps<ColourOption | FlavourOption, false, GroupedOption>
) {
  return (
    <components.MenuList {...props}>
      <div
        style={{
          background: colourOptions[2].color,
          color: 'white',
          padding: '8px 12px',
        }}
      >
        Custom Menu List
      </div>
      {props.children}
    </components.MenuList>
  );
}
