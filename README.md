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

### App Instructions
As a user, I need to know what to do when

#### First Using the App
- What the app is about
- How to set-up 

![Wireframes](https://github.com/jessephamsg/jessephamsg.github.io/blob/master/Wireframes/instructions.png)

#### Making Entry Mistakes
- What mistake was made
- How to edit the mistake

![Wireframes](https://github.com/jessephamsg/jessephamsg.github.io/blob/master/Wireframes/error-msg.png)

#### Typing Entry 
- What entry is expected
- What the labels mean

![Wireframes](https://github.com/jessephamsg/jessephamsg.github.io/blob/master/Wireframes/tooltip.png)

### Add/ Edit/ Review Job(s)
As a user, I would like to be able to key in details of my jobs/ hobbies/ activities, review and subsequently edit them after submiting the entries
- Add using Add Job button
- Edit and save edits using Save Edits
- Review entries by clicking on buttons on the Profile section

![Wireframes](https://github.com/jessephamsg/jessephamsg.github.io/blob/master/Wireframes/main-page.png)

### View Charts
As a user, I would like to view charts changed and updated every time I edit my own data

### Gain Experience
As a user, I would like to have options to gain more experience

![Wireframes](https://github.com/jessephamsg/jessephamsg.github.io/blob/master/Wireframes/gain-exp.png)

