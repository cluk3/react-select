/* eslint-disable react-hooks/rules-of-hooks */
import type { ReactElement } from 'react';
import type { PlaceholderProps } from '../components/Placeholder';
import { Fade, collapseDuration } from './transitions';
import { useInternalContext } from '../SelectContext';
import { useAnimatedContext } from './context';

export type PlaceholderComponent = (props: PlaceholderProps) => ReactElement;

// fade in when last multi-value removed, otherwise instant
const AnimatedPlaceholder =
  (WrappedComponent: PlaceholderComponent) => (props: PlaceholderProps) => {
    const {
      selectProps: { isMulti },
    } = useInternalContext();

    const { shouldHidePlaceholder } = useAnimatedContext();

    if (shouldHidePlaceholder) {
      return null;
    }

    return (
      <Fade<PlaceholderProps>
        component={WrappedComponent}
        duration={isMulti ? collapseDuration : 1}
        {...props}
      />
    );
  };

export default AnimatedPlaceholder;
