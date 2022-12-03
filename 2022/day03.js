input = document.body.innerText.split('\n').filter(x=>x)

priority = chr => chr.charCodeAt() - (chr > "Z" ? 96 : 38)

common = strs => strs.reduce((arr,str) => arr.filter(chr => str.includes(chr)), [...strs[0]])[0] 

part1 = input.reduce((sum, l) => sum + priority(common([l.slice(0, l.length/2), l.slice(l.length/2)])), 0) // 7742

part2 = Array.from({length: input.length/3}, (_, i) => input.slice(3*i, 3*i+3))
  .reduce((a,b) => a + priority(common(b)), 0) // 2276