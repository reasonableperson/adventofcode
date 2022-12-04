input = document.body.innerText.split('\n').filter(x=>x)
  .map(l => l.split(/,|-/).map(s => parseInt(s)))

part1 = input.filter(([a,b,c,d]) => a<=c && b>=d || c<=a && d>=b).length // 475

part2 = input.filter(([a,b,c,d]) => b>=c && d>=a).length // 825