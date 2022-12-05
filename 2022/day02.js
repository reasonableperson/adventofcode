input = document.body.innerText.split('\n').filter(x=>x)
  .map(line => [line[0].charCodeAt()-65, line[2].charCodeAt()-88])

part1 = input.reduce((total, [them, us]) => (us==them ? 3 : [1,-2].includes(us-them) ? 6 : 0) + us + 1 + total, 0) // 10994

part2 = input.reduce((total, [them, outcome]) => [them<1?3:them, them+4, them<2?them+8:7][outcome] + total, 0) // 12526