# Interface: GroupProps\<Option, Group\>

## Type Parameters

• **Option** = `unknown`

• **Group** *extends* [`GroupBase`](GroupBase.md)\<`Option`\> = [`GroupBase`](GroupBase.md)\<`Option`\>

## Properties

### Heading

> **Heading**: `ComponentType`\<[`GroupHeadingProps`](../type-aliases/GroupHeadingProps.md)\<`Option`, `Group`\>\>

Component to wrap the label, receives headingProps.

#### Defined in

[components/Group.tsx:21](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Group.tsx#L21)

***

### children

> **children**: `ReactNode`

The children to be rendered.

#### Defined in

[components/Group.tsx:19](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Group.tsx#L19)

***

### data

> **data**: `Group`

The data of the group.

#### Defined in

[components/Group.tsx:29](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Group.tsx#L29)

***

### headingProps

> **headingProps**: `ForwardedHeadingProps`\<`Option`, `Group`\>

Props to pass to Heading.

#### Defined in

[components/Group.tsx:23](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Group.tsx#L23)

***

### innerProps?

> `optional` **innerProps**: `DetailedHTMLProps`\<`HTMLAttributes`\<`HTMLDivElement`\>, `HTMLDivElement`\>

Props to be passed to the group element.

#### Defined in

[components/Group.tsx:25](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Group.tsx#L25)

***

### label

> **label**: `ReactNode`

Label to be displayed in the heading component.

#### Defined in

[components/Group.tsx:27](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Group.tsx#L27)

***

### options

> **options**: readonly [`CategorizedOption`](CategorizedOption.md)\<`Option`\>[]

#### Defined in

[components/Group.tsx:30](https://github.com/cluk3/react-select/blob/ed039925bb007c645df3b023879a7c98ae8eeccd/packages/react-select/src/components/Group.tsx#L30)
