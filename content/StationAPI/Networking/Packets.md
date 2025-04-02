Packets are a tool for communicating between the client and server. They can be client-bound, (the packet is only sent from the server to client), server-bound (the packet is only sent from client to server) or unidirectional. They can carry any arbitrary data that you can fit into its Data Stream.   

StationAPI also provides a `MessagePacket`, which despite its name can also be used for any arbitrary data, including serialized objects.   

## Creating a Custom Packet
To create a custom packet you first need to extend the `Packet` class and implement the `ManagedPacket` interface, into the generic type between `< >` put in the type of your packet class, like this:   

```java
public class ExamplePacket extends Packet implements ManagedPacket<ExamplePacket> {        

}
```

IntelliJ will now prompt you to implement the `Packet` methods and the `ManagedPacket` method.   
![](intellij_implement_methods.png)  
In this context menu, click on `Implement Methods`
&nbsp;
&nbsp;
![](intellij_implement_methods2.png)   
Make sure all methods are selected and hit OK. This will result in the methods getting implemented with some default implementation.  

Following this also create an empty constructor with no arguments, like this:  
```java
public ExamplePacket() {  
}
```

&nbsp;  

Then we will build our `PacketType`, this will tell the game whether the packet is client-bound/server-bound or unidirectional. At the top of your class, outside of any methods, create a `public static final PacketType` that will hold our type, and use the PacketType.builder to build the packet.  

```java
public static final PacketType<ExamplePacket> TYPE = PacketType.builder(true, true, ExamplePacket::new).build();
```

The arguments are as follows:   
1. clientBound - Whether this packet will be sent from server to client  
2. serverBound - Whether this packet will be sent from client to server  
3. factory - The method that constructs this packet  

Now you will want to return this TYPE in the getType method that was implemented before and currently returns null.  

```java
@Override  
public @NotNull PacketType<ExamplePacket> getType() {  
    return TYPE;  
}
```

&nbsp;  
&nbsp;  


## Adding data to the Packet
Now that we have the basic packet structure and we have defined the `PacketType`, we can start adding data to it. We will do this by adding fields to the class with the values we wanna transfer. Here is a table of types you can use and their sizes (This will be relevant later).


| Data Type | Size          |
| --------- | ------------- |
| boolean   | 1 byte        |
| char      | 2 bytes       |
| byte      | 1 byte        |
| short     | 2 bytes       |
| int       | 4 bytes       |
| long      | 8 bytes       |
| float     | 4 bytes       |
| double    | 8 bytes       |
| String    | String.length |
