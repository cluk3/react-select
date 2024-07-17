import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { ClassNamesConfig } from 'react-select';
import Select from 'react-select';
import { Field } from '../components';

import type { StateOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/MenuBuffer',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function MenuBuffer() {
  return (
    <Field
      label="Menu Buffer"
      secondaryLabel="Using the style API to replace `menuBuffer`"
      htmlFor="menu-buffer-id"
    >
      <Select
        defaultValue={colourOptions[0]}
        options={colourOptions}
        classNames={classNames}
      />
    </Field>
  );
}

const classNames: ClassNamesConfig<StateOption, false> = {
  menu: 'mb-[76px]',
};
