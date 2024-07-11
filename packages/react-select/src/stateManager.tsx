import * as React from 'react';
import { forwardRef, type ReactElement } from 'react';

import type { GroupBase } from './types';
import Select, { type SelectRef } from './Select';
import useStateManager from './useStateManager';
import type { StateManagerProps } from './useStateManager';
export type { StateManagerProps };

type StateManagedSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: StateManagerProps<Option, IsMulti, Group> & {
    ref?: React.ForwardedRef<SelectRef>;
  }
) => ReactElement;

const StateManagedSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: StateManagerProps<Option, IsMulti, Group>,
    ref: React.ForwardedRef<SelectRef>
  ) => {
    const baseSelectProps = useStateManager(props);

    return <Select ref={ref} {...baseSelectProps} />;
  }
) as StateManagedSelect;

export default StateManagedSelect;
