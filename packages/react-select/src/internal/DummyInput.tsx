import type { Ref } from 'react';
import { buildClassNames } from '../utils';
import { useInternalContext } from '../SelectContext';

export default function DummyInput({
  innerRef,
  ...props
}: JSX.IntrinsicElements['input'] & {
  readonly innerRef: Ref<HTMLInputElement>;
}) {
  const {
    selectProps: { classNamePrefix },
  } = useInternalContext();

  return (
    <input
      ref={innerRef}
      {...props}
      className={buildClassNames(
        { componentName: 'dummy-input', classNamePrefix },
        props.className
      )}
    />
  );
}
