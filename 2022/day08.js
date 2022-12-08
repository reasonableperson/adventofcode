input = document.body.innerText.slice(0,-1).split('\n').map(l => l.split('').map(d => parseInt(d)))

side = [...Array(input.length)].map((_,i) => i)

coords = side.map(i => side.map(j => [i,j])).flat()

bearings = (i,j) => [
  side.slice(0,i).reverse().map(i_ => input[i_][j]), // up
  side.slice(0,j).reverse().map(j_ => input[i][j_]), // left
  side.slice(i+1).map(i_ => input[i_][j]), // down
  side.slice(j+1).map(j_ => input[i][j_])] // right

part1 = coords.filter(([i,j]) => bearings(i,j).some(b => b.every(ij => ij < input[i][j]))).length // 1801

until = (arr, func) => (i => i == -1 ? arr : arr.slice(0, Math.min(i + 1, arr.length)))(arr.findIndex(func))

score = ([i,j]) => bearings(i,j).map(b => until(b, ij => ij >= input[i][j]).length).reduce((a,b) => a*b, 1)

part2 = Math.max(...coords.map(score)) // 209880