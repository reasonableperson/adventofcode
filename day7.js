// part 1
(bags => Object.keys(bags).filter(check = name => bags[name].length ? bags[name] = bags[name].includes('shiny gold') || bags[name].some(check) : bags[name]).length)(Object.fromEntries(document.body.innerText.trim().split('\n').map(line => line.replaceAll(/\d | bags?|\./g,'').split(' contain ')).map(([name, desc]) => [name, desc == 'no other' ? false : desc.split(', ')])))

// part 2
(bags => (count = name => bags[name].length ? bags[name].reduce((acc, [n, name]) => acc + n * count(name), 1) : bags[name])('shiny gold'))(Object.fromEntries(document.body.innerText.trim().split('\n').map(line => line.replaceAll(/ bags?|\./g,'').split(' contain ')).map(([name, desc]) => [name, desc == 'no other' ? 1 : desc.split(', ').map(words => words.split(' ')).map(([n, ...name]) => [parseInt(n,10), name.join(' ')])]))) - 1
