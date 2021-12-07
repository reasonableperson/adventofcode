input = document.body.innerText.trim().split('\n')

draws = input[0].split(',')

boards = [...Array((input.length - 1) / 6).keys()]
  .map(i => input.slice(2 + 6*i, 7 + 6*i))
  .map(b => b.map(l => l.split(/ +/).filter(x => x).map(Number)))

transpose = board => board.map((l,i) => board.map(l => l[i]))

win = board =>
  board.concat(transpose(board)).some(l => l.every(i => i == '*'))

score = (board, n) => board
  .flat().reduce((a,b) => typeof b == "string" ? a : a + b, 0) * n

play = (boards, n) =>
  boards.map(b => b.map(l => l.map(i => i == n ? '*' : i)))

solve = (boards, endgame) => {
  winners = []
  for (i = 0; i < draws.length; i++) {
    boards = play(boards, draws[i])
    if (boards.find(win))
      winners = winners.concat(boards.filter(win))
	  boards = boards.filter(b => !win(b))
	  if (winners.length == endgame)
	    return score(winners.pop(), draws[i])
  }
}

part1 = solve(boards, 1) // 51034

part2 = solve(boards, boards.length) // 5434
