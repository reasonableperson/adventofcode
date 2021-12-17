var input = await Deno.readTextFile('in/day17_part1.txt')

var parse = input => input.split(' ').slice(2).map(s => s.match(/[-\d]+/g).map(Number))

var hit = ([x,y],[[x1,x2],[y1,y2]]) => [x>=x1,x<=x2,y>=y1,y<=y2].every(x=>x)

var miss = ([x,y],[vx,vy],[[x1,x2],[y1,y2]]) => (vx==0 && x>x2) || (vy<0 && y<y1)

var step = ([[x,y], [vx,vy]], target) => {
  x += vx
  y += vy
  vx -= Math.sign(vx)
  vy -= 1
  return [[x,y],[vx,vy]]
}

var trace = (v, target, log = false) => {
  var v_init = v
  var result = []
  var xy = [0,0]
  var done = false
  var max = 0
  while(!done) {
    [xy, v] = step([xy, v], target)
    result.push(xy)
    max = Math.max(max, xy[1])
    done = hit(xy, target) || miss(xy, v, target)
  }
  if (hit(xy, target)) {
    if (log) console.log(v_init, hit(xy, target) ? 'hit' : 'miss', max, result)
    else console.log(v_init, hit(xy, target) ? 'hit' : 'miss', max)
  }
  else {
    console.log(v_init, hit(xy, target) ? 'hit' : 'miss')
    max = null
  }
  return max
}

var solve = ([[x1,x2],[y1,y2]]) => {
  var max = 0
  var result = null
  var solutions = []
  var [hits, misses] = [0,0]
  for (var vx = Math.floor(Math.sqrt(x1)); vx <= x2; vx++) {
    var [start1, end1, start2] = [false, false, false]
    for (var vy = Math.min(y1, 0); vy < x1; vy++) {
      var current_max = trace([vx,vy], [[x1,x2],[y1,y2]])
      if (current_max > max) {
        max = current_max
        result = [vx,vy]
      }
      if (current_max !== null) {
        hits++
        start1 = true
        if (end1) start2 = true
        solutions.push([vx,vy])
      } else {
        misses++
        if (start1) end1 = true
        if (start2) break
      }
    }
  }
  console.log('hits', hits, 'misses', misses, 'rate', hits/misses*100, '%')
  console.log('part1', max) // 4851
  console.log('part2', solutions.length) // 1739
  // console.log('solutions', solutions)
}

// ex 1: [0,0] [7,2] [13, 3] [18,3]
console.log(parse(input))
console.log()
solve(parse(input))
//trace([1,998], parse(input), true)