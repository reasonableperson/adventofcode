// part 1
(xs => (x => 2020*x-x*x)(xs.map(x => 2020-x).find(x => xs.includes(x))))(document.body.innerText.trim().split('\n').map(n => parseInt(n,10)))

// part 2
(xs => xs.map(x => [x, xs.map(y => 2020 - x - y).filter(z => xs.includes(z))]).filter(x => x[1].length).reduce((p,x) => p*x[0],1))(document.body.innerText.trim().split('\n').map(n => parseInt(n,10)))
