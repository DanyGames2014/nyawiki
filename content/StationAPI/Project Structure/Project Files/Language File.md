Language File (mostly called "lang file") is a file usually fitted with the .lang extension which stores translation strings for items, blocks, dimensions etc.
It follows a pretty simple format of one translation per line in the following format `Translation Key=Localized Name`
## Translation Key
Internally the translation key follows the following format : `<type>.<namespace>:<path>.<subpath>`. For example `dim.tropicraft:tropics.entering` or `item.tropicraft:bamboo.name` 

However when StationAPI discovers a lang file it automatically adds the namespace of where it was discovered so while internally `item.tropicraft:bamboo.name` is used, your lang file should contain `item.bamboo.name`

### Translation Key Formats

#### Minecraft

| Object Type             | Translation Key Format                       | Example Key                            |
| ----------------------- | -------------------------------------------- | -------------------------------------- |
| Block Name              | tile.<registry_name>.name                    | tile.example_block.name                |
| Item Name               | item.<registry_name>.name                    | item.example_item.name                 |
| Dimension Entering      | dim.<registry_name>.entering                 | dim.example_dim.entering               |
| Dimension Leaving       | dim.<registry_name>.leaving                  | dim.example_dim.leaving                |
| Achievement Page        | stationapi\\:achievementPage.<registry_name> | stationapi\\:achievementPage.main_page |
| Achievement Name        | achievement.<registry_name>                  | achievement.example_achievement        |
| Achievement Description | achievement.<registry_name>.desc             | achievement.example_achievement.desc   |


#### [[BH Creative]]

| Object Type       | Translation Key Format   | Example Key             |
| ----------------- | ------------------------ | ----------------------- |
| Creative Tab Name | tab.<registry_name>.name | tab.example_blocks.name |


#### [[Spawn Eggs]]

| Object Type           | Translation Key Format      | Example Key           |
| --------------------- | --------------------------- | --------------------- |
| Spawn Egg Entity Name | entity.<registry_name>.name | entity.pigzombie.name |
