// common
[[start],...buses] = document.body.innerText.trim().split(/[\n,]/).map((bus,i)=>[bus,i]).filter(([bus,i])=>bus>0)

// part 1
buses.reduce((acc, [bus]) => (delay => acc && delay > acc[1] ? acc : [bus, delay])
(Math.ceil(start/bus)*bus-start), 0).reduce((a,b) => a*b) // 119

// part 2
constrain = ({t,m,dm},[bus,i]) => ((t+i)%bus==0) ? {t,m,dm:bus*dm} : constrain({t:t+t/m*dm,m:m+dm,dm:dm},[bus,i])
buses.reduce(constrain, {t:1,m:1,dm:1}).t // 1106724616194525
