import * as React from 'react';
import { forwardRef } from 'react';
import type { ReactElement } from 'react';
import Select, { type SelectRef } from './Select';
import type { GroupBase } from './types';
import useStateManager from './useStateManager';
import useAsync from './useAsync';
import type { AsyncProps } from './useAsync';
export type { AsyncProps };

type AsyncSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: AsyncProps<Option, IsMulti, Group> & {
    ref?: React.ForwardedRef<SelectRef>;
  }
) => ReactElement;

const AsyncSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: AsyncProps<Option, IsMulti, Group>,
    ref: React.ForwardedRef<SelectRef>
  ) => {
    const stateManagedProps = useAsync(props);
    const selectProps = useStateManager(stateManagedProps);

    return <Select<Option, IsMulti, Group> ref={ref} {...selectProps} />;
  }
) as AsyncSelect;

export { useAsync };
export default AsyncSelect;
