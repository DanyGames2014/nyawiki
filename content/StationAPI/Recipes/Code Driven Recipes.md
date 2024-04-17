Code Driven Recipes in StationAPI can be registered using the conveniently named `RecipeRegisterEvent`, if you want to learn how to subscribe to an event you can go to [Entrypoints & Events](Entrypoints%20&%20Events.md).   

This approach has 2 main benefits compared to data driven recipes:  
1. You can form the recipes dynamically, meaning that you can decide the recipe at the time of registration once all blocks and items are registered
2. You can decide to just not register the recipe if some condition is met/not met

### Registering a Recipe
To register the recipe you will need to listen to the `RecipeRegisterEvent`, but beware, this event is called for each recipe type, so if you just register your recipe there it will get registered 3 times