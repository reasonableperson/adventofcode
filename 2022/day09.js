input = document.body.innerText.split('\n').slice(0,-1).map(l => l.split(' ')).map(([d,n]) => [d, parseInt(n)])

manhattan = (dx, dy) => Math.abs(dx) + Math.abs(dy)

moves = {
  L: ({x,y}) => ({x: x-1, y}),
  R: ({x,y}) => ({x: x+1, y}),
  D: ({x,y}) => ({x, y: y-1}),
  U: ({x,y}) => ({x, y: y+1}),
  LD: ({x,y}) => ({x: x-1, y: y-1}),
  LU: ({x,y}) => ({x: x-1, y: y+1}),
  RD: ({x,y}) => ({x: x+1, y: y-1}),
  RU: ({x,y}) => ({x: x+1, y: y+1}),
}

plot = rope => {
  var size = 20
  var arr = [...Array(size)].map((_,j) => [...Array(size)].map((_,i) => '.'))
  rope.reverse().forEach(({x,y}, i_) => {
    var i = rope.length - i_ - 1
    arr[size - (y+5) - 1][(x+5)] = i == 0 ? 'H' : i
  })
  return arr.map(line => line.join('')).join('\n  ')
}

move = ({rope, visited}, [dir, n]) => {
  //console.log(' ', plot(rope))
  //console.log('  move', dir, n, rope.reverse())
  while (n > 0) {
    //console.log('rope', rope.map(({x,y}) => `${x},${y}`))
    rope.forEach(({x,y}, i, a) => {
      if (i==0) a[0] = moves[dir]({x,y})
      else {
        //console.log('  rope', a.map(({x,y}) => `${x},${y}`))
        var [dx, dy] = [a[i-1].x - x, a[i-1].y - y]
        tailDir = ''
        if (dx > 1 || dx > 0 && manhattan(dx, dy) > 2) tailDir += 'R'
        else if (dx < -1 || dx < 0 && manhattan(dx, dy) > 2) tailDir += 'L'
        if (dy > 1 || dy > 0 && manhattan(dx, dy) > 2) tailDir += 'U'
        else if (dy < -1 || dy < 0 && manhattan(dx, dy) > 2) tailDir += 'D'
        //console.log('  dx', dx, 'dy', dy, '  tailDir', tailDir)
        a[i] = tailDir ? moves[tailDir]({x,y}) : {x,y}
      }
    })
    //console.log('  dx', dx, 'dy', dy, 'tailDir', tailDir)
    visited.add(rope.slice(-1).map(({x,y}) => `${x},${y}`)[0])
    //console.log('  visited', visited)
    n--
  }
  return {rope, visited}
}

solve = rope => input.reduce(move, {rope, visited: new Set}).visited.size

part1 = solve([{x:0, y:0}, {x:0, y:0}]) // 6498

part2 = solve(Array(10).fill({x:0,y:0})) // 2531