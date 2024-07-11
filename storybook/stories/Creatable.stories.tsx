import type { Meta } from '@storybook/react';
import * as React from 'react';
import CreatableSelect from 'react-select/creatable';
import type { SelectRef } from 'react-select';

import { Field } from '../components';
import { defaultArgs } from '../data';

export default {
  title: 'Select/Creatable',
  component: CreatableSelect,
} as Meta<typeof CreatableSelect>;

type Option = {
  label: string;
  value: string;
};

function createOption(label: string): Option {
  return {
    label,
    value: label.toLowerCase(),
  };
}

const defaultOptions: Option[] = [
  createOption('One'),
  createOption('Two'),
  createOption('Three'),
];

const Template = ({ inputId = 'react-select', ...props }) => {
  const creatableRef = React.useRef<SelectRef | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState(props.options as Option[]);
  const [value, setValue] = React.useState<Option | null>();

  /** Uses a setTimeout to simulate making a network request. */
  function handleCreate(inputValue: string) {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
      setIsLoading(false);
      creatableRef.current?.focus();
    }, 1000);
  }

  return (
    <Field
      htmlFor={inputId}
      label="Creatable"
      secondaryLabel="The Creatable API lets users add their own options to the list."
    >
      <CreatableSelect
        {...props}
        inputId={inputId}
        isDisabled={isLoading}
        isLoading={isLoading}
        onCreateOption={handleCreate}
        options={options}
        value={value}
        ref={creatableRef}
      />
    </Field>
  );
};

export const Creatable = {
  render: Template,
  args: {
    ...defaultArgs,
    options: defaultOptions,
    isClearable: true,
  },
};
