# Type Alias: CamelToKebab\<S\>

> **CamelToKebab**\<`S`\>: `S` *extends* \`$\{infer T\}$\{infer U\}\` ? `U` *extends* `Uncapitalize`\<`U`\> ? \`$\{Uncapitalize\<T\>\}$\{CamelToKebab\<U\>\}\` : \`$\{Uncapitalize\<T\>\}-$\{CamelToKebab\<U\>\}\` : `""`

## Type Parameters

• **S** *extends* `string`

## Defined in

[types.ts:43](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/types.ts#L43)
