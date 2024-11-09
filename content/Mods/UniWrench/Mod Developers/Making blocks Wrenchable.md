Making your blocks wrenchable means that they will act on being wrenched, this can be done in 2 ways, one of them is simply implementing the `Wrenchable` interface on your block and the other involves registering methods that will get called when the specified block is wrenched.  

When a block is wrenched, the wrench first looks for if the Block is implementing the `Wrenchable` interface, after that it looks for the registered methods and lastly it triggers the wrenching method on the wrench itself, which is there for custom wrenches as it does nothing by default. If any of these return true, all subsequent actions will be ignored. If none of them return true, then the normal action for that block is carried out.

## Using the Wrenchable interface
To make your block wrenchable this way, simply implement the `Wrenchable` interface

```java
public class WrenchableBlock extends TemplateBlock implements Wrenchable {  
    public WrenchableBlock(Identifier identifier) {  
        super(identifier, Material.METAL);  
    }  
  
    @Override  
    public boolean wrenchLeftClick(ItemStack stack, PlayerEntity player, boolean isSneaking, World world, int x, int y, int z, int side, WrenchMode wrenchMode) { 
     
        return true;  
    }  
  
    @Override  
    public boolean wrenchRightClick(ItemStack stack, PlayerEntity player, boolean isSneaking, World world, int x, int y, int z, int side, WrenchMode wrenchMode) {  
    
        return true;  
    }  
}
```

>[!warning] This does make your mod be hard dependend on UniWrench

&nbsp;  
## Registering a wrenching method
A wrenching method has the same signature as the one in the `Wrenchable` interface  

To register a wrenching method you will have to listen to the `WrenchableBlockRegisterEvent` event and pass in a reference to your method like so.

```java
public class UniWrenchCompatListener {  
    @EventListener  
    public void registerCompat(WrenchableBlockRegisterEvent event){  
        event.registerRightClickAction(Block.WOODEN_STAIRS, VanillaCompat::rotateStairs);  
    }  
}
```

The first argument is the Block that this action will be carried for, the second one is the function that will be carried out.  
The function is a method with the following signature `(ItemStack stack, PlayerEntity player, boolean isSneaking, World world, int x, int y, int z, int side, WrenchMode wrenchMode)` which returns a `boolean` that reports back on if the action was succesfull.

>[!hint] I would recommend just copying the method from the `Wrenchable` interface