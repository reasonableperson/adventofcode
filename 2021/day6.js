var input = document.body.innerText.trim().split(',').map(Number)

var init = [...Array(9)].map((_,i) => input.filter(x => x==i).length)

var step = state => {
  var births = state.shift()
  state.push(births)
  state[6] += births
  return state
}

var solve = i => [...Array(i).keys()].reduce(step, init).reduce((a,b) => a+b, 0)

console.log('part 1', solve(80)) // 359999

console.log('part 2', solve(256)) // 1733469085783895