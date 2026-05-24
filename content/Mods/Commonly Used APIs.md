# StationAPI  
**Source:** <https://github.com/ModificationStation/StationAPI>  
**Modrinth:** <https://modrinth.com/mod/stationapi>  

StationAPI is a general purpose modding API which provides many of the fundamental features required for adding content to the game, such as:  
* Loading of resources (textures, sounds, language files)  
* Modern JSON models for [blocks](Block%20Model.md) and [items](Item%20Model.md)  
* [Blocks](Adding%20a%20Block.md)  
* Block Entities  
* [Items](Adding%20an%20Item.md) & Item NBT  
* Armor  
* Tools  
* [Biomes](Adding%20a%20Biome.md)  
* Dimensions  
* World generation features  
* Entities  
* Screens and Screen Handlers  
* [Packets](Adding%20a%20Packet.md)  
* [Keybinds](Adding%20a%20Keybind.md)  
* [Recipes](Adding%20Recipes.md)  

It also flattens the save format allowing for virtually infinite block and item IDs. Guides on how to use StationAPI can be found in the StationAPI section of this wiki.  

# GlassConfigAPI  
**Source:** <https://github.com/Glass-Series/glass-config-api>  
**Modrinth:** <https://modrinth.com/mod/glass-config-api>  

GlassConfigAPI allows for easy creation of configs for your mod which are then stores in a YAML format in the config folder. Users can then edit those configs either thru editing the files directly or using the in-game config screen accessible via Mod Menu.  

The guide on how to use GlassConfigAPI can be found here: <https://github.com/Glass-Series/glass-config-api/blob/master/docs/Using.md>  

# NyaLib  
**Source:** <https://github.com/DanyGames2014/nyalib>  
**Modrinth::** <https://modrinth.com/mod/nyalib>  

NyaLib provides many features aimed at mod interoperability as well as features aimed at reducing developer pain. These features include:  
* [Generic Block Networks](Block%20Networks.md) - Keeping track of connected blocks of the same block network type, such as cables  
* [Capabilities](Capability.md) for Blocks, Items and Entities - Allowing implementation of standardized set of abilities on each of the supported types in a way that does not make the mod hard depend on each other. By default offers implementation of the energy, fluid and item APIs.  
* Energy API - A common energy API including an easy way of adding cables  
* Fluid API - A common fluid API with automatically handled and multiplayer synchronized fluid slots inside of screens  
* Item API - A common item API  
* Custom Crafting Return Stack - Allows for the specification of a custom crafting return `ItemStack` instead of just an `Item`  
* Server Driven Particles - Allowing the server to tell the client to spawn in any particle  
* [Block Templates](Block%20Templates.md) - Provides a way of creating stairs, slabs, fences, fence gates, buttons, walls, panes and pressure plates just by supplying a base block and a path to a texture  
* Slot Locking - Allows an item to lock the slot it is currently in or a slot to be locked  
* Structures - Adds structures which can be rotated and do collision checking before being placed into the world  
* Enhanced Placement Context Item - Allows your item to receive additional context when its being placed, mainly the hit vector  
* Voxel Shapes - Provides the ability for your blocks to have a custom shaped bounding box (the one that shows when you hover over a block)  
* Server Driven Sounds - Allowing the server to tell the client to play any sound or music track  
* Redstone Level - Allows blocks to supply any redstone level instead of just 0 or 15  
* Multipart - Allows the creation of multipart components which can be placed in any block space regardless of already existing blocks (think of microblocks)  

A guide on how to use NyaLib can be found [here](Mods/NyaLib/Mod%20Developers/Getting%20Started.md).  

# UniWrench  
**Source:** <https://github.com/DanyGames2014/UniWrench>  
**Modrinth:** <https://modrinth.com/mod/uniwrench>  

UniWrench allows for the creation of custom wrenches which can be used interchangeably between mods. As well as the creation of custom wrench modes. By default it adds the "Universal Wrench" item as a baseline wrench.  

Wrench modes, wrenches themselves and the wrenched blocks can all trigger an action when a block is wrenched, this follows the order of:  
* `Wrenchable` interface  
* Actions registered in the `WrenchableBlockRegistry`  
* Wrench Action  
* Wrench Mode Action  

Wrenches can also be locked from having their wrench mode switched and can have a delay between each wrenching action. While it has a wrench in the name it could also be used for other things such as magic wands etc.  

A guide on how to use UniWrench can be found in the [here](Mods/UniWrench/Mod%20Developers/Getting%20Started.md).  

# Accessory API  
**Source:** <https://github.com/matthewperiut/accessory-api>  
**Modrinth:** <https://modrinth.com/mod/accessory-api>  

Accessory API allows for the creation of custom accessories in the style of accessories from the Aether mod. These accessories support custom rendering and can affect the player they are worn by.  

The guide on how to use Accessory API can be found on its [Modrinth Page](<https://modrinth.com/mod/accessory-api>)