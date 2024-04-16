In this tutorial you will learn how to add an item to the game, as well as texture and localization for it. StationAPI provides templates for pretty much any item type present in the vanilla game, such as food, tools etc.  

When creating items, some of these templates might actually be sufficient, other time you might wanna alter the behaviour of the item in which we will extend the Template and add our required changes, we will go over both ways as after the item is initialized the procedure is the same.  

### 1. Creating our own Item class (Optional)
First we want to decide what Item we want to extend, we will just be extending the basic Item. So let's create a new class that extends `TemplateItem` and implement constructor.  

```java
public class ExampleItem extends TemplateItem {  
    public ExampleItem(Identifier identifier) {  
        super(identifier);  
    }  
}
```

We can then change the behaviour of our item by overriding methods from the parent. Lets make our item deal over 9000 health points of damage. The result will look something like this :  

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

### 2. Instantiating our Item
Now we will want to instantiate our Item in the `ItemRegistryEvent`. We will create a new Event Listener and register the class as an entrypoint, to learn more about how to do that, head to [Entrypoints & Events](Entrypoints%20&%20Events.md).

```java
public class ExampleMod {
	@Entrypoint.Namespace  
	public static final Namespace NAMESPACE = Null.get();

	public static Item exampleItem;

	@EventListener  
	public void registerItems(ItemRegistryEvent event){
		exampleItem = new ExampleItem(NAMESPACE.id("example_item")).setTranslationKey(NAMESPACE, "example_item");
	}
}
```