Block Templates allow for the easy creation of stairs, slabs, fences, fence gates, buttons, walls, panes and pressure plates just by supplying a base block and a path to a texture.  

Currently available template classes:
`StairsBlockTemplate(Identifier identifier, Block baseBlock, Identifier texture)` 
`SlabBlockTemplate(Identifier identifier, Block baseBlock, Identifier texture)`  
`FenceBlockTemplate(Identifier identifier, Block baseBlock, Identifier texture)`  
`ButtonBlockTemplate(Identifier identifier, Block baseBlock, Identifier texture)`  
`WallBlockTemplate(Identifier identifier, Block baseBlock, Identifier texture)`  
`PaneBlockTemplate(Identifier identifier, Block baseBlock, Identifier texture)`  
`PressurePlateBlockTemplate(Identifier identifier, Block baseBlock, PressurePlateActivationRule activationRule, Identifier texture)`  

## Using the templates
To use these templates, place the texture you want to use in `resources/assets/<modid>/stationapi/textures/` and then in your `BlockRegistryEvent` listener instantiate the class of the template you want to use, like this:  

```java
public static Block tntStairs;

@EventListener
public void registerBlock(BlockRegistryEvent event) {
	tntStairs = new StairsBlockTemplate(NAMESPACE.id("tnt_stairs"), Block.TNT, Identifier.of("modid:block/my_texture")).setTranslationKey(NAMESPACE, "tnt_stairs").setHardness(0.5F);
}
```
&nbsp;
The texture Identifier is a path to your texture, in this case the texture is in `resources/assets/modid/stationapi/textures/block/my_texture.png`
