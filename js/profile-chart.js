//==========================
//DATA TO GENERATE STATS
//==========================


const radarChartData = {
    data: [],
    options: [],
}

const statsComponentIds = {
    teamSizeStats: { parent: 'average-team-size', child: 'size-stats' },
    enjoymentStats: { parent: 'average-enjoyment', child: 'best-task' },
    taskNatureStats: { parent: 'myChart', child: 'chart-label' },
    industryStats: { parent: 'industrial-experience' }
}

const componentLabels = {
    teamSizeStats: 'Average Team Size',
    enjoymentStats: 'Average Enjoyment',
    bestTask: 'Task Most Enjoyed',
    taskNatureLabelLineOne: 'YOUR SKILL MAP',
    taskNatureLabelLineTwo: 'BY TASK NATURE',
}


//============================
//FUNCTIONS TO EXECUTE STATS
//============================


const updateAllStats = () => {
    statsUpdate.calculateTaskNatureStats();
    statsService.createChart();
    statsService.updateEnjoymentStats();
    statsService.updateTeamStats();
    statsService.updateIndustryExperience();
    getHeroesData();
}

const buildStatsComponents = () => {
    statsBuilder.buildTeamSizeStats();
    statsBuilder.buildEnjoymentStats();
    statsBuilder.buildTaskNatureStats();
    statsBuilder.buildIndustryStats();
}


//======================================
//BUILD HTML ELEMENTS TO DISPLAYS STATS
//======================================


const statsBuilder = {

    buildTeamSizeStats() {

        //Access Id Data
        let teamSizeIds = statsComponentIds.teamSizeStats;

        //Create Component Wrapper
        $(`.${pageConstruct.bottomSection.leftSection.elementClass}`).after($('<div>').addClass('left-bottom-section'));

        //Create Component Heading
        $('.left-bottom-section').append($('<div>').attr('id', `${teamSizeIds.parent}`));
        $(`#${teamSizeIds.parent}`).append($('<h4>').text(componentLabels.teamSizeStats));

        //Create Body of Component
        $(`#${teamSizeIds.parent}`).append($('<div>').attr('id', `${teamSizeIds.child}`));
    },

    buildEnjoymentStats() {

        //Access Id Data
        let enjoymentIds = statsComponentIds.enjoymentStats;

        //Create Component Wrapper
        $('.left-bottom-section').append($('<div>').attr('id', `${enjoymentIds.parent}`));

        //Create Component Heading
        $(`#${enjoymentIds.parent}`).prepend($('<h4>').text(componentLabels.enjoymentStats));

        //Create Body of Component
        $(`#${enjoymentIds.parent}`).append($('<progress>').attr('max', '5').attr('id', 'enjoyment-progress'));
        $('progress').after($('<h4>').text(componentLabels.bestTask));
        $(`#${enjoymentIds.parent}`).append($('<div>').attr('id', `${enjoymentIds.child}`));
    },

    buildTaskNatureStats() {

        //Access Id Data
        let taskNatureIds = statsComponentIds.taskNatureStats;

        //Create Body of Component
        $('.middle-section').append($('<canvas>').attr('id', `${taskNatureIds.parent}`));
        $(`#${taskNatureIds.parent}`).after($('<div>').attr('id', `${taskNatureIds.child}`));
        $(`#${taskNatureIds.child}`).append($('<div>').text(componentLabels.taskNatureLabelLineOne));
        $(`#${taskNatureIds.child}`).append($('<div>').text(componentLabels.taskNatureLabelLineTwo));
    },

    buildIndustryStats() {

        //Access Id Data
        let industryStats = statsComponentIds.industryStats;

        //Create Body of Component
        $('.bottom-section').append($('<div>').addClass('left'));
        $('.middle-section').append($('<div>').attr('id', `${industryStats.parent}`));
    }
}


//======================================
//FUNCTIONS TO TRANSFORM DATA
//======================================


const statsUpdate = {

    calculateTaskNatureStats() {

        //Consolidate all Task Nature entries from the existing workProfile array
        let taskArray = [];
        for (let i = 0; i < workProfile.length; i++) {
            for (let j = 0; j < workProfile[i].taskNature.length; j++) taskArray.push(workProfile[i].taskNature[j]);
        }

        //Organise all tasks by Task Nature Category
        taskArray.reduce((taskCategories, taskActivity) => {
            if (taskActivity in taskCategories) {
                taskCategories[taskActivity]++
            } else {
                taskCategories[taskActivity] = 1;
            }
            profileInstance.taskNature = { ...taskCategories };
            return taskCategories
        }, {})
    },

    calculateTaskEnjoymentAvg() {

        //Consolidate all Task Enjoyment entries from the existing workProfile array
        let taskArray = [];
        for (let i = 0; i < workProfile.length; i++) {
            for (let j = 0; j < workProfile[i].taskEnjoyment.length; j++) taskArray.push(workProfile[i].taskEnjoyment[j]);
        }

        //Get Sum of all Task Enjoyment and find the average
        let sum = taskArray.reduce((enjoymentSum, taskEnjoyment) => enjoymentSum + parseInt(taskEnjoyment), 0);
        return sum / taskArray.length;
    },

    getMostEnjoyableTasks() {

        //Consolidate all Task Enjoyment, Task Description and Task Title entries from the existing workProfile array
        let allTaskEnjoymentArr = [];
        let allTaskDescArr = [];
        let allTaskTitleArr = [];
        for (let i = 0; i < workProfile.length; i++) {
            for (let j = 0; j < workProfile[i].taskEnjoyment.length; j++) {
                allTaskEnjoymentArr.push(workProfile[i].taskEnjoyment[j]);
                allTaskDescArr.push(workProfile[i].taskDescription[j]);
                allTaskTitleArr.push(workProfile[i].taskTitle[j]);
            }
        }

        //Organise them into task objects with 3 properties: taskEnjoyment, taskDescription and taskTitle
        let allTaskObj = [];
        for (i = 0; i < allTaskEnjoymentArr.length; i++) {
            let taskObject = new Object();
            taskObject.taskTitle = allTaskTitleArr[i];
            taskObject.taskDescription = allTaskDescArr[i];
            taskObject.taskEnjoyment = allTaskEnjoymentArr[i];
            allTaskObj.push(taskObject);
        }

        //Group task objects by level of Enjoyment
        let taskGroupedByEnjoyment = allTaskObj.reduce((acc, obj) => {
            let key = obj['taskEnjoyment'];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});

        //Get objects with the highest level of enjoyment
        let keyArr = Object.keys(taskGroupedByEnjoyment);
        let mostEnjoyedTask = taskGroupedByEnjoyment[keyArr[keyArr.length - 1]];
        return mostEnjoyedTask;
    },

    calculateTeamSizeAvg() {

        //Consolidate all Team Size entries
        let teamSizeArray = [];
        for (let i = 0; i < workProfile.length; i++) {
            teamSizeArray.push(workProfile[i].teamSize);
        }

        //Get Sum of all Team Szies and find the average
        let sum = teamSizeArray.reduce((teamSizeSum, teamSize) => teamSizeSum + parseInt(teamSize), 0);
        return sum / teamSizeArray.length;
    },

    getIndustryExperience() {

        //Consolidate all Work Duration and Industry entries
        let allWorkDurationArr = [];
        let allIndustry = [];
        for (let i = 0; i < workProfile.length; i++) {
            allWorkDurationArr.push(workProfile[i].workDuration);
            allIndustry.push(workProfile[i].industry);
        }

        //Organise them into objects with 2 properties: industry & workDuration
        let allExpObj = [];
        for (i = 0; i < allWorkDurationArr.length; i++) {
            let expObj = new Object();
            expObj.industry = allIndustry[i];
            expObj.workDuration = allWorkDurationArr[i];
            allExpObj.push(expObj);
        }
        console.log(allExpObj);

        //Group the objects by Industry
        let yearsGroupedByIndustry = allExpObj.reduce((acc, obj) => {
            let key = obj['industry'];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
        console.log(yearsGroupedByIndustry);

        //Find Industry Sum
        let industryExperience = {};
        for (key in yearsGroupedByIndustry) {
            let sum = yearsGroupedByIndustry[key].reduce((acc, obj) => acc + parseInt(obj.workDuration), 0);
            console.log(sum);
            industryExperience[key] = sum;
        }
        return industryExperience;
        console.log(industryExperience);
    },

    getTaskNatureData () {

        let i = 0;
        for (let key in profileInstance.taskNature) {
            let keyArr = Object.keys(profileInstance.taskNature);
            radarChartData.data[i] = profileInstance.taskNature[key];
            radarChartData.options[i] = key;
            i++
        }
    }

}


//======================================
//FUNCTIONS TO SERVE THE RESULTS
//======================================


const statsService = {

    createChart() {

        statsUpdate.getTaskNatureData();
        let ctx = $('#myChart');
        let radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: radarChartData.options,
                datasets: [{
                    label: 'Task Nature',
                    backgroundColor: "rgba(60, 37, 204,0.8)",
                    data: radarChartData.data,
                    borderColor: 'rgba(255, 255, 255,0.4)',
                    borderWidth: 0.5,
                    pointBackgroundColor: 'rgb(60,182,226)',
                    pointHoverRadisu: 7,
                }]
            },
            options: {
                scale: {
                    angleLines: {
                        color: 'rgba(255, 255, 255,0.4)',
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255,0.4)',
                    },
                    ticks: {
                        maxTicksLimit: 5,
                    }
                }
            }
        })
    },

    updateEnjoymentStats() {

        //Update value of the progress bar
        let average = statsUpdate.calculateTaskEnjoymentAvg();
        $('#enjoyment-progress').attr('value', `${average}`);

        //Clear the previous entries and update with the latest tasks user enjoys
        let mostEnjoyedTask = statsUpdate.getMostEnjoyableTasks();
        $('#best-task').empty();
        for (i = 0; i < mostEnjoyedTask.length; i++) {
            $('#best-task').append($('<div>').attr('id', `task-${i}`));
            $(`#task-${i}`).text(`${mostEnjoyedTask[i].taskTitle}: ${mostEnjoyedTask[i].taskDescription.substring(0, 30)}`);
        }
    },

    updateTeamStats() {

        //Clear the previous entries and update with the lastest team size stats
        let average = statsUpdate.calculateTeamSizeAvg();
        $('#size-stats').empty();
        $('#size-stats').text(`${average}`);
    },

    updateIndustryExperience() {

        //Clear the previous entries and update with the lastest industry experience stats
        let industryExperience = statsUpdate.getIndustryExperience();
        $('#industrial-experience').empty();
        $('#industrial-experience').append($('<h3>').text('Your Experience'));
        for (key in industryExperience) {
            $('#industrial-experience').append($('<h4>').text(`${key}`))
            $('#industrial-experience').append($('<progress>').attr('max', '10').attr('value', `${industryExperience[key]}`));
        }
    }
}

