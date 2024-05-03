Keybinds allow you to listen to a keyboard input using user-configurable keys. To add a keybind you need to create a KeyBinding during the `KeyBindingRegisterEvent` event and then listen to its keycode in the `KeyStateChangedEvent` event. You can find a list of valid keycodes [here](https://legacy.lwjgl.org/javadoc/org/lwjgl/input/Keyboard.html#field_summary) or by doing `Keyboard.` in your IDE which should pop out a list of suggestions. Now let's look at how to add a keybind.

## Creating the keybind

### 1. Registering the keybind
First we need to register a keybind, that way it will be shown in the controls screen and saved in the options.txt file. To do that we need to listen to the `KeyBindingRegisterEvent` event and add our keybindings to the list accessible under the event called `keyBindings`

```java
public class KeybindListener {  
    // A static field holding the keybind so we can read its keycode from anywhere  
    public static KeyBinding exampleKeybind;  
  
    @EventListener  
    public void registerKeybinds(KeyBindingRegisterEvent event) {  
        // Initializing the keybind, the first argument is the translation key and the second is the default keycode  
        exampleKeybind = new KeyBinding("key.examplemod.example_keybind", Keyboard.KEY_H);  
  
        // Adding the keybind to the keybindings list  
        event.keyBindings.add(exampleKeybind);  
    }  
}
```

### 2. Localizing the keybind
We have created a keybind which can now be seen and reconfigured ingame, but it doesn't have any player visible name, to fix that we need to localize. To learn more about localizing you can head to [Language File](Language%20File.md)  

To localize the keybind we will need to add a new entry to the lang file with the translation key we specified in the first part when initializing the keybind, in the case of the example mod that is at : `resources/assets/examplemod/stationapi/lang/en_US.lang`  

We can use either
```properties
key.examplemod.example_keybind=Example Keybind
```
or
```properties
key.@.example_keybind=Example Keybind
```

> [!info] You can see that the translation key follows the format of `key.<namespace>.name` and we can either specify the namespace manually or use `@` and let StationAPI figure it out.  

&nbsp  
Now when we load up the game we will see that our keybind has loaded succesfully  
![](keybind_controls_menu.png)  
> [!warning] The vanilla controls screen doesn't handle many keybinds well and with a few extra keybinds they will start getting off the screen. You can use a mod like [UniTweaks](https://modrinth.com/mod/unitweaks) which implements a scrollable controls screen similar to the one implemented in Release 1.7

&nbsp  

## Listening to the Keybind
You can listen to the keybind pretty much anywhere, but you have to keep in mind that some methods might not be called often enough to catch a keypress and that you need to make sure you are only listening to keybinds on the client.  

The recommended way to listen to keybinds is thru the `KeyStateChangedEvent`, the event itself also provides us with the `environment` field which can be either `IN_GUI` or `IN_GAME`, you can probably infer what those mean.  

Let's make a simple key listener:

```java
@EventListener  
public void handle(KeyStateChangedEvent event) {  
    // Only do action if the key was pressed, not when its released  
    if (Keyboard.getEventKeyState()) {  
        // Check if our keybind has been triggered  
        if (Keyboard.isKeyDown(KeybindListener.exampleKeybind.code)) {  
            // Perform different actions based on if we are ingame or in gui  
            if (event.environment == Environment.IN_GAME) {  
                ExampleMod.LOGGER.info("INGAME");  
            } else if (event.environment == Environment.IN_GUI) {  
                ExampleMod.LOGGER.info("INGUI");  
            }  
        }  
    }  
}
```

> [!warning] Make sure to only register theses events (both registration and listening) on the `stationapi:event_bus_client` event bus, so it only runs on client

Now when we press the key we assigned we will receive output in the console based on if we are in game or in gui (like inventory, main menu, pause menu etc.)  

```log
[13:53:10] [Minecraft main thread/INFO] (examplemod|Mod) INGAME
[13:53:11] [Minecraft main thread/INFO] (examplemod|Mod) INGAME
[13:53:14] [Minecraft main thread/INFO] (examplemod|Mod) INGUI
```

Let's also look at the 2 methods from Keyboard we used:  
`Keyboard.getEventKeyState` - This method will return `true` if the key was pressed and `false` if it was released, we use this to only trigger action once on a keypress  
`Keyboard.isKeyDown(int keycode)` - This method will tell us if the key with the supplied keycode has been pressed  

## Accessing more context
Since we listen for the keypresses in a dedicated listener, the amount of stuff we can access is quite limited. This can however be solved using the `FabricLoader` as outlined [here](Fabric%20Loader.md). This will net us access to pretty much everything including the World and Player.

```java
// Check if we are on the correct "side"  
if(FabricLoader.getInstance().getEnvironmentType() == EnvType.CLIENT){  
    // Get the game instance and cast it to Minecraft  
    Minecraft client = (Minecraft)FabricLoader.getInstance().getGameInstance();  
  
    // Now we can access pretty much anything from the Minecraft main class  
    World world = client.world;  
    PlayerEntity player = client.player;  
}
```

## External Resources
[LWJGL Keycodes](https://legacy.lwjgl.org/javadoc/org/lwjgl/input/Keyboard.html#field_summary)  

**Examples:**  
UniTweaks [Keybinding Listener](https://github.com/DanyGames2014/UniTweaks/blob/master/src/main/java/net/danygames2014/unitweaks/tweaks/morekeybinds/KeyBindingListener.java) [Key Press Listener](https://github.com/DanyGames2014/UniTweaks/blob/master/src/main/java/net/danygames2014/unitweaks/tweaks/morekeybinds/KeyPressedListener.java)  
StationAPI Test Mod [Keybinding Listener](https://github.com/ModificationStation/StationAPI/blob/master/src/test/java/net/modificationstation/sltest/option/OptionListener.java#L9) [Key Press Listener](https://github.com/ModificationStation/StationAPI/blob/master/src/test/java/net/modificationstation/sltest/keyboard/KeyboardListener.java)