import type { ReactNode, Ref } from 'react';

import { useGetClassNames } from '../utils';
import { useSelectContext } from '../SelectContext';

export interface ControlProps {
  /** Children to render. */
  children: ReactNode;
  innerRef: Ref<HTMLDivElement>;
  /** The mouse down event and the innerRef to pass down to the controller element. */
  innerProps: JSX.IntrinsicElements['div'];
}

const Control = (props: ControlProps) => {
  const {
    selectProps: { isDisabled },
    state: { isFocused },
  } = useSelectContext();
  const { children, innerRef, innerProps } = props;
  const className = useGetClassNames('control', props, innerProps?.className);
  return (
    <div
      ref={innerRef}
      data-is-disabled={isDisabled}
      data-is-focused={isFocused}
      {...innerProps}
      className={className}
      aria-disabled={isDisabled || undefined}
    >
      {children}
    </div>
  );
};

export default Control;
