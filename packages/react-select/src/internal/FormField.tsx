import { useInternalSelectContext } from '../SelectContext';
import RequiredInput from './RequiredInput';

export default function FormField() {
  const {
    hasValue,
    getValue,
    selectProps: {
      delimiter,
      isDisabled,
      isMulti,
      name,
      required,
      getOptionValue,
    },
  } = useInternalSelectContext();

  const selectValue = getValue();

  // If the hidden input gets focus through form submit,
  // redirect focus to focusable input.

  if (required && !hasValue && !isDisabled) {
    return <RequiredInput name={name} />;
  }

  if (!name || isDisabled) return;

  if (isMulti) {
    if (delimiter) {
      const value = selectValue
        .map((opt) => getOptionValue(opt))
        .join(delimiter);
      return <input name={name} type="hidden" value={value} />;
    } else {
      const input =
        selectValue.length > 0 ? (
          selectValue.map((opt, i) => (
            <input
              key={`i-${i}`}
              name={name}
              type="hidden"
              value={getOptionValue(opt)}
            />
          ))
        ) : (
          <input name={name} type="hidden" value="" />
        );

      return <div>{input}</div>;
    }
  } else {
    const value = selectValue[0] ? getOptionValue(selectValue[0]) : '';
    return <input name={name} type="hidden" value={value} />;
  }
}
