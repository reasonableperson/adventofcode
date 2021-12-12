input = document.body.innerText.trim().split('\n').map(pair => pair.split('-'))

caves = Object.fromEntries([...new Set(input.flat().filter(c => c!='end'))]
  .map(cave => [cave, input.filter(pair => pair.includes(cave)).map(pair => pair.filter(c => c!=cave && c!='start')).flat()]))

small = cave => cave == cave.toLowerCase()

double = (cave, _, path) => small(cave) && path.filter(c => c==cave).length > 1

done = path => path.slice(-1)[0] == 'end'

solve = (caves, allowDoubleVisit) => {
  result = [['start']]
  while (!result.every(done)) {
    result = result.map(path => {
      if (done(path)) return [path]
      excluded = path.filter(allowDoubleVisit && !path.find(double) ? double : small)
      return caves[path.slice(-1)[0]].filter(c => !excluded.includes(c)).map(c => path.concat(c))
    }).flat()
  }
  return result.length
}

part1 = solve(caves) // 3761

part2 = solve(caves, true) // 99138