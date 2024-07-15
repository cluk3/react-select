import { useClassNamesContext } from '../SelectContext';
import { buildClassNames, useGetClassNames } from '../utils';

export interface InputSpecificProps {
  /** Reference to the internal element */
  innerRef?: React.MutableRefObject<HTMLInputElement | null>;
  /** Set whether the input should be visible. Does not affect input size. */
  isHidden: boolean;
  /** Props that will be passed on to the input element. */
  innerProps: JSX.IntrinsicElements['input'];
}

export type InputProps = InputSpecificProps;

const Input = (props: InputProps) => {
  const { classNamePrefix } = useClassNamesContext();
  const { innerProps, innerRef, isHidden } = props;
  const className = useGetClassNames('input', props, innerProps?.className);
  return (
    <div className={className} data-value={innerProps.value || ''}>
      <input
        ref={innerRef}
        style={{
          opacity: isHidden ? 0 : 1,
        }}
        {...innerProps}
        className={buildClassNames(
          'hidden-input',
          classNamePrefix,
          innerProps.className
        )}
      />
    </div>
  );
};

export default Input;
