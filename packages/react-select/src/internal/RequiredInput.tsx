import type { FocusEventHandler, FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useInternalContext } from '../SelectContext';
import { prependCn } from '../utils';

const RequiredInput: FunctionComponent<{
  readonly name?: string;
}> = ({ name }) => {
  const { focusInput } = useInternalContext();
  const onFocus: FocusEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      focusInput();
    },
    [focusInput]
  );
  const {
    selectProps: { classNamePrefix },
  } = useInternalContext();

  return (
    <input
      required
      name={name}
      tabIndex={-1}
      aria-hidden="true"
      onFocus={onFocus}
      className={prependCn(classNamePrefix, 'required-input')}
      value=""
      onChange={() => {}}
    />
  );
};

export default RequiredInput;
