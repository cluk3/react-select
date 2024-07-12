import { useMemo } from 'react';

import A11yText from '../internal/A11yText';
import { defaultAriaLiveMessages } from '../accessibility';

import type { GroupBase, OnChangeValue } from '../types';
import { useInternalContext } from '../SelectContext';

// ==============================
// Root Container
// ==============================

export interface LiveRegionProps {
  id: string;
}

const LiveRegion = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: LiveRegionProps
) => {
  const {
    selectProps: {
      ariaLiveMessages,
      getOptionLabel,
      inputValue,
      isMulti,
      isOptionDisabled,
      isSearchable,
      menuIsOpen,
      options,
      screenReaderStatus,
      tabSelectsValue,
      isLoading,
      'aria-label': ariaLabel,
      'aria-live': ariaLive,
    },
    state: {
      ariaSelection,
      focusedOption,
      focusedValue,
      selectValue,
      isFocused,
    },
    isAppleDevice,
    getFocusableOptions,
  } = useInternalContext<Option, IsMulti, Group>();

  const focusableOptions = getFocusableOptions();

  // Update aria live message configuration when prop changes
  const messages = useMemo(
    () => ({
      ...defaultAriaLiveMessages,
      ...(ariaLiveMessages || {}),
    }),
    [ariaLiveMessages]
  );

  // Update aria live selected option when prop changes
  const ariaSelected = useMemo(() => {
    let message = '';
    if (ariaSelection && messages.onChange) {
      const {
        option,
        options: selectedOptions,
        removedValue,
        removedValues,
        value,
      } = ariaSelection;
      // select-option when !isMulti does not return option so we assume selected option is value
      const asOption = (val: OnChangeValue<Option, IsMulti>): Option | null =>
        !Array.isArray(val) ? (val as Option) : null;

      // If there is just one item from the action then get its label
      const selected = removedValue || option || asOption(value);
      const label = selected ? getOptionLabel(selected) : '';

      // If there are multiple items from the action then return an array of labels
      const multiSelected = selectedOptions || removedValues || undefined;
      const labels = multiSelected ? multiSelected.map(getOptionLabel) : [];

      const onChangeProps = {
        // multiSelected items are usually items that have already been selected
        // or set by the user as a default value so we assume they are not disabled
        isDisabled: selected && isOptionDisabled(selected, selectValue),
        label,
        labels,
        ...ariaSelection,
      };

      message = messages.onChange(onChangeProps);
    }
    return message;
  }, [ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel]);

  const ariaFocused = useMemo(() => {
    let focusMsg = '';
    const focused = focusedOption || focusedValue;
    const isSelected = !!(
      focusedOption &&
      selectValue &&
      selectValue.includes(focusedOption)
    );

    if (focused && messages.onFocus) {
      const onFocusProps = {
        focused,
        label: getOptionLabel(focused),
        isDisabled: isOptionDisabled(focused, selectValue),
        isSelected,
        options: focusableOptions,
        context:
          focused === focusedOption ? ('menu' as const) : ('value' as const),
        selectValue,
        isAppleDevice,
      };

      focusMsg = messages.onFocus(onFocusProps);
    }
    return focusMsg;
  }, [
    focusedOption,
    focusedValue,
    getOptionLabel,
    isOptionDisabled,
    messages,
    focusableOptions,
    selectValue,
    isAppleDevice,
  ]);

  const ariaResults = useMemo(() => {
    let resultsMsg = '';
    if (menuIsOpen && options.length && !isLoading && messages.onFilter) {
      const resultsMessage = screenReaderStatus({
        count: focusableOptions.length,
      });
      resultsMsg = messages.onFilter({ inputValue, resultsMessage });
    }
    return resultsMsg;
  }, [
    focusableOptions,
    inputValue,
    menuIsOpen,
    messages,
    options,
    screenReaderStatus,
    isLoading,
  ]);

  const isInitialFocus = ariaSelection?.action === 'initial-input-focus';

  const ariaGuidance = useMemo(() => {
    let guidanceMsg = '';
    if (messages.guidance) {
      const context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
      guidanceMsg = messages.guidance({
        'aria-label': ariaLabel,
        context,
        isDisabled:
          focusedOption && isOptionDisabled(focusedOption, selectValue),
        isMulti,
        isSearchable,
        tabSelectsValue,
        isInitialFocus,
      });
    }
    return guidanceMsg;
  }, [
    ariaLabel,
    focusedOption,
    focusedValue,
    isMulti,
    isOptionDisabled,
    isSearchable,
    menuIsOpen,
    messages,
    selectValue,
    tabSelectsValue,
    isInitialFocus,
  ]);

  const ScreenReaderText = (
    <>
      <span id="aria-selection">{ariaSelected}</span>
      <span id="aria-focused">{ariaFocused}</span>
      <span id="aria-results">{ariaResults}</span>
      <span id="aria-guidance">{ariaGuidance}</span>
    </>
  );

  return (
    <>
      {/* We use 'aria-describedby' linked to this component for the initial focus */}
      {/* action, then for all other actions we use the live region below */}
      <A11yText id={props.id}>{isInitialFocus && ScreenReaderText}</A11yText>
      <A11yText
        aria-live={ariaLive}
        aria-atomic="false"
        aria-relevant="additions text"
        role="log"
      >
        {isFocused && !isInitialFocus && ScreenReaderText}
      </A11yText>
    </>
  );
};

export default LiveRegion;
