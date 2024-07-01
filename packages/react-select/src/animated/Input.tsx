import * as React from 'react';
import type { ReactElement } from 'react';
import type { TransitionProps } from 'react-transition-group/Transition';
import type { InputProps } from '../components/Input';
import type { GroupBase } from '../types';

export type InputComponent = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: InputProps<Option, IsMulti, Group>
) => ReactElement;

export type AnimatedInputProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = InputProps<Option, IsMulti, Group> & Partial<TransitionProps>;

// strip transition props off before spreading onto select component
const AnimatedInput = (WrappedComponent: InputComponent): InputComponent => {
  return <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({
    in: inProp,
    onExited,
    appear,
    enter,
    exit,
    ...props
  }: AnimatedInputProps<Option, IsMulti, Group>) => (
    <WrappedComponent {...props} />
  );
};

export default AnimatedInput;
