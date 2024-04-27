Code Driven Recipes in StationAPI can be registered using the conveniently named `RecipeRegisterEvent`, if you want to learn how to subscribe to an event you can go to [Entrypoints & Events](Entrypoints%20&%20Events.md).   

This approach has 2 main benefits compared to data driven recipes:  
1. You can form the recipes dynamically, meaning that you can decide the recipe at the time of registration once all blocks and items are registered
2. You can decide to just not register the recipe if some condition is met/not met

### Registering a Recipe
To register the recipe you will need to listen to the `RecipeRegisterEvent`, but beware, this event is called for each recipe type, so if you just register your recipe there it will get registered 3 times, this is why we need to first get the type of recipe that is being registered and only register our recipes if the type is correct, let's look at how to do that:  

[src/main/java/net/danygames2014/examplemod/event/RecipeListener.java](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/java/net/danygames2014/examplemod/event/RecipeListener.java)  
```java
@EventListener  
public void registerRecipes(RecipeRegisterEvent event) {  
	// Getting the Event type
    RecipeRegisterEvent.Vanilla type = RecipeRegisterEvent.Vanilla.fromType(event.recipeId);  
  
    if (type == RecipeRegisterEvent.Vanilla.CRAFTING_SHAPED) {  
        // This will only fire for Shaped Crafting Recipes  
    }  
  
    if (type == RecipeRegisterEvent.Vanilla.CRAFTING_SHAPELESS) {  
        // This will only fire for Shapeless Crafting Recipes  
    }  
  
    if (type == RecipeRegisterEvent.Vanilla.SMELTING) {  
        // This will only fire for Smelting Recipes  
    }  
}
```

So, we are now listening to the `RecipeRegisterEvent`, when the event comes in, we are using the `fromType` method to get the type of the recipe and then if that matches our desired type, an if condition will pass and our code will run.  

Let's now look at each of the recipe types and how the method to add them is formatted, the parameters are pretty much the same as when you define it using JSON files, just layed out a bit differently.  

&nbsp;  
### Shaped Recipe
To add a shaped recipe we will want to use the `CraftingRegistry.addShapedRecipe` method which takes the following parameters: output, pattern and pattern keys. Let's look at an example and break it down:  

```java
CraftingRegistry.addShapedRecipe(new ItemStack(Item.BONE, 42),"owo", "w w","owo",'o',new ItemStack(ExampleMod.exampleItem),'w',new ItemStack(Block.DIAMOND_BLOCK));
```

We will split it into multiple lines so its a bit more digestable  

```java
CraftingRegistry.addShapedRecipe(
	new ItemStack(Item.BONE, 42), // Output
	"owo", "w w", "owo", // Pattern
	'o', new ItemStack(ExampleMod.exampleItem), // Pattern Key
	'w', new ItemStack(Block.DIAMOND_BLOCK) // Pattern Key
);
```

Okay, this is better, and you might already start seeing how this is formatted but let's go over it:  
`output` - the first parameter is always the output ItemStack  
`pattern` - the pattern is 1 - 3 strings containing the pattern, so you can for example only have 2 strings for a 2x2 crafting pattern  
`pattern keys` - the pattern keys define what the characters in your pattern stand for, theyre always a char (a single letter in apostrophes ( ' )), followed by an `Item`, `ItemStack` or `Block`  

Here is the result of this recipe:  
![[code_shaped_recipe.png]]  

&nbsp;  
### Shapeless Recipe
To add a shapeless recipe we will want to use the `CraftingRegistry.addShapelessRecipe` method which takes the output and ingredients parameters. Let's look at an example and break it down:   

```java
CraftingRegistry.addShapelessRecipe(new ItemStack(Item.PAPER,14), Item.APPLE, Item.BED);
```

We will split it into multiple lines so its a bit more digestable  

```java
CraftingRegistry.addShapelessRecipe(
	new ItemStack(Item.PAPER,14), // Output
	Item.APPLE, // Ingredient
	Item.BED // Ingredient
);
```

 `output` - The first parameter is always the output ItemStack  
 `ingredients` - All the following parameters are ingredients, they can be either `Item`, `Block` or `ItemStack`  

Here is the result of this recipe:  
![[code_shapeless_recipe.png]]

&nbsp;  
### Smelting Recipe
To add a smelting recipe we will want to use the `SmeltingRegistry.addSmeltingRecipe` method which takes the input and output paremeters. Let's lok at an example and break it down:  

```java
SmeltingRegistry.addSmeltingRecipe(new ItemStack(Item.FLINT), new ItemStack(Block.BROWN_MUSHROOM, 8));
```

We will split it into multiple lines so its a bit more digestable  

```java
SmeltingRegistry.addSmeltingRecipe(
	new ItemStack(Item.FLINT), // Input
	new ItemStack(Block.BROWN_MUSHROOM, 8) // Output
);
```

`input` - Unlike with the crafting recipes, the first parameter here is the input ItemStack  
`output` - The second parameter is the output ItemStack  

And here is the result of this recipe:  
![[code_smelting_recipe.png]]

&nbsp;  
### External Recources
**Examples:**
[NyaWiki Example Mod](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/java/net/danygames2014/examplemod/event/RecipeListener.java)
[StationAPI Test Mod](https://github.com/ModificationStation/StationAPI/blob/master/src/test/java/net/modificationstation/sltest/recipe/RecipeListener.java)

