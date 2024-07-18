import { type ReactNode, type Ref } from 'react';

import { useGetClassNames } from '../../utils';

import { useInternalSelectContext } from '../../SelectContext';

export { InternalMenu } from './InternalMenu';

export interface MenuProps {
  /** Reference to the internal element, consumed by the MenuPlacer component */
  innerRef: Ref<HTMLDivElement>;
  innerProps?: JSX.IntrinsicElements['div'];
  children: ReactNode;
}

const Menu = (props: MenuProps) => {
  const { onMenuMouseDown, onMenuMouseMove } = useInternalSelectContext();
  const { children, innerRef, innerProps } = props;
  const className = useGetClassNames('menu', props, innerProps?.className);
  return (
    <div
      ref={innerRef}
      onMouseDown={onMenuMouseDown}
      onMouseMove={onMenuMouseMove}
      {...innerProps}
      className={className}
    >
      {children}
    </div>
  );
};

export default Menu;

// ==============================
// Menu List
// ==============================

export interface MenuListProps {
  /** The children to be rendered. */
  children: ReactNode;
  /** Inner ref to DOM ReactNode */
  innerRef: Ref<HTMLDivElement>;
  /** Props to be passed to the menu-list wrapper. */
  innerProps: JSX.IntrinsicElements['div'];
}

export const MenuList = (props: MenuListProps) => {
  const { children, innerProps, innerRef } = props;
  const className = useGetClassNames('menuList', props, innerProps.className);
  return (
    <div ref={innerRef} {...innerProps} className={className}>
      {children}
    </div>
  );
};

// ==============================
// Menu Notices
// ==============================

export interface NoticeProps {
  children: ReactNode;
  /** Props to be passed on to the wrapper. */
  innerProps?: JSX.IntrinsicElements['div'];
}

export const NoOptionsMessage = (props: NoticeProps) => {
  const { children = 'No options', innerProps } = props;
  const className = useGetClassNames(
    'noOptionsMessage',
    props,
    innerProps?.className
  );

  return (
    <div {...innerProps} className={className}>
      {children}
    </div>
  );
};

export const LoadingMessage = (props: NoticeProps) => {
  const { children = 'Loading...', innerProps } = props;
  const className = useGetClassNames(
    'loadingMessage',
    props,
    innerProps?.className
  );
  return (
    <div {...innerProps} className={className}>
      {children}
    </div>
  );
};
