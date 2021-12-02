input = document.body.innerText.trim().split('\n')
  .map(line => line.split(' ')).map(([instr, x]) => [instr, Number(x)])

move1 = ([pos, depth], [instr, x]) => ({
  forward: [pos + x, depth],
  down: [pos, depth + x],
  up: [pos, depth - x]
})[instr]

move2 = ([pos, depth, aim], [instr, x]) => ({
  forward: [pos + x, depth + aim * x, aim],
  down: [pos, depth, aim + x],
  up: [pos, depth, aim - x]
})[instr]

part1 = (([pos, depth]) => pos * depth)(input.reduce(move1, [0,0]))
part2 = (([pos, depth]) => pos * depth)(input.reduce(move2, [0,0,0]))
