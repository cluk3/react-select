import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { DropdownIndicatorProps } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomDropdownIndicator',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomDropdownIndicator() {
  return (
    <Field label="Custom Menu List" htmlFor="custom-menu-list-id">
      <Select
        inputId="custom-menu-list-id"
        components={{ DropdownIndicator }}
        options={colourOptions}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function DropdownIndicator(props: DropdownIndicatorProps) {
  return (
    <components.DropdownIndicator {...props}>
      <EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} />
    </components.DropdownIndicator>
  );
}
