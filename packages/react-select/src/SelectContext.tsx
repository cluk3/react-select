import { createContext } from 'react';
import * as React from 'react';
import type { CommonProps, GroupBase } from './types';

interface SelectContextProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> extends CommonProps<Option, IsMulti, Group> {
  isDisabled: boolean;
  isFocused: boolean;
  isLoading: boolean;
  isMulti: boolean;
  isRtl: boolean;
}

const SelectContext = createContext<
  SelectContextProps<Option, IsMulti, Group> | undefined
>(undefined);

const SelectContextProvider = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SelectContextProps<any, IsMulti, Group>;
}) => {
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

export { SelectContext, SelectContextProvider };

export default SelectContextProvider;
