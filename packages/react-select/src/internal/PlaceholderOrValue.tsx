import { type InternalSelectContextValue } from '../SelectContext';
import { type GroupBase } from '../types';

// we are using a render function instead of a regular component in order to
// make TransitionGroup in src/animated/ValueContainer.tsx work
export default function PlaceholderOrValue<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  context: InternalSelectContextValue<Option, IsMulti, Group>,
  removeValue: (removedOption: Option) => void
) {
  const {
    selectProps: {
      controlShouldRenderValue,
      isMulti,
      inputValue,
      placeholder,
      getOptionLabel,
      getOptionValue,
      isClearable,
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
  } = context;

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
          isClearable={isClearable}
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
