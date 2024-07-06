import type { ReactElement } from 'react';
import type { TransitionProps } from 'react-transition-group/Transition';
import type { MultiValueProps } from '../components/MultiValue';
import { Collapse } from './transitions';

export type MultiValueComponent = (props: MultiValueProps) => ReactElement;

export type AnimatedMultiValueProps = MultiValueProps &
  Partial<TransitionProps>;

// strip transition props off before spreading onto actual component

const AnimatedMultiValue = (WrappedComponent: MultiValueComponent) => {
  return ({
    in: inProp = true,
    onExited,
    ...props
  }: AnimatedMultiValueProps) => (
    <Collapse in={inProp} onExited={onExited}>
      <WrappedComponent cropWithEllipsis={inProp} {...props} />
    </Collapse>
  );
};

export default AnimatedMultiValue;
