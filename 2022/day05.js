var [stacks, steps] = document.body.innerText
  .split('\n\n').map(s => s.split('\n').filter(x=>x))

stacks = input.slice(0,-1).reverse()
stacks = stacks.reduce((result, line) => {
  line.match(/[A-Z]|    /g).forEach((m, i) => {
	if (/[A-Z]/.exec(m)) result[i] += m
  })
  return result
}, Array(9).fill(""))

steps = steps.map(s => s.match(/[0-9]+/g).map(d => parseInt(d)))

part1 = stacks.slice()
steps.forEach(([n, from, to]) => {
  while (n > 0) {
    part1[to-1] += part1[from-1][part1[from-1].length - 1]
    part1[from-1] = part1[from-1].slice(0, part1[from-1].length - 1)
	n--
  }
})
part1 = part1.reduce((result, s) => s=="" ? result : result + s[s.length-1], "") // TDCHVHJTG

part2 = stacks.slice()
steps.forEach(([n, from, to]) => {
  part2[to-1] += part2[from-1].slice([part2[from-1].length - n])
  part2[from-1] = part2[from-1].slice(0, part2[from-1].length - n)
})
part2 = part2.reduce((result, s) => s=="" ? result : result + s[s.length-1], "") // NGCMPJLHV