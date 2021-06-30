'use strict';

const dueDate = require('./calculateDueDate');

//Same day

test('Same day: Submitted in the morning, 1 hour turnaround', () => {
  expect(dueDate('Mon Dec 18 1995 09:24:00 GMT+0100 (közép-európai téli idő)', 1)).toBe('Mon Dec 18 1995 10:24:00 GMT+0100 (közép-európai téli idő)');
});

test('Same day: Submitted exactly at the beginning of the workday, 1 hour turnaround', () => {
  expect(dueDate('Mon Dec 18 1995 09:00:00 GMT+0100 (közép-európai téli idő)', 1)).toBe('Mon Dec 18 1995 10:00:00 GMT+0100 (közép-európai téli idő)');
});

test('Same day: Ends exactly at the end of the workday, we expect no workday switches', () => {
  expect(dueDate('Mon Dec 18 1995 16:00:00 GMT+0100 (közép-európai téli idő)', 1)).toBe('Mon Dec 18 1995 17:00:00 GMT+0100 (közép-európai téli idő)');
});

test('Same day: Submitted exactly at the beginning of the workday, 8 hours turnaround, we expect no workday switches', () => {
  expect(dueDate('Mon Dec 18 1995 09:00:00 GMT+0100 (közép-európai téli idő)', 8)).toBe('Mon Dec 18 1995 17:00:00 GMT+0100 (közép-európai téli idő)');
});

//Same week

test('Same week: Submitted in the morning, 16 hours turnaround', () => {
  expect(dueDate('Mon Jun 28 2021 10:00:00 GMT+0200 (közép-európai nyári idő)', 16)).toBe('Wed Jun 30 2021 10:00:00 GMT+0200 (közép-európai nyári idő)');
});

//Different week

test('Different week: Submitted in the morning, 16 hours turnaround', () => {
  expect(dueDate('Fri Jun 25 2021 10:00:00 GMT+0200 (közép-európai nyári idő)', 16)).toBe('Tue Jun 29 2021 10:00:00 GMT+0200 (közép-európai nyári idő)');
});

test('Different week: More than a week long project. Submitted in the morning, 48 hours turnaround', () => {
  expect(dueDate('Fri Jun 25 2021 10:00:00 GMT+0200 (közép-európai nyári idő)', 48)).toBe('Tue Jul 05 2021 10:00:00 GMT+0200 (közép-európai nyári idő)');
});


//Different month

test('Different month: Submitted in the morning, 16 hours turnaround', () => {
  expect(dueDate('Wed Jun 30 2021 10:00:00 GMT+0200 (közép-európai nyári idő)', 16)).toBe('Fri Jul 02 2021 10:00:00 GMT+0200 (közép-európai nyári idő)');
});

test('Different month: Submitted in the morning, 25 hours turnaround', () => {
  expect(dueDate('Wed Jun 30 2021 10:00:00 GMT+0200 (közép-európai nyári idő)', 25)).toBe('Fri Jul 05 2021 11:00:00 GMT+0200 (közép-európai nyári idő)');
});

//Different year

test('Different year: Submitted in the morning, 16 hours turnaround', () => {
  expect(dueDate('Thu Dec 31 2020 16:00:00 GMT+0100 (közép-európai téli idő)', 16)).toBe('Mon Jan 04 2021 16:00:00 GMT+0100 (közép-európai téli idő)');
});

test('Different year: Submitted in the morning, 17 hours turnaround', () => {
  expect(dueDate('Thu Dec 31 2020 16:00:00 GMT+0100 (közép-európai téli idő)', 17)).toBe('Mon Jan 04 2021 17:00:00 GMT+0100 (közép-európai téli idő)');
});

test('Different year: Submitted in the morning, 20 hours turnaround', () => {
  expect(dueDate('Thu Dec 31 2020 16:00:00 GMT+0100 (közép-európai téli idő)', 20)).toBe('Tue Jan 05 2021 12:00:00 GMT+0100 (közép-európai téli idő)');
});

//Daylight savings

test('Daylight savings: Submitted in the morning, 8 hours turnaround', () => {
  expect(dueDate('Fri Mar 26 2021 16:00:00 GMT+0100 (közép-európai téli idő)', 8)).toBe('Mon Mar 29 2021 16:00:00 GMT+0200 (közép-európai nyári idő)');
});