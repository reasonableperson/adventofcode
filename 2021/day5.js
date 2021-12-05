input = document.body.innerText.trim().split('\n')
  .map(pair => pair.split(/,| -> /).map(Number))

update = (map, [x, y]) => map.set(x+","+y, map.get(x+","+y) + 1 || 1)

traverse = (map, [x1, y1, x2, y2]) => {
  [dx, dy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)]
  n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) + 1
  return [...Array(n).keys()]
    .map(i => [x1 + i*dx, y1 + i*dy])
    .reduce(update, map)
}

straight = ([x1, y1, x2, y2]) => x1 == x2 || y1 == y2

part1 = Array.from(input.filter(straight).reduce(traverse, new Map).values())
  .filter(x => x > 1).length // 5698

part2 = Array.from(input.reduce(traverse, new Map).values())
  .filter(x => x > 1).length // 15463