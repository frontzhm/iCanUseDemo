# CSS 布局之 Formatting Context (一) Block Formatting Context

> Formatting Context 是页面中的一块渲染区域，在这个区域内拥有它自己的渲染规则，决定了子元素如何定位，及元素之间如何相互作用。

不同的 Formatting Context 有不同的渲染规则，常见的有:
+ BFC (Block Formatting Contextext)
+ IFC (Inline Formatting Context)
+ GFC (Grid Formatting Context)，CSS 3 新加的
+ FFC (Flex Formatting Context),CSS 3 新加的

与 Formatting Context 息息相关的是 Box，每个 HTML 元素作为 Box 被 CSS 渲染。不同的类型的 Box 有不同的行为，CSS 中有两种 Box：Block 和 Inline。

## BFC
BFC 就是只有 Block-level Box 参与的 Formatting Context。它是一个独立的渲染区域，它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干。

### 哪些元素会生成 BFC

+ 父级块框自带隐藏BFC属性
+ float属性不为**none**
+ position属性不为**static和relative**
+ display属性为:**inline-block,flex,inline-flex,table-cell,table-caption**
+ overflow不为**visible**

> 浮动元素,绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的块级格式化上下文。


Block Formatting Context 包含创建它的元素的所有内部元素，但不包含会创建新的 Block Formatting Context 的后裔元素。

### BFC的规则
Block Formatting Context 对于如何定位 (见 float) 和 clear (见 clear) 非常重要，这些规则只会在同一个 Block Formatting 中应用。
Float:当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素

Floats 不会影响其它 block formatting context 的布局，clear 也只会清除同一个 block formatting context 的 float。