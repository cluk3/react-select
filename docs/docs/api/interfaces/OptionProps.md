# Interface: OptionProps\<Option\>

## Type Parameters

• **Option** = `unknown`

## Properties

### children

> **children**: `ReactNode`

The children to be rendered.

#### Defined in

[components/Option.tsx:6](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L6)

***

### data

> **data**: `Option`

The data of the selected option.

#### Defined in

[components/Option.tsx:17](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L17)

***

### innerProps

> **innerProps**: `DetailedHTMLProps`\<`HTMLAttributes`\<`HTMLDivElement`\>, `HTMLDivElement`\>

props passed to the wrapping element for the group.

#### Defined in

[components/Option.tsx:10](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L10)

***

### innerRef?

> `optional` **innerRef**: `MutableRefObject`\<`null` \| `HTMLDivElement`\>

Inner ref to DOM Node

#### Defined in

[components/Option.tsx:8](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L8)

***

### isOptionDeselectable

> **isOptionDeselectable**: `boolean`

Whether the option is deselectable (multi-select only).

#### Defined in

[components/Option.tsx:25](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L25)

***

### isOptionDisabled

> **isOptionDisabled**: `boolean`

Whether the option is disabled.

#### Defined in

[components/Option.tsx:21](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L21)

***

### isOptionFocused

> **isOptionFocused**: `boolean`

Whether the option is focused.

#### Defined in

[components/Option.tsx:23](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L23)

***

### isOptionSelected

> **isOptionSelected**: `boolean`

Whether the option is selected.

#### Defined in

[components/Option.tsx:19](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L19)

***

### label

> **label**: `string`

Text to be displayed representing the option.

#### Defined in

[components/Option.tsx:12](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L12)

***

### type

> **type**: `"option"`

Type is used by the menu to determine whether this is an option or a group.
In the case of option this is always `option`. *

#### Defined in

[components/Option.tsx:15](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Option.tsx#L15)
