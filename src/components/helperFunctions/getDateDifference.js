export function getDateDifference(date1, date2) {
    var dt1 = new Date(date1)
    var dt2 = new Date(date2)
    return (dt2.getTime()-dt1.getTime())/(1000*3600*24)+1
}

getDateDifference()