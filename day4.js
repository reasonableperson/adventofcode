// part 1
document.body.innerText.split("\n\n").map(passport => passport.split(/\s/).map(pair => pair.split(':')[0])).map(passport => ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].map(key => passport.includes(key)).reduce((a, b) => a && b)).filter(x => x).length

// part 2
document.body.innerText.split("\n\n").map(passport => Object.fromEntries(passport.split(/\s/).map(pair => pair.split(':')))).filter(passport => Object.entries({byr: x => x >= 1920 && x <= 2002, iyr: x => x >= 2010 && x <= 2020, eyr: x => x >= 2020 && x <= 2030, hgt: s => (hgt => /in$/.exec(s)?.[0] ? hgt >= 59 && hgt <= 76 : (/cm$/.exec(s)?.[0] ? hgt >= 150 && hgt <= 193 : false))(/\d+/.exec(s)), hcl: x => /^#[\da-f]{6}$/.test(x), ecl: x => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x), pid: x => /^\d{9}$/.test(x)}).map(([key, test]) => passport?.[key] && test(passport[key])).reduce((a, b) => a && b)).length
