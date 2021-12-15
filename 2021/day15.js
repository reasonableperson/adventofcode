var input = (await Deno.readTextFile('input')).trim().split('\n').map(l => l.split('').map(Number))

var solve = input => {
  var steps = 0
  var current = '0,0'
  var destination = (l => (l-1)+','+(l-1))(input.length)
  var coords = [...Array(input.length)].map((_,i,a) => a.map((_,j,a) => [i,j])).flat()
  var distances = new Map(coords.map(([i,j]) => [i+','+j, i==0 && j==0 ? 0 : Infinity]))
  var neighbours = ([i,j]) => [[i,j-1],[i+1,j],[i,j+1],[i-1,j]].filter(ij => ij.every(i => i>=0 && i<input.length)).map(([i,j]) => i+','+j)
  var unvisited = ['0,0']
  var visited = new Set

  while ((current = unvisited.shift())) {
    steps++
	//console.log()
    console.log(steps, 'visiting', current, distances.get(current))
    neighbours(current.split(',').map(Number)).forEach(ij => {
	  if (visited.has(ij)) {
		  //console.log('  skip', ij)
		  return
	  }
      var [i,j] = ij.split(',').map(Number)
	  var d = distances.get(current) + input[i][j]
	  var old_pos = unvisited.findIndex(x => x == ij)
      if (d < distances.get(ij)) {
		//console.log('  set', ij, d)
		distances.set(ij, d)
		var new_pos = unvisited.findIndex(x => distances.get(x) > d)
		if (new_pos != -1) unvisited.splice(new_pos, 0, ij)
		else unvisited.push(ij)
	  } else if (old_pos == -1) {
		var new_pos = unvisited.findIndex(x => distances.get(x) > d)
		if (new_pos != -1) unvisited.splice(new_pos, 0, ij)
	  }
    })
	visited.add(current)
	//console.log('visited', visited)
    //console.log('unvisited', unvisited.map(ij => [ij, distances.get(ij)]))
    //console.log('distances', distances)
	//console.log('candidates', [...unvisited].map(x => [x, distances.get(x)]))
  }
  //console.log('result', distances)
  // console.log([...Array(input.length)].map((_,i,a) => a.map((_,j,a) => distances.get(i+','+j)).join(' ')).join('\n'))
  //console.log(distances)
  console.log(steps, distances.get(destination))
}

// solve(input) // 373

var input2 = [...Array(5)].map((_,i) => input.map(l => [...Array(5)].map((_,j) => l.map(n => (n+i+j)%9 == 0 ? 9 : (n+i+j)%9 )).flat())).flat()

solve(input2) // 4956 is too high