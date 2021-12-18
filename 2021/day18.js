var input = (await Deno.readTextFile('in/day18_pt1.txt')).trim().split('\n').map(JSON.parse)

var get = (snailfish, path) => path.reduce((s, i) => s[i], snailfish)

var set = (snailfish, path, value) => {
  while (path.length > 1) snailfish = snailfish[path.shift()]
  snailfish[path[0]] = value
}

var traverse = snailfish => {
  var path = [0]
  var paths = []
  while (path.length > 0) {
    if (Array.isArray(get(snailfish, path)))
      path.push(0)
    else {
      paths.push([...path])
      while (path.at(-1) == 1) path.pop()
      path[path.length-1] = 1
    }
  }
  return paths
}

var explode = (snailfish, paths) => {
  var targetIndex = paths.findIndex(p => p.length > 4)
  var targetPath = paths[targetIndex]; targetPath.pop()
  var [leftPath, rightPath] = [paths?.[targetIndex-1], paths?.[targetIndex+2]]
  if (leftPath)
    set(snailfish, leftPath, get(snailfish, [...targetPath, 0]) + get(snailfish, leftPath))
  if (rightPath)
    set(snailfish, rightPath, get(snailfish, [...targetPath, 1]) + get(snailfish, rightPath))
  set(snailfish, targetPath, 0)
  return snailfish
}

var split = (snailfish, paths) => {
  var targetIndex = paths.findIndex(p => get(snailfish, p) > 9)
  var n = get(snailfish, paths[targetIndex])
  set(snailfish, paths[targetIndex], [Math.floor(n/2), Math.ceil(n/2)])
  return snailfish
}

var reduce = snailfish => {
  snailfish = JSON.parse(JSON.stringify(snailfish))
  while (true) {
    var paths = traverse(snailfish)
    if (paths.find(p => p.length > 4))
      snailfish = explode(snailfish, paths)
    else if (paths.find(p => get(snailfish, p) > 9))
      snailfish = split(snailfish, paths)
    else return snailfish
  }
}

var magnitude = snailfish => !Array.isArray(snailfish) ? snailfish :
  3 * magnitude(snailfish[0]) + 2 * magnitude(snailfish[1])

var part1 = magnitude(input.reduce((s1, s2) => reduce([s1, s2])))

console.log('part 1', part1) // 4347

var part2 = input.reduce((max, s1) => Math.max(max, ...input.map(s2 => magnitude(reduce([s1, s2])))), 0)

console.log('part 2', part2) // 4721