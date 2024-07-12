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
    ClassNamesContextValue<Option, IsMulti, Group>,
    'classNamePrefix' | 'getClassNames' | 'unstyled'
  > &
    ClassNamesConfigComponentProps<Option, Key>
) => string;

export interface ClassNamesContextValue<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> {
  getClassNames: getClassNames<Option, IsMulti, Group>;
  classNamePrefix: string;
  isClearable?: boolean;
  isDisabled: boolean;
  isFocused: boolean;
  isLoading?: boolean;
  isMulti: IsMulti;
  isRtl: boolean;
  isSearchable: boolean;
  required?: boolean;
  unstyled: boolean;
}

export interface InternalContextValue<
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

const InternalContext = createContext<unknown | undefined>(undefined);

const InternalContextProvider = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InternalContextValue<Option, IsMulti, Group>;
}) => {
  return (
    <InternalContext.Provider value={value}>
      {children}
    </InternalContext.Provider>
  );
};

function useInternalContext<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(): InternalContextValue<Option, IsMulti, Group> {
  const context = useContext(InternalContext);
  if (!context) {
    throw new Error(
      'useInternalContext must be used within a InternalContextProvider'
    );
  }
  return context as InternalContextValue<Option, IsMulti, Group>;
}

const ClassNamesContext = createContext<unknown | undefined>(undefined);

const ClassNamesContextProvider = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ClassNamesContextValue<Option, IsMulti, Group>;
}) => {
  return (
    <ClassNamesContext.Provider value={value}>
      {children}
    </ClassNamesContext.Provider>
  );
};

function useClassNamesContext<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(): ClassNamesContextValue<Option, IsMulti, Group> {
  const context = useContext(ClassNamesContext);
  if (!context) {
    throw new Error(
      'useClassNamesContext must be used within a ClassNamesContextProvider'
    );
  }
  return context as ClassNamesContextValue<Option, IsMulti, Group>;
}

export {
  InternalContextProvider,
  useInternalContext,
  ClassNamesContextProvider,
  useClassNamesContext,
};
