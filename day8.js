// common
exec = ([i,op,arg],acc) => ({jmp: (i,arg,acc) => [i+arg,acc], acc: (i,arg,acc) => [i+1,acc+arg], nop: (i,_,acc) => [i+1,acc]})[op](i,arg,acc)
read = (tape,until,then) => (rec = ([seen=new Set, i=0, acc=0]) => until(seen,i) ? then(i,acc) : rec([seen.add(i), ...exec(tape[i],acc)]))([])
tape = document.body.innerText.trim().split('\n').map(s => s.split(' ')).map(([op,arg],i) => [i,op,parseInt(arg,10)])

// part 1
read(tape, (seen,i) => seen.has(i), (i,acc) => acc)

// part 2
tape.filter(([i,op,arg]) => /p/.test(op))
  .map(([flip]) => tape.map(([i,op,arg]) => [i,i==flip?(op=='nop'?'jmp':'nop'):op,arg]))
  .reduce((prv,nxt) => prv||read(nxt, (seen,i) => seen.has(i)||i==nxt.length, (i,acc) => i==nxt.length?acc:0), 0)
