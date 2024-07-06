import * as React from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import type { ValueContainerProps } from '../components/containers';
import { useSelectContext } from '../SelectContext';

export type ValueContainerComponent = (
  props: ValueContainerProps
) => ReactElement;

interface IsMultiValueContainerProps extends ValueContainerProps {
  component: ValueContainerComponent;
}

// make ValueContainer a transition group
const AnimatedValueContainer =
  (WrappedComponent: ValueContainerComponent) =>
  (props: ValueContainerProps) => {
    const {
      selectProps: { isMulti },
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useSelectContext();
    return isMulti ? (
      <IsMultiValueContainer component={WrappedComponent} {...(props as any)} />
    ) : (
      <TransitionGroup component={WrappedComponent} {...(props as any)} />
    );
  };

const IsMultiValueContainer = ({
  component,
  ...restProps
}: IsMultiValueContainerProps) => {
  const multiProps = useIsMultiValueContainer(restProps);

  return <TransitionGroup component={component} {...(multiProps as any)} />;
};

const useIsMultiValueContainer = ({
  children,
  ...props
}: ValueContainerProps) => {
  const { innerProps } = props;
  const {
    hasValue,
    selectProps: { isMulti, components, controlShouldRenderValue },
  } = useSelectContext();

  const [cssDisplayFlex, setCssDisplayFlex] = useState(
    isMulti && controlShouldRenderValue && hasValue
  );
  const [removingValue, setRemovingValue] = useState(false);

  useEffect(() => {
    if (hasValue && !cssDisplayFlex) {
      setCssDisplayFlex(true);
    }
  }, [hasValue, cssDisplayFlex]);

  useEffect(() => {
    if (removingValue && !hasValue && cssDisplayFlex) {
      setCssDisplayFlex(false);
    }
    setRemovingValue(false);
  }, [removingValue, hasValue, cssDisplayFlex]);

  const onExited = () => setRemovingValue(true);

  const childMapper = (child: ReactNode) => {
    if (isMulti && React.isValidElement(child)) {
      // Add onExited callback to MultiValues
      if (child.type === components.MultiValue) {
        // @ts-expect-error
        return React.cloneElement(child, { onExited });
      }
      // While container flexed, Input cursor is shown after Placeholder text,
      // so remove Placeholder until display is set back to grid
      if (child.type === components.Placeholder && cssDisplayFlex) {
        return null;
      }
    }
    return child;
  };

  const newInnerProps = {
    ...innerProps,
    style: {
      ...innerProps?.style,
      display: (isMulti && hasValue) || cssDisplayFlex ? 'flex' : 'grid',
    },
  };

  const newProps = {
    ...props,
    innerProps: newInnerProps,
    children: React.Children.toArray(children).map(childMapper),
  };

  return newProps;
};

export default AnimatedValueContainer;
