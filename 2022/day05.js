var [stacks, steps] = document.body.innerText
  .split('\n\n').map(s => s.split('\n').filter(x=>x))

stacks = stacks.slice(0,-1).reverse()
stacks = stacks.reduce((result, line) => {
  line.match(/[A-Z]|    /g).forEach((m, i) => {
	if (/[A-Z]/.exec(m)) result[i] += m
  })
  return result
}, Array(9).fill(""))

steps = steps.map(s => s.match(/[0-9]+/g).map(d => parseInt(d)))

solve = pt => (result, [n, from, to]) => {
  var chunk = result[from-1].slice([result[from-1].length - n])
  if (pt == 1) chunk = [...chunk].reverse().join('')
  result[to-1] += chunk
  result[from-1] = result[from-1].slice(0, result[from-1].length - n)
  return result
}

part1 = steps.reduce(solve(1), stacks.slice()).reduce((r,s) => r + s.slice(-1)) // TDCHVHJTG

part2 = steps.reduce(solve(2), stacks.slice()).reduce((r,s) => r + s.slice(-1)) // NGCMPJLHV