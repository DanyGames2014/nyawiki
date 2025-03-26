In this tutorial you will learn how to add an item to the game, as well as texture and localization for it. StationAPI provides templates for pretty much any item type present in the vanilla game, such as food, tools etc.  

When creating items, some of these templates might actually be sufficient, other time you might wanna alter the behavior of the item in which we will extend the Template and add our required changes, we will go over both ways as after the item is initialized the procedure is the same.  

## Creating the Item
### 1. Creating our own Item class (Optional)
First we want to decide what Item we want to extend, we will just be extending the basic Item. So let's create a new class that extends `TemplateItem` and implement constructor.  

```java
public class ExampleItem extends TemplateItem {  
    public ExampleItem(Identifier identifier) {  
        super(identifier);  
    }  
}
```

We can then change the behavior of our item by overriding methods from the parent. Lets make our item deal over 9000 health points of damage. The result will look something like this :  

```java
public class ExampleItem extends TemplateItem {  
    public ExampleItem(Identifier identifier) {  
        super(identifier);  
    }  
  
    @Override  
    public int getAttackDamage(Entity attackedEntity) {  
        return 9001;  
    }  
}
```

### 2. Instantiating the Item
Now we will want to instantiate our Item in the `ItemRegistryEvent`. We will create a new Event Listener and register the class as an entrypoint, to learn more about how to do that, head to [Entrypoints & Events](Entrypoints%20&%20Events.md).

```java
public class ExampleMod {
	// Namespace Utility Field
	@Entrypoint.Namespace  
	public static Namespace NAMESPACE;

	// A static object holding our item
	public static Item exampleItem;

	// An event listener listening to the ItemRegistryEvent
	@EventListener  
	public void registerItems(ItemRegistryEvent event){
		// Instatiating the item object when the ItemRegistryEvent is fired
		exampleItem = new ExampleItem(NAMESPACE.id("example_item")).setTranslationKey(NAMESPACE, "example_item");
	}
}
```

> [!note] You can directly just instantiate a `new TemplateItem` if you are not planning on overriding any methods in your `Item` class. This can greatly reduce the amount of class clutter in your workspace.

Now when the game starts up the Event Listener will get triggered when the  `ItemRegistryEvent` gets fired and our item will be instantiated.  
### 3. Localizing the Item
Notice the `setTranslationKey` method, you can use multiple ways to set the translation key:  
`setTranslationKey(String key)` - This just sets the raw translation key to the input value
`setTranslationKey(Identifier translationKey)` - Uses the Identifier to construct a translation key  
`setTranslationKey(Namespace namespace, String translationKey)` - Constructs the translation key from the namespace and the translationKey  

After you've set the translation key in code you will need to specify a localization for it, you can read more about this in [Language File](Language%20File.md)  

We will add the following key and its localization to our language file, in the case of the examle mod that is at : `resources/assets/examplemod/stationapi/lang/en_US.lang`

```properties
item.@.example_item.name=Example Item
```

or  

```properties
item.examplemod.example_item.name=Example Item
```

Both will have the same result

### 4. Texturing the Item
There are 2 ways to texture an item, using the data driven StationAPI [Item Models](Item%20Model.md) or by using the Vanilla renderer.  For both we will need a texture first, the texture needs to be in a PNG format. We will place the texture in `resources/assets/<modid>/stationapi/textures/item/`, you can look at [Project Structure](Project%20Structure.md) for an example structure. Let's name our texture `example_item.png`  
I would recommend sticking with the Item Models as theyre more flexible.

#### 4.1 StationAPI Item Models
The usage of item models is described in detail in [Item Model](Item%20Model.md) so we will only briefly go over it. For items all you need is an item model file placed at `resources/assets/<modid>/stationapi/models/item/<item_name>.json`, so for our example item that will be located at `resources/assets/examplemod/stationapi/models/item/example_item.json`, and in this file we will specify our texture on the default layer0. 

```json
{  
  "parent": "item/generated",  
  "textures": {  
    "layer0": "examplemod:item/example_item"  
  }  
}
```

>[!info] When specifying texture path we specify it relative to `resources/assets/<namespace before colon>/stationapi/textures` and we do not specify the file extension

  &nbsp;
#### 4.2 Vanilla Renderer
To set the texture using the Vanilla renderer you need to set it in the `TextureRegisterEvent` event, ive gone over how to subscribe to an event in [Entrypoints & Events](Entrypoints%20&%20Events.md).   
To set a texture using this event you need to call the `setTexture` method on the item, the method takes a texture path as an argument. This is the same texture path as we would put into a model, only now we get it by calling the `Namespace.id` method and as an input we will put what we would put after the colon in a texture model.

```java
public class TextureListener {
    @Entrypoint.Namespace
    public static Namespace NAMESPACE;

    @EventListener
    public void registerTextures(TextureRegisterEvent event) {
        ExampleMod.exampleItem.setTexture(NAMESPACE.id("item/example_item"));
    }
}
```

This texture path will get resolved to `resources/assets/examplemod/stationapi/textures/item/example_item.png`

## External Resources
[StationAPI Wiki/Items/Creating an Item](https://github.com/ModificationStation/StationAPI/wiki/Creating-an-item)  
[StationAPI Wiki/Renderer/Adding textures](https://github.com/ModificationStation/StationAPI/wiki/Adding-textures)  

**Examples:**  
Brick Forgery [Items](https://github.com/Atilist/BrickForgery/tree/master/src/main/java/net/alternateadventure/brickforgery/items)  [Initialization](https://github.com/Atilist/BrickForgery/blob/master/src/main/java/net/alternateadventure/brickforgery/events/init/ItemListener.java)  
Tropicraft [Items](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/java/net/danygames2014/tropicraft/item)  [Initialization](https://github.com/DanyGames2014/Tropicraft/blob/master/src/main/java/net/danygames2014/tropicraft/Tropicraft.java#L141)  [Models](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/resources/assets/tropicraft/stationapi/models/item)   
StationAPI Test Mod [Items](https://github.com/ModificationStation/StationAPI/tree/master/src/test/java/net/modificationstation/sltest/item)  [Initialization](https://github.com/ModificationStation/StationAPI/blob/master/src/test/java/net/modificationstation/sltest/item/ItemListener.java)  [Models](https://github.com/ModificationStation/StationAPI/tree/master/src/test/resources/assets/sltest/stationapi/models/item)



