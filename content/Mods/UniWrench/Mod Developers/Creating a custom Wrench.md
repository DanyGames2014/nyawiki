Making your own wrench can be useful in cases where you need a wrench with many customized modes. To do this simply extend the `WrenchBase` class and in the constructor add yours or default wrench modes.

```java
public class ExampleWrench extends WrenchBase {  
    public ExampleWrench(Identifier identifier) {  
        super(identifier);  
        this.addWrenchMode(WrenchMode.MODE_WRENCH);  
        this.addWrenchMode(WrenchMode.MODE_ROTATE); 
        this.addWrenchMode(WrenchModeListener.exampleWrenchMode);
    }  
}
```