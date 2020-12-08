// part 1
document.body.innerText.trim().split('\n').filter((row, i) => row[3*i % row.length] == '#').length

// part 2
(input => [[1,1], [3,1], [5,1], [7,1], [1,2]].map(([r, d]) => input.filter((row, i) => i*d < input.length && input[i*d][i*r % row.length] == '#').length).reduce((a, b) => a * b))(document.body.innerText.trim().split('\n'))
