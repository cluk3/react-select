import type {
  GroupBase,
  MultiValue,
  OnChangeValue,
  Options,
  PropsValue,
  SingleValue,
  ComponentNames,
} from './types';
import { useSelectContext } from './SelectContext';
import type { SelectComponentsProps } from './components';
import { type EffectCallback, useEffect } from 'react';

export const noop = () => {};

// ==============================
// Class Name Prefixer
// ==============================

function applyPrefixToName(prefix: string, name: string) {
  if (!name) {
    return prefix;
  } else if (name.startsWith('-')) {
    return prefix + name;
  } else {
    return `${prefix}__${name}`;
  }
}

const DEFAULT_PREFIX = 'react-select';
const STYLED_SUFFIX = '--styled';

export function buildClassNames(
  {
    componentName,
    classNamePrefix,
    withStyledSuffix = false,
  }: {
    componentName: string;
    classNamePrefix?: string;
    withStyledSuffix?: boolean;
  },
  ...additionalClassNames: Array<string | undefined>
) {
  const classNames = additionalClassNames.filter((i) => i);
  const classNameBase = applyPrefixToName(DEFAULT_PREFIX, componentName!);
  classNames.push(classNameBase);

  if (withStyledSuffix) {
    classNames.push(applyPrefixToName(classNameBase, STYLED_SUFFIX));
  }

  if (classNamePrefix) {
    classNames.push(applyPrefixToName(classNamePrefix, componentName));
  }

  return classNames.map((i) => String(i).trim()).join(' ');
}

export const cleanValue = <Option>(
  value: PropsValue<Option>
): Options<Option> => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'object' && value !== null) return [value as Option];
  return [];
};

function cleanComponentProps<Option, Key extends ComponentNames>(
  props: SelectComponentsProps<Option>[Capitalize<Key>]
) {
  // @ts-expect-error
  const { className, innerProps, children, innerRef, ...rest } = props;
  return rest;
}

const kebabize = (str: string) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
  );

export const useGetClassNames = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  name: ComponentNames,
  props: SelectComponentsProps<Option>[Capitalize<ComponentNames>],
  className?: string
) => {
  const context = useSelectContext<Option, IsMulti, Group>();
  const kebabName = kebabize(name);
  const { getClassNames, unstyled, classNamePrefix, ...restContext } = context;
  return buildClassNames(
    { componentName: kebabName, classNamePrefix, withStyledSuffix: true },
    getClassNames(name, {
      ...restContext,
      ...cleanComponentProps<Option, ComponentNames>(props),
    }),
    className
  );
};

export function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

export function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  } catch (e) {
    return false;
  }
}

// ==============================
// Passive Event Detector
// ==============================

// https://github.com/rafgraph/detect-it/blob/main/src/index.ts#L19-L36
let passiveOptionAccessed = false;
const options = {
  get passive() {
    return (passiveOptionAccessed = true);
  },
};
// check for SSR
const w:
  | typeof window
  | { addEventListener?: never; removeEventListener?: never } =
  typeof window !== 'undefined' ? window : {};
if (w.addEventListener && w.removeEventListener) {
  w.addEventListener('p', noop, options);
  w.removeEventListener('p', noop, false);
}

export const supportsPassiveEvents: boolean = passiveOptionAccessed;

export function valueTernary<Option, IsMulti extends boolean>(
  isMulti: IsMulti | undefined,
  multiValue: MultiValue<Option>,
  singleValue: SingleValue<Option>
): OnChangeValue<Option, IsMulti> {
  return (isMulti ? multiValue : singleValue) as OnChangeValue<Option, IsMulti>;
}

export function singleValueAsValue<Option, IsMulti extends boolean>(
  singleValue: SingleValue<Option>
): OnChangeValue<Option, IsMulti> {
  return singleValue as OnChangeValue<Option, IsMulti>;
}

export function multiValueAsValue<Option, IsMulti extends boolean>(
  multiValue: MultiValue<Option>
): OnChangeValue<Option, IsMulti> {
  return multiValue as OnChangeValue<Option, IsMulti>;
}

export function useOnMountEffect(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
