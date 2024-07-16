import { type ReactNode, type Ref, useContext, useRef, useState } from 'react';
import useLayoutEffect from 'use-isomorphic-layout-effect';

import { useGetClassNames } from '../../utils';
import type {
  MenuPlacement,
  MenuPosition,
  CoercedMenuPlacement,
} from '../../types';

import { alignToControl, getMenuPlacement, coercePlacement } from './utils';

import { PortalPlacementContext } from './MenuPortal';
import { useInternalSelectContext } from '../../SelectContext';

export { InternalMenu } from './InternalMenu';
export { MenuPortal, type MenuPortalProps, menuPortalCSS } from './MenuPortal';

export interface MenuPlacementProps {
  /** Set the minimum height of the menu. */
  minMenuHeight: number;
  /** Set the maximum height of the menu. */
  maxMenuHeight: number;
  /** Set whether the menu should be at the top, at the bottom. The auto options sets it to bottom. */
  menuPlacement: MenuPlacement;
  /** The CSS position value of the menu, when "fixed" extra layout management is required */
  menuPosition: MenuPosition;
  /** Set whether the page should scroll to show the menu. */
  menuShouldScrollIntoView: boolean;
}

export interface MenuProps {
  /** Reference to the internal element, consumed by the MenuPlacer component */
  innerRef: Ref<HTMLDivElement>;
  innerProps?: JSX.IntrinsicElements['div'];
  placement: CoercedMenuPlacement;
  children: ReactNode;
}

const Menu = (props: MenuProps) => {
  const { onMenuMouseDown, onMenuMouseMove } = useInternalSelectContext();
  const { children, innerRef, placement, innerProps } = props;
  const className = useGetClassNames('menu', props, innerProps?.className);
  return (
    <div
      style={{
        [alignToControl(placement)]: '100%',
      }}
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
  /** Set the max height of the Menu component  */
  maxHeight: number;
  /** The children to be rendered. */
  children: ReactNode;
  /** Inner ref to DOM ReactNode */
  innerRef: Ref<HTMLDivElement>;
  /** Props to be passed to the menu-list wrapper. */
  innerProps: JSX.IntrinsicElements['div'];
}

export const MenuList = (props: MenuListProps) => {
  const { children, innerProps, innerRef, maxHeight } = props;
  const className = useGetClassNames('menuList', props, innerProps.className);
  return (
    <div
      style={
        {
          '--rs-menu-list-max-height': `${maxHeight}px`,
        } as React.CSSProperties
      }
      ref={innerRef}
      {...innerProps}
      className={className}
    >
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

interface PlacerProps {
  placement: CoercedMenuPlacement;
  maxHeight: number;
}

interface ChildrenProps {
  ref: Ref<HTMLDivElement>;
  placerProps: PlacerProps;
}
export interface MenuPlacerProps {
  /** The children to be rendered. */
  children: (childrenProps: ChildrenProps) => React.ReactElement;
}

export const MenuPlacer = (props: MenuPlacerProps) => {
  const {
    selectProps: {
      minMenuHeight,
      maxMenuHeight,
      menuPlacement,
      menuPosition,
      menuShouldScrollIntoView,
    },
    controlRef,
  } = useInternalSelectContext();

  const { setPortalPlacement } = useContext(PortalPlacementContext) || {};
  const ref = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState(maxMenuHeight);
  const [placement, setPlacement] = useState<CoercedMenuPlacement | null>(null);

  useLayoutEffect(() => {
    const menuEl = ref.current;
    if (!menuEl) return;

    // DO NOT scroll if position is fixed
    const isFixedPosition = menuPosition === 'fixed';
    const shouldScroll = menuShouldScrollIntoView && !isFixedPosition;

    const state = getMenuPlacement({
      maxHeight: maxMenuHeight,
      menuEl,
      minHeight: minMenuHeight,
      placement: menuPlacement,
      shouldScroll,
      isFixedPosition,
      controlEl: controlRef.current,
    });

    setMaxHeight(state.maxHeight);
    setPlacement(state.placement);
    setPortalPlacement?.(state.placement);
  }, [
    controlRef,
    maxMenuHeight,
    menuPlacement,
    menuPosition,
    menuShouldScrollIntoView,
    minMenuHeight,
    setPortalPlacement,
  ]);

  return props.children({
    ref,
    placerProps: {
      ...props,
      placement: placement || coercePlacement(menuPlacement),
      maxHeight,
    },
  });
};
