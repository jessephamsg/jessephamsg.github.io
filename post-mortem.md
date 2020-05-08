# Approach and Process

## Approach Evaluation

**My Approach**
- **Step 0**: Test out all the APIs to have an idea of what could be possible, then define and refine the project idea
- **Step 1**: Prepare the wireframe to get a clearer idea of my desired user experience, thus the features required to create it
- **Step 2**: List the features I need to develop
- **Step 3**: Group the features into a few main components (1) Form Input Processing (2) Skill Visualisation and (3) Skill Profile Matching Mechanism.
- **Step 4**: Define MVP and put the components into timeline. The priority went to (1), followed by (2) and lastly (3). It's crucial to get (1) right since the performance of (2) and (3) depend on the data quality received from (1). The timeline for each component has some buffer time built in for testing and refactoring
- **Step 5**: Prioritise the features within each component: the Must-have and the Good-to-have

**What went well**
- I figured out that Console is really a great tool to fix my CSS quickly. I can simply add to the CSS file in Resources, and see instantly the effect of my changes for that particular app instance reflected, instead of reloading the whole app and click all the way to that particular app instance to view and test the CSS effect. Though my CSS file is long, it didn't take a lot of time to code and manage. 
- For weekly projects, I often code the logic first and then think about the wireframe. But it was faster to code things after the wireframe was already firmed up, and the basic page structure done
- It is good to refactor the codes after every 200 lines - I used to code everything first then start refactoring the entire file, but that was a more time-consuming and error-prone approach.

**What I would do differently next time**
- Not settling too early for the first wireframe. I realised that as I was developing the app, I was not really satisfied with the original wireframe, so I changed the page layout. I didn't know that simply changing the layout could trigger a series of change to not only the CSS, but also some of the features and their functionalities.  
- Find a better way to manage the creation of DOM components and their IDs. It still seems a little messy right now
- For any part of the app that involves Creation, Modifying and Editing, it might be a good idea to generate an object ID for every user input received - it makes it easier to access and manage the data


## Code Design Evaluation

**My Code Design**
- Each code file serves either one of these purposes (1) to be reused throughout by other files or (2) to serve a particular User Story Theme/ Component core features
- Methods/ Functions of similar nature are grouped into one object
- Reduce hard-coded elements within the code files. All elements related to the content of the site are housed in one place and other files should access these content by calling the objects. 

**What went well**
- Because of the way the code was designed, it was simple to just change the content of the site from within the `app.js` file, and other files would not be affected
- Commenting well helps with debugging a lot 

**What I would do differently next time**
- Object design can be improved. I still feel that it is still not intuitive enough for others to understand and maintain. 
- Think of code efficiency: E.g. Use Promise.all for Superhero API call for a more efficient process


## Unit 1 Evaluation

**Good Habits**
- Refactoring
- Work with objects
- Build gradually. Take it one step at a time. 
- When stuck, ALWAYS go back to the basic. It is often the basic that will be keys to the problem
- Function and variable naming should do half of the job in explaning what the function does. Over-reliance on comments makes the code base looks disjointed.
- Use console to learn

**To Improve**
- Use more methods made specifically for Objects/ Arrays
- Declare varibles in for-loop
- Name JQuery variables with a dollar sign

**Overall Course Level**
- It is great! But having more lessons on code design pattern (if such a term exists in the field) would be much better. It is easier to learn when knowing the principles (i.e. the designs, framework) before knowing the technicalities. 