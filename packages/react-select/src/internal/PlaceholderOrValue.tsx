import { useSelectContext } from '../SelectContext';

export default function PlaceholderOrValue() {
  const {
    selectProps: {
      controlShouldRenderValue,
      isMulti,
      inputValue,
      placeholder,
      getOptionLabel,
      getOptionValue,
    },
    components: {
      MultiValue,
      MultiValueContainer,
      MultiValueLabel,
      MultiValueRemove,
      SingleValue,
      Placeholder,
    },
    hasValue,
    formatOptionLabel,
    getElementId,
    state: { selectValue, focusedValue },
    removeValue,
  } = useSelectContext();

  if (!hasValue || !controlShouldRenderValue) {
    return inputValue ? null : (
      <Placeholder
        key="placeholder"
        innerProps={{ id: getElementId('placeholder') }}
      >
        {placeholder}
      </Placeholder>
    );
  }

  if (isMulti) {
    return selectValue.map((opt, index) => {
      const isOptionFocused = opt === focusedValue;
      const key = `${getOptionLabel(opt)}-${getOptionValue(opt)}`;

      return (
        <MultiValue
          components={{
            Container: MultiValueContainer,
            Label: MultiValueLabel,
            Remove: MultiValueRemove,
          }}
          isOptionFocused={isOptionFocused}
          key={key}
          index={index}
          removeProps={{
            onClick: () => removeValue(opt),
            onTouchEnd: () => removeValue(opt),
            onMouseDown: (e) => {
              e.preventDefault();
            },
          }}
          data={opt}
        >
          {formatOptionLabel(opt, 'value')}
        </MultiValue>
      );
    });
  }

  if (inputValue) {
    return null;
  }

  const singleValue = selectValue[0];
  return (
    <SingleValue data={singleValue}>
      {formatOptionLabel(singleValue, 'value')}
    </SingleValue>
  );
}
