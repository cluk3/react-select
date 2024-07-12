import type { ReactNode } from 'react';
import { useGetClassNames } from '../utils';
import { useInternalContext } from '../SelectContext';

// ==============================
// Root Container
// ==============================

export interface ContainerProps {
  children: ReactNode;
  /** Inner props to be passed down to the container. */
  innerProps: JSX.IntrinsicElements['div'];
}

export const SelectContainer = (props: ContainerProps) => {
  const {
    selectProps: { isDisabled, isRtl },
  } = useInternalContext();
  const { children, innerProps } = props;
  const className = useGetClassNames(
    'selectContainer',
    props,
    innerProps?.className
  );
  return (
    <div
      data-is-disabled={isDisabled}
      data-is-rtl={isRtl}
      {...innerProps}
      className={className}
    >
      {children}
    </div>
  );
};

// ==============================
// Value Container
// ==============================

export interface ValueContainerProps {
  /** Props to be passed to the value container element. */
  innerProps?: JSX.IntrinsicElements['div'];
  /** The children to be rendered. */
  children: ReactNode;
}

export const ValueContainer = (props: ValueContainerProps) => {
  const {
    hasValue,
    selectProps: { controlShouldRenderValue, isMulti },
  } = useInternalContext();
  const { children, innerProps } = props;
  const className = useGetClassNames(
    'valueContainer',
    props,
    innerProps?.className
  );

  return (
    <div
      {...innerProps}
      style={
        {
          '--rs-container-display':
            isMulti && hasValue && controlShouldRenderValue ? 'flex' : 'grid',
        } as React.CSSProperties
      }
      className={className}
    >
      {children}
    </div>
  );
};

// ==============================
// Indicator Container
// ==============================

export interface IndicatorsContainerProps {
  children: ReactNode;
  /** Props to be passed to the indicators container element. */
  innerProps?: JSX.IntrinsicElements['div'];
}

export const IndicatorsContainer = (props: IndicatorsContainerProps) => {
  const { children, innerProps } = props;
  const className = useGetClassNames(
    'indicatorsContainer',
    props,
    innerProps?.className
  );

  return (
    <div {...innerProps} className={className}>
      {children}
    </div>
  );
};
