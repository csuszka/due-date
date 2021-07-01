'use strict';

const calculateDueDate = (submitDate, turnaroundTime) => {
  const dueDate = new Date(submitDate);
  const hour = 3600000;
  const workWeek = 40;

  //Determining if the issue can be solved on the same day:
  const turnaroundHours = Math.floor(turnaroundTime);
  const turnaroundMinutes = Math.floor(60 * (turnaroundTime % 1));
  const turnaroundSeconds = Math.floor(3600 * (turnaroundTime % 1 - turnaroundMinutes / 60));
  const finishedBeforeEndOfDay = (dueDate.getHours() + turnaroundTime) < 17;
  const finishedAtEndOfDay = ((dueDate.getHours() + turnaroundHours) === 17) &&
    ((dueDate.getMinutes() + turnaroundMinutes) === 0) &&
    ((dueDate.getSeconds() + turnaroundSeconds) === 0);
  const sameDayTurnaround = finishedBeforeEndOfDay || finishedAtEndOfDay;

  if (sameDayTurnaround) {

    dueDate.setTime(dueDate.getTime() + turnaroundTime * hour);

  } else {

    //Calculating how much time is left after we finish the day:
    const sameDayEnd = new Date(submitDate);
    sameDayEnd.setHours(17, 0, 0);
    const remainingTurnaroundTime = turnaroundTime - (sameDayEnd.getTime() - dueDate.getTime()) / hour;
    const dueHours = 9 + Math.floor(remainingTurnaroundTime % 8);
    const dueMinutes = Math.floor(((remainingTurnaroundTime % 8) % 1) * 60);
    const dueSeconds = Math.floor(((((remainingTurnaroundTime % 8) % 1) * 60) % 1) * 60);

    //If we finished exactly at the end of the day, the end should be marked on that day:
    if (remainingTurnaroundTime % 8 === 0) {
      dueDate.setDate(dueDate.getDate() + Math.floor(remainingTurnaroundTime / 8));
      dueDate.setHours(dueHours + 8, dueMinutes, dueSeconds);
    } else {
      dueDate.setDate(dueDate.getDate() + 1 + Math.floor(remainingTurnaroundTime / 8));
      dueDate.setHours(dueHours, dueMinutes, dueSeconds);
    }

    //Weekend adjustments for different project lengths:
    const saturday = dueDate.getDay() === 6;
    const sunday = dueDate.getDay() === 0;

    if (turnaroundTime > workWeek) {
      let weekendCounter = 0;
      let currentDay = dueDate.getDay();
      for (let i = 0; i < 1 + Math.floor(remainingTurnaroundTime / 8); i++) {
        currentDay++;
        if (currentDay === 6) {
          weekendCounter++;
          currentDay = 2;
        }
      }
      dueDate.setDate(dueDate.getDate() + 2 * weekendCounter);
    }
    else if ((turnaroundTime <= workWeek) && (dueDate.getDay() !== 0 && dueDate.getDay() < (new Date(submitDate)).getDay())) {
      dueDate.setDate(dueDate.getDate() + 2);
    }
    else if ((turnaroundTime <= workWeek) && (saturday || sunday)) {
      dueDate.setDate(dueDate.getDate() + 2);
    }
  }
  return dueDate.toString();
}

module.exports = calculateDueDate;