import type { ComponentType, ReactNode } from 'react';
import { useGetClassNames } from '../utils';

import type { GroupBase, CategorizedOption } from '../types';

interface ForwardedHeadingProps<Option, Group extends GroupBase<Option>> {
  id: string;
  data: Group;
}

export interface GroupProps<
  Option = unknown,
  Group extends GroupBase<Option> = GroupBase<Option>,
> {
  /** The children to be rendered. */
  children: ReactNode;
  /** Component to wrap the label, receives headingProps. */
  Heading: ComponentType<GroupHeadingProps<Option, Group>>;
  /** Props to pass to Heading. */
  headingProps: ForwardedHeadingProps<Option, Group>;
  /** Props to be passed to the group element. */
  innerProps?: JSX.IntrinsicElements['div'];
  /** Label to be displayed in the heading component. */
  label: ReactNode;
  /** The data of the group. */
  data: Group;
  options: readonly CategorizedOption<Option>[];
}

const Group = <Option, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: GroupProps<Option, Group>
) => {
  const { children, Heading, headingProps, innerProps, label } = props;
  const className = useGetClassNames('group', props, innerProps?.className);
  return (
    <div {...innerProps} className={className}>
      <Heading {...headingProps}>{label}</Heading>
      <div>{children}</div>
    </div>
  );
};

interface GroupHeadingPropsDefinedProps<Option, Group extends GroupBase<Option>>
  extends ForwardedHeadingProps<Option, Group> {
  innerProps?: React.JSX.IntrinsicElements['div'];
}

export type GroupHeadingProps<
  Option = unknown,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = GroupHeadingPropsDefinedProps<Option, Group> & JSX.IntrinsicElements['div'];

export const GroupHeading = <
  Option,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: GroupHeadingProps<Option, Group>
) => {
  const { id, innerProps } = props;
  const className = useGetClassNames(
    'groupHeading',
    props,
    innerProps?.className
  );
  return (
    <div {...innerProps} id={id} className={className}>
      {props.children}
    </div>
  );
};

export default Group;
