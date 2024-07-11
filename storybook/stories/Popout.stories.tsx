import Button from '@atlaskit/button/standard-button';
import type { Meta } from '@storybook/react';
import * as React from 'react';
import type { ClassNamesConfig } from 'react-select';
import Select from 'react-select';

import { ChevronDown, Svg } from '../components';
import type { StateOption } from '../data';
import { stateOptions } from '../data';

export default {
  title: 'Select/Popout',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function Popout() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState<StateOption | null>(null);

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      target={
        <Button
          iconAfter={<ChevronDown />}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {value ? `State: ${value.label}` : 'Select a State'}
        </Button>
      }
    >
      <Select
        autoFocus
        backspaceRemovesValue={false}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        menuIsOpen
        onChange={(newValue) => {
          setValue(newValue);
          setIsOpen(false);
        }}
        options={stateOptions}
        placeholder="Search..."
        classNames={classNames}
        tabSelectsValue={false}
        value={value}
      />
    </Dropdown>
  );
}

// =============================================================================
// Styles
// =============================================================================

const classNames: ClassNamesConfig<StateOption, false> = {
  control: () => 'min-w-[240px] m-2',
  menu: () => 'shadow-inner',
};

// =============================================================================
// Styled components
// =============================================================================

function Menu(props: JSX.IntrinsicElements['div']) {
  const shadow = 'hsla(218, 50%, 10%, 0.1)';
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: 'absolute',
        zIndex: 1,
      }}
      {...props}
    />
  );
}

function Blanket(props: JSX.IntrinsicElements['div']) {
  return (
    <div
      style={{
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        position: 'fixed',
        zIndex: 1,
      }}
      {...props}
    />
  );
}

function Dropdown({
  children,
  isOpen,
  target,
  onClose,
}: {
  children?: React.ReactNode;
  readonly isOpen: boolean;
  readonly target: React.ReactNode;
  readonly onClose: () => void;
}) {
  return (
    <div className="relative">
      {target}
      {isOpen ? <Blanket onClick={onClose} /> : null}
      {isOpen ? <Menu>{children}</Menu> : null}
    </div>
  );
}

function DropdownIndicator() {
  return (
    <div style={{ color: 'var(--rs-neutral-20)', height: 24, width: 32 }}>
      <Svg>
        <path
          d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </Svg>
    </div>
  );
}
