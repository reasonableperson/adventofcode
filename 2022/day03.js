input = document.body.innerText.split('\n').filter(x=>x)

priority = chr => chr.charCodeAt() - (chr > "Z" ? 96 : 38)

intersect = strs => strs.reduce((arr, str) => arr.filter(chr => str.includes(chr)), [...strs[0]])[0]

chunks = (arr, n) => Array.from({length: arr.length/n}, (_, i) => arr.slice(n*i, n*i+n))

part1 = input.reduce((sum, line) => sum + priority(intersect(chunks(line, line.length/2))), 0) // 7742

part2 = chunks(input, 3).reduce((sum, group) => sum + priority(intersect(group)), 0) // 2276