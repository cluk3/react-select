import type { Ref } from 'react';
import { prependCn } from '../utils';
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
      className={prependCn(classNamePrefix, 'dummy-input', props.className)}
    />
  );
}
