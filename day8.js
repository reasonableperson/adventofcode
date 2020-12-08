// common
exec = ([op,arg],i,acc) => ({jmp: (arg,i,acc) => [i+arg,acc], acc: (arg,i,acc) => [i+1,acc+arg], nop: (_,i,acc) => [i+1,acc]})[op](arg,i,acc)
read = (tape,until,then) => (rec = ([seen=new Set, i=0, acc=0]) => until(seen,i) ? then(i,acc) : rec([seen.add(i), ...exec(tape[i],i,acc)]))([])
tape = document.body.innerText.trim().split('\n').map(s => s.split(' ')).map(([op,arg],i) => [op,parseInt(arg,10),i])

// part 1
read(tape,(seen,i) => seen.has(i), (i,acc) => acc)

// part 2
tape.filter(([op,arg,i]) => /p/.test(op))
  .map(([op,arg,flip]) => tape.map(([op,arg,i]) => [i==flip?(op=='nop'?'jmp':'nop'):op,arg]))
  .reduce((prv,nxt) => prv||read(nxt, (seen,i) => seen.has(i)||i==nxt.length, (i,acc) => i==nxt.length?acc:0), 0)
