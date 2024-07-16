import * as React from 'react';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import type { ValueContainerProps } from '../components/containers';
import { useInternalSelectContext } from '../SelectContext';
import { AnimatedContextProvider, type AnimatedContextValue } from './context';

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
    } = useInternalSelectContext();
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
  const [multiProps, context] = useIsMultiValueContainer(restProps);

  return (
    <AnimatedContextProvider value={context}>
      <TransitionGroup component={component} {...(multiProps as any)} />
    </AnimatedContextProvider>
  );
};

const useIsMultiValueContainer = (
  props: ValueContainerProps
): [ValueContainerProps, AnimatedContextValue] => {
  const { innerProps } = props;
  const {
    hasValue,
    selectProps: { isMulti, controlShouldRenderValue },
  } = useInternalSelectContext();

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

  const onExited = () => isMulti && setRemovingValue(true);

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
  };

  return [
    newProps,
    {
      onExited,
      shouldHidePlaceholder: isMulti && cssDisplayFlex,
    },
  ];
};

export default AnimatedValueContainer;
