Language File (mostly called "lang file") is a file usually fitted with the .lang extension which stores translation strings for items, blocks, dimensions etc.
It follows a pretty simple format of one translation per line in the following format `Translation Key=Localized Name`  
## Translation Key
The translation keys *mostly* follow the following format : `<type>.<namespace>.<path>`. For example `dim.tropicraft.tropics.entering` or `item.tropicraft.bamboo.name`   

When writing the language file you can use the `@` placeholder instead of having to write your mod's namespace, this placeholder will get replaced with the namespace that the lang file was discovered in. So instead of typing `tile.examplemod.example_block.name` you can type `tile.@.example_block.name`  

### Translation Key Formats

#### Minecraft

| Object Type             | Translation Key Format                                      |
| ----------------------- | ----------------------------------------------------------- |
| Block Name              | tile.\<namespace>.<registry_name>.name                      |
| Item Name               | item.\<namespace>.<registry_name>.name                      |
| Dimension Entering      | dim.\<namespace>.<registry_name>.entering                   |
| Dimension Leaving       | dim.\<namespace>.<registry_name>.leaving                    |
| Achievement Page        | gui.stationapi.achievementPage.\<namespace>.<registry_name> |
| Achievement Name        | achievement.\<namespace>.<registry_name>                    |
| Achievement Description | achievement.\<namespace>.<registry_name>.desc               |
| Keybind Name            | key.\<namespace>.<registry_name>                            |

#### [[BH Creative]]

| Object Type       | Translation Key Format                |
| ----------------- | ------------------------------------- |
| Creative Tab Name | tab.\<namespace>.<registry_name>.name |


#### [[Spawn Eggs]]

| Object Type           | Translation Key Format                   |
| --------------------- | ---------------------------------------- |
| Spawn Egg Entity Name | entity.\<namespace>.<registry_name>.name |
