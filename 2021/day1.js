const input = document.body.innerText.split('\n').map(x => parseInt(x))

// part 1
input.filter((x,i,a) => x > a[i-1]).length

// part 2
input.map((x,i,a) => a[i-1] + x + a[i+1]).filter((x,i,a) => x > a[i-1]).length
