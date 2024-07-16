import { useCallback, useEffect, useRef, useState } from 'react';
import { useOnMountEffect } from './utils';
import type { StateManagerProps } from './useStateManager';
import type { GroupBase, InputActionMeta, OptionsOrGroups } from './types';

type AsyncManagedPropKeys =
  | 'options'
  | 'isLoading'
  | 'onInputChange'
  | 'filterOption';

export interface AsyncAdditionalProps<Option, Group extends GroupBase<Option>> {
  /**
   * The default set of options to show before the user starts searching. When
   * set to `true`, the results for loadOptions('') will be autoloaded.
   */
  defaultOptions?: OptionsOrGroups<Option, Group> | boolean;
  /**
   * If cacheOptions is truthy, then the loaded data will be cached. The cache
   * will remain until `cacheOptions` changes value.
   */
  cacheOptions?: boolean;
  /**
   * Function that returns a promise, which is the set of options to be used
   * once the promise resolves.
   */
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsOrGroups<Option, Group>) => void
  ) => Promise<OptionsOrGroups<Option, Group>> | void;
  /**
   * Will cause the select to be displayed in the loading state, even if the
   * Async select is not currently waiting for loadOptions to resolve
   */
  isLoading?: boolean;
}

export type AsyncProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = StateManagerProps<Option, IsMulti, Group> &
  AsyncAdditionalProps<Option, Group>;

export default function useAsync<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
  AdditionalProps,
>({
  defaultOptions: propsDefaultOptions = false,
  cacheOptions = false,
  loadOptions: propsLoadOptions,
  options: propsOptions,
  isLoading: propsIsLoading = false,
  onInputChange: propsOnInputChange,
  filterOption = null,
  ...restSelectProps
}: AsyncProps<Option, IsMulti, Group> & AdditionalProps): StateManagerProps<
  Option,
  IsMulti,
  Group
> &
  Omit<
    AdditionalProps,
    keyof AsyncAdditionalProps<Option, Group> | AsyncManagedPropKeys
  > {
  const { inputValue: propsInputValue } = restSelectProps;

  const lastRequest = useRef<unknown>(undefined);
  const mounted = useRef(false);

  const [defaultOptions, setDefaultOptions] = useState<
    OptionsOrGroups<Option, Group> | boolean | undefined
  >(Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined);
  const [stateInputValue, setStateInputValue] = useState<string>(
    propsInputValue ?? ''
  );
  const [isLoading, setIsLoading] = useState(propsDefaultOptions === true);
  const [loadedInputValue, setLoadedInputValue] = useState<string | undefined>(
    undefined
  );
  const [loadedOptions, setLoadedOptions] = useState<
    OptionsOrGroups<Option, Group>
  >([]);
  const [passEmptyOptions, setPassEmptyOptions] = useState(false);
  const optionsCache = useRef<Map<string, OptionsOrGroups<Option, Group>>>(
    new Map()
  );

  // reset cache when cacheOptions changes
  useEffect(() => {
    optionsCache.current = new Map();
  }, [cacheOptions]);

  // reset defaultOptions when propsDefaultOptions changes
  useEffect(() => {
    setDefaultOptions(
      Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined
    );
  }, [propsDefaultOptions]);

  const loadOptions = useCallback(
    (
      inputValue: string,
      callback: (options?: OptionsOrGroups<Option, Group>) => void
    ) => {
      if (!propsLoadOptions) return callback();
      const loader = propsLoadOptions(inputValue, callback);
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, () => callback());
      }
    },
    [propsLoadOptions]
  );

  useOnMountEffect(() => {
    mounted.current = true;
    if (propsDefaultOptions === true) {
      loadOptions(stateInputValue, (options) => {
        if (!mounted.current) return;
        setDefaultOptions(options || []);
        setIsLoading(!!lastRequest.current);
      });
    }

    return () => {
      mounted.current = false;
    };
  });

  const onInputChange = useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {
      const inputValue = handleInputChange(
        newValue,
        actionMeta,
        propsOnInputChange
      );
      if (!inputValue) {
        lastRequest.current = undefined;
        setStateInputValue('');
        setLoadedInputValue('');
        setLoadedOptions([]);
        setIsLoading(false);
        setPassEmptyOptions(false);
        return;
      }
      if (cacheOptions && optionsCache.current.has(inputValue)) {
        setStateInputValue(inputValue);
        setLoadedInputValue(inputValue);
        setLoadedOptions(optionsCache.current.get(inputValue)!);
        setIsLoading(false);
        setPassEmptyOptions(false);
      } else {
        const request = (lastRequest.current = {});
        setStateInputValue(inputValue);
        setIsLoading(true);
        setPassEmptyOptions(!loadedInputValue);
        loadOptions(inputValue, (options) => {
          if (!mounted.current) return;
          if (request !== lastRequest.current) return;
          lastRequest.current = undefined;
          setIsLoading(false);
          setLoadedInputValue(inputValue);
          setLoadedOptions(options || []);
          setPassEmptyOptions(false);
          if (options) optionsCache.current.set(inputValue, options);
        });
      }
    },
    [
      cacheOptions,
      loadOptions,
      loadedInputValue,
      optionsCache,
      propsOnInputChange,
    ]
  );

  const options = passEmptyOptions
    ? []
    : stateInputValue && loadedInputValue
      ? loadedOptions
      : ((defaultOptions || []) as OptionsOrGroups<Option, Group>);

  return {
    ...restSelectProps,
    options,
    isLoading: isLoading || propsIsLoading,
    onInputChange,
    filterOption,
  };
}

function handleInputChange(
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
