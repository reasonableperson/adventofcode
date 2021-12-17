var ex1 = (await Deno.readTextFile('in/day18_ex1.txt')).trim().split('\n')
var ex2 = `[1,1]
[2,2]
[3,3]
[4,4]`.split('\n')
var pt1 = (await Deno.readTextFile('in/day18_pt1.txt')).trim().split('\n')

var add = (l,r) => reduce([l,r])

var parse = s => {
  console.log('parse', s)
  var result = []
  var depth = 0
  var left = true
  var i = 0
  for (var c of s) {
    if (c == '[') { left = true; depth++ }
    if (c == ']') depth--
    if (c == ',') left = false
    if (Number(c + s[i+1]) > -1) {
      result.push([Number(c + s[i+1]), depth, left])
    }
    else if (Number(s[i-1] + c) > -1) {
      i++
      continue
    }
    else if (Number(c) > -1) {
      result.push([Number(c), depth, left])
    }
    i++
  }
  return result
}

var unparse = parsed => {
  console.log('unparse', parsed)
  var result = ''
  var current_depth = 0
  parsed.forEach(([n, depth, left], i) => {
    console.log(result, current_depth, '->', depth, 'add', n, left ? 'left':'right')
    if (depth > current_depth) result += '['.repeat(depth - current_depth)
    if (depth < current_depth) {
      if (left) result += ']'.repeat(current_depth - 1) + ',' + '['.repeat(depth - 1)
      else result += ']'.repeat(current_depth - depth) + ','
    }
    current_depth = depth
    result += n 
    if (left) result += ','
    else if (parsed[i+1]) {
      result += ']'
      current_depth -= 1
      // instead of checking for a depth change, we need to close all completed pairs,
      // and add a comma if an uncompleted pair remains
      console.log('  next', parsed[i+1], 'depth change?', parsed[i+1][1] != current_depth)
      if (!parsed[i+1][2] && parsed[i+1][1] == current_depth || parsed[i+1][1] != current_depth) result += ','
    }
  })
  return result + ']'.repeat(current_depth)
}

var explode = parsed => {
  // console.log('explode', parsed)
  var i = 0
  for (var [n, depth, left] of parsed) {
    if (depth > 4) {
      // console.log('add', [n, depth], 'to', parsed[i-1])
      if (parsed[i-1]) parsed[i-1][0] += parsed[i][0]
      // console.log('add', parsed[i+1][0], 'to', parsed[i+2][0])
      if (parsed[i+2]) parsed[i+2][0] += parsed[i+1][0]
      parsed[i] = null
      if (parsed[i-1]?.[1] == depth - 1) left = !parsed[i-1]?.[2]
      else if (parsed[i+2]?.[1] == depth - 1) left = !parsed[i+2]?.[2]
      else left = true
      parsed[i+1] = [0, depth - 1, left]
      // console.log(parsed.filter(x=>x))
      return parsed.filter(x=>x)
    }
    i++
  }
  return parsed
}

var split = parsed => {
  // console.log('split', parsed)
  var i = 0
  for (var [n, depth, left] of parsed) {
    if (n > 9) {
      parsed[i] = [Math.floor(n/2), depth + 1, true]
      parsed.splice(i + 1, 0, [Math.ceil(n/2), depth + 1, false])
      // console.log('after split', parsed)
      return parsed
    }
    i++
  }
  return parsed
}

var reduce = s => {
  var parsed = parse(s)
  while (true) {
    if (parsed.some(([_,depth,__]) => depth > 4)) {
      parsed = explode(parsed)
      console.log('after explode:', unparse(parsed))
    } else if (parsed.some(([n,_,__]) => n > 9)) {
      parsed = split(parsed)
      console.log('after split:', unparse(parsed))
    } else break
  }
  return unparse(parsed)
}

var solve = input => input.slice(1).reduce((prev, next) => {
  var sum = '[' + prev + ',' + next + ']'
  console.log('after addition:', sum)
  console.log('reduce', reduce(sum))
  return reduce(sum)
}, input[0])

var assert = (output, expected) => {
  console.log(output, output == expected)
  if (output != expected) console.log(expected, 'expected')
}

// assert(unparse(explode(parse('[[[[[9,8],1],2],3],4]'))), '[[[[0,9],2],3],4]')
// assert(unparse(explode(parse('[7,[6,[5,[4,[3,2]]]]]'))), '[7,[6,[5,[7,0]]]]')
// assert(unparse(explode(parse('[[6,[5,[4,[3,2]]]],1]'))), '[[6,[5,[7,0]]],3]')
// assert(unparse(explode(parse('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'))), '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]')
// assert(unparse(explode(parse('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'))), '[[3,[2,[8,0]]],[9,[5,[7,0]]]]')

// assert(unparse(explode(parse('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]'))), '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]')
// assert(unparse(explode(parse('[[[[0,7],4],[7,[[8,4],9]]],[1,1]]'))), '[[[[0,7],4],[15,[0,13]]],[1,1]]')
// assert(unparse(split(parse('[[[[0,7],4],[15,[0,13]]],[1,1]]'))), '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]')
// assert(unparse(split(parse('[[[[0,7],4],[[7,8],[0,13]]],[1,1]]'))), '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]')

// assert(solve(ex1), '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')

assert(reduce('[[[1,1],[2,2]],[3,3]]'), '[[[1,1],[2,2]],[3,3]]')

// console.log(solve(ex2))