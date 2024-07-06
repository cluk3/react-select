import type { FocusEventHandler, FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useSelectContext } from '../SelectContext';
import { prependCn } from '../utils';

const RequiredInput: FunctionComponent<{
  readonly name?: string;
}> = ({ name }) => {
  const { focusInput } = useSelectContext();
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
  } = useSelectContext();

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
