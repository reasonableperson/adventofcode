input = document.body.innerText.trim().split('\n')

// common
commonest = input => [...Array(input[0].length).keys()].map(i => input.map(x => x[i])
  .filter(x => x == "1").length >= input.length / 2 ? "1" : "0")

// part 1
epsilon = commonest(input)
gamma = epsilon.map(x => x == "1" ? "0" : "1")
power = parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2)

// part 2
o2 = input; i = 0; while (o2.length > 1)
  {o2 = o2.filter(x => x[i] == commonest(o2)[i]); i++}
co2 = input; i = 0; while (co2.length > 1)
  {co2 = co2.filter(x => x[i] != commonest(co2)[i]); i++}
life = parseInt(o2.join(''), 2) * parseInt(co2.join(''), 2)
