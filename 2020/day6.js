// part 1
document.body.innerText.trim().split('\n\n').map(grp => new Set(grp.replaceAll('\n','')).size).reduce((a,b) => a+b)

// part 2
document.body.innerText.trim().split('\n\n').map(grp => grp.split('\n').reduce((a,b) => Array.from(a).filter(x => b.includes(x))).length).reduce((a,b) => a+b)
