### Entrypoints
Entrypoints are classes which will be scanned for `@EventListener` and `@Entrypoint` annotations which will be used to call your mod initialization methods, event handlers etc.

StationAPI provides few basic entrypoints by itself:  
`stationapi:event_bus`  
`stationapi:event_bus_client`  
`stationapi:event_bus_server`  

The first Event Bus is the main StationAPI event bus while the other 2 are sided versions of it, which means that they will only get scanned on their respective side, so an event listener placed under the `stationapi:event_bus_client` entrypoints will only get scanned when runnin on client and it will be ignored when on server.  

To register a class as an entrypoint you need to go to the fabric.mod.json located at `<project directory>/src/main/resources/fabric.mod.json` and under the entrypoint you want to register your class to you write a full path to it, the result can look something like this  
```json
"entrypoints": {
    "stationapi:event_bus": [
      "net.danygames2014.examplemod.ExampleMod",
      "net.danygames2014.examplemod.event.ExampleEventListener"
    ],
    "stationapi:event_bus_client": [
	    "net.danygames2014.examplemod.evenet.ExampleTextureListener"
    ],
    "stationapi:event_bus_server": [
	    "net.danygames2014.examplemod.event.ExampleCommandListener"
    ]
},
```
Now that you have registered your classes, they will be scanned for Event Listeners and Utility Fields on startup
### Events
Events are used for various things from content registration on startup to manipulating the block breaking speed. The basic concept of events is that you specify what event you want to listen to and then if the event occurs, all listeners of that event get called. Let's take a look at an example where we listen to the `InitEvent` and print out a message  

```java
public class ExampleEventListener {
	@EventListener  
	public void listenToInit(InitEvent event) {  
	    System.out.println("Init Event has been called!");
	}
}
```

Sometimes the event might carry some useful references or context in the in this case `event` field.    
For example, the ItemRegistryEvent carries a reference to the ItemRegistry.

### Utility Fields
Utility Fields are mostly used to have an easy access to your mods namespace and logger, on startup these values will be set to their respective values, let's look at an example.  

```java
public class ExampleMod {
	@Entrypoint.Namespace  
	public static final Namespace NAMESPACE = Null.get();  
  
	@Entrypoint.Logger  
	public static final Logger LOGGER = Null.get();

	@Entrypoint.Instance
	public static final ExampleMod INSTANCE = Null.get();
}
```

When the entrypoints are discovered, fields annotated like this will be set to their values :  
`@Entrypoint.Namespace` - This will be set to the Namespace that was specified in the `fabric.mod.json`, this is mostly used to get registry names with your namespace by calling for example `NAMESPACE.id("example_block")`

`@Entrypoint.Logger` - This will be set to a Logger with your namespace as the logger name, this is to make it easier to distinguish which mod logged each message  

`@Entrypoint.Instance` - This will be sed to the entrypoint's class instance

>[!info] The `Null.get()` isn't necessary, you can just leave the fields uninitialized, but IntelliJ will scream that the fields will produce a NullPointerException because it doesn't know that they will be later set with reflection. It is is only there to make IntelliJ believe that everything is fine and it doesn't have to raise a warning.

### External Resources
[StationAPI Wiki/Entrypoints](https://github.com/ModificationStation/StationAPI/wiki/Entrypoints) - The official StationAPI documentation on Entrypoints, Events and Utility Fields  
[StationAPI Wiki/Init Event Order](https://github.com/ModificationStation/StationAPI/wiki/Init-order) - Documents the order in which events are called during game startup
[Fabric Wiki/Entrypoints](https://fabricmc.net/wiki/documentation:entrypoint) - This is mostly useful for when you want to read up on the subject as there are some differences between StAPI and Fabric entrypoints
