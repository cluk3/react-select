import type { ReactNode } from 'react';
import { MenuPlacer } from './index';
import { ScrollManager } from '../../internal';
import { useInternalSelectContext } from '../../SelectContext';
import type { CategorizedOption, FormatOptionLabelContext } from '../../types';
import React from 'react';
import type { OptionProps } from '../Option';

export function InternalMenu() {
  const {
    getFocusableOptions,
    getElementId,
    menuListRef,
    controlRef,
    components: {
      Menu,
      MenuList,
      MenuPortal,
      LoadingMessage,
      NoOptionsMessage,
    },
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
    },
  } = useInternalSelectContext();

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
    <MenuPlacer>
      {({ ref, placerProps: { placement, maxHeight } }) => (
        <Menu innerRef={ref} placement={placement}>
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
                }}
                maxHeight={maxHeight}
              >
                {menuUI}
              </MenuList>
            )}
          </ScrollManager>
        </Menu>
      )}
    </MenuPlacer>
  );

  // positioning behaviour is almost identical for portalled and fixed,
  // so we use the same component. the actual portalling logic is forked
  // within the component based on `menuPosition`
  return menuPortalTarget || menuPosition === 'fixed' ? (
    <MenuPortal
      appendTo={menuPortalTarget}
      controlElement={controlRef.current}
      menuPlacement={menuPlacement}
      menuPosition={menuPosition}
    >
      {menuElement}
    </MenuPortal>
  ) : (
    menuElement
  );
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
    components: { Group, GroupHeading, Option },
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
          {...internalOptionProps}
        />
      );
    }
  });
}
