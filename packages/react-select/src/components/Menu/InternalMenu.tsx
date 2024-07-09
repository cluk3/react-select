import type { ReactNode } from 'react';
import { useMenuPlacer } from './index';
import { ScrollManager } from '../../internal';
import { useSelectContext } from '../../SelectContext';
import type { CategorizedOption } from '../../types';

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
      menuIsOpen,
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
  } = useSelectContext();

  const {
    ref,
    placerProps: { placement, maxHeight },
  } = useMenuPlacer();

  if (!menuIsOpen) return null;

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

function InternalOption<Option>({
  option,
  id,
}: {
  option: CategorizedOption<Option>;
  id: string;
}) {
  const { type, data, isDisabled, isSelected, label } = option;
  const {
    getElementId,
    onOptionHover,
    selectOption,
    formatOptionLabel,
    focusedOptionRef,
    isAppleDevice,
    state: { focusedOption },
    components: { Option },
  } = useSelectContext();

  const isFocused = focusedOption === data;
  const onHover = isDisabled
    ? undefined
    : () => {
        onOptionHover(data);
      };
  const onSelect = isDisabled ? undefined : () => selectOption(data);
  const optionId = `${getElementId('option')}-${id}`;
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
    <Option
      innerProps={innerProps}
      data={data}
      isOptionSelected={isSelected}
      isOptionDisabled={isDisabled}
      isOptionFocused={isFocused}
      key={optionId}
      label={label}
      type={type}
      innerRef={isFocused ? focusedOptionRef : undefined}
    >
      {formatOptionLabel(data, 'menu')}
    </Option>
  );
}

function OptionsList() {
  const {
    getCategorizedOptions,
    getElementId,
    components: { Group, GroupHeading },
    selectProps: { formatGroupLabel },
  } = useSelectContext();
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
              id={`${groupIndex}-${option.index}`}
              key={`${groupIndex}-${option.index}`}
            />
          ))}
        </Group>
      );
    } else if (item.type === 'option') {
      return (
        <InternalOption option={item} id={`${item.index}`} key={item.index} />
      );
    }
  });
}
