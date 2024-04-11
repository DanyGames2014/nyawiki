Block models are used to define the texture and visual shape of a block placed in the world. Block models can get quite complex, which for now is not the scope of this guide, but we are gonna cover just enough so you know where to look.

Let's start with a simple block model. A block model does not neccessarily need a parent but unless you intend to specify everything by yourself I recommend inheriting from one. 

```json
{  
  "parent": "<parent>"
}
```

Some models we could use as a parent are:
`block/cube` - This is one of the most basic models supplied by StationAPI, it is a cube on which you can specify a texture for each side, however we haven't supplied one so it would just have the default texture.
`minecraft:block/dirt` - This specifies the `dirt` block from Minecraft as our parent, which will make our block inherit all of its properties making it look exactly like it.
`examplemod:block/example_block` - This will specify the `example_block` from `examplemod` as the parent for the block, making it look exactly like it.

> [!info] Note: You do not have to specify `minecraft` as the namespace, if there is no namespace then the minecraft namespace is used. This means that the first example will be interpreted as `minecraft:block/cube`

### Adding Texture
Now let's try to inherit one of the StationAPI block models and add our own textures. StationAPI offers a wide variety of block models to inherit from which can be found at [Default StationAPI Block Model Parents](Block%20Model.md#Default%20StationAPI%20Block%20Model%20Parents). When inheriting a block model like this, all you need to do is to specify a texture path for the model's placeholders.

For Example, a `block/cube_all` model only has a single placeholder named `#all`, so to create our model which inherits from it we need to first inherit the model by specifying it as a `parent` and then under textures specify a texture path for the `all` placeholder, like so:
```json
{  
  "parent": "block/cube_all",  
  "textures": {  
    "all": "examplemod:block/example_block"  
  }  
}
```
We have now made a block which has the `examplemod:block/example_block` texture on all sides. The path of a block texture works in the same way as a path to a item texture, we start with the namespace where the texture we want to access is from and after a colon ( : ) we specify the path to it.  The texture path we specified will resolve to `src/main/resources/assets/examplemod/stationapi/textures/block/example_block.png` in our project directory.

Let's look at some other model parents we can use and their placeholders :

| Model Parent          | Placeholders                                    |
| --------------------- | ----------------------------------------------- |
| block/cross           | `#cross`                                        |
| block/cube            | `#up` `#down` `#north` `#south` `#east` `#west` |
| block/cube_all        | `#all`                                          |
| block/cube_bottom_top | `#top` `#bottom` `#side`                        |
| block/cube_column     | `#end` `#side`                                  |
| block/cube_top        | `#top` `#side`                                  |

There are more than these ones, but in majority of the cases these will be enough.  

&nbsp;

Let's use the `block/cube` model to see how a model specifying a texture for each side will look like
```json
{
    "parent": "block/cube",
    "textures": {
        "down": "minecraft:block/dirt",
        "up": "minecraft:block/tnt_top",
        "north": "minecraft:block/diamond_block",
        "east": "minecraft:block/gold_block",
        "south": "minecraft:block/diamond_block",
        "west": "minecraft:block/gold_block"
    }
}
```

And this is what our block looks like ingame
![](cursed_block_ingame.png)

&nbsp;

Worth mentioning is also the `block/cross` model, which is mostly used for making flowers and similar vegetation. Let's take a look at an example from my Tropicraft mod.  
```json
{
  "parent": "minecraft:block/cross",
  "textures": {
    "cross": "tropicraft:block/bamboo_shoot"
  }
}
```
Here you can see the texture and the resulting block ingame:  
![](bamboo_shoot_256.png) ![](bamboo_shoot_ingame.png)


### Advanced Block Models
*TODO*

### Default StationAPI Block Model Parents
These models can also be found [here](https://github.com/ModificationStation/StationAPI/tree/master/station-renderer-api-v0/src/main/resources/assets/minecraft/stationapi/models/block)

`block/block`  
`block/cross`  
`block/cube`  
`block/cube_all`  
`block/cube_bottom_top`  
`block/cube_column`  
`block/cube_column_horizontal`  
`block/cube_column_mirrored`  
`block/cube_directional`  
`block/cube_mirrored`  
`block/cube_mirrored_all`  
`block/cube_top`  
`block/orientable`  
`block/orientable_with_bottom`  
`block/tinted_cross`  

### External Resources
[Minecraft Wiki/Tutorials/Models](https://minecraft.wiki/w/Tutorials/Models) - Due to StationAPI using the modern specifications for models, this tutorial on the Minecraft Wiki is mostly applicable to it

**Examples :**  
[StationAPI Test Mod Block Models](https://github.com/ModificationStation/StationAPI/tree/master/src/test/resources/assets/sltest/stationapi/models/block)  
[Tropicraft Block Models](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/resources/assets/tropicraft/stationapi/models/block)  
[BetterNetherBeta Block Models](https://github.com/paulevsGitch/BetterNetherBeta/tree/stapi-2.0/src/main/resources/assets/bnb/stationapi/models/block)  