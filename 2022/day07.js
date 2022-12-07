input = document.body.innerText.split('\n').slice(0,-1).map(l => l.split(' '))

walk = ([paths, cwd], line) => {
  if (line[0] == '$') {
    if (line[1] == 'cd') {
      console.log('cd', line[2])
      if (line[2] == '/')
        cwd = '/'
      else if (line[2] == '..') {
        cwd = cwd.split('/').slice(0, -1).join('/') || '/'
      }
      else {
        cwd += (cwd == '/' ? '' : '/') + line[2]
        paths[cwd] = null
      }
    } else {
      console.log('ls')
    }
  } else if (line[0] == 'dir') {
    console.log('dir', line[1])
  } else {
    console.log('file', line[0], line[1])
    paths[cwd] += parseInt(line[0])
  }
  console.log('paths', paths, 'cwd', cwd)
  return [paths, cwd]
}

paths = input.reduce(walk, [{'/': 0},'/'])[0]
sizes = Object.entries(paths)
  .map(([k1,v1],_,a) => v1 + a.filter(([k2,v2]) => (k2.length > k1.length) && k2.includes(k1)).reduce((a,b) => a+b[1], 0))

part1 = sizes.filter(s => s <= 100000).reduce((a,b)=>a+b) // 1555642
  
part2 = sizes.sort((a,b) => a > b).find((x,i,a) => x > 30000000 - (70000000 - a.slice(-1)[0])) // 5974547