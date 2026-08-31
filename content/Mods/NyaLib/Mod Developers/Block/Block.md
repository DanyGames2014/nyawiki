The NyaLib Block module contains various features relating to blocks and extending their functionality.  

## Features  
* Voxel Shapes - allows for combining of multiple Axis Aligned Bounding Boxes to create more complex shapes  
* `BlockEntityInit` - an interface which can be implemented on a `BlockEntity` containing an `init(BlockState)` method which is called when the `BlockEntity` is either initialized or when it's loaded from NBT after the world and coordinate fields have been set  
* `HasBlockEntity` - an interface which can be implemented on a `Block` which serves as an alternative to extending the `TemplateBlockWithEntity` class, also providing more context like the world and coordinates in the `createBlockEntity` method  
* `RedstoneLevelProvider` - an interface which can be implemented on a `Block` to allow it to output any strength of a redstone signal rather than the default on/off behavior  
