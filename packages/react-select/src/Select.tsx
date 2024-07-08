import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
  useImperativeHandle,
  forwardRef,
} from 'react';
import type {
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  TouchEventHandler,
  ReactElement,
} from 'react';
import LiveRegion from './components/LiveRegion';

import { createFilter } from './filters';
import {
  InternalInput,
  PlaceholderOrValue,
  FormField,
  InternalClearIndicator,
  InternalLoadingIndicator,
  InternalDropdownIndicator,
  InternalIndicatorSeparator,
} from './internal/index';
import { isAppleDevice as detectAppleDevice } from './accessibility/helpers';
import {
  type SelectContextValue,
  SelectContextProvider,
} from './SelectContext';

import {
  isOptionSelected,
  buildCategorizedOptions,
  buildFocusableOptions,
  buildFocusableOptionsFromCategorizedOptions,
  buildFocusableOptionsWithIds,
  getFocusedOptionId,
  getNextFocusedOption,
  getNextFocusedValue,
  useEventListeners,
} from './select-utils';

import {
  classNames,
  cleanValue,
  isTouchCapable,
  isMobileDevice,
  scrollIntoView,
  valueTernary,
  multiValueAsValue,
  singleValueAsValue,
  prependCn,
  useOnMountEffect,
} from './utils';

import {
  formatGroupLabel as formatGroupLabelBuiltin,
  getOptionLabel as getOptionLabelBuiltin,
  getOptionValue as getOptionValueBuiltin,
  isOptionDisabled as isOptionDisabledBuiltin,
} from './builtins';

import { defaultComponents } from './components/index';

import type {
  ActionMeta,
  FocusDirection,
  GroupBase,
  InputActionMeta,
  OnChangeValue,
  SetValueAction,
  State,
  FocusableOptionWithId,
  SelectProps as Props,
  DefaultSelectProps,
  FormatOptionLabelContext,
  ComponentNames,
  ClassNamesConfigComponentProps,
} from './types';
import { InternalMenu } from './components/Menu';

export const defaultProps = {
  'aria-live': 'polite',
  backspaceRemovesValue: true,
  blurInputOnSelect: isTouchCapable(),
  captureMenuScroll: !isTouchCapable(),
  classNames: {},
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabelBuiltin,
  getOptionLabel: getOptionLabelBuiltin,
  getOptionValue: getOptionValueBuiltin,
  inputValue: '',
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isOptionDisabled: isOptionDisabledBuiltin,
  isRtl: false,
  isSearchable: true,
  loadingMessage: () => 'Loading...',
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !isMobileDevice(),
  noOptionsMessage: () => 'No options',
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: ({ count }: { count: number }) =>
    `${count} result${count !== 1 ? 's' : ''} available`,
  styles: {},
  tabIndex: 0,
  tabSelectsValue: true,
  unstyled: false,
  classNamePrefix: 'react-select',
};

const isAppleDevice = detectAppleDevice();

const Select = forwardRef(SelectInstance) as SelectType;

export default Select;

export type PublicBaseSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = JSX.LibraryManagedAttributes<typeof Select, Props<Option, IsMulti, Group>>;

export type SelectRef = React.Ref<{
  focus: () => void;
  blur: () => void;
}>;

export type SelectType = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group> & { ref?: SelectRef }
) => ReactElement;

export type SelectInstance = typeof SelectInstance;
function SelectInstance<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(_props: Props<Option, IsMulti, Group>, selectRef: SelectRef) {
  // defaultProps assigned to props
  const props = useMemo(() => {
    return {
      ...defaultProps,
      ..._props,
    };
  }, [_props]) as unknown as DefaultSelectProps<Option, IsMulti, Group>;

  const instanceId = useId();
  // eslint-disable-next-line no-underscore-dangle
  const _instancePrefix = `react-select-${props.instanceId || instanceId}`;
  const [selectValue, setSelectValue] = useState(() => cleanValue(props.value));

  const getElementId = useCallback(
    (
      element:
        | 'group'
        | 'input'
        | 'listbox'
        | 'option'
        | 'placeholder'
        | 'live-region'
    ) => {
      return `${_instancePrefix}-${element}`;
    },
    [_instancePrefix]
  );

  const internalBuildCategorizedOptions = useCallback(() => {
    return buildCategorizedOptions(props, selectValue);
  }, [props, selectValue]);

  const internalBuildFocusableOptions = useCallback(() => {
    return buildFocusableOptionsFromCategorizedOptions(
      internalBuildCategorizedOptions()
    );
  }, [internalBuildCategorizedOptions]);

  // constructor
  const [state, setState] = useState<State<Option, IsMulti>>(() => {
    let intState: State<Option, IsMulti> = {
      ariaSelection: null,
      focusedOption: null,
      focusedOptionId: null,
      focusableOptionsWithIds: [],
      focusedValue: null,
      inputIsHidden: false,
      isFocused: false,
      clearFocusValueOnUpdate: false,
      prevWasFocused: false,
      inputIsHiddenAfterUpdate: undefined,
      instancePrefix: _instancePrefix,
    };

    if (props.menuIsOpen && selectValue.length) {
      const focusableOptionsWithIds: FocusableOptionWithId<Option>[] =
        buildFocusableOptionsWithIds(
          internalBuildCategorizedOptions(),
          getElementId('option')
        );
      const focusableOptions = internalBuildFocusableOptions();
      const optionIndex = focusableOptions.indexOf(selectValue[0]);
      const focusedOption = focusableOptions[optionIndex];
      intState = {
        ...intState,
        focusableOptionsWithIds,
        focusedOption,
        focusedOptionId: getFocusedOptionId(
          focusableOptionsWithIds,
          focusedOption
        ),
      };
    }

    return intState;
  });

  const isOptionHoverBlocked = useRef(false);
  const openAfterFocus = useRef(false);
  const scrollToFocusedOptionOnUpdate = useRef(false);

  const controlRef = useRef<HTMLDivElement | null>(null);
  const focusedOptionRef = useRef<HTMLDivElement | null>(null);
  const menuListRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // focus control logic
  const focusInput = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  const blurInput = useCallback(() => {
    if (inputRef.current) inputRef.current.blur();
  }, []);

  useImperativeHandle(selectRef, () => {
    return {
      focus() {
        focusInput();
      },
      blur() {
        blurInput();
      },
    };
  }, [focusInput, blurInput]);

  const onInputChange = useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {
      props.onInputChange?.(newValue, actionMeta);
    },
    [props]
  );

  const onMenuClose = useCallback(() => {
    onInputChange('', {
      action: 'menu-close',
      prevInputValue: props.inputValue,
    });
    props.onMenuClose?.();
  }, [props, onInputChange]);

  const { isComposing, userIsDragging } = useEventListeners(
    props,
    blurInput,
    onMenuClose,
    controlRef,
    menuListRef
  );

  const getComponents = useCallback(() => {
    return defaultComponents(props);
  }, [props]);

  const getCategorizedOptions = useCallback(() => {
    return props.menuIsOpen ? internalBuildCategorizedOptions() : [];
  }, [props.menuIsOpen, internalBuildCategorizedOptions]);

  const getFocusableOptions = useCallback(() => {
    return props.menuIsOpen ? internalBuildFocusableOptions() : [];
  }, [props.menuIsOpen, internalBuildFocusableOptions]);

  const ariaOnChange = useCallback(
    (value: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => {
      setState((prevState) => ({
        ...prevState,
        ariaSelection: { value, ...actionMeta },
      }));
    },
    []
  );

  const openMenu = useCallback(
    (focusOption: 'first' | 'last') => {
      const focusableOptions = internalBuildFocusableOptions();
      let openAtIndex =
        focusOption === 'first' ? 0 : focusableOptions.length - 1;

      if (!props.isMulti) {
        const selectedIndex = focusableOptions.indexOf(selectValue[0]);
        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      }

      scrollToFocusedOptionOnUpdate.current = !(
        state.isFocused && menuListRef.current
      );

      setState((prevState) => ({
        ...prevState,
        inputIsHiddenAfterUpdate: false,
        focusedValue: null,
        focusedOption: focusableOptions[openAtIndex],
        focusedOptionId: getFocusedOptionId(
          state.focusableOptionsWithIds,
          focusableOptions[openAtIndex]
        ),
      }));
      props.onMenuOpen?.();
    },
    [
      internalBuildFocusableOptions,
      props,
      state.isFocused,
      state.focusableOptionsWithIds,
      selectValue,
    ]
  );

  const focusValue = useCallback(
    (direction: 'previous' | 'next') => {
      if (!props.isMulti) return;

      setState((prevState) => ({ ...prevState, focusedOption: null }));

      let focusedIndex = selectValue.indexOf(state.focusedValue!);
      if (!state.focusedValue) {
        focusedIndex = -1;
      }

      const lastIndex = selectValue.length - 1;
      let nextFocus = -1;
      if (!selectValue.length) return;

      switch (direction) {
        case 'previous':
          if (focusedIndex === 0) {
            nextFocus = 0;
          } else if (focusedIndex === -1) {
            nextFocus = lastIndex;
          } else {
            nextFocus = focusedIndex - 1;
          }
          break;
        case 'next':
          if (focusedIndex > -1 && focusedIndex < lastIndex) {
            nextFocus = focusedIndex + 1;
          }
          break;
      }
      setState((prevState) => ({
        ...prevState,
        inputIsHidden: nextFocus !== -1,
        focusedValue: selectValue[nextFocus],
      }));
    },
    [props.isMulti, selectValue, state.focusedValue]
  );

  const focusOption = useCallback(
    (direction: FocusDirection = 'first') => {
      const { pageSize } = props;
      const { focusedOption } = state;
      const options = getFocusableOptions();

      if (!options.length) return;
      let nextFocus = 0; // handles 'first'
      let focusedIndex = options.indexOf(focusedOption!);
      if (!focusedOption) {
        focusedIndex = -1;
      }

      if (direction === 'up') {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      } else if (direction === 'down') {
        nextFocus = (focusedIndex + 1) % options.length;
      } else if (direction === 'pageup') {
        nextFocus = focusedIndex - pageSize;
        if (nextFocus < 0) nextFocus = 0;
      } else if (direction === 'pagedown') {
        nextFocus = focusedIndex + pageSize;
        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
      } else if (direction === 'last') {
        nextFocus = options.length - 1;
      }
      scrollToFocusedOptionOnUpdate.current = true;
      setState((prevState) => ({
        ...prevState,
        focusedOption: options[nextFocus],
        focusedValue: null,
        focusedOptionId: getFocusedOptionId(
          state.focusableOptionsWithIds,
          options[nextFocus]
        ),
      }));
    },
    [props, state, getFocusableOptions]
  );

  const onChange = useCallback(
    (
      newValue: OnChangeValue<Option, IsMulti>,
      actionMeta: ActionMeta<Option>
    ) => {
      actionMeta.name = props.name;

      ariaOnChange(newValue, actionMeta);
      props.onChange(newValue, actionMeta);
    },
    [props, ariaOnChange]
  );

  const setValue = useCallback(
    (
      newValue: OnChangeValue<Option, IsMulti>,
      action: SetValueAction,
      option?: Option
    ) => {
      const { closeMenuOnSelect, isMulti, inputValue } = props;
      onInputChange('', { action: 'set-value', prevInputValue: inputValue });
      if (closeMenuOnSelect) {
        setState((prevState) => ({
          ...prevState,
          inputIsHiddenAfterUpdate: !isMulti,
        }));
        onMenuClose();
      }
      setState((prevState) => ({
        ...prevState,
        clearFocusValueOnUpdate: true,
      }));
      onChange(newValue, { action, option });
    },
    [props, onChange, onInputChange, onMenuClose]
  );

  const selectOption = useCallback(
    (newValue: Option) => {
      const { blurInputOnSelect, isMulti, name } = props;
      const deselected =
        isMulti && isOptionSelected(props, newValue, selectValue);
      const isDisabled = props.isOptionDisabled(newValue, selectValue);

      if (deselected) {
        const candidate = props.getOptionValue(newValue);
        setValue(
          multiValueAsValue(
            selectValue.filter((i) => props.getOptionValue(i) !== candidate)
          ),
          'deselect-option',
          newValue
        );
      } else if (!isDisabled) {
        // Select option if option is not disabled
        if (isMulti) {
          setValue(
            multiValueAsValue([...selectValue, newValue]),
            'select-option',
            newValue
          );
        } else {
          setValue(singleValueAsValue(newValue), 'select-option');
        }
      } else {
        ariaOnChange(singleValueAsValue(newValue), {
          action: 'select-option',
          option: newValue,
          name,
        });
        return;
      }

      if (blurInputOnSelect) {
        blurInput();
      }
    },
    [props, selectValue, setValue, ariaOnChange, blurInput]
  );

  const removeValue = useCallback(
    (removedValue: Option) => {
      const { isMulti } = props;
      const candidate = props.getOptionValue(removedValue);
      const newValueArray = selectValue.filter(
        (i) => props.getOptionValue(i) !== candidate
      );
      const newValue = valueTernary(
        isMulti,
        newValueArray,
        newValueArray[0] || null
      );

      onChange(newValue, { action: 'remove-value', removedValue });
      focusInput();
    },
    [props, selectValue, onChange, focusInput]
  );

  const clearValue = useCallback(() => {
    onChange(valueTernary(props.isMulti, [], null), {
      action: 'clear',
      removedValues: selectValue,
    });
  }, [props.isMulti, selectValue, onChange]);

  const popValue = useCallback(() => {
    const { isMulti } = props;

    const lastSelectedValue = selectValue[selectValue.length - 1];
    const newValueArray = selectValue.slice(0, selectValue.length - 1);
    const newValue = valueTernary(
      isMulti,
      newValueArray,
      newValueArray[0] || null
    );

    onChange(newValue, {
      action: 'pop-value',
      removedValue: lastSelectedValue,
    });
  }, [props, selectValue, onChange]);

  const getValue = useCallback(() => selectValue, [selectValue]);

  const cx = useCallback(
    (...args: any) => classNames(props.classNamePrefix, ...args),
    [props.classNamePrefix]
  );

  const getClassNames = useCallback(
    <Key extends ComponentNames>(
      key: Key,
      context: SelectContextValue<Option, IsMulti, Group> & {
        componentProps: ClassNamesConfigComponentProps<Option, Key>;
      }
    ) => {
      if (typeof props.classNames[key] === 'function') {
        return props.classNames[key](context);
      }
      return props.classNames[key];
    },
    [props.classNames]
  );

  const formatOptionLabel = useCallback(
    (data: Option, context: FormatOptionLabelContext): ReactNode => {
      if (typeof props.formatOptionLabel === 'function') {
        const { inputValue } = props;
        return props.formatOptionLabel(data, {
          context,
          inputValue,
          selectValue: selectValue,
        });
      } else {
        return props.getOptionLabel(data);
      }
    },
    [props, selectValue]
  );

  // ==============================
  // Mouse Handlers
  // ==============================

  const onMenuMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.button !== 0) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      focusInput();
    },
    [focusInput]
  );

  const onMenuMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      isOptionHoverBlocked.current = false;
    },
    []
  );

  const onControlMouseDown = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      // Event captured by dropdown indicator
      if (event.defaultPrevented) {
        return;
      }
      const { openMenuOnClick } = props;
      if (!state.isFocused) {
        if (openMenuOnClick) {
          openAfterFocus.current = true;
        }
        focusInput();
      } else if (!props.menuIsOpen) {
        if (openMenuOnClick) {
          openMenu('first');
        }
      } else {
        if (
          (event.target as HTMLElement).tagName !== 'INPUT' &&
          (event.target as HTMLElement).tagName !== 'TEXTAREA'
        ) {
          onMenuClose();
        }
      }
      if (
        (event.target as HTMLElement).tagName !== 'INPUT' &&
        (event.target as HTMLElement).tagName !== 'TEXTAREA'
      ) {
        event.preventDefault();
      }
    },
    [props, state.isFocused, focusInput, openMenu, onMenuClose]
  );

  const onDropdownIndicatorMouseDown = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      // ignore mouse events that weren't triggered by the primary button
      if (
        event &&
        event.type === 'mousedown' &&
        (event as React.MouseEvent<HTMLDivElement>).button !== 0
      ) {
        return;
      }
      if (props.isDisabled) return;
      const { isMulti, menuIsOpen } = props;
      focusInput();
      if (menuIsOpen) {
        setState((prevState) => ({
          ...prevState,
          inputIsHiddenAfterUpdate: !isMulti,
        }));
        onMenuClose();
      } else {
        openMenu('first');
      }
      event.preventDefault();
    },
    [props, focusInput, onMenuClose, openMenu]
  );

  const onControlTouchEnd = useCallback<TouchEventHandler<HTMLDivElement>>(
    (event) => {
      if (userIsDragging.current) return;
      onControlMouseDown(event);
    },
    [onControlMouseDown, userIsDragging]
  );

  const onDropdownIndicatorTouchEnd = useCallback<
    TouchEventHandler<HTMLDivElement>
  >(
    (event) => {
      if (userIsDragging.current) return;
      onDropdownIndicatorMouseDown(event);
    },
    [onDropdownIndicatorMouseDown, userIsDragging]
  );

  // ==============================
  // Focus Handlers
  // ==============================

  const handleInputChange = useCallback<FormEventHandler<HTMLInputElement>>(
    (event) => {
      const { inputValue: prevInputValue, menuIsOpen } = props;
      const inputValue = event.currentTarget.value;
      setState((prev) => ({ ...prev, inputIsHiddenAfterUpdate: false }));
      onInputChange(inputValue, { action: 'input-change', prevInputValue });
      if (!menuIsOpen) {
        props.onMenuOpen?.();
      }
    },
    [props, onInputChange]
  );

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      if (props.onFocus) {
        props.onFocus(event);
      }
      setState((prev) => ({
        ...prev,
        inputIsHiddenAfterUpdate: false,
        isFocused: true,
      }));
      if (openAfterFocus.current || props.openMenuOnFocus) {
        openMenu('first');
      }
      openAfterFocus.current = false;
    },
    [props, openMenu]
  );

  const onInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      const { inputValue: prevInputValue, onBlur } = props;
      if (
        menuListRef.current &&
        menuListRef.current.contains(document.activeElement)
      ) {
        inputRef.current?.focus();
        return;
      }
      if (onBlur) {
        onBlur(event);
      }
      onInputChange('', { action: 'input-blur', prevInputValue });
      onMenuClose();
      setState((prev) => ({
        ...prev,
        focusedValue: null,
        isFocused: false,
      }));
    },
    [props, onInputChange, onMenuClose]
  );

  const onOptionHover = useCallback(
    (focusedOption: Option) => {
      if (
        isOptionHoverBlocked.current ||
        state.focusedOption === focusedOption
      ) {
        return;
      }
      const options = getFocusableOptions();
      const focusedOptionIndex = options.indexOf(focusedOption!);
      setState((prev) => ({
        ...prev,
        focusedOption,
        focusedOptionId:
          focusedOptionIndex > -1
            ? getFocusedOptionId(state.focusableOptionsWithIds, focusedOption)
            : null,
      }));
    },
    [state.focusedOption, state.focusableOptionsWithIds, getFocusableOptions]
  );

  // ==============================
  // Keyboard Handler
  // ==============================

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      const {
        isMulti,
        backspaceRemovesValue,
        escapeClearsValue,
        inputValue,
        isClearable,
        isDisabled,
        menuIsOpen,
        onKeyDown: onKeyDownProp,
        tabSelectsValue,
        openMenuOnFocus,
      } = props;

      if (isDisabled) return;

      if (typeof onKeyDownProp === 'function') {
        onKeyDownProp(event);
        if (event.defaultPrevented) {
          return;
        }
      }

      // Block option hover events when the user has just pressed a key
      isOptionHoverBlocked.current = true;
      switch (event.key) {
        case 'ArrowLeft':
          if (!isMulti || inputValue) return;
          focusValue('previous');
          break;
        case 'ArrowRight':
          if (!isMulti || inputValue) return;
          focusValue('next');
          break;
        case 'Delete':
        case 'Backspace':
          if (inputValue) return;
          if (state.focusedValue) {
            removeValue(state.focusedValue);
          } else {
            if (!backspaceRemovesValue) return;
            if (isMulti) {
              popValue();
            } else if (isClearable) {
              clearValue();
            }
          }
          break;
        case 'Tab':
          if (isComposing.current) return;

          if (
            event.shiftKey ||
            !menuIsOpen ||
            !tabSelectsValue ||
            !state.focusedOption ||
            (openMenuOnFocus &&
              isOptionSelected(props, state.focusedOption, selectValue))
          ) {
            return;
          }
          selectOption(state.focusedOption);
          break;
        case 'Enter':
          if (event.keyCode === 229) {
            break;
          }
          if (menuIsOpen) {
            if (!state.focusedOption) return;
            if (isComposing.current) return;
            selectOption(state.focusedOption);
            break;
          }
          return;
        case 'Escape':
          if (menuIsOpen) {
            setState((prev) => ({
              ...prev,
              inputIsHiddenAfterUpdate: false,
            }));
            onInputChange('', {
              action: 'menu-close',
              prevInputValue: inputValue,
            });
            onMenuClose();
          } else if (isClearable && escapeClearsValue) {
            clearValue();
          }
          break;
        case ' ': // space
          if (inputValue) {
            return;
          }
          if (!menuIsOpen) {
            openMenu('first');
            break;
          }
          if (!state.focusedOption) return;
          selectOption(state.focusedOption);
          break;
        case 'ArrowUp':
          if (menuIsOpen) {
            focusOption('up');
          } else {
            openMenu('last');
          }
          break;
        case 'ArrowDown':
          if (menuIsOpen) {
            focusOption('down');
          } else {
            openMenu('first');
          }
          break;
        case 'PageUp':
          if (!menuIsOpen) return;
          focusOption('pageup');
          break;
        case 'PageDown':
          if (!menuIsOpen) return;
          focusOption('pagedown');
          break;
        case 'Home':
          if (!menuIsOpen) return;
          focusOption('first');
          break;
        case 'End':
          if (!menuIsOpen) return;
          focusOption('last');
          break;
        default:
          return;
      }
      event.preventDefault();
    },
    [
      props,
      focusValue,
      state.focusedValue,
      state.focusedOption,
      isComposing,
      selectValue,
      selectOption,
      focusOption,
      removeValue,
      popValue,
      clearValue,
      onInputChange,
      onMenuClose,
      openMenu,
    ]
  );

  // ==============================
  // getDerivedStateFromProps
  // ==============================

  const prevProps = useRef<Props<Option, IsMulti, Group> | void>(undefined);
  useEffect(() => {
    const { options, value, menuIsOpen, inputValue, isMulti } = props;

    const {
      clearFocusValueOnUpdate,
      inputIsHiddenAfterUpdate,
      ariaSelection,
      isFocused,
      prevWasFocused,
    } = state;

    const newSelectValue = cleanValue(value);
    let newMenuOptionsState = {};

    if (
      prevProps.current &&
      (value !== prevProps.current.value ||
        options !== prevProps.current.options ||
        menuIsOpen !== prevProps.current.menuIsOpen ||
        inputValue !== prevProps.current.inputValue)
    ) {
      const focusableOptions = menuIsOpen
        ? buildFocusableOptions(props, newSelectValue)
        : [];

      const focusableOptionsWithIds = menuIsOpen
        ? buildFocusableOptionsWithIds(
            buildCategorizedOptions(props, newSelectValue),
            getElementId('option')
          )
        : [];

      const focusedValue = clearFocusValueOnUpdate
        ? getNextFocusedValue(state.focusedValue, selectValue, newSelectValue)
        : null;
      const focusedOption = getNextFocusedOption(
        state.focusedOption,
        focusableOptions
      );
      const focusedOptionId = getFocusedOptionId(
        focusableOptionsWithIds,
        focusedOption
      );

      newMenuOptionsState = {
        focusedOption,
        focusedOptionId,
        focusableOptionsWithIds,
        focusedValue,
        clearFocusValueOnUpdate: false,
      };

      setSelectValue(newSelectValue);
    }

    // some updates should toggle the state of the input visibility

    // TODO: check if props !== prevProps.current needs deep comparison
    const newInputIsHiddenState =
      inputIsHiddenAfterUpdate != null && props !== prevProps.current
        ? {
            inputIsHidden: inputIsHiddenAfterUpdate,
            inputIsHiddenAfterUpdate: undefined,
          }
        : {};

    let newAriaSelection = ariaSelection;

    let hasKeptFocus = isFocused && prevWasFocused;

    if (isFocused && !hasKeptFocus) {
      newAriaSelection = {
        value: valueTernary(isMulti, newSelectValue, newSelectValue[0] || null),
        options: newSelectValue,
        action: 'initial-input-focus',
      };

      hasKeptFocus = !prevWasFocused;
    }

    // If the 'initial-input-focus' action has been set already
    // then reset the ariaSelection to null
    if (ariaSelection?.action === 'initial-input-focus') {
      newAriaSelection = null;
    }

    setState((prevState) => ({
      ...prevState,
      ...newMenuOptionsState,
      ...newInputIsHiddenState,
      ariaSelection: newAriaSelection,
      prevWasFocused: hasKeptFocus,
    }));

    prevProps.current = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props,
    state.isFocused,
    state.focusedValue,
    state.focusedOption,
    selectValue,
  ]);

  // Focus management
  const prevPropsForFocusManagement = useRef({
    isDisabled: props.isDisabled,
    menuIsOpen: props.menuIsOpen,
  });
  useEffect(() => {
    const { isDisabled, menuIsOpen } = props;

    if (
      (state.isFocused &&
        !isDisabled &&
        prevPropsForFocusManagement.current.isDisabled) ||
      (state.isFocused &&
        menuIsOpen &&
        !prevPropsForFocusManagement.current.menuIsOpen)
    ) {
      focusInput();
    }

    if (
      state.isFocused &&
      isDisabled &&
      !prevPropsForFocusManagement.current.isDisabled
    ) {
      setState((prevState) => ({ ...prevState, isFocused: false }));
      onMenuClose();
    } else if (
      !state.isFocused &&
      !isDisabled &&
      prevPropsForFocusManagement.current.isDisabled &&
      inputRef.current === document.activeElement
    ) {
      setState((prevState) => ({ ...prevState, isFocused: true }));
    }

    prevPropsForFocusManagement.current = {
      isDisabled,
      menuIsOpen,
    };
  }, [
    props,
    state.isFocused,
    focusInput,
    onMenuClose,
    prevPropsForFocusManagement,
  ]);

  useOnMountEffect(() => {
    if (props.autoFocus) {
      focusInput();
    }
  });

  // Menu scroll management
  useEffect(() => {
    if (
      menuListRef.current &&
      focusedOptionRef.current &&
      scrollToFocusedOptionOnUpdate.current
    ) {
      scrollIntoView(menuListRef.current, focusedOptionRef.current);
      scrollToFocusedOptionOnUpdate.current = false;
    }
  }, [state.focusedOption]);

  // Scroll focusedOption into view if menuIsOpen is set on mount (e.g. defaultMenuIsOpen)
  useOnMountEffect(() => {
    if (
      props.menuIsOpen &&
      state.focusedOption &&
      menuListRef.current &&
      focusedOptionRef.current
    ) {
      scrollIntoView(menuListRef.current, focusedOptionRef.current);
    }
  });

  // Render method becomes the main function body
  const { Control, IndicatorsContainer, SelectContainer, ValueContainer } =
    getComponents();

  return (
    <SelectContextProvider<Option, IsMulti, Group>
      value={{
        selectProps: props,
        components: getComponents(),
        state: { ...state, selectValue },
        // @ts-expect-error
        getClassNames,
        clearValue,
        cx,
        getValue,
        hasValue: selectValue.length > 0,
        selectOption,
        setValue,
        isOptionHoverBlocked: isOptionHoverBlocked.current,
        isAppleDevice,
        focusInput: focusInput,
        blurInput: blurInput,
        getFocusableOptions: getFocusableOptions,
        getCategorizedOptions: getCategorizedOptions,
        getElementId: getElementId,
        removeValue,
        onOptionHover: onOptionHover,
        formatOptionLabel: formatOptionLabel,
        focusedOptionRef,
        controlRef,
        menuListRef,
        onMenuMouseDown: onMenuMouseDown,
        onMenuMouseMove: onMenuMouseMove,
        userIsDragging: userIsDragging,
        openAfterFocus: openAfterFocus,
      }}
    >
      <SelectContainer
        innerProps={{
          id: props.id,
          onKeyDown,
          className: prependCn(props.classNamePrefix!, '', props.className),
        }}
      >
        <LiveRegion id={getElementId('live-region')} />
        <Control
          innerRef={controlRef}
          innerProps={{
            onMouseDown: onControlMouseDown,
            onTouchEnd: onControlTouchEnd,
          }}
        >
          <ValueContainer>
            <PlaceholderOrValue />
            <InternalInput
              inputRef={inputRef}
              onInputBlur={onInputBlur}
              onInputFocus={onInputFocus}
              handleInputChange={handleInputChange}
            />
          </ValueContainer>
          <IndicatorsContainer>
            <InternalClearIndicator />
            <InternalLoadingIndicator />
            <InternalIndicatorSeparator />
            <InternalDropdownIndicator
              onMouseDown={onDropdownIndicatorMouseDown}
              onTouchEnd={onDropdownIndicatorTouchEnd}
            />
          </IndicatorsContainer>
        </Control>
        <InternalMenu />
        <FormField />
      </SelectContainer>
    </SelectContextProvider>
  );
}
