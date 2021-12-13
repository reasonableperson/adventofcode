var [dots, steps] = document.body.innerText.trim().split('\n\n').map(block => block.split('\n'))

dots = dots.map(xy => xy.split(',').map(Number))

steps = steps.map(s => [s.match(/x|y/)[0], s.match(/\d+/)[0]])

flip = (dots, [axis, offset]) => axis == 'y' ?
  dots.map(([x,y]) => y < offset ? [x,y] : [x, offset - (Math.abs(y - offset))]) :
  dots.map(([x,y]) => x < offset ? [x,y] : [offset - (Math.abs(x - offset)), y])

set = dots => new Set(dots.map(([x,y]) => x+','+y))

draw = dots => {
  cache = set(dots)
  max = [0,1].map(x => Math.max(...dots.map(ij => ij[x])) + 1)
  result = [...Array(max[1])]
    .map((_,i) => [...Array(max[0])].map((_,j) => cache.has(j+','+i)?'█':' ').join(''))
    .join('\n')
  console.log(result)
}

part1 = set(steps.slice(0,1).reduce(flip, dots)).size // 621

part2 = draw(steps.reduce(flip, dots)) // HKUJGAJZ