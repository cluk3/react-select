import type { FocusEventHandler, FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useInternalSelectContext } from '../SelectContext';
import { buildClassNames } from '../utils';

const RequiredInput: FunctionComponent<{
  readonly name?: string;
}> = ({ name }) => {
  const { focusInput } = useInternalSelectContext();
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
  } = useInternalSelectContext();

  return (
    <input
      required
      name={name}
      tabIndex={-1}
      aria-hidden="true"
      onFocus={onFocus}
      className={buildClassNames({
        componentName: 'required-input',
        classNamePrefix,
      })}
      value=""
      onChange={() => {}}
    />
  );
};

export default RequiredInput;
