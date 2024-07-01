/** @jsx jsx */
import { jsx } from '@emotion/react';
import type { ReactElement, RefCallback, MouseEvent } from 'react';
import { Fragment } from 'react';
import useScrollCapture from './useScrollCapture';
import useScrollLock from './useScrollLock';
import * as React from 'react';

interface Props {
  readonly children: (ref: RefCallback<HTMLElement>) => ReactElement;
  readonly lockEnabled: boolean;
  readonly captureEnabled: boolean;
  readonly onBottomArrive?: (
    event: React.WheelEvent | React.TouchEvent
  ) => void;
  readonly onBottomLeave?: (event: React.WheelEvent | React.TouchEvent) => void;
  readonly onTopArrive?: (event: React.WheelEvent | React.TouchEvent) => void;
  readonly onTopLeave?: (event: React.WheelEvent | React.TouchEvent) => void;
}

const blurSelectInput = (event: MouseEvent<HTMLDivElement>) => {
  const element = event.target as HTMLDivElement;
  return (
    element.ownerDocument.activeElement &&
    (element.ownerDocument.activeElement as HTMLElement).blur()
  );
};

export default function ScrollManager({
  children,
  lockEnabled,
  captureEnabled = true,
  onBottomArrive,
  onBottomLeave,
  onTopArrive,
  onTopLeave,
}: Props) {
  const setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive,
    onBottomLeave,
    onTopArrive,
    onTopLeave,
  });
  const setScrollLockTarget = useScrollLock({ isEnabled: lockEnabled });

  const targetRef: RefCallback<HTMLElement> = (element) => {
    setScrollCaptureTarget(element);
    setScrollLockTarget(element);
  };

  return (
    <Fragment>
      {lockEnabled && (
        <div
          onClick={blurSelectInput}
          css={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}
        />
      )}
      {children(targetRef)}
    </Fragment>
  );
}
