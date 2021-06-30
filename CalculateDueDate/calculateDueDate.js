'use strict';

const calculateDueDate = (submitDate, turnaroundTime) => {
  const dueDate = new Date(submitDate);
  const hour = 3600000;
  const day = 24 * hour;
  const turnaroundHours = Math.floor(turnaroundTime);
  const turnaroundMinutes = Math.floor(60 * (turnaroundTime % 1));
  const turnaroundSeconds = Math.floor(3600 * (turnaroundTime % 1 - turnaroundMinutes / 60));
  const sameDay = ((dueDate.getHours() + turnaroundTime) < 17) ||
    (((dueDate.getHours() + turnaroundHours) === 17) &&
      ((dueDate.getMinutes() + turnaroundMinutes) === 0) &&
      ((dueDate.getSeconds() + turnaroundSeconds) === 0));

  if (sameDay) {

    dueDate.setTime(dueDate.getTime() + turnaroundTime * hour);

  } else {
    const sameDayEnd = new Date(submitDate);
    sameDayEnd.setHours(17, 0, 0);

    const remainingTurnaroundTime = turnaroundTime - (sameDayEnd.getTime() - dueDate.getTime()) / hour;
    const dueHours = 9 + Math.floor(remainingTurnaroundTime % 8);
    const dueMinutes = Math.floor(((remainingTurnaroundTime % 8) % 1) * 60);
    const dueSeconds = Math.floor(((((remainingTurnaroundTime % 8) % 1) * 60) % 1) * 60);
    dueDate.setDate(dueDate.getDate() + Math.floor(remainingTurnaroundTime / 8 + 1));
    dueDate.setHours(dueHours, dueMinutes, dueSeconds);

    const saturday = dueDate.getDay() === 6;
    const sunday = dueDate.getDay() === 0;

    if (saturday) {
      dueDate.setDate(dueDate.getDate() + 2);
    }
    if (sunday) {
      dueDate.setDate(dueDate.getDate() + 1);
    }

  }
  return dueDate.toString();
}

module.exports = calculateDueDate;