input = document.body.innerText.split('\n').slice(0,-1).map(l => l.split(' '))

parse = ([paths, cwd], line) => {
  if (line?.[2] == '..') {
    cwd = cwd.replace(/\/[^\/]+$/, '')
  } else if (line[1] == 'cd') {
    cwd = (cwd + '/' + line[2]).replace('//','/')
    paths.push([cwd, 0])
  } else if (line[0].match(/^[0-9]+/)) {
    paths.find(p => p[0] == cwd)[1] += parseInt(line[0])
  } return [paths, cwd]
}

total = (sizes, prefix) => sizes.reduce((sum, [path, size]) => path.slice(0, prefix.length) == prefix ? sum + size : sum, 0)

sizes = input.reduce(parse, [[],''])[0].map(([prefix, _], __, array) => total(array, prefix))

part1 = sizes.reduce((sum, s) => s <= 100000 ? s + sum : sum, 0) // 1555642
  
part2 = sizes.sort((a,b) => a > b).find((x,i,a) => x > a.slice(-1)[0] - 40000000) // 5974547