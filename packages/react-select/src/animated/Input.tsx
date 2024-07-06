import type { ReactElement } from 'react';
import type { TransitionProps } from 'react-transition-group/Transition';
import type { InputProps } from '../components/Input';

export type InputComponent = (props: InputProps) => ReactElement;

export type AnimatedInputProps = InputProps & Partial<TransitionProps>;

// strip transition props off before spreading onto select component
const AnimatedInput = (WrappedComponent: InputComponent): InputComponent => {
  return ({
    in: inProp,
    onExited,
    appear,
    enter,
    exit,
    ...props
  }: AnimatedInputProps) => <WrappedComponent {...props} />;
};

export default AnimatedInput;
