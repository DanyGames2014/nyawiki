Every block in Minecraft is created from some sort of Block class like `LeavesBlock`, `ExampleBlock` etc. This however makes it harder if we want to change the appearance or behaviour of our block under some conditions because if we just call the method on our block, it will apply to all blocks of the same type. This is where block states come in, similarly to Block Entities, they are unique per-block. They also allow us to specify a [Block Model](Block%20Model.md) for each state or combination of states.  

### Blockstate with a single model
Let's first look at how a blockstate json file for a simple block with no properties will look like, keep in mind that the blockstate file needs to be named after the block ID we want to apply it to, so for an block with ID `examplemod:example_block` the blockstate json needs to be named `example_block.json`, we don't specify the namespace because that is specified by the asset directory it was discovered in, which is `resources/assets/examplemod/stationapi/blockstates` in this case.  
```json
{  
  "variants": {  
    "": { "model": "examplemod:block/example_block" }  
  }  
}
```

Let's look at this example and see what each of these elements mean:  
`"variants"` - This is the key under which the different variants will be stored, for now there is only one  
`""` - This is the "condition" of the variant, if this is met, the model under this variant will be used, in this case the condition is empty which means that it will always apply to all permutations of this block  
`"model"` - When the variant condition is met, the game will use the object under that variant and use the model specified in this key, in this case the `examplemod:block/example_block` will be used  
&nbsp;
### Blockstates with multiple models
Blockstates also allow you to have multiple models for each variant and choose between them randomly, let's see how that looks  
```json
{  
  "variants": {  
    "": [
	    { "model": "examplemod:block/example_block_1", weight=4 },
	    { "model": "examplemod:block/example_block_2", weight=3 },
	    { "model": "examplemod:block/example_block_3", weight=2 },
	    { "model": "examplemod:block/example_block_3", weight=1 }
    ]
  }  
}
```
What we have done here is that we have created an array with all the different models that can be applied. They all have their assigned "weight", which just means how likely they can appear, if no weight is specified then it defaults to 1. The way weight is calculated is that all the weights get summed up and then each of the weights gets divided by the sum.  
For example, the weights here (4,3,2 and 1) will get summed up to 10 and then the first model with a weight of 4 will get calculated as `4 / 10 = 0.4` which means a 40% chance.

&nbsp;
### Blockstate with properties
Now we will take a look at a model which changes the model according to a single Enum property 
```json
{  
  "variants": {  
    "mood=happy": { "model": "examplemod:block/example_emotional_block_happy" },
    "mood=sad": { "model": "examplemod:block/example_emotional_block_sad" }
  }  
}
```

You can see that we are now matching for an Enum Property with the name `mood`, when the mood is `happy` the `examplemod:block/example_emotional_block_happy` model will get applied, but if the mood is `sad` the `examplemod:block/example_emotional_block_sad` model will get applied, also, u just made the block sad, you monster.

To check for multiple properties we need to specify models for each combination of properties  
```json
{  
  "variants": {  
    "mood=happy,fed=true": 
	    { "model": "examplemod:block/example_emotional_block_happy" },
    "mood=sad,fed=true ": 
	    { "model": "examplemod:block/example_emotional_block_sad" },
    "mood=happy,fed=false": 
	    { "model": "examplemod:block/example_emotional_block_sad" },
    "mood=sad,fed=false": 
	    { "model": "examplemod:block/example_emotional_block_sad" }
  }  
}
```
You can now see that the block will only be happy if the `mood` is `happy` and if the `fed` boolean property is `true`, otherwise it will always be sad  

### Rotating the models
Let's say we only want to rotate the model, we don't need to create a whole new one, we can just rotate on the x-axis or the y-axis. We can also "uvlock" the texture which means that the texture won't rotate together with the block.  

>[!warning] You can only rotate blocks in 90 degree increments.

Now let's see how a json for a block with a single boolean property named `rotated` would look like :  
```json
{  
  "variants": {  
    "rotated=false": { 
	    "model": "examplemod:block/example_block" 
	},
    "rotated=true": { 
	    "model": "examplemod:block/example_block", 
	    "x": 90, 
	    "y": 270 
	}
  }  
}
```

We can see that in both cases the block uses the same `examplemod:block/example_block` model. If the property `rotated` is `false`, nothing is changed, but if the property `rotated` is `true` then the block gets rotated 90 degrees on the x-axis and 270 degrees on the y-axis  

### External Resources
[Minecraft Wolo/Tutorials/Models](https://minecraft.wiki/w/Tutorials/Models) - Due to StationAPI using modern format of models, this resource is fairly applicable  
[Fabric Wiki/Tutorial/Blockstate](https://fabricmc.net/wiki/tutorial:blockstate) - This is also somewhat applicable, altho there are differences  

**Examples:**  
[StationAPI Test Mod Blockstates](https://github.com/ModificationStation/StationAPI/tree/master/src/test/resources/assets/sltest/stationapi/blockstates)  
[Tropicraft Blockstates](https://github.com/DanyGames2014/Tropicraft/tree/master/src/main/resources/assets/tropicraft/stationapi/blockstates)  
[Better Nether Beta Blockstates](https://github.com/paulevsGitch/BetterNetherBeta/tree/stapi-2.0/src/main/resources/assets/bnb/stationapi/blockstates)  
