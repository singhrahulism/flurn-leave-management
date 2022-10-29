const data = [
    {
        start_date: '2022-10-10',
        end_date: '2022-10-10'
    },
    {
        start_date: '2022-10-14',
        end_date: '2022-10-17'
    },
    {
        start_date: '2022-10-29',
        end_date: '2022-10-30'
    }
]
const date = '2022-10-17'
const prevdata = data.filter(function (leave) {
    return ( new Date(leave.end_date)).getTime() <= ( new Date(date)).getTime()
})

console.log(data)
console.log(prevdata)

console.log(new Date().toISOString().replace(/T.*/,'').split('-').join('-'))