// common
parse = l => l.split(',').map(s=>parseInt(s,10))
chk = n => (([a,b]) => n>=a&&n<=b);
[rules, my, near] = document.body.innerText.trim().split('\n\n').map(par=>par.split('\n'))
rules = rules.map(l => l.split(': '))
  .map(([f, rule]) => [f, rule.split(' or ').map(r => r.split('-').map(parse))])
my = my.map(parse).slice(1).flat()
near = near.map(parse).slice(1)

// part 1
valid = n => rules.map(r=>r[1]).flat().some(chk(n))
part1 = near.flat().filter(t => !valid(t)).reduce((a,b)=>a+b)

// part 2
tickets = near.filter(t => t.every(valid))
  .map(t => t.map(n => rules.map(([f,rs]) => rs.some(chk(n))&&f).filter(x=>x)))
slots = tickets[0].map((_,i) => tickets.map(t => t[i]))
  .map(ts => ts.reduce((acc, fields) => acc.filter(f => fields.includes(f))))
solved = new Map; while (slots.some(s => s.length>1))
slots = slots.map((s,i) => !s[1] && solved.set(s[0],i) && s || s.filter(f => !solved.has(f)))
part2 = Array.from(solved.entries()).filter(([f,i]) => /de/.test(f))
  .reduce((acc,[_,i]) => acc*my[i],1)
