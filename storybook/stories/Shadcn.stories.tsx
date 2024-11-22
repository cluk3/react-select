import '../styles/tailwind.css';

import type { Meta } from '@storybook/react';
import { cn } from '@/utils';
import * as React from 'react';
import Select from 'react-select';
import { omit } from 'remeda';

import { Field } from '../components';
import type { PersonOption } from '../data';
import { defaultArgs, people } from '../data';
import './shadcn.css';

export default {
  title: 'Select/Shadcn',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template = ({ inputId = 'react-select', ...props }) => {
  const [value, setValue] = React.useState<PersonOption | null>(people[0]);

  return (
    <div className="p-4 flex flex-col gap-2">
      <Field htmlFor={inputId} label="Assigned to">
        <Select<PersonOption>
          {...props}
          inputId={inputId}
          options={people}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => String(option.id)}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          classNames={{
            control: ({ isFocused }) =>
              cn(
                'bg-transparent text-sm shadow-sm ring-offset-white',
                isFocused && 'outline-none ring-1 ring-zinc-700'
              ),
            menuList: 'p-1',
            option: 'rounded-sm',
          }}
          className="shadcn-select"
        />
      </Field>
      {value && !value.online ? (
        <p className="text-gray-700">User {value.name} is currently offline.</p>
      ) : undefined}

      <Field htmlFor={`${inputId}-reviewers`} label="Reviewers">
        <Select<PersonOption, true>
          {...props}
          inputId={`${inputId}-reviewers`}
          isMulti
          options={people}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => String(option.id)}
          classNames={{
            control: ({ isFocused }) =>
              cn(
                'bg-transparent text-sm shadow-sm ring-offset-white',
                isFocused && 'outline-none ring-1 ring-zinc-700'
              ),
            menuList: 'p-1',
            option: 'rounded-sm',
          }}
          className="shadcn-select"
        />
      </Field>
    </div>
  );
};

export const Shadcn = {
  render: Template,
  args: { ...omit(defaultArgs, ['defaultValue', 'isMulti', 'options']) },
};
