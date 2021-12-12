input = document.body.innerText.trim().split('\n').map(pair => pair.split('-'))

caves = Object.fromEntries([...new Set(input.flat().filter(c => c!='end'))].map(cave => [cave,
  input.filter(pair => pair.includes(cave)).map(pair => pair.filter(c => c!=cave && c!='start')).flat()]))

small = cave => cave == cave.toLowerCase()

double = (cave, _, path) => small(cave) && path.filter(c => c==cave).length > 1

done = path => path.at(-1) == 'end'

solve = (caves, allowDoubleVisit) => {
  paths = [['start']]
  while (!paths.every(done)) {
    paths = paths.map(path => {
      if (done(path)) return [path]
      excluded = allowDoubleVisit && !path.find(double) ? [] : path.filter(small)
      return caves[path.at(-1)].filter(c => !excluded.includes(c)).map(c => path.concat(c))
    }).flat()
  }
  return paths.length
}

part1 = solve(caves) // 3761

part2 = solve(caves, true) // 99138