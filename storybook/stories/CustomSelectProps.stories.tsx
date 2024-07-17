import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { ClassNamesConfig, ControlProps, Props } from 'react-select';
import Select, { components, useInternalSelectContext } from 'react-select';
import { Field } from '../components';
import type { ColourOption } from '../data';
import { colourOptions, EMOJIS } from '../data';

export default {
  title: 'Select/CustomSelectProps',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomSelectProps(props: Props<ColourOption>) {
  const [clickCount, setClickCount] = React.useState(0);

  function onClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    setClickCount(clickCount + 1);
    event.preventDefault();
    event.stopPropagation();
  }

  const emoji = EMOJIS[clickCount % EMOJIS.length];

  return (
    <Field label="Custom Select Props" htmlFor="custom-select-props-id">
      <Select
        {...props}
        components={{ Control }}
        inputId="custom-select-props-id"
        isSearchable
        options={colourOptions}
        classNames={classNames}
        // @ts-ignore
        emoji={emoji}
        onEmojiClick={onClick}
      />
    </Field>
  );
}

const classNames: ClassNamesConfig<ColourOption> = {
  control: 'pl-1',
};

function Control({ children, ...props }: ControlProps) {
  const {
    // @ts-expect-error
    selectProps: { emoji, onEmojiClick },
  } = useInternalSelectContext();
  const style = { cursor: 'pointer' };

  return (
    <components.Control {...props}>
      <span onMouseDown={onEmojiClick} style={style}>
        {emoji}
      </span>
      {children}
    </components.Control>
  );
}
