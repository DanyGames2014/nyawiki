## Fetching capabilities  
To fetch an capability, we need to know what capability we are fetching, for the purposes of this example we are gonna be fetching the Fluid Handler capabilities.  
In order to do this we can use the `CapabilityHelper` like so:  

```java
ItemHandlerBlockCapability itemHandlerBlock = CapabilityHelper.getCapability(world, x, y, z, ItemHandlerBlockCapability.class);

ItemHandlerItemCapability itemHandlerItem = CapabilityHelper.getCapability(itemStack, ItemHandlerItemCapability.class);

ItemHandlerEntityCapability itemHandlerEntity = CapabilityHelper.getCapability(entity, ItemHandlerEntityCapability.class);
```

> [!hint] Some capabilities like `ItemHandlerItemCapability` can be a bit confusing in their name, however NyaLib always follows the naming convention of `<capability_name><target_type>Capability` meaning for example the block version of this would be `ItemHandlerBlockCapability`  

## Using capabilities
After fetching the capability, we first need to null-check it, if there wasn't any capability found, the providers will return null. After that we use it by calling methods on the capability class returned.  

This is an example piece of code getting an `ItemHandler` capability of a block and then extracting and item from it and spawning it in world.  
```java
ItemHandlerBlockCapability cap = CapabilityHelper.getCapability(world, x, y, z, ItemHandlerBlockCapability.class);  
  
if (cap != null) {  
    ItemStack yoinkedStack = cap.extractItem(Direction.byId(side));  
  
    if (yoinkedStack != null) {  
        ItemEntity itemEntity = new ItemEntity(world, x, y, z, yoinkedStack);  
        world.spawnEntity(itemEntity);  
    }  
}
```
