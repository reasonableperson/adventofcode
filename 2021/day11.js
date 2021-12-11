input = document.body.innerText.trim().split('\n').map(s => [...s].map(Number))

coords = grid => grid.map((l,i) => l.map((n,j) => [i,j])).flat()

neighbours = (i, j, grid) => [0,-1,1].map((x,_,a) => a.map(y => [i+x, j+y]))
  .flat().slice(1).filter(p => p.every(k => k>=0 && k<grid.length))

search = (i, j, list) => list.filter(([x,y]) => i==x && j==y).length > 0

step = (grid, stop, count=1, total=0) => {
  flashed = []
  grid = grid.map(l => [...l].map(n => n+1))
  to_flash = coords(grid).filter(([i,j]) => grid[i][j] > 9)
  while (to_flash.length > 0) {
    var [i,j] = to_flash.pop()
    flashed.push([i,j])
    neighbours(i,j,grid).forEach(([i,j]) => {
      grid[i][j] += 1
      if (grid[i][j] > 9 && !search(i, j, flashed.concat(to_flash)))
        to_flash.push([i,j])
    })
  }
  flashed.forEach(([i,j]) => { grid[i][j] = 0; total += 1 })
  if (grid.flat().reduce((a,b) => a+b) == 0) return count
  return count==stop ? total : step(grid, stop, count+1, total)
}

part1 = step(input, 100) // 1652

part2 = step(input) // 220