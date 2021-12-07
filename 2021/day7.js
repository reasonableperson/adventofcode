input = document.body.innerText.trim().split(',').map(Number)

solve = cost => Math.min(...[...Array(Math.max(...input) + 1).keys()].map(cost))

part1 = solve(i => input.map(j => Math.abs(i - j)).reduce((a,b) => a+b, 0)) // 345197

part2 = solve(i => input.map(j => (n => n*(1+n)/2)(Math.abs(i - j))).reduce((a,b) => a+b, 0)) // 96361606