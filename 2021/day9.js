input = document.body.innerText.trim().split('\n').map(line => [...line].map(Number))

neighbours = ([i,j], a) => [[i-1,j], [i+1,j], [i,j-1], [i,j+1]]
  .filter(([i,j]) => a[i]?.[j] != undefined)

low = (i, j, a) => neighbours([i,j], a).every(([i_,j_]) => a[i_][j_] > a[i][j])

basins = input.map((r,i,a) => r.map((x,j) => low(i,j,a) ? [i,j] : null)).flat().filter(x=>x)

part1 = basins.reduce((a, [i,j]) => a + input[i][j] + 1, 0) // 478

explore = ([i, j], a, queue = [], seen = (n => [...Array(n)].map(_ => Array(n)))(input.length)) => {
  seen[i][j] = true
  queue = queue.concat(neighbours([i,j],a).filter(([i_,j_]) => a[i][j] < a[i_][j_] && a[i_][j_] < 9 ))
  while (queue.length > 0) {
    [i, j] = queue.pop()
    if (!seen[i]?.[j]) seen = explore([i,j], a, queue, seen)
  }
  return seen
}

part2 = basins.map(l => explore(l,input).flat().filter(x=>x).length)
  .sort((a,b)=>a<b).slice(0,3).reduce((a,b)=>a*b) // 1327014