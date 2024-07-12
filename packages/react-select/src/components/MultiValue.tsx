import type { ComponentType, ReactNode } from 'react';
import { CrossIcon } from './indicators';
import { useGetClassNames } from '../utils';

interface MultiValueComponents<Option> {
  Container: ComponentType<MultiValueGenericProps<Option>>;
  Label: ComponentType<MultiValueLabelProps<Option>>;
  Remove: ComponentType<MultiValueRemoveProps<Option>>;
}

export interface MultiValueProps<Option = unknown> {
  children: ReactNode;
  components: MultiValueComponents<Option>;
  cropWithEllipsis?: boolean;
  data: Option;
  innerProps?: JSX.IntrinsicElements['div'];
  isOptionFocused: boolean;
  isClearable: boolean;
  removeProps: JSX.IntrinsicElements['div'];
  index: number;
}

export interface MultiValueGenericProps<Option> {
  children: ReactNode;
  data: Option;
  innerProps: { className?: string };
}
export const MultiValueGeneric = <Option,>({
  children,
  innerProps,
}: MultiValueGenericProps<Option>) => <div {...innerProps}>{children}</div>;

export interface MultiValueLabelProps<Option>
  extends MultiValueGenericProps<Option> {
  cropWithEllipsis: boolean;
}

export const MultiValueLabel = <Option,>({
  children,
  innerProps,
  cropWithEllipsis,
}: MultiValueLabelProps<Option>) => (
  <div
    {...innerProps}
    style={
      {
        '--rs-text-overflow':
          cropWithEllipsis || cropWithEllipsis === undefined
            ? 'ellipsis'
            : undefined,
      } as React.CSSProperties
    }
  >
    {children}
  </div>
);

export const MultiValueContainer = MultiValueGeneric;

export interface MultiValueRemoveProps<Option> {
  children?: ReactNode;
  data: Option;
  innerProps: JSX.IntrinsicElements['div'];
}
export function MultiValueRemove<Option>({
  children,
  innerProps,
}: MultiValueRemoveProps<Option>) {
  return (
    // TODO we should use a button element here
    <div role="button" {...innerProps}>
      {children || <CrossIcon size={14} />}
    </div>
  );
}

const MultiValue = <Option,>(props: MultiValueProps<Option>) => {
  const {
    children,
    components,
    data,
    innerProps,
    isOptionFocused,
    removeProps,
    cropWithEllipsis = true,
    isClearable,
  } = props;

  const { Container, Label, Remove } = components;

  const labelProps = {
    cropWithEllipsis,
    data,
  };

  const className = useGetClassNames(
    'multiValue',
    props,
    innerProps?.className
  );
  const labelClassName = useGetClassNames(
    'multiValueLabel',
    labelProps as MultiValueLabelProps<Option>
  );
  const removeClassName = useGetClassNames(
    'multiValueRemove',
    {
      data,
    } as MultiValueRemoveProps<Option>,
    removeProps?.className
  );

  return (
    <Container
      data={data}
      innerProps={{
        ...innerProps,
        className,
      }}
    >
      <Label
        {...labelProps}
        innerProps={{
          className: labelClassName,
        }}
      >
        {children}
      </Label>
      {isClearable && (
        <Remove
          data={data}
          innerProps={
            {
              'aria-label': `Remove ${children || 'option'}`,
              'data-is-focused': isOptionFocused,
              ...removeProps,
              className: removeClassName,
            } as JSX.IntrinsicElements['div']
          }
        />
      )}
    </Container>
  );
};

export default MultiValue;
