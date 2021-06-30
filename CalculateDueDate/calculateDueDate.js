'use strict';

const calculateDueDate = (submitDate, turnaroundTime) => {
  let dueDate = new Date(submitDate);
  const turnaroundHours = Math.floor(turnaroundTime);
  const turnaroundMinutes = Math.floor(60 * (turnaroundTime % 1));
  const turnaroundSeconds = Math.floor(3600 * (turnaroundTime % 1 - turnaroundMinutes / 60));
  const sameDay = ((dueDate.getHours() + turnaroundTime) < 17) ||
    (((dueDate.getHours() + turnaroundHours) === 17) &&
      ((dueDate.getMinutes() + turnaroundMinutes) === 0) &&
      ((dueDate.getSeconds() + turnaroundSeconds) === 0));

  if (sameDay) {

    dueDate.setHours(dueDate.getHours() + turnaroundHours);
    dueDate.setMinutes(dueDate.getMinutes() + turnaroundMinutes);
    dueDate.setSeconds(dueDate.getSeconds() + turnaroundSeconds);

  } else {
    const hour = 3600000;
    let sameDayEnd = new Date(submitDate);
    sameDayEnd.setTime(17 * hour)

    const remainingTurnaroundTime = turnaroundTime - (sameDayEnd - submitDate);

    dueDate.setDate(dueDate.getDate() + Math.floor(remainingTurnaroundTime / 8))
    dueDate.setTime((9 + (remainingTurnaroundTime % 8)) * hour)


  }
  return dueDate.toISOString();
}

module.exports = calculateDueDate;