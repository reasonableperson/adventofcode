iterate = (n, input=document.body.innerText) => {
  input = input.trim().split(','); last = input.pop(); i = 2
  state = input.reduce((arr,n,j) => {i++; arr[n]=j+1; return arr}, [])
  while (i<=n) { next=state[last]?i-1-state[last]:0; state[last]=i-1; last=next; i++ }
  return last
}

// part 1
iterate(2020) // 319

// part 2
iterate(30000000) // 2424
