input.map(x => [x, input.map(y => 2020 - x - y).filter(z => input.includes(z))]).filter(x => x[1].length).reduce((p, x) => p * x[0], 1)
