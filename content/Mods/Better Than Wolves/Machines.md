## All the machines ##
### Mill stone ###
The first needed machine. It slowly converts resources into milled materials and ejects them on the side. It can be powered from top and bottom with axles are from the side using a hand crank. Its main use is for producing hemp fiber. There are some special cases as well. Grinding netherrack creates ghast screaming sounds. Grinding a companion cube creates wolf noises alongside particles and drops.

### Cauldron ###
Used for cooking various materials. It can turn mutliple inputs into a single output. Requires fire below to function. Putting dung into the cauldron converts all food into foul food. The cauldron has recipes that require stoked fire.

### Saw ###
Cuts wood into all sorts of components. Needs to be powered by rotational force. Can be powered from all sides except the front. Saws can also hurt mobs and players and slice companion cubes into slabs.

### Turntable ###
Rotates blocks in different ways. Requires rotational force from below. The turntable has 4 different rotation speeds and can be reversed using redstone. Adding redstone torches to a block on top of the turntable creates a very reliable redstone clock. The turntable can craft clay blocks into various types of pottery.

### Hopper ###
Automatically collects items. Can transport and process items when powered. There in an input slot for a filter. The filter can be used for basic item sorting as well as soul filtering. A soul filter turns ground netherrack into hellfire dust. The process fills up the filter with souls. Once the filter is too full, the souls form into a ghast and blow up the hopper.

### Bellows ###
Bellows are used to create stoked fire and to clean up soul filters. They require rotational force from the backside. This machine is unique as it needs pulses of rotational force to function. It folds together when powered and unfolds without power. This means that a turntable redstone clock or similar contraption is needed to automate bellows.

### Hibachi ###
A fire source that can be controlled with redstone. It is the only source powerful enough to create stoked fire. This makes it a key requirement for more advanced crafting processes.

### Kiln ###
A structure built from 1 brick at the bottom, 3 bricks surrounding an air block in the middle, and 1 block on top. It needs stoked fire to function. The kiln is required to burn pottery. The crucible is obtained this way. Pottery visually changes while being processed which is useful to find out if the kiln is working. Finished pots drop as items.

### Crucible ###
The crucible is an alloy forge and tool recycling machine. It requires stoked fire to function. It can smelt steel from iron ingots, concentrated hellfire, and coal dust.

### Anvil ###
Similar to a crafting table but expanded to a 5x5 crafting grid. Used for crafting steel tools and armour. It is affected by gravity and can hurt players and mobs.

## Create custom features using the API ##
### Custom recipes ###
Crafting machines have their own registries which means mods can add new recipes for those machines. They are automatically displayed in How Many Items. Some recipes contain additional parameters to allow for more specific functionality.

### Bellow blowing###
There is an interface which lets bellows affect blocks. This interface makes it possible to add new block interactions with a lot of creative freedom.

### Hibachi ignition ###
The hibachi has an interface for blocks with custom ignition logic. This can be used to ignite other blocks using a hibachi.
