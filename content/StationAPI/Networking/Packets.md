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
## Registering the Packet  
Now we need to register the packet, to do this, we will create a new event listener that will listen to the `PacketRegisterEvent` and register the class as an entrypoint, to learn more about how to do that, head to [Entrypoints & Events](Entrypoints%20&%20Events.md).  

```java
public class PacketListener {  
    @Entrypoint.Namespace  
    public static Namespace NAMESPACE;  
  
    @EventListener  
    public void registerPackets(PacketRegisterEvent event) {  
        Registry.register(PacketTypeRegistry.INSTANCE, NAMESPACE.id("example"), ExamplePacket.TYPE);  
    }  
}
```

>[!note] The `Registry.register` is unfortunately required for now, in future you will be able to use event.register as with every other event

The first parameter will always be `PacketTypeRegistry.INSTANCE`, this is what tells the `Registry.register` method into which registry we are registering.  

The second parameter will be the Identifier of your packet, this can be anything you like.  

The third parameter is the type of the packet, you need to return the `public static final PacketType` that you've created in the packet class previously

## Packet short-circuiting
Before we actually add data to the packet, let's talk about packet short-circuiting, this allows you to greatly simplify your logic as you can handle the packet in singleplayer and multiplayer in a same way.   
This is done by allowing you to send the packet in singleplayer, but instead of sending it to a server, it gets directly sent to the packet handler on the client and calling the `apply` method.  

On the below picture you can see a rough visualization of the different paths that the packet will take in either singleplayer or multiplayer.  
![](packet_path.png)
* In the case of multiplayer, the packet gets sent thru the network layer to the server, the packet is then processed on the server in the `Packet.apply` method. The server will then determine if the client needs to be updated on what happened on the server, for example if a block has been changed, and if yes, send the appropriate update packets to the client which will process them.  

* In the case of singleplayer, the packet gets immediately sent into the `Packet.apply` method. No further updates are necessary since everything is happening on the client.  


## Adding data to the Packet
Now that we created our packet and registered it, we can start adding data to it. We will do this by adding fields to the class with the values we wanna transfer. However keep in mind that we need to keep track of how large our packet is, below is a table of how many bytes each of the common data types will use up.  

| Data Type | Size          | Write Method        | Read Method        |
| --------- | ------------- | ------------------- | ------------------ |
| boolean   | 1 byte        | stream.writeBoolean | stream.readBoolean |
| char      | 2 bytes       | stream.writeChar    | stream.readChat    |
| byte      | 1 byte        | stream.writeByte    | stream.readByte    |
| short     | 2 bytes       | stream.writeShort   | stream.readShort   |
| int       | 4 bytes       | stream.writeInt     | stream.readInt     |
| long      | 8 bytes       | stream.writeLong    | stream.readLong    |
| float     | 4 bytes       | stream.writeFloat   | stream.readFloat   |
| double    | 8 bytes       | stream.writeDouble  | stream.readDouble  |
| String    | String.length | stream.writeUTF     | stream.readUTF     |

# **Work In Progress ^.^**