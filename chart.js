async function drawTree() {
    const kickStarterDataset = await d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json');
    const movieDataset = await d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json');
    const videoGameDataset = await d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json');
}

drawTree();