input = document.body.innerText.trim().split('\n')

rules = new Map(input.slice(2).map(r => r.split(' -> ')))

init = new Map([...rules.keys()].map(p => [p, input[0].includes(p) ? 1 : 0]))

step = (state, i = 0) => {
  if (i == 0) return state
  var result = new Map([...rules.keys()].map(p => [p, 0]))
  for (var [pair, count] of state)
	[pair[0] + rules.get(pair), rules.get(pair) + pair[1]]
	  .forEach(p => result.set(p, result.get(p) + count))
  return step(result, i - 1)
}

count = (state, input) => {
  var result = new Map([[input[0][0], 1], [input[0].at(-1), 1]])
  for ([k,v] of state) [...k].forEach(l => result.set(l, result.get(l) + v || v))
  var sorted = [...result.values()].map(x => x/2).sort((a,b) => a < b)
  return sorted[0] - sorted.at(-1)
}

count(step(init, 10), input) // 2740

count(step(init, 40), input) // 2959788056211