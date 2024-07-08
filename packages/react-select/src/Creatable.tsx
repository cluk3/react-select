import * as React from 'react';
import { forwardRef } from 'react';
import type { ReactElement } from 'react';
import Select, { type SelectRef } from './Select';
import type { GroupBase } from './types';
import useStateManager, { type StateManagerProps } from './useStateManager';
import useCreatable, { type CreatableAdditionalProps } from './useCreatable';

export type CreatableProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = StateManagerProps<Option, IsMulti, Group> &
  CreatableAdditionalProps<Option, Group>;

type CreatableSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: CreatableProps<Option, IsMulti, Group> & { ref?: SelectRef }
) => ReactElement;

const CreatableSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: CreatableProps<Option, IsMulti, Group>,
    ref: SelectRef
  ) => {
    const creatableProps = useStateManager(props);
    const selectProps = useCreatable(creatableProps);

    return <Select ref={ref} {...selectProps} />;
  }
) as CreatableSelect;

export { useCreatable };
export default CreatableSelect;
