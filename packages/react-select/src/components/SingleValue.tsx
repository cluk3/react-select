import type { ReactNode } from 'react';

import { useGetClassNames } from '../utils';
import { useInternalSelectContext } from '../SelectContext';

export interface SingleValueProps<Option = unknown> {
  /** The children to be rendered. */
  children: ReactNode;
  /** The data of the selected option rendered in the Single Value component. */
  data: Option;
  /** Props passed to the wrapping element for the group. */
  innerProps?: JSX.IntrinsicElements['div'];
}

const SingleValue = <Option,>(props: SingleValueProps<Option>) => {
  const { children, innerProps } = props;
  const className = useGetClassNames(
    'singleValue',
    props,
    innerProps?.className
  );
  const {
    selectProps: { isDisabled },
  } = useInternalSelectContext();
  return (
    <div data-is-disabled={isDisabled} {...innerProps} className={className}>
      {children}
    </div>
  );
};

export default SingleValue;
