const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	// Create Automata and add to game engine
	const automata = new Automata(200,200);
	gameEngine.addEntity(automata);

	gameEngine.start();
});
