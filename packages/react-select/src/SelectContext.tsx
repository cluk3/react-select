import { createContext, useContext } from 'react';
import * as React from 'react';
import type {
  GroupBase,
  State,
  CategorizedGroupOrOption,
  FormatOptionLabelContext,
  Options,
  ComponentNames,
  ClassNamesConfigComponentProps,
  DefaultSelectProps,
} from './types';
import type { SelectComponents } from './components/index';

export type getClassNames<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = <Key extends ComponentNames>(
  key: Key,
  context: Omit<
    SelectContextValue<Option, IsMulti, Group>,
    'classNamePrefix' | 'getClassNames' | 'unstyled'
  > &
    ClassNamesConfigComponentProps<Option, Key>
) => string;

export interface SelectContextValue<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> {
  getClassNames: getClassNames<Option, IsMulti, Group>;
  classNamePrefix?: string;
  isClearable: boolean;
  isDisabled: boolean;
  isFocused: boolean;
  isLoading?: boolean;
  isMulti: IsMulti;
  isRtl: boolean;
  isSearchable: boolean;
  hasValue: boolean;
  required?: boolean;
  unstyled: boolean;
}

export interface InternalSelectContextValue<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> {
  selectProps: DefaultSelectProps<Option, IsMulti, Group>;
  components: SelectComponents<Option>;
  state: State<Option, IsMulti> & { selectValue: Options<Option> };

  getValue: () => Options<Option>;
  clearValue: () => void;
  hasValue: boolean;
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
  menuListRef: React.MutableRefObject<HTMLDivElement | null>;
  focusedOptionRef: React.MutableRefObject<HTMLDivElement | null>;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  userIsDragging: React.MutableRefObject<boolean | undefined>;
  openAfterFocus: React.MutableRefObject<boolean>;
}

const InternalSelectContext = createContext<unknown | undefined>(undefined);

const InternalSelectContextProvider = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InternalSelectContextValue<Option, IsMulti, Group>;
}) => {
  return (
    <InternalSelectContext.Provider value={value}>
      {children}
    </InternalSelectContext.Provider>
  );
};

function useInternalSelectContext<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(): InternalSelectContextValue<Option, IsMulti, Group> {
  const context = useContext(InternalSelectContext);
  if (!context) {
    throw new Error(
      'useInternalSelectContext must be used within a InternalSelectContextProvider'
    );
  }
  return context as InternalSelectContextValue<Option, IsMulti, Group>;
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

export {
  InternalSelectContextProvider,
  useInternalSelectContext,
  SelectContextProvider,
  useSelectContext,
};
