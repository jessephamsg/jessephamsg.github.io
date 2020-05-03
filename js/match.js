let charactersWithImage = [];


const getHeroesData = () => {

    let characterArr = [];
    for (let i = 0; i < 200; i++) {
        $.ajax({
            url: `https://superheroapi.com/api/10217003627744629/${i}`,
            success: (data) => {
                let characterObject = {};
                characterObject = { ...data };
                characterArr.push(characterObject);
                charactersWithImage = characterArr.filter(character => character.response === 'success');
                calculateDelta(charactersWithImage);
            }
        });
    };
}


const calculateDelta = (array) => {

    let deltaToSuperHeroes = [];

    for (let i = 0; i < array.length; i++) {

        //Calculate Delta// for each data point received
        let deltaArr = { createDelta: 0, influenceDelta: 0, researchDelta: 0, organiseDelta: 0 }
        let radarChartDataKeys = ['create', 'influence', 'research', 'organise'];
        let powerstatsKeys = ['speed', 'power', 'intelligence', 'combat'];
        let deltaArrKeys = Object.keys(deltaArr);
        for (let j = 0; j < radarChartDataKeys.length; j++) {
            (radarChartData.data[radarChartDataKeys[j]]) ? deltaArr[deltaArr[j]] = parseInt(radarChartData.data[radarChartDataKeys[j]]) - parseInt(array[i].powerstats[powerstatsKeys[j]]) : deltaArr[deltaArr[j]] = parseInt(array[i].powerstats[powerstatsKeys[j]]);
        }

        //Calculate Average Delta// for each data point received
        let sum = 0;
        for (let key in deltaArr) {
            sum = sum + deltaArr[key];
        }
        let averageDelta = sum / deltaArrKeys.length;

        //Create New Object// with each data point received
        let newObject = new Object();
        newObject.delta = averageDelta;
        newObject.name = array[i].name;
        newObject.url = array[i].image.url;
        newObject.research = array[i].powerstats.intelligence;
        newObject.create = array[i].powerstats.speed;
        newObject.influence = array[i].powerstats.power;
        newObject.organise = array[i].powerstats.combat;
        newObject.work = array[i].work.occupation;

        //Push into new Array of SuperHeroes
        deltaToSuperHeroes.push(newObject);
    };
    getMinimumDelta(deltaToSuperHeroes);
}


const getMinimumDelta = (array) => {

    //Filter for only Valid Delta
    let filteredArr = array.filter(data => isNaN(data.delta) === false);

    //Find the Min Delta
    let min = 100;
    for (let i = 0; i < filteredArr.length; i++) {
        filteredArr[i].delta < min ? min = filteredArr[i].delta : min;
    }
    let matchedCharacter = filteredArr.filter(data => data.delta === min)
    let character = matchedCharacter[0];
    renderMatchedProfile(character);
}


const buildMatchComponents = () => {

    $('.middle-section').append($('<div>').attr('id', 'bottom-links'));
}


const renderMatchedProfile = (object) => {

    $('#bottom-links').empty();
    $('#bottom-links').append($('<h4>').text('Your Closest Job Profile Match'));
    $('#bottom-links').append($('<p>').text(object.work));
    $('#bottom-links').append($('<img>').attr('src', `${object.url}`).attr('width', '80%'));
    $('#bottom-links').append($('<div>').text(`Research: ${object.research}`));
    $('#bottom-links').append($('<div>').text(`Create: ${object.create}`));
    $('#bottom-links').append($('<div>').text(`Influence: ${object.influence}`));
    $('#bottom-links').append($('<div>').text(`Organise: ${object.organise}`));
}

