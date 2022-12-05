input = document.body.innerText
  .split('\n\n').map(s => s.split('\n').filter(x=>x))

stacks = input[0].slice(0,-1).reverse()
  .reduce((a, row) => row.match(/[A-Z]|    /g).map((m,i) => a[i] + (m[1]?'':m)),
    Array((input[0][0].length + 1) / 4).fill('') )

steps = input[1].map(s => s.match(/[0-9]+/g).map(d => parseInt(d)-1))

solve = pt => (result, [n, from, to]) => {
  chunk = result[from].slice(-1-n)
  result[to] += pt == 1 ? [...chunk].reverse().join('') : chunk
  result[from] = result[from].slice(0,-1-n)
  return result
}

part1 = steps.reduce(solve(1), stacks.slice()).reduce((r,s) => r + s.slice(-1)) // TDCHVHJTG

part2 = steps.reduce(solve(2), stacks.slice()).reduce((r,s) => r + s.slice(-1)) // NGCMPJLHV