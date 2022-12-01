sums = document.body.innerText.split('\n\n')
  .map(l => l.split('\n').reduce((a,b) => a + parseInt(b), 0))
  .sort((a,b) => a < b).slice(0,3)

part1 = sums[0] // 66186
part2 = sums.reduce((a,b) => a+b) // 196804