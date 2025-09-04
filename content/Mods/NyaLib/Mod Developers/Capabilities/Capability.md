Capabilities allow integrations between mods by implementing standardized set of methods without having to implement an interface or other means which would make the mod hard-depend on the given mod with that interface.  

## Types of capabilities
Currently NyaLib supports the following kinds of capabilities:
* Block *(Note: A block capability is actually implemented on the Block's Entity)*
* Item
* Entity

## Parts of the system
The Capability system is comprised of multiple parts:  

**Capability**  
A capability describes the ability of an block, item or entity to perform some tasks according to what the Capability class (for example: `EnergyStorageItemCapability`) defines.  

A capability class is an abstract class and it extends either the `BlockCapability`, `ItemCapability` or `EntityCapability` class and serves as a template of what the applicable target should be able to do, sort of like an interface.

**Capability Provider**
A capability provider's job is to provide an in instance of the given Block's, Item's or Entity's capability class.  

A capability provider extends either the `BlockCapabilityProvider`, `ItemCapabilityProvider` or `EntityCapabilityProvider` class.

**Capability Implementation**
A capability implementation is where the methods of the capability class get connected to the block/item/entity for which it is being implemented.  

A capability implementation extends the capability class it is implementing and contains the actual handling logic for the given target.

# TODO:
* Fetching capabilities
* Creating capabilities
* Implementing Capabilities