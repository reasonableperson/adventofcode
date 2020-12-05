// part 1
Math.max(...document.body.innerText.split("\n").filter(x => x).map(s => parseInt(s.replaceAll(/B|R/g, '1').replaceAll(/F|L/g, '0'), 2)))

// part 2
document.body.innerText.split("\n").filter(x => x).map(s => parseInt(s.replaceAll(/B|R/g, '1').replaceAll(/F|L/g, '0'), 2)).sort((a, b) => a > b).find((el, i, arr) => el != arr[i+1]-1) + 1
