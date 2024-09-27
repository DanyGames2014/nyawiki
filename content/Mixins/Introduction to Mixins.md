Mixins are a way of modifying the base game code in the Fabric modding landscape and replacing the old approach of editing base classes used with MCP. Instead of shpping an edited class we target a piece of code in the vanilla game and **mix in**to it.  

### Advantages of Mixins  
- Compatibility between mods - multiple mods can target the same class, or even the same method call, and if the mixins are written correctly, all these mods can coexist together, modifying the same piece of vanilla code  
- Actually legal distribution - since we are no longer shipping a modified vanilla class, only a set of patches for it, we are no longer breaking Mojang's copyright and can distribute our mod on platforms like Modrinth  
- Improved user experience - the user doesn't have to think if they have to put the mod in jar or in mods folder, with Fabric, everything goes into the mods folder, including mixins which are packaged inside of the mod jar  

To start with Creating Mixins, head over to [Creating a Mixin](Creating%20a%20Mixin.md)