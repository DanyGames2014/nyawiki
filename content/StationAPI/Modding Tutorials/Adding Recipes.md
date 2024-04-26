In this tutorial you will learn how to add a recipe to the game, you can do that in two ways, either the [Data Driven](Data%20Driven%20Recipes.md) way where you add them using a json file or the [Code Driven](Code%20Driven%20Recipes.md) way where you define them programmaticaly. I personally recommend using the data driven approach when possible and only using the code driven way when required.  

You can learn more about both ways on their respective pages:  
[Data Driven Recipes](Data%20Driven%20Recipes.md)  
[Code Driven Recipes](Code%20Driven%20Recipes.md)  

## Adding [Data Driven](Data%20Driven%20Recipes.md) Recipes
Data Driven recipes are defined in the JSON format and need to be put under the `src/main/resources/data/<modid>/stationapi/recipes/` folder.
### [Shapeless Recipe](Data%20Driven%20Recipes.md#Shapeless%20Crafting%20Recipe)
Shapeless Recipe doesn't care about the order of the items put into the crafting table, it only cares that the correct ingredients are supplied.  

To create a shapeless crafting recipe you need to make a new recipe of the `minecraft:crafting_shapeless` type, you can read more about this [here](Data%20Driven%20Recipes.md#Shapeless%20Crafting%20Recipe).  

```json
{  
  "type": "minecraft:crafting_shapeless",  
  "ingredients": [    
    {  
      "tag": "minecraft:logs"  
    },  
    {  
      "item": "minecraft:dye",
      "damage": 4  
    }  
  ],  
  "result": {  
    "item": "minecraft:dye",
    "damage": 7,
    "count": 16
  }  
}
```

And here is the result:  
![](data_crafting_shapeless.png)  

 &nbsp;
### [Shaped Recipe](Data%20Driven%20Recipes#Shaped%20Crafting%20Recipe)
Shaped Recipe does care about the order of the ingredients in the crafting grid.  

To create a shaped crafting recipe you need to make a new recipe of the `minecraft:crafting_shaped` type, you can read more about this [here](Data%20Driven%20Recipes.md#Shaped%20Crafting%20Recipe).  

```json
{  
  "type": "minecraft:crafting_shaped",  
  "pattern": [  
    "d",  
    "i"  
  ],  
  "key": {  
    "d": {  
      "item": "minecraft:diamond"  
    },  
    "i": {  
      "tag": "minecraft:coals"  
    }  
  },  
  "result": {  
    "item": "minecraft:redstone",  
    "count": 8  
  }  
}
```
 And here is the result:  
![](data_crafting_shaped.png)

 &nbsp;  
### [Smelting Recipe](Data%20Driven%20Recipes.md#Smelting%20Recipe)
Smelting Recipe only has a single input and output.  

To create a smelting recipe you need to make a new recipe of the `minecraft:smelting` type, you can read more about this [here](Data%20Driven%20Recipes.md#Smelting%20Recipe).   

```json
{  
  "type": "minecraft:smelting",  
  "ingredient": {  
    "item": "minecraft:dye",
    "damage": 4
  },  
  "result": {  
    "item": "minecraft:diamond"  
  }  
}
```  

And here is the result:  
![](data_smelting.png)
 
 &nbsp;
## Adding [Code Driven](Code%20Driven%20Recipes.md) Recipes
Code driven recipes are defined programmatically and need to be registered using the `RecipeRegisterEvent`
### Shapeless Recipe
Shapeless Recipe doesn't care about the order of the items put into the crafting table, it only cares that the correct ingredients are supplied.     

To create a shapeless crafting recipe you need to use the `CraftingRegistry.addShapelessRecipe` method during the `RecipeRegisterEvent.Vanilla.CRAFTING_SHAPELESS` event.  

```java
// Example Here
```

&nbsp;
### Shaped Recipe
Shaped Recipe does care about the order of the ingredients in the crafting grid.  

To create a shapeless crafting recipe you need to use the `CraftingRegistry.addShapedRecipe` method during the `RecipeRegisterEvent.Vanilla.CRAFTING_SHAPED` event  

```java
// Example Here
```

&nbsp;
### Smelting Recipe
Smelting Recipe only has a single input and output.  

To create a smelting recipe you need to use the `SmeltingRegistry.addSmeltingRecipe` method during the `RecipeRegisterEvent.Vanilla.SMELTING`  event

```java
// Example Here
```

&nbsp;
