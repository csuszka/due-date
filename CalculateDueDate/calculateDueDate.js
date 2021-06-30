'use strict';

const calculateDueDate = (submitDate, turnaroundTime) => {
  let dueDate = new Date(submitDate);
  const hour = 3600000;
  const day = 24 * hour;
  const turnaroundHours = Math.floor(turnaroundTime);
  const turnaroundMinutes = Math.floor(60 * (turnaroundTime % 1));
  const turnaroundSeconds = Math.floor(3600 * (turnaroundTime % 1 - turnaroundMinutes / 60));
  const sameDay = ((dueDate.getHours() + turnaroundTime) < 17) ||
    (((dueDate.getHours() + turnaroundHours) === 17) &&
      ((dueDate.getMinutes() + turnaroundMinutes) === 0) &&
      ((dueDate.getSeconds() + turnaroundSeconds) === 0));
  console.log(dueDate.getHours() + turnaroundHours)
  if (sameDay) {

    dueDate.setTime(dueDate.getTime() + turnaroundTime * hour);

  } else {
    let sameDayEnd = new Date(submitDate);
    sameDayEnd.setTime(17 * hour)

    const remainingTurnaroundTime = turnaroundTime - (sameDayEnd - submitDate);

    dueDate.setDate(dueDate.getDate() + Math.floor(remainingTurnaroundTime / 8))
    dueDate.setTime((9 + (remainingTurnaroundTime % 8)) * hour)



  }
  console.log({ sameDay, dueDate, turnaroundHours, turnaroundMinutes, turnaroundSeconds })
  return dueDate.toString();
}

calculateDueDate('Thu Dec 31 2020 16:00:00 GMT+0100 (közép-európai téli idő)', 20);

module.exports = calculateDueDate;