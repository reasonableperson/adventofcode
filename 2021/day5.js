input = document.body.innerText.trim().split('\n')
  .map(pair => pair.split(/,| -> /).map(Number))

log = (x, y) => {
  point = x + "," + y
  if (point in points) points[point] += 1
  else points[point] = 1
}

traverse = ([x1, y1, x2, y2]) => {
  var [dx, dy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)]
  for (i = 0; i <= Math.max(Math.abs(x2-x1), Math.abs(y2-y1)); i++)
    log(x1 + i*dx, y1 + i*dy)
}

straight = ([x1, y1, x2, y2]) => x1 == x2 || y1 == y2
points = {}
input.filter(straight).forEach(traverse)
part1 = Object.values(points).filter(x => x > 1).length // 5698

points = {}
input.forEach(traverse)
part2 = Object.values(points).filter(x => x > 1).length // 15463