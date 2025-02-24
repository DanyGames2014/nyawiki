In this tutorial you will learn how to add a block to the game, as well as texture and localize it. StationAPI provides templates for pretty much any block type present in the vanilla game, such as chests, dirt etc.  

When creating your Block, using a template might be sufficient, but if you want to alter the behaviour of the Block you will need to extend one of the Templates. We will go over both ways as the only difference is that when creating a custom block you initialize that instead of a template you are extending.  

## Creating the Block  
### 1. Creating our own Block class (Optional)  
First we need to decide what Block we want to extend, for the purposes of this tutorial we will be extending the base block. Let's create a new class that extends `TemplateBlock` and implement the constructor.  

[src/main/java/net/danygames2014/examplemod/block/ExampleBlock.java](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/java/net/danygames2014/examplemod/block/ExampleBlock.java)
```java
public class ExampleBlock extends TemplateBlock {  
    public ExampleBlock(Identifier identifier, Material material) {  
        super(identifier, material);  
    }  
}
```

We can specify the material right in the block so we don't have to specify it when instantiating the block, let's also change other things about the block, like the dropped item id and removing its entity collision.  

```java
public class ExampleBlock extends TemplateBlock {  
    public ExampleBlock(Identifier identifier) {  
        super(identifier, Material.SAND);  
    }  
  
    // Make the block drop 4 sticks  
    @Override  
    public int getDroppedItemId(int blockMeta, Random random) {  
        return Item.STICK.id;  
    }  
  
    @Override  
    public int getDroppedItemCount(Random random) {  
        return 4;  
    }  
  
    // Return no collision shape => entities won't collide with it  
    @Override  
    public Box getCollisionShape(World world, int x, int y, int z) {  
        return null;  
    }  
}
```

&nbsp;  

### 2. Instantiating the Block  
Now to actually register the Block we need to instantiate it in the `BlockRegistryEvent`. We will create a new Event Listener and register the class as an entrypoint, to learn more about how to do that, head to [Entrypoints & Events](Entrypoints%20&%20Events.md).  
```java
public class ExampleMod {  
	// Namespace Utility Field
    @Entrypoint.Namespace  
    public static Namespace NAMESPACE;
  
    // A static object holding our bock 
    public static Block exampleBlock;  

	// An event listener listening to the BlockRegistryEvent
    @EventListener  
    public void registerBlocks(BlockRegistryEvent event) {  
        exampleBlock = new ExampleBlock(NAMESPACE.id("example_block")).setTranslationKey(NAMESPACE, "example_block"); 
    }
}
```

The resulting identifier of this block will be `examplemod:example_block` and the translation key will be `tile.examplemod.example_block.name`  
  
&nbsp;  

### 3. Localizing the Block  
Notice the `setTranslationKey` method, you can use multiple ways to set the translation key:  
`setTranslationKey(String key)` - This just sets the raw translation key to the input value
`setTranslationKey(Identifier translationKey)` - Uses the Identifier to construct a translation key  
`setTranslationKey(Namespace namespace, String translationKey)` - Constructs the translation key from the namespace and the translationKey  

After you've set the translation key in code you will need to specify a localization for it, you can read more about this in [Language File](Language%20File.md)  

We will add the following key and its localization to our language file, in the case of the example mod that is at : [resources/assets/examplemod/stationapi/lang/en_US.lang](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/resources/assets/examplemod/stationapi/lang/en_US.lang)

```properties
tile.@.example_block.name=Example Block
```

or  

```properties
tile.examplemod.example_block.name=Example Block
```

Both will have the same result  

&nbsp;  

### 4. Texturing the Block
There are 2 way to texture a block, using the data driven StationAPI [Block Models](Block%20Model.md) or by using the Vanilla renderer. For both we will need a texture first, the texture needs to be in a PNG format. We will place the texture in `resources/assets/<modid>/stationapi/textures/block`, you can look at [Project Structure](Project%20Structure.md) for an example structure. Let's name our texture `example_block.png`  
I would recommend sticking with the Block Models, but vanilla renderer sometimes does come in handy.

#### 4.1 StationAPI Block Models
The usage of block models is described in detail in [Block Model](Block%20Model.md), so we will only briefly go over it.  
Models can be defined for each combination of block states, this is documented in the [Block State](Block%20State.md) page. We will keep things single and only have one model, we haven't specified any block states anyway.  

First we need to create a Block Model at `resources/assets/<modid>/stationapi/models/block/<model_name>.json`, for our example block I will place it at [resources/assets/examplemod/stationapi/models/block/example_block.json](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/resources/assets/examplemod/stationapi/models/block/example_block.json)  

```json
{
  "parent": "block/cube_all",
  "textures": {
    "all": "examplemod:block/example_block"
  }
}
```

>[!info] When specifying texture path we specify it relative to `resources/assets/<namespace>/stationapi/textures` and without the file extension

Now we need to create a blockstate json at `resources/assets/<modid>/stationapi/blockstates/<block_identifier>.json` to point at the model, since we are not dealing with block states, we will point *"all"* variants to out block model.   
In the case of the Example mod that file will be placed at [resources/assets/examplemod/stationapi/blockstates/example_block.json](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/resources/assets/examplemod/stationapi/blockstates/example_block.json)
```json
{
  "variants": {
    "": { "model": "examplemod:block/example_block" }
  }
}
```

>[!note] Unlike Item Models, the Block Model file name does not need to match the block identifier, however it is still usually a good practice.  This is because we point to the model path in our blockstate json which DOES need to match the block identifier.  

&nbsp;
#### 4.2 Vanilla Renderer
To set a texture using the Vanilla renderer you need to add the texture to atlas during the `TextureRegisterEvent`, subscribing to an event is documented in the [Entrypoints & Events](Entrypoints%20&%20Events.md) page.  

To add the texture to the atlas you need to get the terrain atlas and then call the `addTexture` method on it

[src/main/java/net/danygames2014/examplemod/event/TextureListener.java](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/java/net/danygames2014/examplemod/event/TextureListener.java)
```java
public class TextureListener {  
    @Entrypoint.Namespace  
    public static Namespace NAMESPACE;

	// A static int that will hold the texture id so we can later reference it from the block itself
    public static int exampleBlockTexture;  
  
    @EventListener  
    public void registerTextures(TextureRegisterEvent event) {  
        // Get the atlas and store it in a field, this is not necessary but will come in handy when you are adding multiple textures
        ExpandableAtlas terrainAtlas = Atlases.getTerrain();  

		// Add the texture to the atlas and store the texture id that gets returned into our static field
        exampleBlockTexture = terrainAtlas.addTexture(NAMESPACE.id("block/example_block")).index;  
        
        // We can now directly set the texture id to the block
        ExampleMod.exampleBlock.textureId = exampleBlockTexture;  
    }  
}
```

Altho we can just set the texture id of the block, that doesn't really award us with the flexibility which is this approach's main benefit. A better way to do this is to override the `getTexture` method on our Block like this:  
```java
@Override  
public int getTexture(int side, int meta) {  
    if (meta != 0) {  
        return 4;  
    }  
      
    return switch (side) {  
        case 1 -> TextureListener.exampleBlockTexture;  
        case 2 -> 1;  
        case 3 -> 14;  
        default -> 0;  
    };  
}
```

While this method is just some random garbage numbers i made up, you can probably see why this approach might come in handy :-)  

&nbsp;

## External Resources
[StationAPI Wiki/Blocks/Creating a block](https://github.com/ModificationStation/StationAPI/wiki/Creating-a-block)
[StationAPI Wiki/Renderer/Adding textures](https://github.com/ModificationStation/StationAPI/wiki/Adding-textures)

**Examples:**
Tropicraft [Blocks](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/java/net/danygames2014/tropicraft/block) [Initialization](https://github.com/DanyGames2014/Tropicraft/blob/master/src/main/java/net/danygames2014/tropicraft/Tropicraft.java#L168) [Blockstates](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/resources/assets/tropicraft/stationapi/blockstates) [Models](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/resources/assets/tropicraft/stationapi/models/block)  
Brick Forgery  [Blocks](https://github.com/Atilist/BrickForgery/tree/master/src/main/java/net/alternateadventure/brickforgery/blocks) [Initialization](https://github.com/Atilist/BrickForgery/blob/master/src/main/java/net/alternateadventure/brickforgery/events/init/BlockListener.java) [Blockstates](https://github.com/Atilist/BrickForgery/tree/master/src/main/resources/assets/brickforgery/stationapi/blockstates)  
Better Than Wolves  [Blocks](https://github.com/kozibrodka/BetterThanWolves/tree/master/src/main/java/net/kozibrodka/wolves/block) [Initialization](https://github.com/kozibrodka/BetterThanWolves/blob/master/src/main/java/net/kozibrodka/wolves/events/BlockListener.java) [Blockstates](https://github.com/kozibrodka/BetterThanWolves/tree/master/src/main/resources/assets/wolves/stationapi/blockstates) [Models](https://github.com/kozibrodka/BetterThanWolves/tree/master/src/main/resources/assets/wolves/stationapi/models/block)  
Better Nether Beta  [Blocks](https://github.com/paulevsGitch/BetterNetherBeta/tree/stapi-2.0/src/main/java/paulevs/bnb/block) [Initialization](https://github.com/paulevsGitch/BetterNetherBeta/blob/stapi-2.0/src/main/java/paulevs/bnb/block/BNBBlocks.java) [Blockstates](https://github.com/paulevsGitch/BetterNetherBeta/tree/stapi-2.0/src/main/resources/assets/bnb/stationapi/blockstates) [Models](https://github.com/paulevsGitch/BetterNetherBeta/tree/stapi-2.0/src/main/resources/assets/bnb/stationapi/models/block)  