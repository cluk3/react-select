import { useInternalContext } from '../SelectContext';
import { prependCn } from '../utils';

// Assistive text to describe visual elements. Hidden for sighted users.
const A11yText = (props: JSX.IntrinsicElements['span']) => {
  const {
    selectProps: { classNamePrefix },
  } = useInternalContext();
  return (
    <span
      {...props}
      className={prependCn(classNamePrefix, 'a11y-text', props.className)}
    />
  );
};

export default A11yText;
