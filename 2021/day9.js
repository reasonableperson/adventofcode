input = document.body.innerText.trim().split('\n').map(line => [...line].map(Number))

// common

low = (i, j, a) => [a[i-1]?.[j], a[i+1]?.[j], a[i][j-1], a[i][j+1]]
  .every(adjacent => adjacent == undefined || a[i][j] < adjacent)

// part 1

part1 = input.map((r,i,a) => r.filter((x,j) => low(i,j,a)))
  .flat().map(x => x+1).reduce((a,b) => a+b) // 478

// part 2

neighbours = ([i,j], a) => [[i-1,j,a[i][j]], [i+1,j,a[i][j]], [i,j-1,a[i][j]], [i,j+1,a[i][j]]]
  .filter(([i,j,x]) => x < a[i]?.[j] && a[i]?.[j] < 9)
  .map(([i,j]) => [i,j,a[i][j]])

lows = input.map((r,i,a) => r.map((x,j) => low(i,j,a) ? [i,j] : null))
  .flat().filter(x=>x)
  
explore = ([i, j], a, queue = [], map = [...Array(input.length)].map(_ => Array(input.length))) => {
  map[i][j] = true
  queue = queue.concat(neighbours([i,j],a))
  while (queue.length > 0) {
    [i, j] = queue.pop()
	if (!map[i]?.[j])
	  map = explore([i,j], a, queue, map)
  }
  return map
}

lows.map(l => explore(l,input).flat().filter(x=>x).length)
  .sort((a,b)=>a<b).slice(0,3).reduce((a,b)=>a*b) // 1327014