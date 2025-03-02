import {
  type ContainerProps,
  type IndicatorsContainerProps,
  type ValueContainerProps,
  IndicatorsContainer,
  SelectContainer,
  ValueContainer,
} from './containers';
import {
  ClearIndicator,
  type ClearIndicatorProps,
  CheckIcon,
  CrossIcon,
  type IconProps,
  DownChevron,
  DropdownIndicator,
  type DropdownIndicatorProps,
  IndicatorSeparator,
  type IndicatorSeparatorProps,
  LoadingIndicator,
  type LoadingIndicatorProps,
} from './indicators';

import Control, { type ControlProps } from './Control';
import Group, {
  GroupHeading,
  type GroupHeadingProps,
  type GroupProps,
} from './Group';
import Input, { type InputProps } from './Input';
import Menu, {
  LoadingMessage,
  MenuList,
  NoOptionsMessage,
  type MenuListProps,
  type MenuProps,
  type NoticeProps,
} from './Menu';
import MultiValue, {
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
  type MultiValueGenericProps,
  type MultiValueProps,
  type MultiValueRemoveProps,
  type MultiValueLabelProps,
} from './MultiValue';
import Option, { type OptionProps } from './Option';
import Placeholder, { type PlaceholderProps } from './Placeholder';
import SingleValue, { type SingleValueProps } from './SingleValue';

export interface SelectComponents<Opt> {
  ClearIndicator: typeof ClearIndicator;
  Control: typeof Control;
  DropdownIndicator: typeof DropdownIndicator | null;
  DownChevron: typeof DownChevron;
  CrossIcon: typeof CrossIcon;
  CheckIcon: typeof CheckIcon;
  Group: typeof Group<Opt>;
  GroupHeading: typeof GroupHeading<Opt>;
  IndicatorsContainer: typeof IndicatorsContainer;
  IndicatorSeparator: typeof IndicatorSeparator | null;
  Input: typeof Input;
  LoadingIndicator: typeof LoadingIndicator;
  Menu: typeof Menu;
  MenuList: typeof MenuList;
  LoadingMessage: typeof LoadingMessage;
  NoOptionsMessage: typeof NoOptionsMessage;
  MultiValue: typeof MultiValue<Opt>;
  MultiValueContainer: typeof MultiValueContainer<Opt>;
  MultiValueLabel: typeof MultiValueLabel<Opt>;
  MultiValueRemove: typeof MultiValueRemove<Opt>;
  Option: typeof Option<Opt>;
  Placeholder: typeof Placeholder;
  SelectContainer: typeof SelectContainer;
  SingleValue: typeof SingleValue<Opt>;
  ValueContainer: typeof ValueContainer;
}

export interface SelectComponentsProps<Option> {
  ClearIndicator: ClearIndicatorProps;
  Control: ControlProps;
  DropdownIndicator: DropdownIndicatorProps;
  DownChevron: IconProps;
  CrossIcon: IconProps;
  CheckIcon: IconProps;
  Group: GroupProps<Option>;
  GroupHeading: GroupHeadingProps<Option>;
  IndicatorsContainer: IndicatorsContainerProps;
  IndicatorSeparator: IndicatorSeparatorProps;
  Input: InputProps;
  LoadingIndicator: LoadingIndicatorProps;
  Menu: MenuProps;
  MenuList: MenuListProps;
  LoadingMessage: NoticeProps;
  NoOptionsMessage: NoticeProps;
  MultiValue: MultiValueProps<Option>;
  MultiValueContainer: MultiValueGenericProps<Option>;
  MultiValueLabel: MultiValueLabelProps<Option>;
  MultiValueRemove: MultiValueRemoveProps<Option>;
  Option: OptionProps<Option>;
  Placeholder: PlaceholderProps;
  SelectContainer: ContainerProps;
  SingleValue: SingleValueProps<Option>;
  ValueContainer: ValueContainerProps;
}

export type SelectComponentsConfig<Option> = Partial<SelectComponents<Option>>;

export const components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  CheckIcon: CheckIcon,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer,
};

interface Props<Option> {
  components: SelectComponentsConfig<Option>;
}

export const defaultComponents = <Option>(
  propsComponents: Props<Option>['components']
): SelectComponents<Option> => ({
  ...components,
  ...propsComponents,
});
