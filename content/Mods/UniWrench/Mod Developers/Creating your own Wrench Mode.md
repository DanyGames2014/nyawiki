Wrench modes are useful for mods which require additional function from their wrenches and want to separate those functions. By default the mod ships with a `Wrench` and a `Rotate` mode, this should be enough for 99% of the mods out there.  

## Registering your own wrench modes
To register your own wrench mode, listen to the `WrenchModeRegistryEvent` and initialize your wrench modes like you would do when registering blocks.

```java
public class WrenchModeListener {  
    @Entrypoint.Namespace  
    public static final Namespace NAMESPACE = Null.get();  

	public static WrenchMode exampleWrenchMode;
	
    @EventListener 
    public void registerWrenchModes(WrenchModeRegistryEvent event) {  
        exampleWrenchMode = new WrenchMode(NAMESPACE.id("example"));  
    }  
}
```

&nbsp;  
## Adding your wrench mode to the Universal Wrench
By default, your wrench mode won't be added to any wrench. It is up to you to add it to the default Universal Wrench, your own wrench, or both.

To add it to the Universal Wrench, listen to the `UniversalWrenchModeEvent` event and call the `addWrenchMode(WrenchMode)` method on it

```java
@EventListener  
public void addWrenchModes(UniversalWrenchModeEvent event){  
    event.addWrenchMode(exampleWrenchMode);  
}
```

> [!note] Please be responsible while doing this, adding unnecessary wrench modes which only have a very specific occasional usecase could lead to the default wrench being really cluttered, please first try to make use of the default modes provided