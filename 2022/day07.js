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
        paths.push([cwd, 0])
      }
    }
  } else if (line[0] != 'dir') {
    paths.find(p => p[0] == cwd)[1] += parseInt(line[0])
  }
  return [paths, cwd]
}

sizes = input.reduce(walk, [[['/', 0]],'/'])[0]
  .map(([k1,v1],_,a) => a.reduce((sum, [k2,v2]) => sum + (k2.slice(0, k1.length) == k1 ? v2 : 0), 0))

part1 = sizes.reduce((sum, s) => s <= 100000 ? s + sum : sum, 0) // 1555642
  
part2 = sizes.sort((a,b) => a > b).find((x,i,a) => x > a.slice(-1)[0] - 40000000) // 5974547