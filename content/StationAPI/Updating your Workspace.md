Even though the version we are modding hasn't gotten updates in atleast a week, the tools we use to mod it are constantly evolving, this includes the mappings (the human readable names in Minecraft source code), StationAPI (the API we use to mod), Loom & Boom (The tool which does majority of the heavy lifting with setting up the workspace, decompilation of Minecraft and packaging our final mod), Fabric Loader itself or other mods that you depend on like GlassConfigAPI or use in your workspace for convenience such as Always More Items.  

## Updating Mappings (BINY)
The current version of mappings you are using is in your `gradle.properties` file under the `yarn_mappings` value, this set of random letter and numbers is actually a short commit hash from the [BINY Github Repository](https://github.com/calmilamsy/biny-mappings)  

```properties
yarn_mappings=b1.7.3+fdc0910
```

to update your mappings you will want to navigate to that repository and look at the latest short commit hash  
![](workspace_biny_repo.png)  
Here you can see that at the time of writing (10/2024) the latest commit hash is 4cbd9c8, note that down and we will proceed witht he migration. First you will want to open a terminal in your project directory and type in the following command and replace the `[HASH]` with the HASH you noted down. This will take care of most mapping update tasks.
```batch
gradlew migrateMappings --mappings net.glasslauncher:biny:b1.7.3+[HASH]:v2 --output src/main/java
```

> [!danger] This will replace your source code with the remapped version, make sure you have a backup or you are using versioning system like Git which will allow you to revert the changes if needed! You can remove the output parameter to make it output the source into a `remappedSrc` folder

If the migration has gone succesfully, it should look something like this  
![](workspace_mapping_migrate_terminal.png)  

Our source code has now been migrated from the mappings in `gradle.properties` to the mappings we specified, we can now change mapping hash in `gradle.properties` to the latest  

Once you modify `gradle.properties` a pop-up should appear (*highligted in yellow*) where you can click on the left button to reload your gradle project. If that does appear, click on the Gradle icon in the right bar (1) (*highligted in red*) and then click on the reload gradle projects button (2) (*highlighted in red*)  
![](workspace_reload_gradle.png)

After clicking the button, wait for Gradle to refresh the project, it will decompile Minecraft with the newly updated mappings and reload your project. You can observe the progress of that in the Build tab on the left  
![](workspace_build_tab.png)  

You might have to update some things to the newer mappings manually, but still better than doing it all by hand.