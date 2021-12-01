// common
input = document.body.innerText.trim().split('\n').map(line => line.split(''))
step = (grid,func,max) => grid.map((line,i) => Array.from(line).map((c,j) => c=='L'&&func(grid,i,j)==0 ? '#' : (c=='#'&&func(grid,i,j)>max ? 'L' : c)))
iter = (grid,func,max,last=[]) => grid.join('')==last.join('') ? grid.flat().filter(char => char=='#').length : iter(step(grid,func,max),func,max,grid)
dirns = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]]

// part 1
near = (grid,i,j) => dirns.reduce((acc,[di,dj]) => grid?.[i+di]?.[j+dj]=='#'?acc+1:acc,0)
iter(input,near,3) // 2344

// part 2
explore = (grid,i,j,[di,dj]) => (seat => !seat ? '.' : /[L#]/.test(seat) ? seat : explore(grid,i+di,j+dj,[di,dj]))(grid?.[i+di]?.[j+dj])
far = (grid,i,j) => dirns.reduce((acc,d) => explore(grid,i,j,d)=='#'?acc+1:acc,0)
iter(input,far,4) // 2076
