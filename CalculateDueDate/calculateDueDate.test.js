'use strict';

const dueDate = require('./calculateDueDate');

test('Submitted in the morning, 1 hour turnaround', () => {
  expect(dueDate('1995-12-18T09:24:00.000Z', 1)).toBe('1995-12-18T10:24:00.000Z');
});

test('Submitted exactly at the beginning of the workday, 1 hour turnaround', () => {
  expect(dueDate('1995-12-18T09:00:00.000Z', 1)).toBe('1995-12-18T10:00:00.000Z');
});

test('Ends exactly at the end of the workday, we expect no workday switches', () => {
  expect(dueDate('1995-12-18T16:00:00.000Z', 1)).toBe('1995-12-18T17:00:00.000Z');
});

test('Submitted exactly at the beginning of the workday, 8 hours turnaround, we expect no workday switches', () => {
  expect(dueDate('1995-12-18T09:00:00.000Z', 8)).toBe('1995-12-18T17:00:00.000Z');
});