var parse = str => [...str].map(c => parseInt(c,16).toString(2).padStart(4,0)).join('')

var operations = [
  ps => ps.reduce((a,b) => a+b, 0),
  ps => ps.reduce((a,b) => a*b, 1),
  ps => Math.min(...ps),
  ps => Math.max(...ps),
  null,
  ps => ps[0] > ps[1] ? 1 : 0,
  ps => ps[0] < ps[1] ? 1 : 0,
  ps => ps[0] == ps[1] ? 1 : 0
]

var literal = rest => {
  var [done, bs] = [false, '']
  while (!done) {
    if (rest[0] == 0) done = true
    bs += rest.slice(1,5)
    rest = rest.slice(5)
  }
  return [parseInt(bs,2), rest]
}

var open = (packet, sum = [0]) => {
  sum[0] += parseInt(packet.slice(0,3),2)
  var type = parseInt(packet.slice(3,6),2)
  var rest = packet.slice(6)
  if (type == 4)
	return literal(rest).concat([sum])
  else if (rest[0] == 0) {
    var length = parseInt(rest.slice(1,16),2)
	var payload = rest.slice(16, 16 + length)
	var list = []
	while (payload.length > 0) {
	  var [next, payload] = open(payload, sum)
	  list.push(next)
	}
	return [operations[type](list), rest.slice(16 + length), sum]
  } else {
	var count = parseInt(rest.slice(1,12),2)
	var list = []
	rest = rest.slice(12)
	while (count > 0) {
	  var [next, rest] = open(rest, sum)
	  list.push(next)
	  count--
	}
	return [operations[type](list), rest, sum]
  }
}

part1 = open(parse(document.body.innerText.trim()))[2][0] // 1007
part2 = open(parse(document.body.innerText.trim()))[0] // 834151779165