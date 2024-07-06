import * as React from 'react';
import type { ReactElement } from 'react';
import type { SingleValueProps } from '../components/SingleValue';
import { Fade } from './transitions';

export type SingleValueComponent = (props: SingleValueProps) => ReactElement;

// instant fade; all transition-group children must be transitions
const AnimatedSingleValue =
  (WrappedComponent: SingleValueComponent) => (props: SingleValueProps) => (
    <Fade<SingleValueProps> component={WrappedComponent} {...props} />
  );

export default AnimatedSingleValue;
