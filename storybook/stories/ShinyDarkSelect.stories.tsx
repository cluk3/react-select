import type { Meta } from '@storybook/react';
import * as React from 'react';
import Select, {
  components as Components,
  useGetClassNames,
  type ControlProps,
} from 'react-select';
import cn from 'classnames';

import { Field } from '../components';
import { flavourOptions } from '../data';

export default {
  title: 'Select/ShinyDark',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function ShinyDark() {
  return (
    <Field label="Shiny Dark Select" htmlFor="shiny-dark-select-id">
      <Select
        inputId="shiny-dark-select-id"
        defaultValue={flavourOptions[2]}
        options={flavourOptions}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              'relative bg-transparent border-none',
              !isFocused && 'linear-mask'
            ),
          placeholder: 'text-white',
          singleValue: 'text-white',
        }}
        components={{
          Control: CustomControl,
        }}
      />
    </Field>
  );
}

function CustomControl(props: ControlProps) {
  const shouldShine = useGetClassNames('control', props).includes(
    'linear-mask'
  );
  console.log(shouldShine, props);
  return (
    <>
      <div className={cn('rounded-md relative', true && 'radial-gradient')}>
        <Components.Control {...props} />
        {shouldShine && (
          <span className="block absolute inset-0 rounded-md p-1 linear-overlay" />
        )}
      </div>
    </>
  );
}
