import type { ReactNode, RefCallback } from 'react';
import { useGetClassNames } from '../utils';

export interface OptionProps<Option = unknown> {
  /** The children to be rendered. */
  children: ReactNode;
  /** Inner ref to DOM Node */
  innerRef?: RefCallback<HTMLDivElement>;
  /** props passed to the wrapping element for the group. */
  innerProps: JSX.IntrinsicElements['div'];
  /** Text to be displayed representing the option. */
  label: string;
  /** Type is used by the menu to determine whether this is an option or a group.
    In the case of option this is always `option`. **/
  type: 'option';
  /** The data of the selected option. */
  data: Option;
  /** Whether the option is selected. */
  isOptionSelected: boolean;
  /** Whether the option is disabled. */
  isOptionDisabled: boolean;
  /** Whether the option is focused. */
  isOptionFocused: boolean;
}

const Option = <Option,>(props: OptionProps<Option>) => {
  const {
    children,
    isOptionSelected,
    isOptionDisabled,
    isOptionFocused,
    innerRef,
    innerProps,
  } = props;
  const className = useGetClassNames('option', props, innerProps?.className);

  return (
    <div
      data-is-disabled={isOptionDisabled}
      data-is-focused={isOptionFocused}
      data-is-selected={isOptionSelected}
      ref={innerRef}
      aria-disabled={isOptionDisabled}
      {...innerProps}
      className={className}
    >
      {children}
    </div>
  );
};

export default Option;
