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

  const createTree = d3.treemap().size([1000, 600]).padding(1)(movieHierarchy);

  const movies = movieHierarchy.leaves();
  console.log(movies);

  // 4. Draw Chart

  const tree = d3
    .select('#canvas')
    .selectAll('g')
    .data(movies)
    .enter()
    .append('g')
    .attr('class', 'tile-group')
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
    .attr('height', (movie) => movie.y1 - movie.y0)
    .on('mouseover', onMouseOver)
    .on('mouseleave', onMouseLeave);;

  d3.selectAll('.tile-group')
    .append('text')
    .text((movie) => {
      return movie.data.name;
    })
    .attr('x', 2)
    .attr('y', 18)
    .style('font-size', '11');

  function stackText() {
    // placeholder for text transforming function
  }

  function mapGenreToColor(movie) {
    const genre = movie.data.category;
    if (genre == 'Action') {
      return '#BED2FF';
    } else if (genre == 'Drama') {
      return 'lightblue';
    } else if (genre == 'Adventure') {
      return 'orange';
    } else if (genre == 'Family') {
      return 'goldenrod';
    } else if (genre == 'Animation') {
      return 'lightgreen';
    } else if (genre == 'Comedy') {
      return 'pink';
    } else if (genre == 'Biography') {
      return 'tan';
    }
  }

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('visibility', 'hidden');

  function onMouseOver(movie) {
    tooltip.transition().duration(200).style('visibility', 'visible');
    tooltip
      .html('Name: ' + movie.data.name + '<br>' + 'Gross: ' + movie.data.value)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px')
      .attr('data-value', movie.data.value);
  }

  function onMouseLeave() {
    tooltip.transition().duration(200).style('visibility', 'hidden');
  }
}

drawTree();
