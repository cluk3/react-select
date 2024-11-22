import '../styles/tailwind.css';

import type { Meta } from '@storybook/react';
import { cn } from '@/utils';

import * as React from 'react';
import type { OptionProps, ValueContainerProps } from 'react-select';
import Select, { components, useInternalSelectContext } from 'react-select';
import { omit } from 'remeda';

import { Field } from '../components';
import type { PersonOption } from '../data';
import { defaultArgs, people } from '../data';

export default {
  title: 'Select/Tailwind',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

function StatusCircle({ online }: { online?: boolean }) {
  return (
    <div
      className={cn(
        online ? 'bg-green-500' : 'bg-gray-200',
        'h-2 w-2 rounded-full'
      )}
    />
  );
}

function ValueContainer({ children, ...props }: ValueContainerProps) {
  const {
    selectProps: { isMulti },
    state: { selectValue },
  } = useInternalSelectContext<PersonOption>();

  const online = selectValue[0]?.online;

  return (
    <components.ValueContainer {...props}>
      <span className="flex flex-1 items-center gap-2 text-left">
        {!selectValue.length || isMulti ? null : (
          <StatusCircle online={online} />
        )}
        <span className="flex w-full items-center">{children}</span>
      </span>
    </components.ValueContainer>
  );
}

function Option({ children, ...props }: OptionProps<PersonOption>) {
  return (
    <components.Option {...props}>
      <span className="flex flex-1 items-center gap-2 text-left">
        <StatusCircle online={Boolean(props.data?.online)} />
        {children}
      </span>
    </components.Option>
  );
}

const Template = ({ inputId = 'react-select', ...props }) => {
  const [value, setValue] = React.useState<PersonOption | null>(people[0]);

  return (
    <div className="p-4 bg-gray-100 flex flex-col gap-2">
      <Field htmlFor={inputId} label="Assigned to">
        <Select<PersonOption>
          {...props}
          inputId={inputId}
          components={{ ValueContainer, Option }}
          options={people}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => String(option.id)}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Field>
      {value && !value.online ? (
        <p className="text-gray-700">User {value.name} is currently offline.</p>
      ) : undefined}
    </div>
  );
};

export const Tailwind = {
  render: Template,
  args: { ...omit(defaultArgs, ['defaultValue', 'isMulti', 'options']) },
};
