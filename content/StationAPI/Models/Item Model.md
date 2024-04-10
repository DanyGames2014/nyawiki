Item Models are used to specify a texture, rotation, translation (in space, not the language one) and scaling for an item. The minimum for any model is a parent model, the default supplied ones are listed in [[Item Model#Default StationAPI Item Model Parents]], or you can use any other item model or a block model (this is what it is usually done for block items) as a parent.

This is an example of a basic item model which only specifies a parent :
```
{  
  "parent": "<parent>"
}
```

Some models we could use as a parent are :  
`item/generated` - The default item/generated is the most basic item model, it is what most of the items in the game use, in this case there would be no texture because the model itself doesn't specify one  
`minecraft:item/diamond` - This specifies the default minecraft diamond item model as our parent which will make our item look exactly as a Diamond  
`examplemod:item/example_item` - This specifies the item model of `example_item` as the parent of our model, this will make our item look exactly as the Example Item  
`examplemod:block/example_block` - This will specify the **block** model of `example_block` as the parent of our item, which means that the item will look as a block item, think of Dirt block item for example, just a standard block.

> [!info] Note: You do not have to specify `minecraft` as the namespace, if there is no namespace then it the minecraft namespace is used. This means that the first example will be interpreted as `minecraft:item/generated`

*TODO : Explain texture layers*
*TODO: Explain display*
*TODO: Link <https://minecraft.wiki/w/Tutorials/Models>*
  
### Default StationAPI Item Model Parents
`item/generated`  
`item/handheld`  
`item/handheld_rod`