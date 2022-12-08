input = document.body.innerText.slice(0,-1).split('\n').map(l => l.split('').map(d => parseInt(d)))

side = [...Array(input.length)].map((_,i) => i)

coords = side.map(i => side.map(j => [i,j])).flat()

part1 = coords.reduce((sum, [i,j]) => {
  up = side.slice(0,i).every(i_ => input[i_][j] < input[i][j])
  left = side.slice(0,j).every(j_ => input[i][j_] < input[i][j])
  right = side.slice(j+1).every(j_ => input[i][j_] < input[i][j])
  down = side.slice(i+1).every(i_ => input[i_][j] < input[i][j])
  return [up, left, right, down].some(x => x) ? sum + 1 : sum
}, 0) // 1801

until = (arr, func) => {
  var i = arr.findIndex(func)
  return i == -1 ? arr : arr.slice(0, Math.min(i + 1, arr.length-1))
}

part2 = Math.max(...coords.map(([i,j]) => {
  up = until(side.slice(0,i).reverse(), i_ => input[i_][j] >= input[i][j]).map(i_ => input[i_][j])
  left = until(side.slice(0,j).reverse(), j_ => input[i][j_] >= input[i][j]).map(j_ => input[i][j_])
  right = until(side.slice(j+1), j_ => input[i][j_] >= input[i][j]).map(j_ => input[i][j_])
  down = until(side.slice(i+1), i_ => input[i_][j] >= input[i][j]).map(i_ => input[i_][j])
  return up.length * left.length * right.length * down.length
})) // 209880