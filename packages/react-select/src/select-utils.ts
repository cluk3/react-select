import type { DefaultSelectProps as SelectProps } from './types';
import type { Options, GroupBase } from './types';
import type { CategorizedOption, CategorizedGroupOrOption } from './types';
import type { FocusableOptionWithId, State } from './types';
import { notNullish, useOnMountEffect, isDocumentElement } from './utils';
import type { FilterOptionOption } from './filters';
import { useCallback, useRef } from 'react';

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
  const isDisabled = props.isOptionDisabled(option, selectValue);
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

export const shouldHideSelectedOptions = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  hideSelectedOptions: SelectProps<
    Option,
    IsMulti,
    Group
  >['hideSelectedOptions'],
  isMulti: SelectProps<Option, IsMulti, Group>['isMulti']
) => {
  if (hideSelectedOptions === undefined) return isMulti;
  return hideSelectedOptions;
};

export function isFocusable<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  categorizedOption: CategorizedOption<Option>
) {
  const { inputValue = '', hideSelectedOptions, isMulti } = props;
  const { data, isSelected, label, value } = categorizedOption;

  return (
    (!shouldHideSelectedOptions(hideSelectedOptions, isMulti) || !isSelected) &&
    filterOption(props, { label, value, data }, inputValue)
  );
}

export function getNextFocusedValue<Option, IsMulti extends boolean>(
  focusedValue: State<Option, IsMulti>['focusedValue'],
  lastSelectValue: Options<Option>,
  nextSelectValue: Options<Option>
) {
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

export function getNextFocusedOption<Option, IsMulti extends boolean>(
  lastFocusedOption: State<Option, IsMulti>['focusedOption'],
  options: Options<Option>
) {
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

export function useEventListeners<
  Option extends unknown,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
  blurInput: () => void,
  onMenuClose: () => void,
  controlRef: React.MutableRefObject<HTMLDivElement | null>,
  menuListRef: React.MutableRefObject<HTMLDivElement | null>
) {
  const isComposing = useRef(false);
  const initialTouchX = useRef(0);
  const initialTouchY = useRef(0);
  const userIsDragging = useRef<boolean | undefined>(undefined);

  const onCompositionStart = useCallback(() => {
    isComposing.current = true;
  }, []);

  const onCompositionEnd = useCallback(() => {
    isComposing.current = false;
  }, []);

  const onTouchStart = useCallback(({ touches }: TouchEvent) => {
    const touch = touches && touches.item(0);
    if (!touch) {
      return;
    }

    initialTouchX.current = touch.clientX;
    initialTouchY.current = touch.clientY;
    userIsDragging.current = false;
  }, []);

  const onTouchMove = useCallback(({ touches }: TouchEvent) => {
    const touch = touches && touches.item(0);
    if (!touch) {
      return;
    }

    const deltaX = Math.abs(touch.clientX - initialTouchX.current);
    const deltaY = Math.abs(touch.clientY - initialTouchY.current);
    const moveThreshold = 5;

    userIsDragging.current = deltaX > moveThreshold || deltaY > moveThreshold;
  }, []);

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (userIsDragging.current) return;

      if (
        controlRef.current &&
        !controlRef.current.contains(event.target as Node) &&
        menuListRef.current &&
        !menuListRef.current.contains(event.target as Node)
      ) {
        blurInput();
      }

      initialTouchX.current = 0;
      initialTouchY.current = 0;
    },
    [blurInput, controlRef, menuListRef]
  );

  const onScroll = useCallback(
    (event: Event) => {
      if (typeof props.closeMenuOnScroll === 'boolean') {
        if (
          event.target instanceof HTMLElement &&
          isDocumentElement(event.target)
        ) {
          onMenuClose();
        }
      } else if (typeof props.closeMenuOnScroll === 'function') {
        if (props.closeMenuOnScroll(event)) {
          onMenuClose();
        }
      }
    },
    [onMenuClose, props]
  );

  useOnMountEffect(() => {
    const startListeningComposition = () => {
      if (document && document.addEventListener) {
        document.addEventListener(
          'compositionstart',
          onCompositionStart,
          false
        );
        document.addEventListener('compositionend', onCompositionEnd, false);
      }
    };

    const stopListeningComposition = () => {
      if (document && document.removeEventListener) {
        document.removeEventListener('compositionstart', onCompositionStart);
        document.removeEventListener('compositionend', onCompositionEnd);
      }
    };

    const startListeningToTouch = () => {
      if (document && document.addEventListener) {
        document.addEventListener('touchstart', onTouchStart, false);
        document.addEventListener('touchmove', onTouchMove, false);
        document.addEventListener('touchend', onTouchEnd, false);
      }
    };

    const stopListeningToTouch = () => {
      if (document && document.removeEventListener) {
        document.removeEventListener('touchstart', onTouchStart);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      }
    };
    startListeningComposition();
    startListeningToTouch();

    if (props.closeMenuOnScroll && document && document.addEventListener) {
      document.addEventListener('scroll', onScroll, true);
    }

    return () => {
      stopListeningComposition();
      stopListeningToTouch();
      document.removeEventListener('scroll', onScroll, true);
    };
  });

  return {
    isComposing,
    userIsDragging,
  };
}
