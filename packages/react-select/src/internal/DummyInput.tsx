import type { Ref } from 'react';
import { prependCn, removeProps } from '../utils';
import { useSelectContext } from '../SelectContext';

export default function DummyInput({
  innerRef,
  ...props
}: JSX.IntrinsicElements['input'] & {
  readonly innerRef: Ref<HTMLInputElement>;
}) {
  // Remove animation props not meant for HTML elements
  const filteredProps = removeProps(
    props,
    'onExited',
    'in',
    'enter',
    'exit',
    'appear'
  );

  const {
    selectProps: { classNamePrefix },
  } = useSelectContext();

  return (
    <input
      ref={innerRef}
      {...filteredProps}
      className={prependCn(
        classNamePrefix,
        'dummy-input',
        filteredProps.className
      )}
    />
  );
}
