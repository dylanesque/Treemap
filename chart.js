// example repo: https://www.d3-graph-gallery.com/graph/treemap_json.html

async function drawTree() {
  // 1. Access data
  const movieDataset = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
  );

  const movieHierarchy = d3
    .hierarchy(movieDataset, (node) => {
      return node.children;
    })
    .sum((node) => {
      return node.value;
    })
    .sort((node1, node2) => {
      return node2.value - node1.value;
    });

  const movies = movieHierarchy.leaves();

  // 2. Create chart dimensions

  const width = window.innerWidth * 0.85;
  let dimensions = {
    width,
    height: width * 0.4,
    margin: {
      top: 5,
      right: 10,
      bottom: 50,
      left: 60,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;

  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // 3. Draw canvas
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  const tree = bounds.selectAll('g').data(movies).enter().append('g');
}

drawTree();
