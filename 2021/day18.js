var input = (await Deno.readTextFile('in/day18_pt1.txt')).trim().split('\n').map(JSON.parse)

var get = (snailfish, path) => {
  path = JSON.parse(JSON.stringify(path))
  while (path.length > 0) snailfish = snailfish[path.shift()]
  return snailfish
}

var set = (snailfish, path, value) => {
  while (path.length > 1) snailfish = snailfish[path.shift()]
  snailfish[path.shift()] = value
}

var traverse = snailfish => {
  var path = [0]
  var list = []
  var current
  while (true) {
    current = get(snailfish, path)
    if (path.length == 0) {return list}
    if (Array.isArray(current)) {
      path.push(0)
    } else if (path.at(-1) == 0) {
      list.push([...path])
      path[path.length-1] = 1
    } else {
      list.push([...path])
      while (path.at(-1) == 1) path.pop()
      path[path.length-1] = 1
    }
  }
}

var explode = (snailfish, paths = traverse(snailfish)) => {
  var paths = traverse(snailfish)
  var targetIndex = paths.findIndex((p,i) => p.length > 4 && p.length == paths[i+1].length)
  var targetPath = paths[targetIndex].slice(0, paths[targetIndex].length-1)
  var leftPath = paths?.[targetIndex-1]
  var rightPath = paths?.[targetIndex+2]
  if (leftPath)
    set(snailfish, leftPath, get(snailfish, targetPath.concat([0])) + get(snailfish, leftPath))
  if (rightPath)
    set(snailfish, rightPath, get(snailfish, targetPath.concat([1])) + get(snailfish, rightPath))
  set(snailfish, targetPath, 0)
  return snailfish
}

var split = (snailfish, paths = traverse(snailfish)) => {
  var targetIndex = paths.findIndex(p => get(snailfish, p) > 9)
  var n = get(snailfish, paths[targetIndex])
  set(snailfish, paths[targetIndex], [Math.floor(n/2), Math.ceil(n/2)])
  return snailfish
}

var reduce = snailfish => {
  snailfish = JSON.parse(JSON.stringify(snailfish))
  while (true) {
    var paths = traverse(snailfish)
    var find = paths.find((p,i) => p.length > 4 && p.length == paths[i+1].length)
    if (paths.find((p,i) => p.length > 4 && p.length == paths[i+1].length))
      snailfish = explode(snailfish, paths)
    else if (paths.find(p => get(snailfish, p) > 9))
      snailfish = split(snailfish, paths)
    else return snailfish
  }
}

var magnitude = snailfish => {
  if (!Array.isArray(snailfish)) return snailfish
  return 3*magnitude(snailfish[0]) + 2*magnitude(snailfish[1])
}

var part1 = input => input.slice(1)
  .reduce((prev, next) => reduce([prev, next]), input[0])

console.log(magnitude(part1(input))) // 4347

var part2 = input => {
  var max = 0
  input.forEach((s1, i) => input.forEach((s2, j) => {
    if (i != j) {
      var m = magnitude(reduce([s1, s2]))
      if (m > max) {
        console.log([i,j], JSON.stringify([s1,s2]), m)
        max = m
      }
    }
  }))
  return max
}

console.log(part2(input)) // 4721