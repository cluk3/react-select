import type {
  FocusEventHandler,
  FormEventHandler,
  MutableRefObject,
} from 'react';
import { useInternalContext } from '../SelectContext';
import { noop } from '../utils';
import DummyInput from './DummyInput';

export default function InternalInput({
  inputRef,
  onInputBlur,
  onInputFocus,
  handleInputChange,
}: {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  onInputBlur: FocusEventHandler<HTMLInputElement>;
  onInputFocus: FocusEventHandler<HTMLInputElement>;
  handleInputChange: FormEventHandler<HTMLInputElement>;
}) {
  const {
    selectProps,
    components: { Input },
    state: { isInputHidden, ariaSelection, focusedOptionId },
    getElementId,
    isAppleDevice,
    hasValue,
  } = useInternalContext();

  const {
    isDisabled,
    isSearchable,
    inputId,
    inputValue,
    tabIndex,
    form,
    menuIsOpen,
    required,
  } = selectProps;

  const id = inputId || getElementId('input');

  // aria attributes makes the JSX "noisy", separated for clarity
  const ariaAttributes = {
    'aria-autocomplete': 'list' as const,
    'aria-expanded': menuIsOpen,
    'aria-haspopup': true,
    'aria-errormessage': selectProps['aria-errormessage'],
    'aria-invalid': selectProps['aria-invalid'],
    'aria-label': selectProps['aria-label'],
    'aria-labelledby': selectProps['aria-labelledby'],
    'aria-required': required,
    role: 'combobox',
    'aria-activedescendant': isAppleDevice
      ? undefined
      : focusedOptionId || undefined,

    ...(menuIsOpen && {
      'aria-controls': getElementId('listbox'),
    }),
    ...(!isSearchable && {
      'aria-readonly': true,
    }),
    ...(hasValue
      ? ariaSelection?.action === 'initial-input-focus' && {
          'aria-describedby': getElementId('live-region'),
        }
      : {
          'aria-describedby': getElementId('placeholder'),
        }),
  };

  if (!isSearchable) {
    // use a dummy input to maintain focus/blur functionality
    return (
      <DummyInput
        id={id}
        innerRef={inputRef}
        onBlur={onInputBlur}
        onChange={noop}
        onFocus={onInputFocus}
        disabled={isDisabled}
        tabIndex={tabIndex}
        inputMode="none"
        form={form}
        value=""
        {...ariaAttributes}
      />
    );
  }

  return (
    <Input
      innerProps={{
        autoCapitalize: 'none',
        autoComplete: 'off',
        autoCorrect: 'off',
        id: id,
        onBlur: onInputBlur,
        onChange: handleInputChange,
        onFocus: onInputFocus,
        spellCheck: 'false',
        tabIndex: tabIndex,
        type: 'text',
        form: form,
        value: inputValue,
        ...ariaAttributes,
      }}
      innerRef={inputRef}
      isHidden={isInputHidden}
    />
  );
}
