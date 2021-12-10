input = document.body.innerText.trim().split('\n')

close = left => ')]}>'['([{<'.indexOf(left)]

residue = input.map(l => [...l].reduce((a,b) => a.sub ? a : (')]}>'.includes(b) ? (close(a.shift())==b?a:b) : [b].concat(a)), []))

part1 = residue.reduce((a,c) => c.sub ? [3,57,1197,25137][')]}>'.indexOf(c)]+a:a,0) // 464991

part2 = residue.filter(c => !c.sub)
  .map(r => r.map(c => '([{<'.indexOf(c) + 1).reduce((a,b) => a*5+b, 0))
  .sort((a,b) => a > b).reduce((p,c,i,a) => a[Math.floor(a.length/2)]) // 3662008566