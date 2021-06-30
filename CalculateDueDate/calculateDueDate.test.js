'use strict';

const dueDate = require('./calculateDueDate');

//Same day

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

//Same week

test('Submitted in the morning, 16 hour turnaround', () => {
  expect(dueDate('2021-06-28T10:00:00.000Z', 16)).toBe('2021-06-30T10:00:00.000Z');
});

//Different week

test('Submitted in the morning, 16 hour turnaround', () => {
  expect(dueDate('2021-06-25T10:00:00.000Z', 16)).toBe('2021-06-29T10:00:00.000Z');
});

//Different month

test('Submitted in the morning, 16 hour turnaround', () => {
  expect(dueDate('2021-06-30T10:00:00.000Z', 16)).toBe('2021-07-02T10:00:00.000Z');
});

//Different year

test('Submitted in the morning, 16 hour turnaround', () => {
  expect(dueDate('2020-12-31T10:00:00.000Z', 16)).toBe('2021-01-04T10:00:00.000Z');
});