import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { SelectRef, ClassNamesConfig } from 'react-select';
import Select from 'react-select';

import { Field, Inline, Stack } from '../components';
import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/ControlledMenu',
  component: Select,
} as Meta<typeof Select>;

export function ControlledMenu() {
  const inputRef = React.useRef<SelectRef | null>(null);
  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false);

  function toggleMenuIsOpen() {
    setMenuIsOpen((value) => !value);
    const selectEl = inputRef.current;
    if (!selectEl) return;
    if (menuIsOpen) selectEl.blur();
    else selectEl.focus();
  }

  return (
    <Stack>
      <Inline>
        <input
          id="menu-toggle"
          type="checkbox"
          checked={menuIsOpen}
          onChange={toggleMenuIsOpen}
        />
        <label htmlFor="menu-toggle">Click to toggle menu</label>
      </Inline>
      <Field label="Controlled Menu" htmlFor="controlled-menu-id">
        <Select
          inputId="controlled-menu-id"
          ref={inputRef}
          defaultValue={colourOptions[0]}
          menuIsOpen={menuIsOpen}
          options={colourOptions}
          classNames={classNames}
        />
      </Field>
    </Stack>
  );
}

const classNames: ClassNamesConfig<ColourOption, false> = {
  menu: () => 'relative',
};
