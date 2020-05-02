# App Project Scope

## Table of Content

## Project Site
Github Page: https://jessephamsg.github.io/

## Project Scope
The project involves building a skill profiler, by accepting and analysing users' data and inputs into the platform. Functionally, the app comprises 5 main components

- **Receiving Data via Forms**: getting this step right allows other features in the platform to behave correctly: a wrong user input leads to various types of errors to the charts (e.g when charts receive and process 'null' or 'NaN' due to wrong input type.)

- **Data Analysis**: data received will be analysed and displayed as charts. Different charts require different methods of aggregating and analysing data.

- **Result Matching**: Analysed data will be matched against another set of benchmark data.

- **Data Modification**: All data points can be edited. This requires identifying and modifying the correct data point, and proper data structure for easy access and maintenance. Any data modification event will also trigger the previous 3 events.

- **Showing the Existing Data State**: latest data set should always be reflected on the platform.


## Technology & App Infrastructure

**Basic Styling & Page Structure**: HTML, CSS

**External Frameworks**: Jquery, ChartJS, Ajax

```
JQuery: for DOM manipulation
```
```
ChartJS: for Radar Chart
```
```
Ajax: for API connections
```
**App Logic**: Javascript

**External Connections**: 
- **Work Industry Data**: https://data.gov.sg
- **Benchmark Data**: https://superheroapi.com

## User Stories

### Know what the app is about
As a user, I need to know what this app is about and receive basic instructions on how to navigate the app
<a href = 'https://www.dropbox.com/s/h8599xz1ozfl4di/Screenshot%202020-05-03%2001.03.26.png?dl=0' target = '_blank'><img src='https://www.dropbox.com/s/h8599xz1ozfl4di/Screenshot%202020-05-03%2001.03.26.png?dl=0' width='100%'></a>

### Add Job(s)
As a user, I would like to be able to key in details of my jobs/ hobbies/ activities
<a></a>


