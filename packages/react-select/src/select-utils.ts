import type { SelectProps } from './types';
import type { Options, GroupBase } from './types';
import type { CategorizedOption, CategorizedGroupOrOption } from './types';
import type { FocusableOptionWithId, State } from './types';
import { notNullish } from './utils';
import type { FilterOptionOption } from './filters';
export function toCategorizedOption<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  option: Option,
  selectValue: Options<Option>,
  index: number
): CategorizedOption<Option> {
  const isDisabled = isOptionDisabled(props, option, selectValue);
  const isSelected = isOptionSelected(props, option, selectValue);
  const label = props.getOptionLabel(option);
  const value = props.getOptionValue(option);

  return {
    type: 'option',
    data: option,
    isDisabled,
    isSelected,
    label,
    value,
    index,
  };
}

export function buildCategorizedOptions<
  // TODO: should be "Option extends OptionsOrGroups<Option, Group>"
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  selectValue: Options<Option>
): CategorizedGroupOrOption<Option, Group>[] {
  return props.options
    .map((groupOrOption, groupOrOptionIndex) => {
      // @ts-expect-error
      if ('options' in groupOrOption) {
        const categorizedOptions = (groupOrOption as Group).options
          .map((option, optionIndex) =>
            toCategorizedOption(props, option, selectValue, optionIndex)
          )
          .filter((categorizedOption) => isFocusable(props, categorizedOption));
        return categorizedOptions.length > 0
          ? {
              type: 'group' as const,
              data: groupOrOption,
              options: categorizedOptions,
              index: groupOrOptionIndex,
            }
          : undefined;
      }
      const categorizedOption = toCategorizedOption(
        props,
        groupOrOption,
        selectValue,
        groupOrOptionIndex
      );
      return isFocusable(props, categorizedOption)
        ? categorizedOption
        : undefined;
    })
    .filter(notNullish);
}

export function buildFocusableOptionsFromCategorizedOptions<
  Option,
  Group extends GroupBase<Option>,
>(
  categorizedOptions: readonly CategorizedGroupOrOption<Option, Group>[]
): Option[] {
  return categorizedOptions.reduce<Option[]>(
    (optionsAccumulator, categorizedOption) => {
      if (categorizedOption.type === 'group') {
        optionsAccumulator.push(
          ...categorizedOption.options.map((option) => option.data)
        );
      } else {
        optionsAccumulator.push(categorizedOption.data);
      }
      return optionsAccumulator;
    },
    []
  );
}

export function buildFocusableOptionsWithIds<
  Option,
  Group extends GroupBase<Option>,
>(
  categorizedOptions: readonly CategorizedGroupOrOption<Option, Group>[],
  optionId: string
) {
  return categorizedOptions.reduce<FocusableOptionWithId<Option>[]>(
    (optionsAccumulator, categorizedOption) => {
      if (categorizedOption.type === 'group') {
        optionsAccumulator.push(
          ...categorizedOption.options.map((option) => ({
            data: option.data,
            id: `${optionId}-${categorizedOption.index}-${option.index}`,
          }))
        );
      } else {
        optionsAccumulator.push({
          data: categorizedOption.data,
          id: `${optionId}-${categorizedOption.index}`,
        });
      }
      return optionsAccumulator;
    },
    []
  );
}

export function buildFocusableOptions<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: SelectProps<Option, IsMulti, Group>, selectValue: Options<Option>) {
  return buildFocusableOptionsFromCategorizedOptions(
    buildCategorizedOptions(props, selectValue)
  );
}

export function isFocusable<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  categorizedOption: CategorizedOption<Option>
) {
  const { inputValue = '' } = props;
  const { data, isSelected, label, value } = categorizedOption;

  return (
    (!shouldHideSelectedOptions(props) || !isSelected) &&
    filterOption(props, { label, value, data }, inputValue)
  );
}

export function getNextFocusedValue<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(state: State<Option, IsMulti, Group>, nextSelectValue: Options<Option>) {
  const { focusedValue, selectValue: lastSelectValue } = state;
  const lastFocusedIndex = lastSelectValue.indexOf(focusedValue!);
  if (lastFocusedIndex > -1) {
    const nextFocusedIndex = nextSelectValue.indexOf(focusedValue!);
    if (nextFocusedIndex > -1) {
      // the focused value is still in the selectValue, return it
      return focusedValue;
    } else if (lastFocusedIndex < nextSelectValue.length) {
      // the focusedValue is not present in the next selectValue array by
      // reference, so return the new value at the same index
      return nextSelectValue[lastFocusedIndex];
    }
  }
  return null;
}

export function getNextFocusedOption<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(state: State<Option, IsMulti, Group>, options: Options<Option>) {
  const { focusedOption: lastFocusedOption } = state;
  return lastFocusedOption && options.indexOf(lastFocusedOption) > -1
    ? lastFocusedOption
    : options[0];
}

export const getFocusedOptionId = <Option>(
  focusableOptionsWithIds: FocusableOptionWithId<Option>[],
  focusedOption: Option
) => {
  const focusedOptionId = focusableOptionsWithIds.find(
    (option) => option.data === focusedOption
  )?.id;
  return focusedOptionId || null;
};

export const getOptionLabel = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  data: Option
): string => {
  return props.getOptionLabel(data);
};

export function isOptionDisabled<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  option: Option,
  selectValue: Options<Option>
): boolean {
  return typeof props.isOptionDisabled === 'function'
    ? props.isOptionDisabled(option, selectValue)
    : false;
}

export function isOptionSelected<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  option: Option,
  selectValue: Options<Option>
): boolean {
  if (selectValue.indexOf(option) > -1) return true;
  if (typeof props.isOptionSelected === 'function') {
    return props.isOptionSelected(option, selectValue);
  }
  const candidate = props.getOptionValue(option);
  return selectValue.some((i) => props.getOptionValue(i) === candidate);
}

export function filterOption<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  option: FilterOptionOption<Option>,
  inputValue: string
) {
  return props.filterOption ? props.filterOption(option, inputValue) : true;
}

export const shouldHideSelectedOptions = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const { hideSelectedOptions, isMulti } = props;
  if (hideSelectedOptions === undefined) return isMulti;
  return hideSelectedOptions;
};
