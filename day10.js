gaps = document.body.innerText.trim().split('\n').sort((a,b) => a-b).map((n,i,a) => n-(a[i-1]||0))
pt1 = (x => x*(gaps.length+1-x)(gaps.filter(d => d<3).length)
pt2 = gaps.join('').split(3).reduce((a,b) => a*[1,1,2,4,7][b.length],1)
