# App Project Scope

## Table of Content
- [Project Site](#project-site)
- [Project Approach](#project-approach)
- [Technology & App Infrastructure](#tech-infrastructure)
- [Code Organisation](#code-org)
- [User Stories](#user-stories)
    - [View App Instructions](#view-app-instructions)
    - [Add/ Edit/ Review Job(s)](#add-edit-review)
    - [View Charts & Aggregated Data](#view-chart)
    - [Job Match](#job-match)
    - [Gain Experience](#gajn-exp)
- [Wireframes](#wireframe)
- [Limitations](#limitations)

## Project Site
Github Page: https://jessephamsg.github.io/
***Important Notes***
- Users are not able to fully utilise all app features without installing **Moesif CORS Plugin**
- Users will not have the best experience when using other browsers other than **Chrome Desktop at full-page view**
- ChartJS used for chart is not stable when it comes to updating Data dynamically. The chart disappears when data is updated - **resizing the browser page** view is the quick fix to make the chart re-appear

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

- JQuery: for DOM manipulation
- ChartJS: for Radar Chart
- Ajax: for API connections

**App Logic**: Javascript

**External Connections**: 
- **Work Industry Data**: https://data.gov.sg
- **Benchmark Data**: https://superheroapi.com

## Code Organisation

### Javascript

|Files   |Purpose                                                    |Details|
|--------|-----------------------------------------------------------|---------------------------------------------------------------------|
|`app.js`| Contains all variables & objects' data structures that will be used by other modules/ components| This includes (1) ***DOM*** components, their variables, objects and clases (2) ***Work*** variables, objects and classes (3) ***Gain-exp*** variables, objects and classes (4) ***Stats*** variables, objects and classes|
|`helper.js`| Contains all reusable functions that can be used by other modules/ components| This includes those that allow you to (1) `elementFormatter` to build basic page elements (2) `workObjectFormatter` to build contents into cards (3) `entryChecker` to check user inputs (4) `uiManagement` to manage changes in styles and properties of DOM elements and (5) `objectStatsService` and `arrayStatsService` to operate on any objects/ arrays passed to them|
|`page-builder.js`| Contains codes that build the basic page sections & components| This includes (1) ***Top Navigator Section*** that comprises Logo and Page Title (2) ***Body Section*** that comprises Profile, Form, Stats Area and (3) ***Modal Section*** that comprises Task Modal and Exp Modal|
|`profiler.js`| Contains code logics relating to ***Work*** objects| This manages User Story relating to [Add/ Edit/ Review Job(s)](#add-edit-review)|
|`profile-chart.js`| Contains code logics relating to ***Stats*** objects | This manages User Story relating to [View Charts & Aggregated Data](#view-chart)|
|`match.js`| Contains code logics relating to ***Stats*** objects | This manages User Story relating to [Job Match](#job-match)|
|`exp.js`| Contains code logics relating to ***Gain-exp*** objects | This manages User Story relating to [Gain Experience](#gain-exp)|

### CSS

|Files   |Purpose                                                    |Details|
|--------|-----------------------------------------------------------|----------------------------------------------------------------------------|
|`main.css`| Contains global styles shared by all elements| This contains (1) ***Body*** Styles (e.g Button, Text, Container) (2) ***Navigation*** Pane Styles (e.g. Position, Size, Element Arrangement) (3) ***Section*** Styles (e.g. Position, Size, Element Arrangement)|
|`form.css`| Contains styles for forms| This comprises (1) ***Input Fields*** Styling (2) ***Error Message*** Styling (3) ***Tooltip*** Styling|
|`charts.css`| Contains styles for charts| This comprises (1) ***Progress Bar*** Styling (2) ***Elements within Stats Section*** Styling (e.g. h3, h4, div, text)|
|`modal.css`| Contains styles for modals | This compirses (1) ***Modal*** general styles and (2) ***Modal Content/ Cards*** styles|

## User Stories

----------------------------
### View App Instructions
As a user, I need to know what to do when

#### 1. First Using the App
- What the app is about
- How to set-up 

**Required Features**: Welcome Instructions 

#### 2. Making Entry Mistakes
- What mistake was made
- How to edit the mistake

**Required Features**: Error Messages
- Check for empty fields to prevent 'null' values
- Check for numerical/ text inputs to prevent 'NaN' values 

#### 3. Typing Entry 
- What entry is expected
- What the labels mean

**Required Features**: Tooltip & Alert
- Tooltip to tell users what the purposes of the required inputs
- Alert triggered on Save events 

----------------------------

### Add/ Edit/ Review Job(s)
As a user, I would like to be able to key in details of my jobs/ hobbies/ activities, review and subsequently edit them after submiting the entries
- Add using Add Job button
- Edit and save edits using Save Edits
- Review entries by clicking on buttons on the Profile section

**Required Features**: Add Jobs, Save Edits, Profile Buttons 
- Add New Job creates a new Work Object and add it into Profile
- Retrieve Job shows any particular Work Object of choice from the existing Profile
- Edit Job allows updating and editing any particular Work Object of choice from the existing Profile 

----------------------------

### View Charts & Aggregated Data
As a user, I would like to view charts and list changed, updated and aggregated every time I edit my own data

**Required Features**: Radar Chart, Progress Bar, Aggregated List
- Radar Chart: group all Tasks into general categories that can be eventually benchmark against other sets of industry data
- Enjoyment Progress Bar: sum all responses to Task Enjoyment and find the average 
- Industry Progress Bar: aggregate all responses by Industry and find sum of the years spent in each Industry
- Tasks Most Enjoyed List: aggregate all responses by the Level of Enjoyment and serve tasks with the highest Enjoyment score
- Average Team Size Score: sum all responses to Team Size and find the average 

----------------------------

### Job Match
As a user, I would like job match result changed and updated every time I edit my own data

**Required Features**: Matching Mechanism
- Matching Mechanism: choose a job from which the divergences are the least. This is based on general categories of Task Nature.

----------------------------

### Gain Experience
As a user, I would like to have options to gain more experience

**Require Features**: Aggregated List of Work/ Learning Opportunities
- Aggregation Mechanism: not yet developed.

----------------------------

## Wireframes

![Wireframes](https://github.com/jessephamsg/jessephamsg.github.io/blob/master/Wireframes/main-page.png)

- Top Section: Basic information of page
- Leftmost Section: Work Profile
- Middle & Bottom Section: Analytics
- Rightmost Section: where user actions are require: Form & Form fields

Features to make the app user-friendly & Easy to navigate
- Tooltip
- Welcome modal
- Error Message

## Limitations

The app does not have the following features:
- Allowing users to edit task cards
- Allowing users to delete
- Aggregating mechanism for Learning/Work Opportunities 
- Mapping Experience gained back to the Work profile
- Not all Error cases have been accounted for
- Users are not able to fully utilise all app features without installing Moesif CORS Plugin
- Users will not have the best experience when using other browsers other than Chrome Desktop at full-page view
- ChartJS used for chart is not stable when it comes to updating Data dynamically. The chart disappears when data is updated - resizing the browser page view is the quick fix to make the chart re-appear

