Recipes in StationAPI are data driven and defined in the JSON format. StationAPI expects your recipes to be in the `src/main/resources/data/<modid>/stationapi/recipes/` folder, you can then use subfolders like `crafting`, `smelting` etc. to organize your recipes further, but it is not strictly necessary.  

By default there are 3 crafting recipe types:  
`minecraft:crafting_shaped` - A recipe in the Crafting Table where the shape of the ingredients matters  
`minecraft:crafting_shapeless` - A recipe in the Crafting Table where the shape of the ingredients doesn't matter and they can be in any shape  
`minecraft:smelting` - A recipe in the Furnace where 1 item is smelted into another  

### Shaped Crafting Recipe
A shaped crafting recipe requires you to specify a pattern with the accompanying keys and a result, let's look at an example recipe:  
[resources/data/examplemod/stationapi/recipes/crafting/example_crafting_recipe_shaped.json](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/resources/data/examplemod/stationapi/recipes/crafting/example_crafting_recipe_shaped.json)

```json
{  
  "type": "minecraft:crafting_shaped",  
  "pattern": [  
    "owo",  
    "w w",  
    "uwu"  
  ],  
  "key": {  
    "o": {  
      "item": "minecraft:obsidian"  
    },  
    "w": {  
      "item": "minecraft:dye",  
      "damage": 7  
    },  
    "u": {  
      "tag": "minecraft:logs"  
    }  
  },  
  "result": {  
    "item": "examplemod:example_item",  
    "count": 8  
  }  
}
```
  
Let's break this example down:  
`type` - here we specify the type of the recipe, in this case its a shaped recipe  

`pattern` - this is the pattern of the recipe, each letter represents 1 slot in the crafting table, what those items are is then defined in the key, a space means an empty slot, the pattern can also be 2x2 like this : 
```json
[
    "ow",
	"wo"
],
```

`key` - here we assign an item or a tag to each of the letters in the pattern, to assign an item we use the `item` key and write the registry name of the item under it, we can also specify the item meta (damage value) of the item under the `damage` key. To use a tag we the  `tag` key and specify the tag together with its namespace under the the `tag` key  

`result` - this is the output of the crafting recipe, its very similar to the item in key. You specify the item registry name under `item`, then you can also define the amount of the items crafted with `count` and the meta of the item using `damage`  

And here is the result:  
![](shaped_crafting_recipe.png)
&nbsp;  
### Shapeless Crafting Recipe  
A shapeless crafting recipe only requires you to specify a list of ingredients, let's look at an example recipe:  
[resources/data/examplemod/stationapi/recipes/crafting/example_crafting_recipe_shapeless.json](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/resources/data/examplemod/stationapi/recipes/crafting/example_crafting_recipe_shapeless.json)
```json
{  
  "type": "minecraft:crafting_shapeless",  
  "ingredients": [  
    {  
      "item": "minecraft:dye",  
      "damage": 4  
    },  
    {  
      "item": "minecraft:dye",  
      "damage": 4  
    },  
    {  
      "tag": "minecraft:logs"  
    },  
    {  
      "item": "examplemod:example_item"  
    }  
  ],  
  "result": {  
    "item": "examplemod:example_block"  
  }  
}
```

Let's break this example down:  
`type` - here we specify the type of the recipe, in this case its a shapeless recipe  

`ingredients` - this is the list of ingredients, since its an shapeless recipe the order doesn't  matter, we can assign an item using the `item` key and writing the registry name of the item under it, we can also specify the item meta (damage value) of the item under the `damage` key. To use a tag we the  `tag` key and specify the tag together with its namespace under the the `tag` key  

`result` - this is the output of the crafting recipe, its very similar to the item in ingredients. You specify the item registry name under `item`, then you can also define the amount of the items crafted with `count` and the meta of the item using `damage`  

And here is the result:  
![](shapeless_crafting_recipe.png)
&nbsp;  
### Smelting Recipe  
A smelting recipe is very similar to a shapeless recipe but it only requires a single ingredient, let's look at an example:  
[resources/data/examplemod/stationapi/recipes/smelting/example_smelting_recipe.json](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/resources/data/examplemod/stationapi/recipes/smelting/example_smelting_recipe.json)  
```json
{
  "type": "minecraft:smelting",
  "ingredient": {
    "item": "examplemod:example_item"
  },
  "result": {
    "item": "minecraft:dye",
    "count": 8,
    "damage": 12
  }
}
```

Let's break this example down:  
`type` - here we specify the type of the recipe, in this case its a smelting recipe  

`ingredient` - this is the input ingredient, we can assign an item using the `item` key and writing the registry name of the item under it, we can also specify the item meta (damage value) of the item under the `damage` key. To use a tag we the  `tag` key and specify the tag together with its namespace under the the `tag` key  

`result` - this is the output of the recipe, its very similar to the item in ingredient. You specify the item registry name under `item`, then you can also define the amount of the items made with `count` and the meta of the item using `damage`  

And here is the result:  
![](smelting_recipe.png)
&nbsp;  

### External Resources:
[Minecraft Wiki/Recipe](https://minecraft.wiki/w/Recipe) - Since StationAPI uses the modern data driven recipes, the basics of this are applicable, altho many of the things are straight up non-existent in Beta  
[Fabric Wiki/Crafting Recipes](https://fabricmc.net/wiki/tutorial:recipes) - This is also somewhat applicable, altho not really comprehensive  

**Examples:**  
[Tropicraft Recipes](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/resources/data/tropicraft/stationapi/recipes)  
[StationAPI Test Mod Recipes](https://github.com/ModificationStation/StationAPI/tree/master/src/test/resources/data/sltest/stationapi/recipes)  
[NyaWiki Example Mod Recipes](https://github.com/DanyGames2014/nyawiki-example-mod/tree/master/src/main/resources/data/examplemod/stationapi/recipes)  
[Better Nether Beta Recipes](https://github.com/paulevsGitch/BetterNetherBeta/tree/stapi-2.0/src/main/resources/data/bnb/stationapi/recipes)  

