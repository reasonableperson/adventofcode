// common
input = document.body.innerText.trim().split('\n').map(l=>[l[0],parseInt(l.slice(1),10)])
manhattan = S => Math.abs(S.x) + Math.abs(S.y)

// part 1
rule = (S, [cmd, arg]) => ({
  N: _=>({...S, y:  S.y + arg }),
  S: _=>({...S, y:  S.y - arg }),
  E: _=>({...S, x:  S.x + arg }),
  W: _=>({...S, x:  S.x - arg }),
  L: _=>({...S, θ: (S.θ + arg) % 360 }),
  R: _=>({...S, θ: (S.θ - arg + 360) % 360 }),
  F: _=>rule(S, ['ENWS'[S.θ/90], arg])
})[cmd]()
manhattan(input.reduce(rule, {x:0, y:0, θ:0}))

// part 2
turn = ({x,y},θ) => θ < 90 ? {x:x,y:y} : turn({x:-1*y, y:x}, θ - 90)
rule = (S, [cmd, arg]) => ({
  N: _=>({...S, v: {...S.v, y: S.v.y + arg} }),
  S: _=>({...S, v: {...S.v, y: S.v.y - arg} }),
  E: _=>({...S, v: {...S.v, x: S.v.x + arg} }),
  W: _=>({...S, v: {...S.v, x: S.v.x - arg} }),
  L: _=>({...S, v: turn(S.v, arg) }),
  R: _=>({...S, v: turn(S.v, 360 - arg) }),
  F: _=>({...S, x: S.x + S.v.x*arg, y: S.y + S.v.y*arg })
})[cmd]()
manhattan(input.reduce(rule, {x:0, y:0, v:{x:10,y:1}}))
