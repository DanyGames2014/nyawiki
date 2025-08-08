To use NyaLib in your project, add the library into your dependencies in your `build.gradle` file and a version property into your `gradle.properties` file

`build.gradle`
```groovy
modImplementation("net.danygames2014:NyaLib:${project.nyalib_version}") {
	transitive false 
}
```


`gradle.properties`
```properties
nyalib_version=0.13.0
```

> [!note] Make sure to check the maven repository to see if the mod hasn't updated

The library is available on [Glass Maven](https://maven.glass-launcher.net/#/releases/net/danygames2014/NyaLib) and [NyaRepo](https://maven.fildand.cz/#/releases/net/danygames2014/NyaLib)
