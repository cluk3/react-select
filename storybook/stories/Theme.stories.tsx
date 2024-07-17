import type { Meta } from '@storybook/react';
import Select from 'react-select';
import './theme.css';
import { Field } from '../components';
import { flavourOptions } from '../data';

export default {
  title: 'Select/Theme',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function Theme() {
  return (
    <Field label="Themed Select" htmlFor="themed-select-id">
      <Select
        inputId="themed-select-id"
        defaultValue={flavourOptions[2]}
        options={flavourOptions}
        className="themed-select"
      />
    </Field>
  );
}
