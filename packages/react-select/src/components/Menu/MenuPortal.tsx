import { createPortal } from 'react-dom';
import { autoUpdate } from '@floating-ui/dom';
import useLayoutEffect from 'use-isomorphic-layout-effect';
import { createContext } from 'react';
import type { MenuPlacement } from '../../types';
import type { MenuPosition } from '../../types';
import type { CoercedMenuPlacement } from '../../types';
import { getBoundingClientObj, useGetClassNames } from '../../utils';
import type { ReactNode } from 'react';
import { useRef, useState, useCallback, useMemo } from 'react';
import { coercePlacement } from './utils';

export interface PortalStyleArgs {
  offset: number;
  position: MenuPosition;
  rect: { left: number; width: number };
}

interface ComputedPosition {
  offset: number;
  rect: { left: number; width: number };
}

export interface MenuPortalProps extends Partial<ComputedPosition> {
  appendTo: HTMLElement | undefined | null;
  children: ReactNode; // ideally Menu<MenuProps>
  controlElement: HTMLDivElement | null;
  innerProps?: JSX.IntrinsicElements['div'];
  menuPlacement: MenuPlacement;
  menuPosition: MenuPosition;
}

export const PortalPlacementContext = createContext<{
  setPortalPlacement: (placement: CoercedMenuPlacement) => void;
} | null>(null);

export const menuPortalCSS = ({ rect, offset, position }: PortalStyleArgs) => ({
  left: rect.left,
  position: position,
  top: offset,
  width: rect.width,
});

export const MenuPortal = (props: MenuPortalProps) => {
  const {
    appendTo,
    children,
    controlElement,
    innerProps,
    menuPlacement,
    menuPosition,
  } = props;

  const menuPortalRef = useRef<HTMLDivElement | null>(null);
  const cleanupRef = useRef<(() => void) | void | null>(null);

  const [placement, setPortalPlacement] = useState<'bottom' | 'top'>(
    coercePlacement(menuPlacement)
  );
  const portalPlacementContext = useMemo(
    () => ({
      setPortalPlacement,
    }),
    []
  );
  const [computedPosition, setComputedPosition] =
    useState<ComputedPosition | null>(null);

  const updateComputedPosition = useCallback(() => {
    if (!controlElement) return;

    const rect = getBoundingClientObj(controlElement);
    const scrollDistance = menuPosition === 'fixed' ? 0 : window.scrollY;
    const offset = rect[placement] + scrollDistance;
    if (
      offset !== computedPosition?.offset ||
      rect.left !== computedPosition?.rect.left ||
      rect.width !== computedPosition?.rect.width
    ) {
      setComputedPosition({ offset, rect });
    }
  }, [
    controlElement,
    menuPosition,
    placement,
    computedPosition?.offset,
    computedPosition?.rect.left,
    computedPosition?.rect.width,
  ]);

  useLayoutEffect(() => {
    updateComputedPosition();
  }, [updateComputedPosition]);

  const runAutoUpdate = useCallback(() => {
    if (typeof cleanupRef.current === 'function') {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (controlElement && menuPortalRef.current) {
      cleanupRef.current = autoUpdate(
        controlElement,
        menuPortalRef.current,
        updateComputedPosition,
        { elementResize: 'ResizeObserver' in window }
      );
    }
  }, [controlElement, updateComputedPosition]);

  useLayoutEffect(() => {
    runAutoUpdate();
  }, [runAutoUpdate]);

  const setMenuPortalElement = useCallback(
    (menuPortalElement: HTMLDivElement) => {
      menuPortalRef.current = menuPortalElement;
      runAutoUpdate();
    },
    [runAutoUpdate]
  );

  const className = useGetClassNames(
    'menuPortal',
    {
      ...props,
      offset: computedPosition?.offset,
      rect: computedPosition?.rect,
    },
    innerProps?.className
  );

  // bail early if required elements aren't present
  if ((!appendTo && menuPosition !== 'fixed') || !computedPosition) return null;

  // same wrapper element whether fixed or portalled
  const menuWrapper = (
    <div
      ref={setMenuPortalElement}
      style={menuPortalCSS({
        offset: computedPosition.offset,
        position: menuPosition,
        rect: computedPosition.rect,
      })}
      {...innerProps}
      className={className}
    >
      {children}
    </div>
  );

  return (
    <PortalPlacementContext.Provider value={portalPlacementContext}>
      {appendTo ? createPortal(menuWrapper, appendTo) : menuWrapper}
    </PortalPlacementContext.Provider>
  );
};
