# Interface: AriaOnFocusProps\<Option, Group\>

## Type Parameters

• **Option**

• **Group** *extends* [`GroupBase`](GroupBase.md)\<`Option`\>

## Properties

### context

> **context**: [`OptionContext`](../type-aliases/OptionContext.md)

String indicating whether the option was focused in the menu or as (multi-) value

#### Defined in

[accessibility/index.ts:61](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L61)

***

### focused

> **focused**: `Option`

Option that is being focused

#### Defined in

[accessibility/index.ts:63](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L63)

***

### isAppleDevice

> **isAppleDevice**: `boolean`

Boolean indicating whether user uses Apple device

#### Defined in

[accessibility/index.ts:75](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L75)

***

### isDisabled

> **isDisabled**: `boolean`

Boolean indicating whether focused menu option has been disabled

#### Defined in

[accessibility/index.ts:65](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L65)

***

### isSelected

> **isSelected**: `boolean`

Boolean indicating whether focused menu option is an already selected option

#### Defined in

[accessibility/index.ts:67](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L67)

***

### label

> **label**: `string`

String derived label from focused option/value

#### Defined in

[accessibility/index.ts:69](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L69)

***

### options

> **options**: [`OptionsOrGroups`](../type-aliases/OptionsOrGroups.md)\<`Option`, `Group`\>

Options provided as props to Select used to determine indexing

#### Defined in

[accessibility/index.ts:71](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L71)

***

### selectValue

> **selectValue**: [`Options`](../type-aliases/Options.md)\<`Option`\>

selected option(s) of the Select

#### Defined in

[accessibility/index.ts:73](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L73)
