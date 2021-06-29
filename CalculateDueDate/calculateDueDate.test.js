'use strict';

const dueDate = require('./calculateDueDate');

test('Submitted in the morning, one hour turnaround', () => {
  expect(dueDate('1995-12-18T09:24:00.000Z', 1)).toBe('1995-12-18T10:24:00.000Z');
});