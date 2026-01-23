Creating a capability requires creating a class that will define the mods which your capability will require, you then need to register this capability. Then you can provide implementations of this capability.  

## Creating the capability
In this example, we will be making a meowing capability for blocks:  

```java
public abstract class MeowBlockCapability extends BlockCapability {  
    public abstract void meow();  
}
```
> [!note] Since the capability class dictates an implementation, instead of directly implementing it, you should ideally make it, and its elements private, however this is not mandatory, just recommended for clarity.  

After creating the capability we need to register it, make a new event listener under the `nyalib:event_bus` entrypoint. Putting it under the NyaLib entrypoint ensures it won't get called with NyaLib not present, thus making it a soft dependency.  

In this entrypoint listen to the `BlockCapabilityClassRegisterEvent` (or the applicable Item or Entity variants).  
```java
public class CapabilityListener {  
    @EventListener  
    public void registerBlockCapabilityClass(BlockCapabilityClassRegisterEvent event) {  
        event.register(NyaLibTest.NAMESPACE.id("meow"), MeowBlockCapability.class);  
    }   
}
```
Keep in mind that you will have to use the same identifier as for the provider to link them together.  

## Creating the implementation
No we can create an implementation of our capability class, we will do this by extending our `MeowBlockCapability` and implementing the required method like so:  

```java
public class DefaultMeowBlockCapability extends MeowBlockCapability {  
    private final World world;  
    private final int x;  
    private final int y;  
    private final int z;  
  
    public DefaultMeowBlockCapability(World world, int x, int y, int z) {  
        this.world = world;  
        this.x = x;  
        this.y = y;  
        this.z = z;  
    }  
  
    @Override  
    public void meow() {  
        PlayerEntity player = world.getClosestPlayer(x, y, z, 10);  
          
        if (player != null) {  
            player.sendMessage("Meow!");  
        }  
    }  
}
```

## Providing the capability
Finally we need to create a provider that will be called when this capability is requested on a block. Keep in mind that multiple providers can provide the same capability, the order in which they are used depends on the order in which they have been registered.  

Start by creating a class that extends the `BlockCapabilityProvider<YourCapabilityType>`, you will then be prompted to implement methods, do so. You are then required to implement the `getCapability` method in which you either need to return the capability, or `null` if you are unable to provide it (for example if the block at those coordinates cannot do such capability).  

```java
public class DefaultMeowBlockCapabilityProvider extends BlockCapabilityProvider<MeowBlockCapability> {  
    @Override  
    public @Nullable MeowBlockCapability getCapability(World world, int x, int y, int z) {  
        BlockState state = world.getBlockState(x, y, z);  
          
        if (state.isOf(Block.IRON_BLOCK) || state.isOf(Block.GOLD_BLOCK) || state.isOf(Block.DIAMOND_BLOCK)) {  
            return new DefaultMeowBlockCapability(world, x, y, z);  
        }  
              
        return null;  
    }  
}
```

In this example the capability will only be created for Iron Blocks, Gold Blocks and Diamond Blocks, otherwise the provider will not provide the meowing capability.  

After creating the capability we need to register it, make a new event listener under the `nyalib:event_bus` entrypoint.  

In this entrypoint listen to the `BlockCapabilityProviderRegisterEvent` (or the applicable Item or Entity variants).  
```java
public class CapabilityListener {  
    @EventListener  
public void registerBlockCapabilityProvider(BlockCapabilityProviderRegisterEvent event) {  
    event.register(NyaLibTest.NAMESPACE.id("meow"), new DefaultMeowBlockCapabilityProvider());  
	}
}
```
Keep in mind that you will have to use the same identifier as for the capability to link them together.  

## The end result
To test out our new capability we can create a new `Item` and in its `useOnBlock` method we can fetch our capability and execute the `meow` method.  

```java
@Override  
public boolean useOnBlock(ItemStack stack, PlayerEntity user, World world, int x, int y, int z, int side) {  
    MeowBlockCapability meowCap = CapabilityHelper.getCapability(world, x, y, z, MeowBlockCapability.class);  
  
	if (meowCap != null) {  
	    meowCap.meow();  
	}
	
	return true;  
}
```

And now in game when we click a diamond block, it meows at us:  
![](meow_capability_in_action.png)