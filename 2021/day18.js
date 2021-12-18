// var ex1 = (await Deno.readTextFile('in/day18_ex1.txt')).trim().split('\n').map(JSON.parse)
// var ex2 = (await Deno.readTextFile('in/day18_ex2.txt')).trim().split('\n').map(JSON.parse)
// var ex3 = (await Deno.readTextFile('in/day18_ex3.txt')).trim().split('\n').map(JSON.parse)
// var ex4 = (await Deno.readTextFile('in/day18_ex4.txt')).trim().split('\n').map(JSON.parse)
// var ex5 = (await Deno.readTextFile('in/day18_ex5.txt')).trim().split('\n').map(JSON.parse)
// var ex6 = (await Deno.readTextFile('in/day18_ex6.txt')).trim().split('\n').map(JSON.parse)
// var ex7 = (await Deno.readTextFile('in/day18_ex7.txt')).trim().split('\n').map(JSON.parse)

var input = (await Deno.readTextFile('in/day18_pt1.txt')).trim().split('\n').map(JSON.parse)

var assert = (output, expected) => {
  output = JSON.stringify(output)
  expected = JSON.stringify(expected)
  console.log(output, output == expected)
  if (output != expected) console.log(expected, 'expected')
}

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
    // console.log('path', path, 'current', current)
    if (path.length == 0) {return list}
    if (Array.isArray(current)) {
      path.push(0)
    } else if (path.at(-1) == 0) {
      // console.log('  add left', current, path)
      list.push([...path])
      path[path.length-1] = 1
      // console.log('  list', list)
    } else {
      // console.log('  add right', current, path)
      list.push([...path])
      while (path.at(-1) == 1) path.pop()
      path[path.length-1] = 1
      // console.log('  list', list)
    }
  }
}

var explode = (snailfish, paths = traverse(snailfish)) => {
  // console.log('paths', paths)
  var paths = traverse(snailfish)
  var targetIndex = paths.findIndex((p,i) => p.length > 4 && p.length == paths[i+1].length)
  // console.log('targetIndex', targetIndex, 'targetPathLong', paths[targetIndex])
  var targetPath = paths[targetIndex].slice(0, paths[targetIndex].length-1)
  var leftPath = paths?.[targetIndex-1]
  var rightPath = paths?.[targetIndex+2]
  // console.log('explode', JSON.stringify(snailfish), targetPath, leftPath, rightPath)
  if (leftPath) {
    // console.log('set left', get(snailfish, targetPath.concat([0])),'+', get(snailfish, leftPath))
    set(snailfish, leftPath, get(snailfish, targetPath.concat([0])) + get(snailfish, leftPath))
  }
  if (rightPath) {
    // console.log('set right', get(snailfish, targetPath.concat([1])),'+', get(snailfish, rightPath))
    set(snailfish, rightPath, get(snailfish, targetPath.concat([1])) + get(snailfish, rightPath))
  }
  set(snailfish, targetPath, 0)
  // console.log('after explode:', JSON.stringify(snailfish))
  return snailfish
}

// assert(explode([[[[[9,8],1],2],3],4]), [[[[0,9],2],3],4])
// assert(explode([7,[6,[5,[4,[3,2]]]]]), [7,[6,[5,[7,0]]]])
// assert(explode([[6,[5,[4,[3,2]]]],1]), [[6,[5,[7,0]]],3])
// assert(explode([[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]), [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]])
// assert(explode([[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]), [[3,[2,[8,0]]],[9,[5,[7,0]]]])
// assert(explode([[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]), [[[[0,7],4],[7,[[8,4],9]]],[1,1]])
// assert(explode([[[[0,7],4],[7,[[8,4],9]]],[1,1]]), [[[[0,7],4],[15,[0,13]]],[1,1]])

var split = (snailfish, paths = traverse(snailfish)) => {
  var targetIndex = paths.findIndex(p => get(snailfish, p) > 9)
  var n = get(snailfish, paths[targetIndex])
  // console.log('path', paths[targetIndex], 'n', n)
  set(snailfish, paths[targetIndex], [Math.floor(n/2), Math.ceil(n/2)])
  // console.log('after split:', JSON.stringify(snailfish))
  return snailfish
}

// assert(split([[[[0,7],4],[15,[0,13]]],[1,1]]), [[[[0,7],4],[[7,8],[0,13]]],[1,1]])
// assert(split([[[[0,7],4],[[7,8],[0,13]]],[1,1]]), [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]])

var reduce = snailfish => {
  // console.log('reduce', JSON.stringify(snailfish))
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

// assert(reduce([[[1,1],[2,2]],[3,3]]), [[[1,1],[2,2]],[3,3]])
// assert(reduce([[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]), [[[[0,7],4],[[7,8],[6,0]]],[8,1]])

var part1 = input => input.slice(1)
  .reduce((prev, next) => reduce([prev, next]), input[0])

// assert(part1(ex1), [[[[0,7],4],[[7,8],[6,0]]],[8,1]])
// assert(part1(ex2), [[[[1,1],[2,2]],[3,3]],[4,4]])
// assert(part1(ex3), [[[[3,0],[5,3]],[4,4]],[5,5]])
// assert(part1(ex4), [[[[5,0],[7,4]],[5,5]],[6,6]])
// assert(part1(ex5), [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]])
// assert(part1(ex6), [[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]])

var magnitude = snailfish => {
  if (!Array.isArray(snailfish)) return snailfish
  return 3*magnitude(snailfish[0]) + 2*magnitude(snailfish[1])
}

// assert(magnitude([9,1]), 29)
// assert(magnitude([1,9]), 21)
// assert(magnitude([[9,1],[1,9]]), 129)
// assert(magnitude(part1(ex6)), 4140)

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