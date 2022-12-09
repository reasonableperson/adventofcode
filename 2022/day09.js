input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`.split('\n').slice(0,-1).map(l => l.split(' ')).map(([d,n]) => [d, parseInt(n)])

input = document.body.innerText.split('\n').slice(0,-1).map(l => l.split(' ')).map(([d,n]) => [d, parseInt(n)])

manhattan = (dx, dy) => Math.abs(dx) + Math.abs(dy)

plot = ({head, tail}) => {
  size = Math.max(3, Math.max(...[head.x, head.y, tail.x, tail.y].map(Math.abs)) + 2)
  return [...Array(size)].map((_,j) => [...Array(size)].map((_,i) => {
    if (i==head.x && size-j-1==head.y) return 'H'
    if (i==tail.x && size-j-1==tail.y) return 'T'
    return '.'
  }).join('')).join('\n  ')
}

move = ({current: {head, tail}, visited}, [dir, n]) => {
  while (n > 0) {
    //console.log('H', `${head.x},${head.y}`, 'T', `${tail.x},${tail.y}`)
    //console.log(' ', plot({head, tail}))
    //console.log('  move', dir, n)
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
    head = moves[dir](head)
    var [dx, dy] = [head.x-tail.x, head.y-tail.y]
    tailDir = ''
    if (dx > 1 || dx > 0 && manhattan(dx, dy) > 2) tailDir += 'R'
    else if (dx < -1 || dx < 0 && manhattan(dx, dy) > 2) tailDir += 'L'
    if (dy > 1 || dy > 0 && manhattan(dx, dy) > 2) tailDir += 'U'
    else if (dy < -1 || dy < 0 && manhattan(dx, dy) > 2) tailDir += 'D'
    //console.log(' ', plot({head, tail}))
    console.log('  dx', dx, 'dy', dy, '  tailDir', tailDir)
    tail = tailDir ? moves[tailDir](tail) : tail
    //console.log('  dx', dx, 'dy', dy, 'tailDir', tailDir)
    //console.log('  H', next.head, 'T', next.tail)
    visited.add(`${tail.x},${tail.y}`)
    //console.log('  visited', visited)
    n--
  }
  return {current: {head, tail}, visited}
}

init = {current: {head: {x:0,y:0}, tail: {x:0,y:0}}, visited: new Set}

part1 = input.slice(0).reduce(move, init).visited.size