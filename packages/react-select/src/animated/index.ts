import memoize from 'memoize-one';
import {
  defaultComponents,
  type SelectComponents,
} from '../components/index';
import { default as AnimatedMultiValue } from './MultiValue';
import { default as AnimatedPlaceholder } from './Placeholder';
import { default as AnimatedValueContainer } from './ValueContainer';

const makeAnimated = <Option>(
  externalComponents: Partial<SelectComponents<Option>> = {}
): Partial<SelectComponents<Option>> => {
  const components = defaultComponents({ components: externalComponents });
  const {
    Input,
    MultiValue,
    Placeholder,
    SingleValue,
    ValueContainer,
    ...rest
  } = components;
  return {
    // @ts-expect-error
    MultiValue: AnimatedMultiValue(MultiValue),
    // @ts-expect-error
    Placeholder: AnimatedPlaceholder(Placeholder),
    ValueContainer: AnimatedValueContainer(ValueContainer),
    ...rest,
  };
};

const AnimatedComponents = makeAnimated();

export const MultiValue = AnimatedComponents.MultiValue;
export const Placeholder = AnimatedComponents.Placeholder;
export const ValueContainer = AnimatedComponents.ValueContainer;

export default memoize(makeAnimated);
