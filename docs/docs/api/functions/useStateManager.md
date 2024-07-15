# Function: useStateManager()

> **useStateManager**\<`Option`, `IsMulti`, `Group`, `AdditionalProps`\>(`__namedParameters`): `PublicBaseSelectProps`\<`Option`, `IsMulti`, `Group`\> & `Omit`\<`AdditionalProps`, keyof `StateManagerAdditionalProps`\<`Option`\> \| `StateManagedPropKeys`\>

## Type Parameters

• **Option**

• **IsMulti** *extends* `boolean`

• **Group** *extends* [`GroupBase`](../interfaces/GroupBase.md)\<`Option`\>

• **AdditionalProps**

## Parameters

• **\_\_namedParameters**: `Omit`\<[`SelectProps`](../interfaces/SelectProps.md)\<`Option`, `IsMulti`, `Group`\>, `StateManagedPropKeys`\> & `Partial`\<[`SelectProps`](../interfaces/SelectProps.md)\<`Option`, `IsMulti`, `Group`\>\> & `StateManagerAdditionalProps`\<`Option`\> & `AdditionalProps`

## Returns

`PublicBaseSelectProps`\<`Option`, `IsMulti`, `Group`\> & `Omit`\<`AdditionalProps`, keyof `StateManagerAdditionalProps`\<`Option`\> \| `StateManagedPropKeys`\>

## Defined in

[useStateManager.ts:40](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/useStateManager.ts#L40)
