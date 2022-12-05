input = document.body.innerText
  .split('\n\n').map(s => s.split('\n').filter(x=>x))

stacks = input[0].slice(0,-1).reduce((result, _, i, arr) => 
  result.map((s, j) => s += arr[arr.length-1-i].match(/[A-Z]|    /g)[j] || ''),
  Array(9).fill("")).map(s => s.replaceAll(' ', ''))

steps = input[1].map(s => s.match(/[0-9]+/g).map(d => parseInt(d)))

solve = pt => (result, [n, from, to]) => {
  var chunk = result[from-1].slice([result[from-1].length - n])
  if (pt == 1) chunk = [...chunk].reverse().join('')
  result[to-1] += chunk
  result[from-1] = result[from-1].slice(0, result[from-1].length - n)
  return result
}

part1 = steps.reduce(solve(1), stacks.slice()).reduce((r,s) => r + s.slice(-1)) // TDCHVHJTG

part2 = steps.reduce(solve(2), stacks.slice()).reduce((r,s) => r + s.slice(-1)) // NGCMPJLHV