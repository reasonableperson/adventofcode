input = document.body.innerText.split('\n').slice(0,-1).map(l => l.split(' '))

walk = ([paths, cwd], line) => {
  if (line[0] == '$') {
    if (line[1] == 'cd') {
      if (line[2] == '/')
        cwd = '/'
      else if (line[2] == '..')
        cwd = cwd.split('/').slice(0, -1).join('/') || '/'
      else {
        cwd += (cwd == '/' ? '' : '/') + line[2]
        paths[cwd] = null
      }
    }
  } else if (line[0] != 'dir')
    paths[cwd] += parseInt(line[0])
  return [paths, cwd]
}

paths = input.reduce(walk, [{'/': 0},'/'])[0]

descendsFrom = (a, b) => b.length > a.length && b.slice(0, a.length) == a

sizes = Object.entries(paths)
  .map(([k1,v1],_,a) => v1 + a.reduce((sum, [k2,v2]) => sum + (descendsFrom(k1, k2) ? v2 : 0), 0))

part1 = sizes.reduce((sum, s) => s <= 100000 ? s + sum : sum, 0) // 1555642
  
part2 = sizes.sort((a,b) => a > b).find((x,i,a) => x > a.slice(-1)[0] - 40000000) // 5974547