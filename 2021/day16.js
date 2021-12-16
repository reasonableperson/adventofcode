input = document.body.innerText.trim()
// examples = ['38006F45291200', 'EE00D40C823060', '8A004A801A8002F478', '620080001611562C8802118E34', 'C0015000016115A2E0802F182340', 'A0016C880162017C3686B18A3D4780']

parse = str => [...str].map(c => parseInt(c,16).toString(2).padStart(4,0)).join('')

open = (packet, recurse = Infinity) => {
  if (!packet.match(/1/)) {
	console.log('junk', packet)
	return 0
  }
  version = parseInt(packet.slice(0,3),2)
  sum += version
  var type = parseInt(packet.slice(3,6),2)
  var rest = packet.slice(6)
  var result = ''
  console.log('P', packet.length, recurse)
  if (type == 4) {
	console.log('  literal', 'version', version)
	var done = false
	while (rest.length > 4 && !done) {
	  if (rest[0] == 0) done = true
	  var byte = rest.slice(1,5)
	  rest = rest.slice(5)
	  result += byte
	}
	console.log('  result', result, 'rest', rest.length, 'recurse', recurse)
	if (rest.length > 5) open(rest, recurse - 1)
  } else {
	if (rest[0] == 0) {
	  console.log('  operator - length', 'version', version)
	  var length = parseInt(rest.slice(1,16),2)
	  console.log('  length', length, 'rest', rest.length - length - 16)
	  open(rest.slice(16, 16 + length))
	  open(rest.slice(16 + length), recurse - 1)
	} else {
	  console.log('  operator - subpacket', 'version', version)
	  recurse = parseInt(rest.slice(1,12),2)
	  console.log('  recurse', recurse, 'times')
	  open(rest.slice(12), recurse - 1)
	}
  }
  return sum
}

var sum = 0; open(parse(input)) // 1007

// open(parse(examples[5]))
// open(parse("281"))