import * as React from 'react';
import { forwardRef } from 'react';
import type { ReactElement } from 'react';
import Select, { type SelectRef } from './Select';
import type { GroupBase } from './types';
import useAsync, { type AsyncAdditionalProps } from './useAsync';
import useStateManager, { type StateManagerProps } from './useStateManager';
import useCreatable, { type CreatableAdditionalProps } from './useCreatable';

export type AsyncCreatableProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = StateManagerProps<Option, IsMulti, Group> &
  CreatableAdditionalProps<Option, Group> &
  AsyncAdditionalProps<Option, Group>;

type AsyncCreatableSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: AsyncCreatableProps<Option, IsMulti, Group> & {
    ref?: React.ForwardedRef<SelectRef>;
  }
) => ReactElement;

const AsyncCreatableSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: AsyncCreatableProps<Option, IsMulti, Group>,
    ref: React.ForwardedRef<SelectRef>
  ) => {
    const stateManagerProps = useAsync(props);
    const creatableProps = useStateManager(stateManagerProps);
    const selectProps = useCreatable(creatableProps);

    return <Select ref={ref} {...selectProps} />;
  }
) as AsyncCreatableSelect;

export default AsyncCreatableSelect;
