This page shows the step-by-step creation process using an example from the test mod which can be copied and converted into any multiblock.
## Setup requirements
Multiblocks are a shaped recipe and therefore need to be added as recipes into a RecipeListener. How a RecipeListener works and how it can be created is explained [here](Code%20Driven%20Recipes.md).
## Creating the recipe itself
### Multiblock layers
The first part of a multiblock recipe is its layers. Layers are two-dimensional and therefore need to be stacked on top of each other in order to form a three-dimensional shape. Each layer is put together using strings which represent linear slices of a layer. The order of the layers is **bottom to top**, so the first layer in the code is the lowest one and the last layer is the highest one. Each character in the string represents a different block which is specified in the next step. Blank spaces are used to indicate air blocks. The following example can be used to figure out the syntax of the layer code:
```java
List<String[]> testMultiblockLayers = List.of(
    new String[]{"  xxx", "  xgx", "  xxx", "x---x", ".   .", ".   .", ".   .", "x---x"},
    new String[]{"  xyx", "  xxx", "  xxx", "i   i", "     ", "     ", "     ", "i   i"},
    new String[]{"  xxx", "  pxf", "  xxx", "i   i", "     ", "     ", "     ", "i   i"},
    new String[]{"     ", "     ", "     ", "i   i", "     ", "     ", "     ", "i   i"},
    new String[]{"     ", "     ", "     ", "x---x", ".   .", ".   .", ".   .", "x---x"}
);
```
### Block pattern entries
Block pattern entries are objects containing all important information for a recipe to associate the characters in the layers with specific blocks and to determine the item shown in the block requirements list. The object requires 4 parameters:
```java
new BlockPatternEntry(1, 2, 3, 4);
```
1. Character to be associated with the block, written with Java character syntax where 'c' is a valid example of character syntax.
2. A BlockState, in this case the default state of the block used in the recipe, such as `Block.LOG.getDefaultState()`.
3. The metadata value of the block. This can be relevant to distinguish between differently coloured wool for example.
4. The ItemStack used for the block requirement list. It is very important to use the item of a block to prevent a bug caused by mismatching block and item IDs which are always separated in Station API. A valid example would be `new ItemStack(Block.LOG.asItem())`.
All of these block pattern entries are put into a list, blank spaces do not need to specified due to them being interpreted as air by default. The order does not matter in this case. The list from the test multiblock can be used for reference:
```java
List<BlockPatternEntry> testMultiblockPatterns = List.of(
    new BlockPatternEntry('x', Block.LOG.getDefaultState(), 0, new ItemStack(Block.LOG.asItem())),
    new BlockPatternEntry('y', Block.FURNACE.getDefaultState(), 2, new ItemStack(Block.FURNACE.asItem())),
    new BlockPatternEntry('g', Block.CHEST.getDefaultState(), 0, new ItemStack(Block.CHEST.asItem())),
    new BlockPatternEntry('p', Block.GRASS_BLOCK.getDefaultState(), 0, new ItemStack(Block.GRASS_BLOCK.asItem())),
    new BlockPatternEntry('f', Block.CRAFTING_TABLE.getDefaultState(), 0, new ItemStack(Block.CRAFTING_TABLE.asItem())),
    new BlockPatternEntry('i', Block.WOOL.getDefaultState(), 0, new ItemStack(Block.WOOL.asItem())),
    new BlockPatternEntry('-', Block.WOOL.getDefaultState(), 2, new ItemStack(Block.WOOL.asItem())),
    new BlockPatternEntry('.', Block.WOOL.getDefaultState(), 1, new ItemStack(Block.WOOL.asItem()))
);
```
### Multiblock description
The description is the simplest of the four parts, it is a list of strings where each string represents a new line. In the case of the test multiblock, the following description is used:
```java
List<Object> testDescription = new ArrayList<>() {
    {
        this.add("Test Block");
        this.add("A test block for testing tests!");
        this.add("This is it, you can stop reading now.");
        this.add("Bielefeld does exist.");
    }
};
```
The inner pair of squiggly brackets **must** be added to prevent the Java compiler from messing up the syntax interpretation.

### Registering the multiblock
The final step is to register all the previously created objects to add the multiblock into the game. The registry is done using a single line of code with the following parameters:
```java
MultiBlockRecipeRegistry.INSTANCE.addMultiblockRecipe(1, 2, 3, 4);
```
1. A String with the translation key used to determine the multiblock name. The translation key is specified in the lang file just like any other translation key.
2. The object containing the description of the multiblock.
3. The object containing the layers of the multiblock.
4. The object containing the block patterns of the multiblock.
An example from the test multiblock can be seen below:
```java
MultiBlockRecipeRegistry.INSTANCE.addMultiblockRecipe("multiblock.multiblocktab.test", testDescription, testMultiblockLayers, testMultiblockPatterns);
```
The multiblock can then be found by looking for the recipe uses of any block in the recipe. Clicking through the recipe categories in the GUI should eventually lead to the multiblock.