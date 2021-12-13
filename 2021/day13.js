var [dots, steps] = document.body.innerText.trim().split('\n\n').map(b => b.split('\n'))

dots = dots.map(xy => xy.split(',').map(Number))

steps = steps.map(s => [s.match(/x|y/)[0], s.match(/\d+/)[0]])

fold = (dots, [axis, offset]) => axis == 'y' ?
  dots.map(([x,y]) => y < offset ? [x,y] : [x, 2*offset-y]) :
  dots.map(([x,y]) => x < offset ? [x,y] : [2*offset-x, y])

set = dots => new Set(dots.map(([x,y]) => x+','+y))

draw = dots => {
  cache = set(dots)
  max = [0,1].map(x => Math.max(...dots.map(ij => ij[x])) + 1)
  result = [...Array(max[1])]
    .map((_,i) => [...Array(max[0])].map((_,j) => cache.has(j+','+i)?'█':' ').join(''))
    .join('\n')
  console.log(result)
}

part1 = set([steps[0]].reduce(fold, dots)).size // 621

part2 = draw(steps.reduce(fold, dots)) // HKUJGAJZ