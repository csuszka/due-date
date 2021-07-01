## Installation
`npm install`

## Running tests
`npm test`

## Usage
The function calculateDueDate will return the string representation of a ticket's due date in local format, based on the date of the issue submission, and the work hours allocated to it.

### Syntax
`calculateDueDate(dateData, turnaroundHours)`

### Parameters

**dateData:**

It is either a string representing a date, or a date timetamp.

* example: 

  * date string: 'Tue Aug 19 1975 20:15:30 GMT+0200 (CEST)'
  * timestamp: 1625139994194

**turnaroundHours:**

A number, representing the hours 

* example: 
  * 16

### Return value
A string representing a date in local format.

* example: 

  * 'Tue Aug 19 1975 20:15:30 GMT+0200 (CEST)'
