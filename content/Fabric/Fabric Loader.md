Fabric loader is the mod loader we use to load mods in the Babric environment, this includes StationAPI which is also just a Fabric mod itself. It provides useful features for mods to use. More about the loader itself can be found in its [official documentation](https://docs.fabricmc.net/develop/loader/)  

## fabric.mod.json
fabric.mod.json is the standard metadata file that every Fabric mod needs to have in order to be loaded by Fabric Loader, it provides information about your mod such as your mod's id, version, name, description, authors, icon, environment its supposed to run in (such as any, or only on client/server), dependencies, entrypoints of your mod, configuration of mixins etc.  

The specification of the fabric.mod.json can be found in the [Fabric Documentation](https://docs.fabricmc.net/develop/loader/fabric-mod-json).  

## Mixins
Fabric Loader provides their own fork of SpongePowered's Mixin library, these can be used to manipulate the code of the game without access to the source. Nowadays Mixin Extras is also available in the base Fabric Loader for more Mixin annotations, some of which like @WrapOperation serve as a pretty much drop-in replacement for @Redirect but are compatible when multiple mods use them on the same call.  

You can read more about mixins [here](Introduction%20to%20Mixins.md).  

## Class Tweaking
Class tweaking provides powerful a collection of features for working with the game's code:

**Access Widening**  [official documentation](https://docs.fabricmc.net/develop/class-tweakers/access-widening)
Allows you to widen the access parameters of a class, method or a field, such as changing `private` to `public` or removing the `final` modifier.  

**Interface Injection**  [official documentation](https://docs.fabricmc.net/develop/class-tweakers/interface-injection)
Allows you to inject custom interfaces into the game's classes, effectively adding your own methods to them which you can then call on them. The implementation of these methods is then either governed by a default method in the interface or implemented inside a mixin.  

**Enum Extensions**  [official documentation](https://docs.fabricmc.net/develop/class-tweakers/enum-extension)
Allows you to add new entries to an existing enum in the game's code. Be careful with this, as code working with these enums might not expect your entries.  

More about Class Tweakers can be found in the [official documentation](https://docs.fabricmc.net/develop/class-tweakers/).  

## Entrypoints
Entrypoints are parts of your code which the will be used to "enter" your mod, typically these will be your mod's classes used to register content like blocks, items, configs etc. Your mods can also create their own custom entrypoints, this is used in StationAPI for its event buses but can also be useful for inter-mod compatibility where you might only wish for an entrypoint to be called if another mod is present like adding a new probe provider into [WhatsThis](modrinth.com/mod/whats-this).  

More about StationAPI specific entrypoints can be found [here](Entrypoints%20&%20Events.md).  

## Utilities in code
Fabric Loader can also be fetched and called in code such as seeing if we are in development environment, I have provided a few examples below, however there are many more things, I advise using your IDE's autocomplete feature to explore all of the functionality.  

```java
// Fetch the FabricLoader instance  
FabricLoader loader = FabricLoader.getInstance();  
  
// Checks if another mod with the given modid is loaded  
boolean isUniTweaksLoaded = loader.isModLoaded("unitweaks");  
  
// Checks if the game is running in a development environment  
boolean isDev = loader.isDevelopmentEnvironment();  
  
// Returns the type of enviornment the mod is running in.  
// This can be CLIENT or SERVER  
EnvType environment = loader.getEnvironmentType();  
  
// Returns the mod container of a single mod with the given modid  
// This returns an Optional<ModContainer>, this means we have to check if it is present before using it  
Optional<ModContainer> unitweaksContainerO = loader.getModContainer("unitweaks");  
if (unitweaksContainerO.isPresent()) {  
    ModContainer unitweaksContainer = unitweaksContainerO.get();  
      
    // Gets the name of the mod  
    String name = unitweaksContainer.getMetadata().getName();  
      
    // Gets the description of the mod  
    String description = unitweaksContainer.getMetadata().getDescription();  
}  
  
// Returns the ModContainers of all loaded mods  
// ModContainer is the result of parsins each mod's fabric.mod.json  
Collection<ModContainer> loadedMods = loader.getAllMods();
```