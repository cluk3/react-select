# Function: default()

> **default**\<`Option`, `IsMulti`, `Group`\>(`props`): `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

## Type Parameters

• **Option** = `unknown`

• **IsMulti** *extends* `boolean` = `false`

• **Group** *extends* [`GroupBase`](../interfaces/GroupBase.md)\<`Option`\> = [`GroupBase`](../interfaces/GroupBase.md)\<`Option`\>

## Parameters

• **props**: `Omit`\<[`SelectProps`](../interfaces/SelectProps.md)\<`Option`, `IsMulti`, `Group`\>, `StateManagedPropKeys`\> & `Partial`\<[`SelectProps`](../interfaces/SelectProps.md)\<`Option`, `IsMulti`, `Group`\>\> & `StateManagerAdditionalProps`\<`Option`\> & `object`

## Returns

`ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

## Defined in

[stateManager.tsx:10](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/stateManager.tsx#L10)
