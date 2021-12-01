// common
input = document.body.innerText.trim().split('\n').map(s => Array.from(s.matchAll(/[X\d]+/g)).flat())
b36 = dec => Array.from(parseInt(dec,10).toString(2).padStart(36,'0'))
reducer = soln => (([mem,mask],[a1,a2]) => a2 ? [soln(mem,mask,a1,a2),mask] : [mem,a1])
solve = soln => Array.from(input.reduce(reducer(soln),[new Map,''])[0].values()).reduce((a,b)=>a+b)

// part 1 == 6631883285184
solve((mem,mask,addr,val) => mem.set(addr, parseInt(Array.from(mask).map((c,i)=>c=='X'?b36(val)[i]:c).join(''),2)))

// part 2 == 3161838538691
solve((mem,mask,addr,val) => (xs => 
  Array.from({length:2**xs.length}, (_,i) => i.toString(2).padStart(xs.length,'0'))
    .map((b,i) => b36(addr).map((c,j) => mask[j]=='X' ? b[xs.indexOf(j)] : (mask[j]=='0' ? c : 1)).join(''))
    .reduce((mem,addr) => mem.set(addr, parseInt(val,10)), mem))
      (Array.from(mask).map((c,i)=>c=='X'?i:null).filter(i=>i!==null)))
