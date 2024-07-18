import type { ReactElement } from 'react';
import type { TransitionProps } from 'react-transition-group/Transition';
import type { MultiValueProps } from '../components/MultiValue';
import { Collapse } from './transitions';
import { useAnimatedContext } from './context';

type MultiValueComponent = (props: MultiValueProps) => ReactElement;

type AnimatedMultiValueProps = MultiValueProps & Partial<TransitionProps>;

// strip transition props off before spreading onto actual component

const AnimatedMultiValue = (WrappedComponent: MultiValueComponent) => {
  return ({ in: inProp = true, ...props }: AnimatedMultiValueProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { onExited } = useAnimatedContext();
    return (
      <Collapse in={inProp} onExited={onExited}>
        <WrappedComponent cropWithEllipsis={inProp} {...props} />
      </Collapse>
    );
  };
};

export default AnimatedMultiValue;
