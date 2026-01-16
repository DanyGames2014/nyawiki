Capabilities allow integrations between mods by implementing standardized set of methods without having to implement an interface or other means which would make the mod hard-depend on the given mod with that interface.  

## Types of capabilities
Currently NyaLib supports the following kinds of capabilities:
* Block
* Item
* Entity

## Parts of the system
The Capability system is comprised of multiple parts:  

**Capability**  
A capability describes the contract of an block, item or entity to implement given methods according to what the Capability class (for example: `EnergyStorageItemCapability`) defines.  

A capability class is an abstract class and it extends either the `BlockCapability`, `ItemCapability` or `EntityCapability` class and serves as a template of what the applicable target should be able to do, serving a role very similar to an interface.

**Capability Provider**  
A capability provider's job is to provide an in instance of the given Block's, Item's or Entity's implementation of the capability class.  

A capability provider extends either the `BlockCapabilityProvider`, `ItemCapabilityProvider` or `EntityCapabilityProvider` class. As an input it receives the given Block, Item or Entity and its job is to return either an capability implementation if it can provide it, or null if it cannot.

**Capability Implementation**  
A capability implementation is where the methods of the capability class get connected to the block/item/entity for which it is being implemented.  

A capability implementation extends the capability class it is implementing and contains the actual handling logic for the given target, working as an adapter between the capability definition and the Block/Item/Entity itself.

**For further info on using and creating capabilities, please head to:**  
[Using capabilities](Using%20capabilities.md)  
[Creating Capabilities](Creating%20Capabilities.md)