We will go over a project structure of a StationAPI mod, code can mostly be structured in any way you like as long as its under the correct package, meanwhile assets (textures, blockstates, models etc.) and data (recipes, tags) need to follow a pretty specific structure in order for all the files to be discovered and loaded by StationAPI properly.

Project Directory\
│   build.gradle\
│   gradle.properties\
│   gradlew\
│   gradlew.bat\
│   LICENSE\
│   README\
│   settings.gradle\
└───src\
│	├───main\
│	│   └───net\
│	└───test

* Project Directory
	* src
		* main
			* java
				* net
					* danygames2014
						* tropicraft
			* resources
				* assets
				* data
		* test
			* net
				* danygames2014
					* tropitest