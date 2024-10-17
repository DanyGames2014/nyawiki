A biome is a part of the world which has its own set of spawnable mobs, features, grass color, fog color, leaf color, precipitation etc.  
Biomes are created using a `BiomeBuilder` during the `BiomeRegisterEvent`, this won't make them appear by themselves, they then have to be added to a Biome Provider.

## Creating the Biome
To create the Biome, make an event listener (described in [Entrypoints & Events](Entrypoints%20&%20Events.md)) for the `BiomeRegisterEvent`, something like this:

[src/main/java/net/danygames2014/examplemod/event/BiomeListener.java](https://github.com/DanyGames2014/nyawiki-example-mod/blob/master/src/main/java/net/danygames2014/examplemod/event/BiomeListener.java)
```java
public class BiomeListener {  
    @EventListener  
    public void registerBiomes(BiomeRegisterEvent event){  
          
    }  
}
```

The biome creating process uses a Builder pattern so you will want to create a public static field for your biome to be able to reference it from anywhere in your mod and a local variable for our  `BiomeBuilder`.  

```java
public class BiomeListener {  
    // Variables holding our biomes  
    public static Biome testBiome1;  
    public static Biome testBiome2;  
      
    @EventListener  
    public void registerBiomes(BiomeRegisterEvent event){  
        // A local biomebuilder instance that can be reused between biomes  
        BiomeBuilder biomeBuilder;  
          
        // Building Test Biome 1  
        biomeBuilder = BiomeBuilder.start("Test Biome 1");  
        testBiome1 = biomeBuilder.build();  
  
        // Building Test Biome 2  
        biomeBuilder = BiomeBuilder.start("Test Biome 2");  
        testBiome2 = biomeBuilder.build();  
    }  
}
```

> [!note] You can see that the instance of the BiomeBuilder can be reused between the biomes since the actual biome is being passed to our holding variables in the `.build()` method.

&nbsp;  

We have now made 2 completely standard biomes with no distinct features to them. To modify the features and other factors of the biome, you need to call methods on the `biomeBuilder` after starting it and before building the biome, let's change the foliage color and fog color

```java
// Building Test Biome 1  
biomeBuilder = BiomeBuilder.start("Test Biome 1");  
biomeBuilder.fogColor(0xFF5CF4);  
biomeBuilder.leavesColor(0x00EAFF);  
biomeBuilder.grassColor(0x00EAFF);  
testBiome1 = biomeBuilder.build();
```

And this is how the resulting `Test Biome 1` looks like  
![](test_biome_1.png)  

&nbsp;  

There are many more things you can call on the Biome Builder to customize your biomes

| Method              | Effect                                                                  |
| ------------------- | ----------------------------------------------------------------------- |
| grassColor          | The color of grass                                                      |
| leavesColor         | The color of leaves                                                     |
| grassAndLeavesColor | The color of both grass and leaves                                      |
| fogColor            | The color of fog                                                        |
| noDimensionFeatures | Disables the default features (ores, flowers etc.)                      |
| feature             | Adds a feature to the biome                                             |
| overworldOres       | Adds overworld ores to the biome                                        |
| overworldLakes      | Adds overworld lakes to the biome                                       |
| height              | Sets the minimum and maximum height of the biome                        |
| precipitation       | Enables or disables downfall (snow/rain)                                |
| snow                | Use snow instead of rain                                                |
| passiveEntity       | Adds a passive entity to the biome spawnlist                            |
| hostileEntity       | Adds a hostile entity to the biome spawnlist                            |
| waterEntity         | Adds a water entity to the biome spawnlist                              |
| surfaceRule         | Adds a surface rule to the biome. This will disable the default surface |

## Creating a Biome Provider
To have your biomes appear in game, you have to add them to a Biome Provider and register that provider to the dimension you want to add the biomes to.  

There are 2 types of biomes providers: Climate and Voronoi.   
Climate provider generates a temperature and humidity Perlin Noise map, and you assign your biomes according to those values.
![](biome_perlin_noise.png)

Voronoi creates a Voronoi diagram where to each of the cell a biome will be assigned.
![](biome_voronoi_diagram.png)

## External Resources
StationAPI Test Mod [Biome & Biome Provider](https://github.com/ModificationStation/StationAPI/blob/master/src/test/java/net/modificationstation/sltest/worldgen/TestWorldgenListener.java)  
Spooky Squash Lands [Biome & Biome Provider](https://github.com/Atilist/SpookySquashLands/blob/master/src/main/java/net/danygames2014/spookysquashlands/listener/WorldGenListener.java)