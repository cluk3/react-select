import useStateManager from './useStateManager';

export { default } from './stateManager';
export { createFilter } from './filters';
export { components } from './components';
export type { SelectInstance, SelectRef } from './Select';
export type { StateManagerProps as Props } from './useStateManager';
export { useStateManager };
export { useGetClassNames } from './utils';

export type { SelectComponentsConfig } from './components';
export type {
  ContainerProps,
  IndicatorsContainerProps,
  ValueContainerProps,
} from './components/containers';
export type { ControlProps } from './components/Control';
export type { GroupProps, GroupHeadingProps } from './components/Group';
export type {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from './components/indicators';
export type { InputProps } from './components/Input';
export type { MenuListProps, MenuProps, NoticeProps } from './components/Menu';
export type {
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
  MultiValueLabelProps,
} from './components/MultiValue';
export type { OptionProps } from './components/Option';
export type { PlaceholderProps } from './components/Placeholder';
export type { SingleValueProps } from './components/SingleValue';
export type {
  ClassNamesConfig,
  FormatOptionLabelContext,
  FormatOptionLabelMeta,
} from './types';
export * from './types';
export type {
  OptionContext,
  GuidanceContext,
  AriaGuidanceProps,
  AriaOnChangeProps,
  AriaOnFilterProps,
  AriaOnFocusProps,
  AriaLiveMessages,
  AriaGuidance,
  AriaOnChange,
  AriaOnFilter,
  AriaOnFocus,
} from './accessibility';
