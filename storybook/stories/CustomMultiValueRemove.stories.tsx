import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { ClassNamesConfig, MultiValueRemoveProps } from 'react-select';
import Select, { components } from 'react-select';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';
import { Field } from '../components';

export default {
  title: 'Select/CustomMultiValueRemove',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomMultiValueRemove() {
  return (
    <Field
      label="Custom Multi Value Remove"
      htmlFor="custom-multi-value-remove-id"
    >
      <Select<ColourOption, true>
        inputId="custom-multi-value-remove-id"
        components={{ MultiValueRemove }}
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
  multiValueRemove: 'border border-dotted border-purple-500 h-full',
};

function MultiValueRemove(props: MultiValueRemoveProps<ColourOption>) {
  return (
    <Tooltip content={'Customise your multi-value remove component!'} truncate>
      <components.MultiValueRemove {...props}>
        <EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} />
      </components.MultiValueRemove>
    </Tooltip>
  );
}
