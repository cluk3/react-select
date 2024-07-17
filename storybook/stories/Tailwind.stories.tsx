import '../styles/tailwind.css';

import type { Meta } from '@storybook/react';
import classNames from 'classnames';
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
      className={classNames(
        online ? 'bg-green-500' : 'bg-gray-200',
        'h-2 w-2 rounded-full'
      )}
    />
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
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
  const {
    state: { selectValue },
  } = useInternalSelectContext<PersonOption>();
  return (
    <components.Option {...props}>
      <span className="flex flex-1 items-center gap-2 text-left">
        <StatusCircle online={Boolean(props.data?.online)} />
        <span className="flex w-full items-center">{children}</span>

        {selectValue.some((v) => v.id === props.data.id) && (
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </span>
    </components.Option>
  );
}

const Template = ({ inputId = 'react-select', ...props }) => {
  const [value, setValue] = React.useState<PersonOption | null>(people[0]);

  return (
    <div className="p-4 bg-gray-100 flex flex-col gap-2">
      <Field htmlFor={inputId} label="Assigned to">
        {/* @ts-ignore */}
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
