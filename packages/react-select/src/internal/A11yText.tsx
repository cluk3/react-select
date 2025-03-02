import { useInternalSelectContext } from '../SelectContext';
import { buildClassNames } from '../utils';

// Assistive text to describe visual elements. Hidden for sighted users.
const A11yText = (props: JSX.IntrinsicElements['span']) => {
  const {
    selectProps: { classNamePrefix },
  } = useInternalSelectContext();
  return (
    <span
      {...props}
      className={buildClassNames(
        { componentName: 'a11y-text', classNamePrefix },
        props.className
      )}
    />
  );
};

export default A11yText;
