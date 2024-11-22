import type { ReactNode, MutableRefObject } from 'react';
import { useGetClassNames } from '../utils';
import { type IconProps } from './indicators';

export interface OptionProps<Option = unknown> {
  /** The children to be rendered. */
  children: ReactNode;
  /** Inner ref to DOM Node */
  innerRef?: MutableRefObject<HTMLDivElement | null>;
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
  /** Whether the option is deselectable (multi-select only). */
  isOptionDeselectable: boolean;
  /** The component to render the check icon next to the selected option. */
  CheckIconComponent: React.ComponentType<IconProps>;
}

const Option = <Option,>(props: OptionProps<Option>) => {
  const {
    children,
    isOptionSelected,
    isOptionDisabled,
    isOptionFocused,
    isOptionDeselectable,
    innerRef,
    innerProps,
    CheckIconComponent,
  } = props;
  const className = useGetClassNames('option', props, innerProps?.className);

  return (
    <div
      data-is-disabled={isOptionDisabled}
      data-is-focused={isOptionFocused}
      data-is-selected={isOptionSelected}
      data-is-deselectable={isOptionDeselectable}
      ref={innerRef}
      aria-disabled={isOptionDisabled}
      {...innerProps}
      className={className}
    >
      {children}
      {isOptionSelected && <CheckIconComponent />}
    </div>
  );
};

export default Option;
