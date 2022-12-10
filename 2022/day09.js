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

move = ({rope, visited}, [dir, n]) => {
  while (n > 0) {
    rope.forEach(({x,y}, i, a) => {
      if (i==0) a[0] = moves[dir]({x,y})
      else {
        var [dx, dy] = [a[i-1].x - x, a[i-1].y - y]
        tailDir = ''
        if (dx > 1 || dx > 0 && manhattan(dx, dy) > 2) tailDir += 'R'
        else if (dx < -1 || dx < 0 && manhattan(dx, dy) > 2) tailDir += 'L'
        if (dy > 1 || dy > 0 && manhattan(dx, dy) > 2) tailDir += 'U'
        else if (dy < -1 || dy < 0 && manhattan(dx, dy) > 2) tailDir += 'D'
        a[i] = tailDir ? moves[tailDir]({x,y}) : {x,y}
      }
    })
    visited.add(rope.slice(-1).map(({x,y}) => `${x},${y}`)[0])
    n--
  }
  return {rope, visited}
}

solve = rope => input.reduce(move, {rope, visited: new Set}).visited.size

part1 = solve([{x:0, y:0}, {x:0, y:0}]) // 6498

part2 = solve(Array(10).fill({x:0,y:0})) // 2531