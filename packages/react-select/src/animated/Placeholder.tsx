import * as React from 'react';
import type { ReactElement } from 'react';
import type { PlaceholderProps } from '../components/Placeholder';
import { Fade, collapseDuration } from './transitions';
import type { GroupBase } from '../types';

export type PlaceholderComponent = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: PlaceholderProps<Option, IsMulti, Group>
) => ReactElement;

// fade in when last multi-value removed, otherwise instant
const AnimatedPlaceholder =
  (WrappedComponent: PlaceholderComponent) =>
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: PlaceholderProps<Option, IsMulti, Group>
  ) => (
    <Fade<PlaceholderProps<Option, IsMulti, Group>>
      component={WrappedComponent}
      duration={props.isMulti ? collapseDuration : 1}
      {...props}
    />
  );

export default AnimatedPlaceholder;
