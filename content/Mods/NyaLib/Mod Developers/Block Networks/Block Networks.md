Block Networks allow your blocks to form and be part of networks of adjacent blocks of the same type, this is mainly used for cases like cables.  

# Making a block be a part of Network
To make your block a network component you will need to implement either a `NetworkNodeComponent` or `NetworkEdgeComponent` interface on your `Block` class.   

`NetworkNodeComponent` - This component can connect together other Node or Edge components, meaning that networks can be formed thru it. Example: Cables  
`NetworkEdgeComponent` - This component can participate in networks or form them, but it can only connect to Node components and not other Edge components. Example: Machines  

You will then be required to implement the `getNetworkType` method in which you need to return the type of network this block can participate in. If you want your block to be able to participate in multiple network types, override the `getNetworkTypes` method and return an `ArrayList<NetworkType>` of networks it can participate in.  

This is all that's required for your block to be able to form or participate in networks.  

## Modifying connecting behavior  
By default the component will be able to connect to other components on all sides if they share the same network type. You can change this behavior by overriding the `canConnectTo(world, x, y, z, network, direction)`  method in your network component and returning true if you want it to connect or false if you do not want it to connect.  

## Events  
The component interface contains a couple methods which are called when the network or component get updated.  

`update(world, x, y, z, network)` - This will get called when the physical topology of the network the component is in, updates (component is removed, component is added, network is split etc.)  
`onAddedToNet(world, x, y, z, network)` - This will get called when the component gets added to a network or when the network is loading on world load.  
`onRemovedFromNet(world, x, y, z, network)` - This will get called right before the component gets removed from a network.  

The following 2 methods by default contain the implementation to automatically prompt the Network Manager to add or remove the blocks from network when they're placed or broken. By changing these you can cause serious issues or network corruption, only do so when its absolutely necessary. However just adding your code and calling the super implementation is fine.  

`addToNet(world, x, y, z, component)` - This is called when the component is placed  
`removeFromNet(world, x, y, z, component)` - This is called when the component is removed    

## Saving custom data
Since the components do not need to be block entities, but you might still wish to save some component specific data, methods are provided to save and load custom data in the NBT format.

`writeNbt(world, x, y, z, network, nbt)` - This will be called when the network this component is in is getting saved  
`readNbt(world, x, y, z, network, nbt)` - This will be called when the network this component is in is getting loaded  
