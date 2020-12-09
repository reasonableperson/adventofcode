input = document.body.innerText.trim().split('\n').map(s => parseInt(s,10))

part1 = input.find((n,i) => (tail => i>25 && !tail.some(x => tail.includes(n-x)))(input.slice(i-25,i)))

part2 = (xs => Math.min(...xs) + Math.max(...xs))(input.map((_,i) => (rec = (acc,i0,i) => acc <= part1 && (acc==part1 ? input.slice(i0,i) : rec(acc+input[i],i0,i+1)))(0,i,i)).find(x => x))
