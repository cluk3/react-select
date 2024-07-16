import type { ReactNode } from 'react';

import { useGetClassNames } from '../utils';
import { useInternalContext } from '../SelectContext';

// ==============================
// Dropdown & Clear Icons
// ==============================

const Svg = ({
  size,
  ...props
}: JSX.IntrinsicElements['svg'] & { size: number }) => {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
};

export type CrossIconProps = JSX.IntrinsicElements['svg'] & { size?: number };
export const CrossIcon = (props: CrossIconProps) => {
  const className = useGetClassNames('crossIcon', props, props.className);
  return (
    <Svg size={20} {...props} className={className}>
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
    </Svg>
  );
};
export type DownChevronProps = JSX.IntrinsicElements['svg'] & { size?: number };
export const DownChevron = (props: DownChevronProps) => {
  const className = useGetClassNames('downChevron', props, props.className);
  return (
    <Svg size={20} {...props} className={className}>
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
    </Svg>
  );
};

// ==============================
// Dropdown & Clear Buttons
// ==============================

export interface DropdownIndicatorProps {
  /** The children to be rendered inside the indicator. */
  children?: ReactNode;
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
}

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  const { children, innerProps } = props;
  const {
    state: { isFocused },
  } = useInternalContext();
  const className = useGetClassNames(
    'dropdownIndicator',
    props,
    innerProps?.className
  );
  return (
    <div data-is-focused={isFocused} {...innerProps} className={className}>
      {children || <DownChevron />}
    </div>
  );
};

export interface ClearIndicatorProps {
  children?: ReactNode;
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
}

export const ClearIndicator = (props: ClearIndicatorProps) => {
  const { children, innerProps } = props;
  const {
    state: { isFocused },
  } = useInternalContext();
  const className = useGetClassNames(
    'clearIndicator',
    props,
    innerProps?.className
  );
  return (
    <div data-is-focused={isFocused} {...innerProps} className={className}>
      {children || <CrossIcon />}
    </div>
  );
};

// ==============================
// Separator
// ==============================

export interface IndicatorSeparatorProps {
  innerProps?: JSX.IntrinsicElements['span'];
}

export const IndicatorSeparator = (props: IndicatorSeparatorProps) => {
  const { innerProps } = props;
  const {
    selectProps: { isDisabled },
  } = useInternalContext();
  const className = useGetClassNames(
    'indicatorSeparator',
    props,
    innerProps?.className
  );
  return (
    <span data-is-disabled={isDisabled} {...innerProps} className={className} />
  );
};

// ==============================
// Loading
// ==============================

interface LoadingDotProps {
  delay: number;
  offset: boolean;
}
const LoadingDot = ({ delay, offset }: LoadingDotProps) => (
  <span
    style={
      {
        '--rs-loading-dot-delay': `${delay}ms`,
      } as React.CSSProperties
    }
    data-offset={offset}
    className="react-select__loading-dot"
  />
);

export interface LoadingIndicatorProps {
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
  /** Set size of the container. */
  size?: number;
}
export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const { innerProps, size = 4 } = props;
  const {
    state: { isFocused },
    selectProps: { isRtl },
  } = useInternalContext();
  const className = useGetClassNames(
    'loadingIndicator',
    props,
    innerProps?.className
  );
  return (
    <div
      data-is-focused={isFocused}
      style={
        {
          '--rs-loading-indicator-size': `${size}px`,
        } as React.CSSProperties
      }
      {...innerProps}
      className={className}
    >
      <LoadingDot delay={0} offset={isRtl} />
      <LoadingDot delay={160} offset />
      <LoadingDot delay={320} offset={!isRtl} />
    </div>
  );
};
