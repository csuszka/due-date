'use strict';

const calculateDueDate = (submitDate, turnaroundTime) => {
  let dueDate = new Date(submitDate);
  const turnaroundHours = Math.floor(turnaroundTime);
  const turnaroundMinutes = Math.floor(60 * (turnaroundTime % 1));
  const turnaroundSeconds = Math.floor(3600 * (turnaroundTime % 1 - turnaroundMinutes / 60));

  dueDate.setHours(dueDate.getHours() + turnaroundHours);
  dueDate.setMinutes(dueDate.getMinutes() + turnaroundMinutes);
  dueDate.setSeconds(dueDate.getSeconds() + turnaroundSeconds);

  return dueDate.toISOString();
}

module.exports = calculateDueDate;