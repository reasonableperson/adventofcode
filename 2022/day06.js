solve = (str, n) => n + [...Array(str.length - n)].findIndex((_, i) => new Set(str.slice(i, i + n)).size == n)

part1 = solve(document.body.innerText, 4) // 1965

part2 = solve(document.body.innerText, 14) // 2773