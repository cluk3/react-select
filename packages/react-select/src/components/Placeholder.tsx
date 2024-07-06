import type { ReactNode } from 'react';

import { useGetClassNames } from '../utils';

export interface PlaceholderProps {
  /** The children to be rendered. */
  children: ReactNode;
  /** props passed to the wrapping element for the group. */
  innerProps: JSX.IntrinsicElements['div'];
}

const Placeholder = (props: PlaceholderProps) => {
  const { children, innerProps } = props;
  const className = useGetClassNames(
    'placeholder',
    props,
    innerProps?.className
  );
  return (
    <div {...innerProps} className={className}>
      {children}
    </div>
  );
};

export default Placeholder;
