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

  const createTree = d3.treemap().size([1000, 600]).padding(1);
  createTree(movieHierarchy);

  const movies = movieHierarchy.leaves();
  console.log(movies);

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

  // 4. Draw Chart

  const tree = bounds
    .selectAll('g')
    .data(movies)
    .enter()
    .append('g')
    .attr('transform', (movie) => {
      return 'translate(' + movie.x0 + ', ' + movie.y0 + ')';
    })
    .append('rect')
    .attr('class', 'tile')
    .attr('fill', (movie) => mapGenreToColor(movie))
    .attr('data-name', (movie) => movie.data.name)
    .attr('data-category', (movie) => movie.data.category)
    .attr('data-value', (movie) => movie.data.value)
    .attr('width', (movie) => movie.x1 - movie.x0)
    .attr('height', (movie) => movie.y1 - movie.y0);

tree
    .append('text')
    .text((movie) => {
      return movie.data.name;
    })
    .attr('x', 6)
    .attr('y', 18);

  function mapGenreToColor(movie) {
    const genre = movie.data.category;
    if (genre == 'Action') {
      return 'red';
    } else if (genre == 'Drama') {
      return 'blue';
    } else if (genre == 'Adventure') {
      return 'orangered';
    } else if (genre == 'Family') {
      return 'goldenrod';
    } else if (genre == 'Animation') {
      return 'lightgreen';
    } else if (genre == 'Comedy') {
      return 'pink';
    } else if (genre == 'Biography') {
      return 'brown';
    }
  }

  function onMouseOver(d) {
    tooltip.transition().duration(200).style('visibility', 'visible');
    tooltip
      .html(
        d.year +
          '-' +
          months[d.month - 1] +
          '<br>' +
          baseTemp +
          '<br>' +
          d.variance
      )
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px');
  }

  function onMouseLeave() {
    tooltip.transition().duration(200).style('visibility', 'hidden');
  }
}

drawTree();
