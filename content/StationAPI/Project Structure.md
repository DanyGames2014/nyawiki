We will go over a project and mod structure of a StationAPI mod, code can mostly be structured in any way you like as long as its under the correct package, meanwhile assets (textures, blockstates, models etc.) and data (recipes, tags) need to follow a pretty specific structure in order for all the files to be discovered and loaded by StationAPI properly.

## Project Structure

This part is about the structure of the project itself. In the project directory you will find the gradle files and folder, such as gradlew.bat, build.gradle, gradle.properties etc.

Below you can find an example structure of a project along with descriptions of what some of the files or folders contain (*Note: this isn't a complete structure. Mod structure itself is explained in the next heading.)

* Project Directory
	* .git
	* .gradle
	* .idea
	* build
	* gradle
	* run
	* src
		* main
		* test
	* .gitignore
	* build.gradle
	* gradle.properties
	* gradlew
	* gradlew.bat
	* LICENSE
	* README.md
	* settings.gradle

##### .git
Contains files used by the Git version control system. It will only exist if you are using such a system. In most cases there won't be a reason to touch this
##### .gradle
Contains files used by the Gradle build system, such as cached remapped dependencies. This folder can be deleted in order to force gradle to rebuild caches which might fix some issues
##### .idea
Contains files used by the IntelliJ Idea IDE such as Run Configurations and Project-specific settings
##### build
Mostly stores temporary files used when building, except the `build/libs` directory which will contain your build output when you execute `gradlew build`
##### gradle
Contains the gradlew wrapper jar, you only need to touch this when updating the project gradle to a newer version
##### run
This is where the Minecraft Client and Minecraft Server are ran in when launching them in an IDE so it contains your saves, server.properties, configs etc. 
##### src
This folder contains the source files and assets of your mod, this is described more in-depth in the **Mod Structure** part of this page.
By default it only contains the `main` folder where your mod itself is, however, you can also create a `test` folder which can house a test mod which when launched will also load your main mod as a dependency. This is useful for example for testing library mods where you can create the library and then in the test mod you create features that use your library without having to remove them afterward as only the main mod will be included in the mod jar when you build your project.
##### .gitignore
This is a file used by the Git versioning system where you can specify which files should not be synced thru Git. For example this is used to not sync cache files, run files, individual IDE settings etc.
##### build.gradle
The Gradle Build file is probably the most important file in a gradle project. You will mostly specify your dependencies and mappings here, aswell as update Babric Loom when needed.
##### gradle.properties
This file exists so you don't have to comb through the build.gradle file to change dependency version etc. In the build.gradle file you can specify a placeholder like `${project.nya}` and then in the gradle.properties file you can assign that placeholder a value like this `nya=wowzie` which will then be used when the project is refreshed or built.
##### gradlew
This is the gradle shell script for POSIX compliant systems (BSD/Linux/MacOS etc.) 
##### gradlew.bat
This is the gradle shell script for Windows
##### LICENSE
This is the standard file in which your license should be specified. If no license is specified the project is generally assumed to be under the All Rights Reserved license. I recommend heading over to [Choose a License](https://choosealicense.com) and choosing a license that suits your needs. My personal recommendation is MIT.
##### README.md
This is usually where you include a short description of your mod, build instructions and maybe even point to a wiki. This is also the file which gets rendered on GitHub on the project page.
##### settings.gradle
This file contains some settings for gradle itself, in StAPI workspace it is used to specify plugin repositories.

## Mod Structure
This part is about the mod structure itself and describes the file and folder structure which will be located under either `src/main` or `src/test`

* java
	* net
		* danygames2014
			* examplemod
* resources
	* assets
		* examplemod
			* stationapi
				* lang
					* [en_US.lang](Language%20File.md)
				* blockstates
					* [example_block.json](StationAPI/Block%20States/Block%20State)
				* models
					* item
						* [example_item.json](Item%20Model.md)
					* block
						* [example_block_normal.json](Block%20Model.md)
						* [example_block_variant.json](Block%20Model.md)
				* textures
					* item
						* example_item.png
					* block
						* example_block_top.png
						* example_block_side.png
				* sounds
					* sounds
						* sound
							* example_entity
								* nya.ogg
			* textures
				* entities
					* example_entity_texture.png
			* icon.png
	* data
		* examplemod
			* stationapi
				* recipes
					* crafting
						* [example_crafting_recipe_shaped.json](Data%20Driven%20Recipes.md#Shaped%20Crafting%20Recipe) 
						* [example_crafting_recipe_shapeless.json](Data%20Driven%20Recipes.md#Shapeless%20Crafting%20Recipe)
					* smelting
						* [example_smelting_recipe.json](Data%20Driven%20Recipes.md#Smelting%20Recipe)
				* tags
					* blocks
						* example_block_tag.json
					* items
						* example_item_tag.json
		* minecraft
			* stationapi
				* tags
					* blocks
						* mineable
							* pickaxe.json
	* fabric.mod.json
	* examplemod.mixins.json