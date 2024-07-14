import type {
  GroupBase,
  InputActionMeta,
  MultiValue,
  OnChangeValue,
  Options,
  PropsValue,
  SingleValue,
  ComponentNames,
} from './types';
import { useClassNamesContext } from './SelectContext';
import type { SelectComponentsProps } from './components';
import { type EffectCallback, useEffect } from 'react';

export const noop = () => {};
export const emptyString = () => '';

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
  componentName: string,
  prefix?: string,
  ...classNameList: Array<string | undefined>
) {
  const arr = classNameList.filter((i) => i);
  const classNameBase = applyPrefixToName(DEFAULT_PREFIX, componentName);
  arr.push(classNameBase, applyPrefixToName(classNameBase, STYLED_SUFFIX));
  if (prefix) {
    arr.push(applyPrefixToName(prefix, componentName));
  }

  return arr.map((i) => String(i).trim()).join(' ');
}

// ==============================
// Clean Value
// ==============================

export const cleanValue = <Option>(
  value: PropsValue<Option>
): Options<Option> => {
  if (isArray(value)) return value.filter(Boolean);
  if (typeof value === 'object' && value !== null) return [value];
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
  const context = useClassNamesContext<Option, IsMulti, Group>();
  const kebabName = kebabize(name);
  const { getClassNames, unstyled, classNamePrefix, ...restContext } = context;
  return buildClassNames(
    kebabName,
    classNamePrefix,
    getClassNames(name, {
      ...restContext,
      ...cleanComponentProps<Option, ComponentNames>(props),
    }),
    className
  );
};

// ==============================
// Handle Input Change
// ==============================

export function handleInputChange(
  inputValue: string,
  actionMeta: InputActionMeta,
  onInputChange?: (
    newValue: string,
    actionMeta: InputActionMeta
  ) => string | void
) {
  if (onInputChange) {
    const newValue = onInputChange(inputValue, actionMeta);
    if (typeof newValue === 'string') return newValue;
  }
  return inputValue;
}

export function isDocumentElement(
  el: HTMLElement | typeof window
): el is typeof window {
  return [document.documentElement, document.body, window].indexOf(el) > -1;
}

export function scrollTo(el: HTMLElement | typeof window, top: number): void {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }

  el.scrollTop = top;
}

export function scrollIntoView(
  menuEl: HTMLElement,
  focusedEl: HTMLElement
): void {
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  const overScroll = focusedEl.offsetHeight / 3;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(
      menuEl,
      Math.min(
        focusedEl.offsetTop +
          focusedEl.clientHeight -
          menuEl.offsetHeight +
          overScroll,
        menuEl.scrollHeight
      )
    );
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
}

// ==============================
// Get bounding client object
// ==============================

// cannot get keys using array notation with DOMRect
export function getBoundingClientObj(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
  };
}
export interface RectType {
  left: number;
  right: number;
  bottom: number;
  height: number;
  width: number;
}

// ==============================
// String to Key (kebabify)
// ==============================

export function toKey(str: string) {
  return str.replace(/\W/g, '-');
}

// ==============================
// Touch Capability Detector
// ==============================

export function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

// ==============================
// Mobile Device Detector
// ==============================

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

export function notNullish<T>(item: T | null | undefined): item is T {
  return item != null;
}

export function isArray<T>(arg: unknown): arg is readonly T[] {
  return Array.isArray(arg);
}

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
