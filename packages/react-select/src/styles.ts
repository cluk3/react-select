import {
  containerCSS,
  indicatorsContainerCSS,
  valueContainerCSS,
} from './components/containers';
import type {
  ContainerProps,
  IndicatorsContainerProps,
  ValueContainerProps,
} from './components/containers';
import { css as controlCSS } from './components/Control';
import type { ControlProps } from './components/Control';
import { groupCSS, groupHeadingCSS } from './components/Group';
import type { GroupHeadingProps, GroupProps } from './components/Group';
import {
  clearIndicatorCSS,
  dropdownIndicatorCSS,
  loadingIndicatorCSS,
  indicatorSeparatorCSS,
} from './components/indicators';
import type {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from './components/indicators';
import { inputCSS, type InputProps } from './components/Input';
import {
  placeholderCSS,
  type PlaceholderProps,
} from './components/Placeholder';
import { optionCSS, type OptionProps } from './components/Option';
import {
  menuCSS,
  menuListCSS,
  menuPortalCSS,
  noOptionsMessageCSS,
  loadingMessageCSS,
} from './components/Menu';
import type {
  NoticeProps,
  MenuProps,
  MenuListProps,
  PortalStyleArgs,
} from './components/Menu';
import {
  css as singleValueCSS,
  type SingleValueProps,
} from './components/SingleValue';
import {
  multiValueCSS,
  multiValueLabelCSS,
  type MultiValueProps,
  multiValueRemoveCSS,
} from './components/MultiValue';
import type { CSSObjectWithLabel, GroupBase } from './types';

export interface StylesProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> {
  clearIndicator: ClearIndicatorProps<Option, IsMulti, Group>;
  container: ContainerProps<Option, IsMulti, Group>;
  control: ControlProps<Option, IsMulti, Group>;
  dropdownIndicator: DropdownIndicatorProps<Option, IsMulti, Group>;
  group: GroupProps<Option, IsMulti, Group>;
  groupHeading: GroupHeadingProps<Option, IsMulti, Group>;
  indicatorsContainer: IndicatorsContainerProps<Option, IsMulti, Group>;
  indicatorSeparator: IndicatorSeparatorProps<Option, IsMulti, Group>;
  input: InputProps<Option, IsMulti, Group>;
  loadingIndicator: LoadingIndicatorProps<Option, IsMulti, Group>;
  loadingMessage: NoticeProps<Option, IsMulti, Group>;
  menu: MenuProps<Option, IsMulti, Group>;
  menuList: MenuListProps<Option, IsMulti, Group>;
  menuPortal: PortalStyleArgs;
  multiValue: MultiValueProps<Option, IsMulti, Group>;
  multiValueLabel: MultiValueProps<Option, IsMulti, Group>;
  multiValueRemove: MultiValueProps<Option, IsMulti, Group>;
  noOptionsMessage: NoticeProps<Option, IsMulti, Group>;
  option: OptionProps<Option, IsMulti, Group>;
  placeholder: PlaceholderProps<Option, IsMulti, Group>;
  singleValue: SingleValueProps<Option, IsMulti, Group>;
  valueContainer: ValueContainerProps<Option, IsMulti, Group>;
}

export const defaultStyles: {
  [K in keyof StylesProps<any, any, any>]: (
    props: StylesProps<unknown, boolean, GroupBase<unknown>>[K],
    unstyled: boolean
  ) => CSSObjectWithLabel;
} = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: controlCSS,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: inputCSS,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  menuPortal: menuPortalCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: optionCSS,
  placeholder: placeholderCSS,
  singleValue: singleValueCSS,
  valueContainer: valueContainerCSS,
};
