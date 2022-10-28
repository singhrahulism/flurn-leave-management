export function getCalendarPeriodDates(calendarLeaves) {
    
    let calenderItems = calendarLeaves.reduce((acc, leave) => {
        let { fromDate, toDate } = leave;
        var fromDateObject = {
          ...acc,
          [fromDate]: {
            ...acc[fromDate],
            periods: [
              ...((acc[fromDate] || {}).periods || []),
              {
                startingDay: true,
                endingDay: false,
                color: leave.color
              }
            ]
          }
        };
        return {
          ...fromDateObject,
          [toDate]: {
            ...fromDateObject[toDate],
            periods: [
              ...((fromDateObject[toDate] || {})["periods"] || []),
              {
                startingDay: false,
                endingDay: true,
                color: leave.color
              }
            ]
          }
        };
      }, {});
    
      calenderItems = Object.keys(calenderItems)
      .sort()
      .reduce((obj, key) => {
        obj[key] = calenderItems[key];
        return obj;
      }, {});

      return calenderItems
}
