Properties are per-block values stored in the [Block State](Block%20State.md) of each block. Properties can be of various types and are mostly used to change block appearance or store simple state to avoid having to use Block Entities.  

To use Properties we create a `public static final` field in our Block class of the type of the property we want to use, let's use a boolean property for now, but the principles apply to all property types.  

### Adding Properties

Let's create our Block class first:  
```java
public class ExampleBlockWithProperty extends TemplateBlock {  
	public ExampleBlockWithProperty(Identifier id, Material mat) {  
		super(id, mat);  
	}  
}
```

Now we add the property to it and append it by overriding the `appendProperties` method, lets name our property `angry`  
```java
public class ExampleBlockWithProperty extends TemplateBlock { 
	public static final BooleanProperty ANGRY = BooleanProperty.of("angry");

	public ExampleBlockWithProperty(Identifier id, Material mat) {  
		super(id, mat);  
	}
	
	@Override  
	public void appendProperties(StateManager.Builder<Block, BlockState> builder) {
	    builder.add(ANGRY);  
	    super.appendProperties(builder);  
	}
}
```

Now when we launch the game we can verify that the block carries the property by placing it and pointing at it with the F3 Debug Menu open  
![](property_in_debug_menu.png)

You can see that the default state is for our property is `true`, we can change the default state when placed by overriding the conveniently named `getPlacementState()` method and adding our own desired values to it  

```java
@Override  
public BlockState getPlacementState(ItemPlacementContext context) {  
    return getDefaultState().with(ANGRY, false);  
}
```

It is important that you first get the default state which will contain the Block, Meta and Properties from the parent and then you add your properties to it. The with method kinda works like if you said "okay I want this block but **with** this property".  

Now when we launch the game and place down the block it is no longer angry :)
![](no_longer_angry_in_debug_menu.png)

&nbsp;  
You can ofcourse specify the default state according to some conditions, for this the `getPlacementState` provides plenty of information about the context of the placement
![](placement_context_methods.png)
(Screenshot from IntelliJ with the methods you can use on the placement context)  

&nbsp;  
Let's use this to make the block angry if the player is crouching while placing it
```java
@Override  
public BlockState getPlacementState(ItemPlacementContext context) {  
    if(context.getPlayer().isSneaking()){  
        return getDefaultState().with(ANGRY, true);      
    }  
    return getDefaultState().with(ANGRY, false);  
}
```

Now when we open up the game and place the block down it won't be angry, but if we crouch and place it, it will be angry.

### Accessing Properties
Let's say we have made the block which has the `angry` property, and we need to access it, all we need for that is either the [Block State](Block%20State.md) OR the block coordinates and reference to the `World` that the block is in.  

Let's create an Item which can read if the block is angry or not, if you want to read more about how to create an Item, you can head to [Adding an Item](Adding%20an%20Item.md).  
```java
public class AngryBlockDetector extends TemplateItem {  
    public AngryBlockDetector(Identifier identifier) {  
        super(identifier);  
    }  

	// This gets called when the player right clicks a block with the item
    @Override  
    public boolean useOnBlock(ItemStack stack, PlayerEntity player, World world, int x, int y, int z, int side) {  
	    // We get the blockstate at the coordinates the player clicked
        BlockState state = world.getBlockState(x, y, z);  
        
		// We check if the block clicked is of the same type as the Example Block With Property, if not then reading the property would cause a crash
        if(state.isOf(ExampleMod.exampleBlockWithProperty)){  
        
	        // If the block is of the correct type we read the property
            boolean isAngry = state.get(ExampleBlockWithProperty.ANGRY);
            
            // Now we send a chat message to the player that tells them if the block is angry or not
            if(isAngry){  
                player.sendMessage("The Block do be angry");  
            }else {  
                player.sendMessage("This block is chill");  
            }  
            return true;  
        }  
        return false;  
    }  
}
```
 

>[!warning] If you try to access a property which is not present on the block, the game will crash  

&nbsp;  
### Property Types
These can also be found [here](https://github.com/ModificationStation/StationAPI/tree/master/station-flattening-v0/src/main/java/net/modificationstation/stationapi/api/state/property)  
##### Boolean Property
Valid values: `true` `false`  

##### Direction Property
Valid values: `up` `down` `east` `west` `north` `south`  

##### Enum Property
Valid values: Any value of the chosen Enum  

##### Int Property
Valid values: Any value between the chosen min and max  