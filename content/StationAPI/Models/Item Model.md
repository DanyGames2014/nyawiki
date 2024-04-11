Item Models are used to specify a texture, rotation, translation (in space, not the language one) and scaling for an item. The minimum for any model is a parent model, the default supplied ones are listed in [[Item Model#Default StationAPI Item Model Parents]], or you can use any other item model or a block model (this is what it is usually done for block items) as a parent.

This is an example of a basic item model which only specifies a parent :
```json
{  
  "parent": "<parent>"
}
```

Some models we could use as a parent are :  
`item/generated` - The default item/generated is the most basic item model, it is what most of the items in the game use, in this case there would be no texture because the model itself doesn't specify one  
`minecraft:item/diamond` - This specifies the default minecraft diamond item model as our parent which will make our item look exactly as a Diamond  
`examplemod:item/example_item` - This specifies the item model of `example_item` as the parent of our model, this will make our item look exactly as the Example Item  
`examplemod:block/example_block` - This will specify the **block** model of `example_block` as the parent of our item, which means that the item will look as a block item, think of Dirt block item for example, just a standard block.

> [!info] Note: You do not have to specify `minecraft` as the namespace, if there is no namespace then the minecraft namespace is used. This means that the first example will be interpreted as `minecraft:item/generated`

### Adding Texture
Now its time to add a texture to our item, but first we need to understand the concept of layers, most items are just a single layer texture, but StationAPI allows you to "composite" an item texture from multiple layers. The advantage of layers is that they can be individually colorized.  

Let's take an example from my SpawnEggs mod where the first texture is the layer 0, the second one is layer 1 and third one is layer 2 and they get "composited" into the 4th texture and that is what the player sees. As a result I am able to individually colorize the different parts of the spawn egg. If you want to take a look at the files for the spawn egg yourself you can look [here for the model json](https://github.com/DanyGames2014/spawneggs/blob/master/src/main/resources/assets/spawneggs/stationapi/models/item/spawn_egg.json), [here for the textures](https://github.com/DanyGames2014/spawneggs/tree/master/src/main/resources/assets/spawneggs/stationapi/textures/item) and [here for how the individual layers are colorized](https://github.com/DanyGames2014/spawneggs/blob/master/src/main/java/net/danygames2014/spawneggs/events/init/TextureListener.java) under the `registerSpawnEggColors` method

![[outer.png]] ![[inner.png]]![[inner-overlay.png]]![[composited_texture.png]]

First lets take a look at a texture with a single layer, as our parent we will be using `item/generated` as that is the most basic parent. Notice how the texture uses layer0, so it will be a simple single layer texture  

```json
{  
  "parent": "item/generated",  
  "textures": {  
    "layer0": "examplemod:item/example_item"  
  }  
}
```

Same as models, when addressing texture we start with the namespace of where we are looking for the texture, in this case it will be our Example Mod, after a namespace we then separate the namespace and the texture path with a colon ( : ). The example model layer0 texture will point to `src/main/resources/assets/examplemod/stationapi/textures/item/example_item.png` in our project directory.

&nbsp;

Now lets look at how we would add more layers :
```json
{  
  "parent": "item/generated",  
  "textures": {  
    "layer0": "examplemod:item/example_item_layer0",
    "layer1": "examplemod:item/example_item_layer1"
  }  
}
```
As you can see, adding another layer is as simple as adding another entry under `textures` with the name `layerN` where the N is the number of our layer, starting at zero. This model will composite the `example_item_layer0.png` and `example_item_layer1.png` textures and the resulting texture will be the texture for our item.

> [!info] Note: StationAPI allows loading HD textures, just thought I might mention it since it isn't inmediately obvious :-)

### Default StationAPI Item Model Parents
These models can also be found [here](https://github.com/ModificationStation/StationAPI/tree/master/station-renderer-api-v0/src/main/resources/assets/minecraft/stationapi/models/item)

`item/generated`  
`item/handheld`  
`item/handheld_rod`

### External Resources
[Minecraft Wiki/Tutorials/Models](https://minecraft.wiki/w/Tutorials/Models) - Due to StationAPI using the modern specifications for models, this tutorial on the Minecraft Wiki is mostly applicable to it

**Examples :**
[StationAPI Test Mod Item Models](https://github.com/ModificationStation/StationAPI/tree/master/src/test/resources/assets/sltest/stationapi/models/item)  
[Tropicraft Item Models](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/resources/assets/tropicraft/stationapi/models/item)  
[BetterNetherBeta Item Models](https://github.com/paulevsGitch/BetterNetherBeta/tree/stapi-2.0/src/main/resources/assets/bnb/stationapi/models/item)  


### TODO
*TODO: Explain display*
*TODO: Add pictures to compare the different default models*
*TODO: Just in general.. add pictures*