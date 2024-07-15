# Interface: SelectProps\<Option, IsMulti, Group\>

## Type Parameters

• **Option**

• **IsMulti** *extends* `boolean`

• **Group** *extends* [`GroupBase`](GroupBase.md)\<`Option`\>

## Properties

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

HTML ID of an element containing an error message related to the input*

#### Defined in

[types.ts:183](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L183)

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Indicate if the value entered in the field is invalid *

#### Defined in

[types.ts:185](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L185)

***

### aria-label?

> `optional` **aria-label**: `string`

Aria label (for assistive tech)

#### Defined in

[types.ts:187](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L187)

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

HTML ID of an element that should be used as the label (for assistive tech)

#### Defined in

[types.ts:189](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L189)

***

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Used to set the priority with which screen reader should treat updates to live regions. The possible settings are: off, polite (default) or assertive

#### Defined in

[types.ts:191](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L191)

***

### ariaLiveMessages?

> `optional` **ariaLiveMessages**: [`AriaLiveMessages`](AriaLiveMessages.md)\<`Option`, `IsMulti`, `Group`\>

Customise the messages used by the aria-live component

#### Defined in

[types.ts:193](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L193)

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

Focus the control when it is mounted

#### Defined in

[types.ts:195](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L195)

***

### backspaceRemovesValue?

> `optional` **backspaceRemovesValue**: `boolean`

Remove the currently focused option when the user presses backspace when Select isClearable or isMulti

#### Defined in

[types.ts:197](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L197)

***

### blurInputOnSelect?

> `optional` **blurInputOnSelect**: `boolean`

Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices)

#### Defined in

[types.ts:199](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L199)

***

### captureMenuScroll?

> `optional` **captureMenuScroll**: `boolean`

When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent

#### Defined in

[types.ts:201](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L201)

***

### className?

> `optional` **className**: `string`

Sets a className attribute on the outer component

#### Defined in

[types.ts:203](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L203)

***

### classNamePrefix?

> `optional` **classNamePrefix**: `string`

If provided, all inner components will be given a prefixed className attribute.

This is useful when styling via CSS classes instead of the Styles API approach.

#### Defined in

[types.ts:209](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L209)

***

### classNames?

> `optional` **classNames**: [`ClassNamesConfig`](../type-aliases/ClassNamesConfig.md)\<`Option`, `IsMulti`, `Group`\>

Provide classNames based on state for each inner component

#### Defined in

[types.ts:213](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L213)

***

### closeMenuOnScroll?

> `optional` **closeMenuOnScroll**: `boolean` \| (`event`) => `boolean`

If `true`, close the select menu when the user scrolls the document/body.

If a function, takes a standard javascript `ScrollEvent` you return a boolean:

`true` => The menu closes

`false` => The menu stays open

This is useful when you have a scrollable modal and want to portal the menu out,
but want to avoid graphical issues.

#### Defined in

[types.ts:228](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L228)

***

### closeMenuOnSelect?

> `optional` **closeMenuOnSelect**: `boolean`

Close the select menu when the user selects an option

#### Defined in

[types.ts:215](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L215)

***

### components?

> `optional` **components**: `Partial`\<`SelectComponents`\<`Option`\>\>

This complex object includes all the compositional components that are used
in `react-select`. If you wish to overwrite a component, pass in an object
with the appropriate namespace.

If you only wish to restyle a component, we recommend using the `classNames` prop
instead. For a list of the components that can be passed in, and the shape
that will be passed to them, see [the components docs](/components)

#### Defined in

[types.ts:238](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L238)

***

### controlShouldRenderValue?

> `optional` **controlShouldRenderValue**: `boolean`

Whether the value of the select, e.g. SingleValue, should be displayed in the control.

#### Defined in

[types.ts:240](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L240)

***

### delimiter?

> `optional` **delimiter**: `string`

Delimiter used to join multiple values into a single HTML Input value

#### Defined in

[types.ts:242](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L242)

***

### escapeClearsValue?

> `optional` **escapeClearsValue**: `boolean`

Clear all values when the user presses escape AND the menu is closed

#### Defined in

[types.ts:244](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L244)

***

### filterOption?

> `optional` **filterOption**: `null` \| (`option`, `inputValue`) => `boolean`

Custom method to filter whether an option should be displayed in the menu

#### Defined in

[types.ts:246](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L246)

***

### form?

> `optional` **form**: `string`

Sets the form attribute on the input

#### Defined in

[types.ts:370](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L370)

***

### formatGroupLabel()?

> `optional` **formatGroupLabel**: (`group`) => `ReactNode`

Formats group labels in the menu as React components

An example can be found in the [Replacing builtins](/advanced#replacing-builtins) documentation.

#### Parameters

• **group**: `Group`

#### Returns

`ReactNode`

#### Defined in

[types.ts:254](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L254)

***

### formatOptionLabel()?

> `optional` **formatOptionLabel**: (`data`, `formatOptionLabelMeta`) => `ReactNode`

Formats option labels in the menu and control as React components

#### Parameters

• **data**: `Option`

• **formatOptionLabelMeta**: [`FormatOptionLabelMeta`](FormatOptionLabelMeta.md)\<`Option`\>

#### Returns

`ReactNode`

#### Defined in

[types.ts:256](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L256)

***

### getOptionLabel?

> `optional` **getOptionLabel**: [`GetOptionLabel`](../type-aliases/GetOptionLabel.md)\<`Option`\>

Resolves option data to a string to be displayed as the label by components

Note: Failure to resolve to a string type can interfere with filtering and
screen reader support.

#### Defined in

[types.ts:266](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L266)

***

### getOptionValue?

> `optional` **getOptionValue**: [`GetOptionValue`](../type-aliases/GetOptionValue.md)\<`Option`\>

Resolves option data to a string to compare options and specify value attributes

#### Defined in

[types.ts:268](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L268)

***

### hideSelectedOptions?

> `optional` **hideSelectedOptions**: `boolean`

Hide the selected option from the menu

#### Defined in

[types.ts:270](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L270)

***

### id?

> `optional` **id**: `string`

The id to set on the SelectContainer component.

#### Defined in

[types.ts:272](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L272)

***

### inputId?

> `optional` **inputId**: `string`

The id of the search input

#### Defined in

[types.ts:276](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L276)

***

### inputValue?

> `optional` **inputValue**: `string`

The value of the search input

#### Defined in

[types.ts:274](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L274)

***

### instanceId?

> `optional` **instanceId**: `string` \| `number`

Define an id prefix for the select components e.g. {your-id}-value

#### Defined in

[types.ts:278](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L278)

***

### isClearable?

> `optional` **isClearable**: `boolean`

Is the select value clearable

#### Defined in

[types.ts:280](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L280)

***

### isDisabled?

> `optional` **isDisabled**: `boolean`

Is the select disabled

#### Defined in

[types.ts:282](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L282)

***

### isLoading?

> `optional` **isLoading**: `boolean`

Is the select in a state of loading (async)

#### Defined in

[types.ts:284](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L284)

***

### isMulti?

> `optional` **isMulti**: `IsMulti`

Support multiple selected options

#### Defined in

[types.ts:294](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L294)

***

### isOptionDisabled()?

> `optional` **isOptionDisabled**: (`option`, `selectValue`) => `boolean`

Override the built-in logic to detect whether an option is disabled

An example can be found in the [Replacing builtins](/advanced#replacing-builtins) documentation.

#### Parameters

• **option**: `Option`

• **selectValue**: [`Options`](../type-aliases/Options.md)\<`Option`\>

#### Returns

`boolean`

#### Defined in

[types.ts:290](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L290)

***

### isOptionSelected()?

> `optional` **isOptionSelected**: (`option`, `selectValue`) => `boolean`

Override the built-in logic to detect whether an option is selected

#### Parameters

• **option**: `Option`

• **selectValue**: [`Options`](../type-aliases/Options.md)\<`Option`\>

#### Returns

`boolean`

#### Defined in

[types.ts:292](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L292)

***

### isRtl?

> `optional` **isRtl**: `boolean`

Is the select direction right-to-left

#### Defined in

[types.ts:296](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L296)

***

### isSearchable?

> `optional` **isSearchable**: `boolean`

Whether to enable search functionality

#### Defined in

[types.ts:298](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L298)

***

### loadingMessage()?

> `optional` **loadingMessage**: (`obj`) => `ReactNode`

Async: Text to display when loading options

#### Parameters

• **obj**

• **obj.inputValue**: `string`

#### Returns

`ReactNode`

#### Defined in

[types.ts:300](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L300)

***

### maxMenuHeight?

> `optional` **maxMenuHeight**: `number`

Maximum height of the menu before scrolling

#### Defined in

[types.ts:304](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L304)

***

### menuIsOpen?

> `optional` **menuIsOpen**: `boolean`

Whether the menu is open

#### Defined in

[types.ts:306](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L306)

***

### menuPlacement?

> `optional` **menuPlacement**: [`MenuPlacement`](../type-aliases/MenuPlacement.md)

Default placement of the menu in relation to the control. 'auto' will flip
when there isn't enough space below the control.

#### Defined in

[types.ts:311](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L311)

***

### menuPortalTarget?

> `optional` **menuPortalTarget**: `null` \| `HTMLElement`

Whether the menu should use a portal, and where it should attach

An example can be found in the [Portaling](/advanced#portaling) documentation

#### Defined in

[types.ts:319](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L319)

***

### menuPosition?

> `optional` **menuPosition**: [`MenuPosition`](../type-aliases/MenuPosition.md)

The CSS position value of the menu, when "fixed" extra layout management is required

#### Defined in

[types.ts:313](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L313)

***

### menuShouldBlockScroll?

> `optional` **menuShouldBlockScroll**: `boolean`

Whether to block scroll events when the menu is open

#### Defined in

[types.ts:321](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L321)

***

### menuShouldScrollIntoView?

> `optional` **menuShouldScrollIntoView**: `boolean`

Whether the menu should be scrolled into view when it opens

#### Defined in

[types.ts:323](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L323)

***

### minMenuHeight?

> `optional` **minMenuHeight**: `number`

Minimum height of the menu before flipping

#### Defined in

[types.ts:302](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L302)

***

### name?

> `optional` **name**: `string`

Name of the HTML Input (optional - without this, no input will be rendered)

#### Defined in

[types.ts:325](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L325)

***

### noOptionsMessage()?

> `optional` **noOptionsMessage**: (`obj`) => `ReactNode`

Text to display when there are no options

#### Parameters

• **obj**

• **obj.inputValue**: `string`

#### Returns

`ReactNode`

#### Defined in

[types.ts:327](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L327)

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLInputElement`\>

Handle blur events on the control

#### Defined in

[types.ts:329](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L329)

***

### onChange()

> **onChange**: (`newValue`, `actionMeta`) => `void`

Handle change events on the select

#### Parameters

• **newValue**: [`OnChangeValue`](../type-aliases/OnChangeValue.md)\<`Option`, `IsMulti`\>

• **actionMeta**: [`ActionMeta`](../type-aliases/ActionMeta.md)\<`Option`\>

#### Returns

`void`

#### Defined in

[types.ts:331](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L331)

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLInputElement`\>

Handle focus events on the control

#### Defined in

[types.ts:336](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L336)

***

### onInputChange()?

> `optional` **onInputChange**: (`newValue`, `actionMeta`) => `void`

Handle change events on the input

#### Parameters

• **newValue**: `string`

• **actionMeta**: [`InputActionMeta`](InputActionMeta.md)

#### Returns

`void`

#### Defined in

[types.ts:338](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L338)

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLDivElement`\>

Handle key down events on the select

#### Defined in

[types.ts:340](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L340)

***

### onMenuClose()?

> `optional` **onMenuClose**: () => `void`

Handle the menu closing

#### Returns

`void`

#### Defined in

[types.ts:344](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L344)

***

### onMenuOpen()?

> `optional` **onMenuOpen**: () => `void`

Handle the menu opening

#### Returns

`void`

#### Defined in

[types.ts:342](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L342)

***

### onMenuScrollToBottom()?

> `optional` **onMenuScrollToBottom**: (`event`) => `void`

Fired when the user scrolls to the bottom of the menu

#### Parameters

• **event**: `TouchEvent` \| `WheelEvent`

#### Returns

`void`

#### Defined in

[types.ts:348](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L348)

***

### onMenuScrollToTop()?

> `optional` **onMenuScrollToTop**: (`event`) => `void`

Fired when the user scrolls to the top of the menu

#### Parameters

• **event**: `TouchEvent` \| `WheelEvent`

#### Returns

`void`

#### Defined in

[types.ts:346](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L346)

***

### openMenuOnClick?

> `optional` **openMenuOnClick**: `boolean`

Allows control of whether the menu is opened when the Select is clicked

#### Defined in

[types.ts:352](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L352)

***

### openMenuOnFocus?

> `optional` **openMenuOnFocus**: `boolean`

Allows control of whether the menu is opened when the Select is focused

#### Defined in

[types.ts:350](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L350)

***

### options?

> `optional` **options**: [`OptionsOrGroups`](../type-aliases/OptionsOrGroups.md)\<`Option`, `Group`\>

Array of options that populate the select menu

#### Defined in

[types.ts:354](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L354)

***

### pageSize?

> `optional` **pageSize**: `number`

Number of options to jump in menu when page{up|down} keys are used

#### Defined in

[types.ts:356](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L356)

***

### placeholder?

> `optional` **placeholder**: `ReactNode`

Placeholder for the select value

#### Defined in

[types.ts:358](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L358)

***

### required?

> `optional` **required**: `boolean`

Marks the value-holding input as required for form validation

#### Defined in

[types.ts:372](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L372)

***

### screenReaderStatus()?

> `optional` **screenReaderStatus**: (`obj`) => `string`

Status to relay to screen readers

#### Parameters

• **obj**

• **obj.count**: `number`

#### Returns

`string`

#### Defined in

[types.ts:360](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L360)

***

### tabIndex?

> `optional` **tabIndex**: `number`

Sets the tabIndex attribute on the input

#### Defined in

[types.ts:362](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L362)

***

### tabSelectsValue?

> `optional` **tabSelectsValue**: `boolean`

Select the currently focused option when the user presses tab

#### Defined in

[types.ts:364](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L364)

***

### unstyled?

> `optional` **unstyled**: `boolean`

Remove all non-essential styles

#### Defined in

[types.ts:366](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L366)

***

### value

> **value**: [`PropsValue`](../type-aliases/PropsValue.md)\<`Option`\>

The value of the select; reflected by the selected option

#### Defined in

[types.ts:368](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L368)
