import { createContext, useContext } from 'react';
import * as React from 'react';
import type {
  CX,
  GroupBase,
  State,
  CategorizedGroupOrOption,
  FormatOptionLabelContext,
  OnChangeValue,
  Options,
  SetValueAction,
  SelectProps,
  ComponentNames,
  ClassNamesConfigComponentProps,
} from './types';
import type {
  SelectComponentsGeneric,
  SelectComponentsProps,
} from './components/index';

export interface SelectContextValue<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> {
  selectProps: Omit<SelectProps<Option, IsMulti, Group>, 'classNamePrefix'> & {
    classNamePrefix: string;
  };
  components: SelectComponentsGeneric;
  state: State<Option, IsMulti, Group>;
  cx: CX;
  getClassNames: <Key extends ComponentNames>(
    key: Key,
    context: SelectContextValue<Option, IsMulti, Group> & {
      componentProps: ClassNamesConfigComponentProps<Option, Key>;
    }
  ) => string | undefined;
  setValue: (
    newValue: OnChangeValue<Option, IsMulti>,
    action: SetValueAction,
    option?: Option
  ) => void;
  getValue: () => Options<Option>;
  clearValue: () => void;
  hasValue: boolean;
  isFocused: boolean;
  isOptionHoverBlocked: boolean;
  isAppleDevice: boolean;
  focusInput: () => void;
  blurInput: () => void;
  getFocusableOptions: () => readonly Option[];
  getCategorizedOptions: () => readonly CategorizedGroupOrOption<
    Option,
    Group
  >[];
  getElementId: (
    element:
      | 'placeholder'
      | 'group'
      | 'input'
      | 'option'
      | 'listbox'
      | 'live-region'
  ) => string;
  selectOption: (focusedOption: Option) => void;
  formatOptionLabel: (
    data: Option,
    context: FormatOptionLabelContext
  ) => React.ReactNode;
  onOptionHover: (focusedOption: Option) => void;
  onMenuMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onMenuMouseMove: React.MouseEventHandler<HTMLDivElement>;
  setMenuListRef: React.RefCallback<HTMLDivElement>;
  setFocusedOptionRef: React.RefCallback<HTMLDivElement>;
  controlRef: HTMLDivElement | null;
}

const SelectContext = createContext<unknown | undefined>(undefined);

const SelectContextProvider = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SelectContextValue<Option, IsMulti, Group>;
}) => {
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

function useSelectContext<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(): SelectContextValue<Option, IsMulti, Group> {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'useSelectContext must be used within a SelectContextProvider'
    );
  }
  return context as SelectContextValue<Option, IsMulti, Group>;
}

export { SelectContext, SelectContextProvider, useSelectContext };
