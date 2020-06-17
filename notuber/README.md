# The Ride-Hailing Service, Part 1

## Overview

This lab consists of:

- An index page that shows map.
- A stylesheet to make the map works.
- A script file to render the map and add marks.

This lab took 2 hours.

## Impact of performance enhancements

**Before optimizations:**

| Name      | Type      | Size    | Time |
| --------- | --------- | ------- | ---- |
| localhost | document  | 660 B   | 3 ms |
| style.css | stylesheet| 515 B   | 2 ms |
| map.js    | script    | 1.4 kB  | 2 ms |
| car.png   | png       | 4.7 kB  | 1 ms |

Finish: 1.08 s

**After optimizations:**

| Name      | Type      | Size    | Time |
| --------- | --------- | ------- | ---- |
| localhost | document  | 678 B   | 2 ms |
| style.css | stylesheet| 286 B   | 2 ms |
| map.js    | script    | 1.1 kB  | 1 ms |
| car.png   | png       | 4.7 kB  | 1 ms |

Finish: 1.05 s

## The Ride-Hailing Service, Part 2

This lab consists of:

- An index page that shows the map.
- A script file that
  - determines geolocation,
  - make a request to the ride-hailing API,
  - shows vehicles on the map,
  - calculating distances between vehicles and current location,
  - renders a polyline connecting current position and the closest vehicle,
  - displays places within one mile around current location, and
  - shows popup infowindow for each vehicle noting the distance from current location.

This lab took 3 hours.
