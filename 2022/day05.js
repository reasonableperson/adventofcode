var [stacks, steps] = document.body.innerText
  .split('\n\n').map(s => s.split('\n').filter(x=>x))

var [stacks, steps] = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`.split('\n\n').map(s => s.split('\n').filter(x=>x))

arr_stacks = stacks.reduce((result, _, i__, arr) => {
  // console.log('parsing line ', i__)
  var line = arr[arr.length - 1 - i__]
  if (/[0-9]/.exec(line)) line.match(/[0-9]/g).forEach((m, i) => {
    // console.log('  creating stack i = ', i)
    result[i] = []
  })
	if (/[A-Z]/.exec(line)) line.match(/[A-Z]|    /g).forEach((m, i) => {
    // console.log('  considering match ', m, ' where i = ', i)
	  if (/[A-Z]/.exec(m)) result[i] += m
	})
  return result
}, [])

tmp = arr_stacks.slice()
steps.map(s => s.match(/[0-9]+/g).map(d => parseInt(d))).forEach(([n, from, to]) => {
  while (n > 0) {
	console.log(tmp)
	console.log('move', n, 'from', from, 'to', to)
    tmp[to-1] += tmp[from-1][tmp[from-1].length - 1]
    tmp[from-1] = tmp[from-1].slice(0, tmp[from-1].length - 1)
	n--
  }
})

part1 = tmp.reduce((result, s) => s=="" ? result : result + s[s.length-1], "") // TDCHVHJTG

tmp = arr_stacks.slice()
steps.map(s => s.match(/[0-9]+/g).map(d => parseInt(d))).forEach(([n, from, to]) => {
  console.log(tmp)
  console.log('move', n, 'from', from, 'to', to)
  tmp[to-1] += tmp[from-1].slice([tmp[from-1].length - n])
  tmp[from-1] = tmp[from-1].slice(0, tmp[from-1].length - n)
})
part2 = tmp.reduce((result, s) => s=="" ? result : result + s[s.length-1], "")