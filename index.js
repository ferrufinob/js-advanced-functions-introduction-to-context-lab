// one array containing 4 elements
function createEmployeeRecord(arr) {
  //create an Object w/ keys
  let employeeRecord = {
    firstName: `${arr[0]}`,
    familyName: `${arr[1]}`,
    title: `${arr[2]}`,
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecord;
}

function createEmployeeRecords(arr) {
  return arr.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
  // YYYY-MM-DD HHMM format
  let TimeIn = {
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0],
  };
  employeeRecord.timeInEvents.push(TimeIn);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  let TimeOut = {
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0],
  };
  employeeRecord.timeOutEvents.push(TimeOut);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  // given a date time lapsed between timeIn and Timeout
  let timeIn = employeeRecord.timeInEvents.find(function (event) {
    return event.date === date;
  });
  let timeOut = employeeRecord.timeOutEvents.find(function (event) {
    return event.date === date;
  });
  //   debugger;
  //   console.log(timeIn);
  //   console.log(timeOut);
  let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  //   let timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
  //   let timeOut = employeeRecord.timeOutEvents.find(
  //     (event) => event.date === date
  //   );
  //   let wageEarned =
  //     ((timeOut.hour - timeIn.hour) / 100) * employeeRecord.payPerHour;
  //   return wageEarned;
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  let dates = employeeRecord.timeInEvents.map((event) => event.date);
  let totalAmount = dates.reduce(function (payTotal, date) {
    // console.log(payTotal);
    // console.log(date);
    return wagesEarnedOnDate(employeeRecord, date) + payTotal;
  }, 0);
  return totalAmount;
}

function findEmployeeByFirstName(scrArray, firstName) {
  return scrArray.find((src) => src.firstName === firstName);
}

function calculatePayroll(employeeArray) {
  /// create an array of all wages
  let wages = employeeArray.map((employee) => allWagesFor(employee));
  /// add all the ages and reduce to total sum
  return wages.reduce(function (total, el) {
    return el + total;
  });
}

// TESTING
let bre = createEmployeeRecord(["Brenda", "Ferrufino", "n/a", 30]);
let tommy = createEmployeeRecord(["Tommy", "T", "Bar", 30]);
let clockIn1 = createTimeInEvent(bre, "2009-09-17 0900");
let clockIn2 = createTimeInEvent(bre, "2009-09-18 0900");
let clockOut1 = createTimeOutEvent(bre, "2009-09-17 0500");
let clockOut2 = createTimeOutEvent(bre, "2009-09-18 0500");
let workedHours = hoursWorkedOnDate(bre, "2009-09-17");
let earned = wagesEarnedOnDate(bre, "2009-09-17");
let myWages = allWagesFor(bre);
let findMe = findEmployeeByFirstName([bre, tommy], "Brenda");
let allWages = calculatePayroll([bre, tommy]);
