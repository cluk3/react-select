import type {
  ReactNode,
  KeyboardEventHandler,
  FocusEventHandler,
  AriaAttributes,
} from 'react';

import type { FilterOptionOption } from './filters';
import type { AriaLiveMessages, AriaSelection } from './accessibility/index';
import type {
  SelectComponentsConfig,
  SelectComponents,
  SelectComponentsProps,
} from './components/index';
import type { SelectContextValue } from './SelectContext';

export interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}

export type OptionsOrGroups<
  Option,
  Group extends GroupBase<Option>,
> = readonly (Option | Group)[];

export type Options<Option> = readonly Option[];

export type SingleValue<Option> = Option | null;
export type MultiValue<Option> = readonly Option[];

export type PropsValue<Option> = MultiValue<Option> | SingleValue<Option>;

export type OnChangeValue<
  Option,
  IsMulti extends boolean,
> = IsMulti extends true ? MultiValue<Option> : SingleValue<Option>;

export type ComponentNames = Uncapitalize<
  Extract<keyof SelectComponents<unknown>, string>
>;

export type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<T>}${CamelToKebab<U>}`
    : `${Uncapitalize<T>}-${CamelToKebab<U>}`
  : '';

export type ComponentClassNames = CamelToKebab<ComponentNames>;

export interface ActionMetaBase<Option> {
  option?: Option | undefined;
  removedValue?: Option;
  removedValues?: Options<Option>;
  name?: string;
}

export interface SelectOptionActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'select-option';
  option: Option | undefined;
  name?: string;
}

export interface DeselectOptionActionMeta<Option>
  extends ActionMetaBase<Option> {
  action: 'deselect-option';
  option: Option | undefined;
  name?: string;
}

export interface RemoveValueActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'remove-value';
  removedValue: Option;
  name?: string;
}

export interface ClearActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'clear';
  removedValues: Options<Option>;
  name?: string;
}

export interface CreateOptionActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'create-option';
  name?: string;
  option: Option;
}

export interface InitialInputFocusedActionMeta<Option, IsMulti extends boolean>
  extends ActionMetaBase<Option> {
  action: 'initial-input-focus';
  value: OnChangeValue<Option, IsMulti>;
  options?: Options<Option>;
}

export type ActionMeta<Option> =
  | SelectOptionActionMeta<Option>
  | DeselectOptionActionMeta<Option>
  | RemoveValueActionMeta<Option>
  | ClearActionMeta<Option>
  | CreateOptionActionMeta<Option>;

export type SetValueAction = 'select-option' | 'deselect-option';

export type InputAction =
  | 'set-value'
  | 'input-change'
  | 'input-blur'
  | 'menu-close';

export interface InputActionMeta {
  action: InputAction;
  /** The previous value of the search input. */
  prevInputValue: string;
}

export type MenuPlacement = 'bottom' | 'top';
export type MenuPosition = 'absolute' | 'fixed';

export type FocusDirection =
  | 'up'
  | 'down'
  | 'pageup'
  | 'pagedown'
  | 'first'
  | 'last';

export type GetOptionLabel<Option> = (option: Option) => string;
export type GetOptionValue<Option> = (option: Option) => string;

export interface State<Option, IsMulti extends boolean> {
  ariaSelection: AriaSelection<Option, IsMulti> | null;
  isInputHidden: boolean;
  isFocused: boolean;
  focusedOption: Option | null;
  focusedOptionId: string | null;
  focusedValue: Option | null;
  clearFocusValueOnUpdate: boolean;
  prevWasFocused: boolean;
  isInputHiddenAfterUpdate: boolean | null | undefined;
}

export interface CategorizedOption<Option> {
  type: 'option';
  data: Option;
  isDisabled: boolean;
  isSelected: boolean;
  label: string;
  value: string;
  index: number;
}

export interface FocusableOptionWithId<Option> {
  data: Option;
  id: string;
}

export interface CategorizedGroup<Option, Group extends GroupBase<Option>> {
  type: 'group';
  data: Group;
  options: readonly CategorizedOption<Option>[];
  index: number;
}

export type CategorizedGroupOrOption<Option, Group extends GroupBase<Option>> =
  | CategorizedGroup<Option, Group>
  | CategorizedOption<Option>;

export type FormatOptionLabelContext = 'menu' | 'value';
export interface FormatOptionLabelMeta<Option> {
  context: FormatOptionLabelContext;
  inputValue: string;
  selectValue: Options<Option>;
}

export interface SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> {
  /** HTML ID of an element containing an error message related to the input**/
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  /** Indicate if the value entered in the field is invalid **/
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  /** Aria label (for assistive tech) */
  'aria-label'?: AriaAttributes['aria-label'];
  /** HTML ID of an element that should be used as the label (for assistive tech) */
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  /** Used to set the priority with which screen reader should treat updates to live regions. The possible settings are: off, polite (default) or assertive */
  'aria-live'?: AriaAttributes['aria-live'];
  /** Customise the messages used by the aria-live component */
  ariaLiveMessages?: AriaLiveMessages<Option, IsMulti, Group>;
  /** Focus the control when it is mounted */
  autoFocus?: boolean;
  /** Remove the currently focused option when the user presses backspace when Select isClearable or isMulti */
  backspaceRemovesValue?: boolean;
  /** Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices) */
  blurInputOnSelect?: boolean;
  /** When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent  */
  captureMenuScroll?: boolean;
  /** Sets a className attribute on the outer component */
  className?: string;
  /**
   * If provided, all inner components will be given a prefixed className attribute.
   *
   * This is useful when styling via CSS classes instead of the Styles API approach.
   */
  classNamePrefix?: string;
  /**
   * Provide classNames based on state for each inner component
   */
  classNames?: ClassNamesConfig<Option, IsMulti, Group>;
  /** Close the select menu when the user selects an option */
  closeMenuOnSelect?: boolean;
  /**
   * If `true`, close the select menu when the user scrolls the document/body.
   *
   * If a function, takes a standard javascript `ScrollEvent` you return a boolean:
   *
   * `true` => The menu closes
   *
   * `false` => The menu stays open
   *
   * This is useful when you have a scrollable modal and want to portal the menu out,
   * but want to avoid graphical issues.
   */
  closeMenuOnScroll?: boolean | ((event: Event) => boolean);
  /**
   * This complex object includes all the compositional components that are used
   * in `react-select`. If you wish to overwrite a component, pass in an object
   * with the appropriate namespace.
   *
   * If you only wish to restyle a component, we recommend using the `classNames` prop
   * instead. For a list of the components that can be passed in, and the shape
   * that will be passed to them, see [the components docs](/components)
   */
  components?: SelectComponentsConfig<Option>;
  /** Whether the value of the select, e.g. SingleValue, should be displayed in the control. */
  controlShouldRenderValue?: boolean;
  /** Delimiter used to join multiple values into a single HTML Input value */
  delimiter?: string;
  /** Clear all values when the user presses escape AND the menu is closed */
  escapeClearsValue?: boolean;
  /** Custom method to filter whether an option should be displayed in the menu */
  filterOption?:
    | ((option: FilterOptionOption<Option>, inputValue: string) => boolean)
    | null;
  /**
   * Formats group labels in the menu as React components
   *
   * An example can be found in the [Replacing builtins](/advanced#replacing-builtins) documentation.
   */
  formatGroupLabel?: (group: Group) => ReactNode;
  /** Formats option labels in the menu and control as React components */
  formatOptionLabel?: (
    data: Option,
    formatOptionLabelMeta: FormatOptionLabelMeta<Option>
  ) => ReactNode;
  /**
   * Resolves option data to a string to be displayed as the label by components
   *
   * Note: Failure to resolve to a string type can interfere with filtering and
   * screen reader support.
   */
  getOptionLabel?: GetOptionLabel<Option>;
  /** Resolves option data to a string to compare options and specify value attributes */
  getOptionValue?: GetOptionValue<Option>;
  /** Hide the selected option from the menu */
  hideSelectedOptions?: boolean;
  /** The id to set on the SelectContainer component. */
  id?: string;
  /** The value of the search input */
  inputValue?: string;
  /** The id of the search input */
  inputId?: string;
  /** Define an id prefix for the select components e.g. {your-id}-value */
  instanceId?: number | string;
  /** Is the select value clearable */
  isClearable?: boolean;
  /** Is the select disabled */
  isDisabled?: boolean;
  /** Is the select in a state of loading (async) */
  isLoading?: boolean;
  /**
   * Override the built-in logic to detect whether an option is disabled
   *
   * An example can be found in the [Replacing builtins](/advanced#replacing-builtins) documentation.
   */
  isOptionDisabled?: (option: Option, selectValue: Options<Option>) => boolean;
  /** Override the built-in logic to detect whether an option is selected */
  isOptionSelected?: (option: Option, selectValue: Options<Option>) => boolean;
  /** Support multiple selected options */
  isMulti?: IsMulti;
  /** Is the select direction right-to-left */
  isRtl?: boolean;
  /** Whether to enable search functionality */
  isSearchable?: boolean;
  /** Async: Text to display when loading options */
  loadingMessage?: (props: { inputValue: string }) => ReactNode;
  /** Minimum height of the menu before flipping */
  minMenuHeight?: number;
  /** Maximum height of the menu before scrolling */
  maxMenuHeight?: number;
  /** Whether the menu is open */
  menuIsOpen?: boolean;
  /**
   * Default placement of the menu in relation to the control. 'auto' will flip
   * when there isn't enough space below the control.
   */
  menuPlacement?: MenuPlacement;
  /** The CSS position value of the menu, when "fixed" extra layout management is required */
  menuPosition?: MenuPosition;
  /**
   * Whether the menu should use a portal, and where it should attach
   *
   * An example can be found in the [Portaling](/advanced#portaling) documentation
   */
  menuPortalTarget?: HTMLElement | null;
  /** Whether to block scroll events when the menu is open */
  menuShouldBlockScroll?: boolean;
  /** Whether the menu should be scrolled into view when it opens */
  menuShouldScrollIntoView?: boolean;
  /** Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string;
  /** Text to display when there are no options */
  noOptionsMessage?: (obj: { inputValue: string }) => ReactNode;
  /** Handle blur events on the control */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /** Handle change events on the select */
  onChange: (
    newValue: OnChangeValue<Option, IsMulti>,
    actionMeta: ActionMeta<Option>
  ) => void;
  /** Handle focus events on the control */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Handle change events on the input */
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  /** Handle key down events on the select */
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  /** Handle the menu opening */
  onMenuOpen?: () => void;
  /** Handle the menu closing */
  onMenuClose?: () => void;
  /** Fired when the user scrolls to the top of the menu */
  onMenuScrollToTop?: (event: WheelEvent | TouchEvent) => void;
  /** Fired when the user scrolls to the bottom of the menu */
  onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
  /** Allows control of whether the menu is opened when the Select is focused */
  openMenuOnFocus?: boolean;
  /** Allows control of whether the menu is opened when the Select is clicked */
  openMenuOnClick?: boolean;
  /** Array of options that populate the select menu */
  options?: OptionsOrGroups<Option, Group>;
  /** Number of options to jump in menu when page{up|down} keys are used */
  pageSize?: number;
  /** Placeholder for the select value */
  placeholder?: ReactNode;
  /** Status to relay to screen readers */
  screenReaderStatus?: (obj: { count: number }) => string;
  /** Sets the tabIndex attribute on the input */
  tabIndex?: number;
  /** Select the currently focused option when the user presses tab */
  tabSelectsValue?: boolean;
  /** Remove all non-essential styles */
  unstyled?: boolean;
  /** The value of the select; reflected by the selected option */
  value: PropsValue<Option>;
  /** Sets the form attribute on the input */
  form?: string;
  /** Marks the value-holding input as required for form validation */
  required?: boolean;
}

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type DefaultSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = WithRequired<
  Omit<SelectProps<Option, IsMulti, Group>, 'isMulti'>,
  | 'aria-live'
  | 'backspaceRemovesValue'
  | 'blurInputOnSelect'
  | 'captureMenuScroll'
  | 'classNames'
  | 'closeMenuOnSelect'
  | 'closeMenuOnScroll'
  | 'components'
  | 'controlShouldRenderValue'
  | 'escapeClearsValue'
  | 'filterOption'
  | 'formatGroupLabel'
  | 'getOptionLabel'
  | 'getOptionValue'
  | 'inputValue'
  | 'isClearable'
  | 'isDisabled'
  | 'isRtl'
  | 'isOptionDisabled'
  | 'isSearchable'
  | 'loadingMessage'
  | 'maxMenuHeight'
  | 'minMenuHeight'
  | 'menuIsOpen'
  | 'menuPlacement'
  | 'menuPosition'
  | 'menuShouldBlockScroll'
  | 'menuShouldScrollIntoView'
  | 'noOptionsMessage'
  | 'openMenuOnFocus'
  | 'openMenuOnClick'
  | 'options'
  | 'pageSize'
  | 'placeholder'
  | 'screenReaderStatus'
  | 'tabIndex'
  | 'tabSelectsValue'
  | 'unstyled'
> & { isMulti: IsMulti };

export type ClassNamesConfigComponentProps<
  Option,
  Key extends ComponentNames,
> = Omit<
  SelectComponentsProps<Option>[Capitalize<Key>],
  'children' | 'innerRef' | 'innerProps' | 'className'
>;

export type ClassNamesConfig<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = {
  [K in ComponentNames]?:
    | string
    | ((
        context: Omit<
          SelectContextValue<Option, IsMulti, Group>,
          'classNamePrefix' | 'getClassNames' | 'unstyled'
        > &
          ClassNamesConfigComponentProps<Option, K>
      ) => string);
};
