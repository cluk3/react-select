import {
  type MouseEventHandler,
  type TouchEventHandler,
  useCallback,
} from 'react';
import { useSelectContext } from '../SelectContext';

function shouldShowClearIndicator(
  isClearable: boolean | undefined,
  isMulti: boolean
) {
  // single select, by default, IS NOT clearable
  // multi select, by default, IS clearable
  if (isClearable === undefined) return isMulti;

  return isClearable;
}

export function InternalClearIndicator() {
  const {
    selectProps: { isDisabled, isLoading, isClearable, isMulti },
    components: { ClearIndicator },
    hasValue,
    userIsDragging,
    clearValue,
    focusInput,
    openAfterFocus,
  } = useSelectContext();

  const onClearIndicatorMouseDown = useCallback(
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
      clearValue();
      event.preventDefault();
      openAfterFocus.current = false;
      if (event.type === 'touchend') {
        focusInput();
      } else {
        setTimeout(() => focusInput());
      }
    },
    [clearValue, openAfterFocus, focusInput]
  );

  const onClearIndicatorTouchEnd = useCallback<
    TouchEventHandler<HTMLDivElement>
  >(
    (event) => {
      if (userIsDragging.current) return;
      onClearIndicatorMouseDown(event);
    },
    [onClearIndicatorMouseDown, userIsDragging]
  );

  if (
    !shouldShowClearIndicator(isClearable, isMulti) ||
    !ClearIndicator ||
    isDisabled ||
    !hasValue ||
    isLoading
  ) {
    return null;
  }

  const innerProps = {
    onMouseDown: onClearIndicatorMouseDown,
    onTouchEnd: onClearIndicatorTouchEnd,
    'aria-hidden': true,
  };

  return <ClearIndicator innerProps={innerProps} />;
}

export function InternalLoadingIndicator() {
  const {
    selectProps: { isLoading },
    components: { LoadingIndicator },
  } = useSelectContext();

  if (!LoadingIndicator || !isLoading) return null;

  const innerProps = { 'aria-hidden': true };
  return <LoadingIndicator innerProps={innerProps} />;
}
export function InternalIndicatorSeparator() {
  const {
    components: { DropdownIndicator, IndicatorSeparator },
  } = useSelectContext();

  // separator doesn't make sense without the dropdown indicator
  if (!DropdownIndicator || !IndicatorSeparator) return null;

  return <IndicatorSeparator />;
}
export function InternalDropdownIndicator({
  onMouseDown,
  onTouchEnd,
}: {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onTouchEnd: TouchEventHandler<HTMLDivElement>;
}) {
  const {
    components: { DropdownIndicator },
  } = useSelectContext();

  if (!DropdownIndicator) return null;

  const innerProps = {
    onMouseDown,
    onTouchEnd,
    'aria-hidden': true,
  };

  return <DropdownIndicator innerProps={innerProps} />;
}
