import { useSelectContext } from '../SelectContext';
import { buildClassNames, useGetClassNames } from '../utils';

export interface InputProps {
  /** Reference to the internal element */
  innerRef?: React.MutableRefObject<HTMLInputElement | null>;
  /** Set whether the input should be visible. Does not affect input size. */
  isHidden: boolean;
  /** Props that will be passed on to the input element. */
  innerProps: JSX.IntrinsicElements['input'];
}

const Input = (props: InputProps) => {
  const { classNamePrefix } = useSelectContext();
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
          { componentName: 'hidden-input', classNamePrefix },
          innerProps.className
        )}
      />
    </div>
  );
};

export default Input;
