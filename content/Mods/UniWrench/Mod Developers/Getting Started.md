To get started with UniWrench add the code blocks in your dependencies in your `build.gradle` and your `gradle.properties` file  

`build.gradle`
```groovy
modImplementation("net.danygames2014:UniWrench:${project.uniwrench_version}") {
	transitive false 
}
```


`gradle.properties`
```properties
uniwrench_version=2.1.0
```

> [!note] Make sure to check the repository to see if the mod hasn't updated

## Using UniWrench
You can use UniWrench in multiple ways:
* [Making blocks Wrenchable](Making%20blocks%20Wrenchable.md)
* [Making your own Wrench Modes](Making%20your%20own%20Wrench%20Modes.md)
* [Making your own Wrench](Making%20your%20own%20Wrench.md)