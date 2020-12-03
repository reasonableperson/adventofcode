input.map(line => line.split(/:? /)).filter(([range, char, pass]) => (([min, max, count]) => count >= min && count <= max)(range.split('-').concat([Array.from(pass).filter(c => c == char).length]))).length

input.map(line => line.split(/:? /)).filter(([index, char, pass]) => (([a, b]) => a ^ b)(index.split('-').map(i => pass[i-1] == char ? 1 : 0))).length
