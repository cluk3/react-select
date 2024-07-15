# Interface: AriaLiveMessages\<Option, IsMulti, Group\>

## Type Parameters

• **Option**

• **IsMulti** *extends* `boolean`

• **Group** *extends* [`GroupBase`](GroupBase.md)\<`Option`\>

## Properties

### guidance()?

> `optional` **guidance**: (`props`) => `string`

Guidance message used to convey component state and specific keyboard interactivity

#### Parameters

• **props**: [`AriaGuidanceProps`](AriaGuidanceProps.md)

#### Returns

`string`

#### Defined in

[accessibility/index.ts:94](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L94)

***

### onChange()?

> `optional` **onChange**: (`props`) => `string`

OnChange message used to convey changes to value but also called when user selects disabled option

#### Parameters

• **props**: [`AriaOnChangeProps`](../type-aliases/AriaOnChangeProps.md)\<`Option`, `IsMulti`\>

#### Returns

`string`

#### Defined in

[accessibility/index.ts:96](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L96)

***

### onFilter()?

> `optional` **onFilter**: (`props`) => `string`

OnFilter message used to convey information about filtered results displayed in the menu

#### Parameters

• **props**: [`AriaOnFilterProps`](AriaOnFilterProps.md)

#### Returns

`string`

#### Defined in

[accessibility/index.ts:98](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L98)

***

### onFocus()?

> `optional` **onFocus**: (`props`) => `string`

OnFocus message used to convey information about the currently focused option or value

#### Parameters

• **props**: [`AriaOnFocusProps`](AriaOnFocusProps.md)\<`Option`, `Group`\>

#### Returns

`string`

#### Defined in

[accessibility/index.ts:100](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/accessibility/index.ts#L100)
