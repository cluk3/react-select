import type { Meta } from '@storybook/react';
import Select, {
  useGetClassNames,
  useSelectContext,
  type ControlProps,
} from 'react-select';
import { cn } from '@/utils';

import { Field } from '../components';
import { flavourOptions } from '../data';
import './shiny-dark.css';

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
        className="shiny-dark-select"
        components={{
          Control: CustomControl,
        }}
      />
    </Field>
  );
}

function CustomControl(props: ControlProps) {
  const { isDisabled, isFocused, isMenuOpen } = useSelectContext();
  const { children, innerRef, innerProps } = props;
  const className = useGetClassNames('control', props, innerProps?.className);

  return (
    <>
      <div
        data-is-disabled={isDisabled}
        data-is-focused={isFocused}
        className={cn(
          'radial-gradient rounded-md',
          isMenuOpen && 'rounded-b-none'
        )}
      >
        <div
          ref={innerRef}
          {...innerProps}
          aria-disabled={isDisabled || undefined}
          data-is-disabled={isDisabled}
          data-is-focused={isFocused}
          className={cn(
            'rounded-md relative bg-transparent border-none',
            isMenuOpen && 'rounded-b-none',
            !isFocused && 'linear-mask',
            className
          )}
        >
          {children}
        </div>
        {!isFocused && (
          <span className="block absolute inset-0 rounded-md p-1 linear-overlay" />
        )}
      </div>
    </>
  );
}
