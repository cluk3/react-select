import type { ReactNode } from 'react';
import { ScrollManager } from '../../internal';
import { useInternalSelectContext } from '../../SelectContext';
import type { CategorizedOption, FormatOptionLabelContext } from '../../types';
import type { OptionProps } from '../Option';
import React, { useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from '@floating-ui/react-dom';
import { createPortal, flushSync } from 'react-dom';
import { scrollOptionIntoView } from '../../select-utils';
import useLayoutEffect from 'use-isomorphic-layout-effect';
import { type IconProps } from '../indicators';

// margin between menu and the lower part of the screen
// without this, the menu lower part will be attached to the bottom of the screen
const MENU_MARGIN = 8;
export function InternalMenu() {
  const {
    getFocusableOptions,
    getElementId,
    menuListRef,
    controlRef,
    scrollToFocusedOptionOnUpdate,
    focusedOptionRef,
    components: { Menu, MenuList, LoadingMessage, NoOptionsMessage },
    selectProps: {
      captureMenuScroll,
      inputValue,
      isLoading,
      menuPlacement,
      menuPosition,
      menuShouldBlockScroll,
      menuPortalTarget,
      loadingMessage,
      noOptionsMessage,
      onMenuScrollToTop,
      onMenuScrollToBottom,
      isMulti,
      maxMenuHeight,
      minMenuHeight,
    },
    state: { focusedOption },
  } = useInternalSelectContext();

  const [maxHeight, setMaxHeight] = useState<number>(maxMenuHeight);
  const { refs, floatingStyles, middlewareData } = useFloating({
    whileElementsMounted: autoUpdate,
    elements: {
      reference: controlRef.current,
    },
    placement: menuPlacement,
    strategy: menuPosition,
    middleware: [
      offset(8),
      size((state) => ({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${state.rects.reference.width}px`,
          });
          flushSync(() =>
            setMaxHeight(
              Math.min(
                Math.max(minMenuHeight, availableHeight),
                maxMenuHeight
              ) - MENU_MARGIN
            )
          );
        },
      })),
      flip({
        fallbackStrategy: 'initialPlacement',
      }),
    ],
  });

  // we want to wait for size middleware to be initialized before scrolling
  // otherwise the size of the menu is not calculated yet
  // and the scrollIntoView will not work
  // this is a workaround for https://github.com/JedWatson/react-select/issues/5926
  useLayoutEffect(() => {
    if (
      menuListRef.current &&
      focusedOptionRef.current &&
      scrollToFocusedOptionOnUpdate.current &&
      middlewareData.size
    ) {
      scrollOptionIntoView(menuListRef.current, focusedOptionRef.current);
      scrollToFocusedOptionOnUpdate.current = false;
    }
  }, [
    focusedOption,
    focusedOptionRef,
    menuListRef,
    scrollToFocusedOptionOnUpdate,
    middlewareData.size,
  ]);

  let menuUI: ReactNode;
  const hasOptions = !!getFocusableOptions().length;

  if (hasOptions) {
    menuUI = <OptionsList />;
  } else if (isLoading) {
    const message = loadingMessage({ inputValue });
    if (message === null) return null;
    menuUI = <LoadingMessage>{message}</LoadingMessage>;
  } else {
    const message = noOptionsMessage({ inputValue });
    if (message === null) return null;
    menuUI = <NoOptionsMessage>{message}</NoOptionsMessage>;
  }

  const menuElement = (
    <Menu
      innerRef={refs.setFloating}
      innerProps={{
        style: floatingStyles,
      }}
    >
      <ScrollManager
        captureEnabled={captureMenuScroll}
        onTopArrive={onMenuScrollToTop}
        onBottomArrive={onMenuScrollToBottom}
        lockEnabled={menuShouldBlockScroll}
      >
        {(scrollTargetRef) => (
          <MenuList
            innerRef={(instance) => {
              menuListRef.current = instance;
              scrollTargetRef(instance);
            }}
            innerProps={{
              role: 'listbox',
              'aria-multiselectable': isMulti,
              id: getElementId('listbox'),
              style: {
                maxHeight: `${maxHeight}px`,
              },
            }}
          >
            {menuUI}
          </MenuList>
        )}
      </ScrollManager>
    </Menu>
  );

  return menuPortalTarget
    ? createPortal(menuElement, menuPortalTarget)
    : menuElement;
}

const InternalOption = React.memo(
  function <Option>(props: {
    option: CategorizedOption<Option>;
    optionId: string;
    focusedOptionRef: React.MutableRefObject<HTMLDivElement | null>;
    isAppleDevice: boolean;
    methods: React.MutableRefObject<{
      onOptionHover: (focusedOption: Option) => void;
      selectOption: (focusedOption: Option) => void;
      formatOptionLabel: (
        data: Option,
        context: FormatOptionLabelContext
      ) => React.ReactNode;
    }>;
    isFocused: boolean;
    isClearable: boolean;
    OptionComponent: React.ComponentType<OptionProps<Option>>;
    CheckIconComponent: React.ComponentType<IconProps>;
  }) {
    const {
      option,
      optionId,
      methods,
      focusedOptionRef,
      isAppleDevice,
      isClearable,
      isFocused,
      OptionComponent,
      CheckIconComponent,
    } = props;

    const { onOptionHover, formatOptionLabel, selectOption } = methods.current;
    const { type, data, isDisabled, isSelected, label } = option;

    const onHover = () => {
      if (!isFocused) onOptionHover(data);
    };
    const onSelect = () => selectOption(data);
    const innerProps = {
      id: optionId,
      onClick: onSelect,
      onMouseMove: onHover,
      onMouseOver: onHover,
      tabIndex: -1,
      role: 'option',
      'aria-selected': isAppleDevice ? undefined : isSelected, // is not supported on Apple devices
    };

    return (
      <OptionComponent
        innerProps={innerProps}
        data={data}
        isOptionSelected={isSelected}
        isOptionDisabled={isDisabled}
        isOptionFocused={isFocused}
        isOptionDeselectable={isClearable}
        key={optionId}
        label={label}
        type={type}
        innerRef={isFocused ? focusedOptionRef : undefined}
        CheckIconComponent={CheckIconComponent}
      >
        {formatOptionLabel(data, 'menu')}
      </OptionComponent>
    );
  },
  (prev, next) => {
    return Object.keys(prev).every((key) => {
      if (key === 'option') {
        return JSON.stringify(prev.option) === JSON.stringify(next.option);
      }
      return Object.is(
        prev[key as keyof typeof prev],
        next[key as keyof typeof next]
      );
    });
  }
);

function OptionsList() {
  const {
    getCategorizedOptions,
    getElementId,
    selectOption,
    formatOptionLabel,
    focusedOptionRef,
    isAppleDevice,
    onOptionHover,
    components: { Group, GroupHeading, Option, CheckIcon },
    selectProps: { formatGroupLabel, isClearable },
    state: { focusedOption },
  } = useInternalSelectContext();

  const methods = React.useRef({
    onOptionHover,
    formatOptionLabel,
    selectOption,
  });

  methods.current = {
    onOptionHover,
    formatOptionLabel,
    selectOption,
  };

  const internalOptionProps = {
    focusedOptionRef,
    isAppleDevice,
    methods,
  };
  return getCategorizedOptions().map((item) => {
    if (item.type === 'group') {
      const { data, options, index: groupIndex } = item;
      const groupId = `${getElementId('group')}-${groupIndex}`;
      const headingId = `${groupId}-heading`;

      return (
        <Group
          key={groupId}
          data={data}
          options={options}
          Heading={GroupHeading}
          headingProps={{
            id: headingId,
            data: item.data,
          }}
          label={formatGroupLabel(item.data)}
        >
          {item.options.map((option) => (
            <InternalOption
              option={option}
              optionId={`${getElementId('option')}-${groupIndex}-${option.index}`}
              key={`${groupIndex}-${option.index}`}
              isClearable={isClearable}
              isFocused={focusedOption === option.data}
              OptionComponent={Option}
              CheckIconComponent={CheckIcon}
              {...internalOptionProps}
            />
          ))}
        </Group>
      );
    } else if (item.type === 'option') {
      return (
        <InternalOption
          option={item}
          optionId={`${getElementId('option')}-${item.index}`}
          key={item.index}
          isClearable={isClearable}
          isFocused={focusedOption === item.data}
          OptionComponent={Option}
          CheckIconComponent={CheckIcon}
          {...internalOptionProps}
        />
      );
    }
  });
}
