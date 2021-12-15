// var input = `1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581`.split('\n').map(l => l.split('').map(Number))

var input = document.body.innerText.trim().split('\n').map(l => l.split('').map(Number))

var coords = [...Array(input.length)].map((_,i,a) => a.map((_,j,a) => [i,j])).flat()

var neighbours = ([i,j]) => [[i,j-1],[i+1,j],[i,j+1],[i-1,j]].filter(ij => ij.every(i => i>=0 && i<input.length)).map(([i,j]) => i+','+j)

var solve = input => {
  var i = 0
  var current = '0,0'
  var destination = (l => (l-1)+','+(l-1))(input.length)
  var distances = new Map(coords.map(([i,j]) => [i+','+j, i==0 && j==0 ? 0 : Infinity]))
  var unvisited = new Set(coords.map(([i,j]) => i+','+j))
  unvisited.delete('0,0')

  while (unvisited.has(destination) && i<50000) {
    i++
    //console.log(i, 'current', current, 'd', distances.get(current))
    neighbours(current.split(',').map(Number)).forEach(ij => {
	  if (!unvisited.has(ij)) return
      var [i,j] = ij.split(',').map(Number)
	  //console.log('set', ij, distances.get(current), input[i][j])
      distances.set(ij, Math.min(distances.get(ij), distances.get(current) + input[i][j]))
    })
    unvisited.delete(current)
    //console.log(i, 'unvisited', unvisited)
    //console.log('distances', distances)
    current = [...unvisited].reduce((prev,next) => distances.get(next) < distances.get(prev) ? next : prev, destination)
  }
  //console.log('result', distances)
  //console.log(i, [...Array(input.length)].map((_,i,a) => a.map((_,j,a) => distances.get(i+','+j)).join(' ')).join('\n'))
  console.log(i, distances.get(destination))
}

solve(input)