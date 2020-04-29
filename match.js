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
        let createDelta = 0;
        let influenceDelta = 0;
        let researchDelta = 0;
        let organiseDelta = 0;
        (radarChartData.data.create) ? createDelta = parseInt(radarChartData.data.create) - parseInt(array[i].powerstats.speed) : createDelta = parseInt(array[i].powerstats.speed);
        (radarChartData.data.influence) ? influenceDelta = parseInt(radarChartData.data.influence) - parseInt(array[i].powerstats.power) : influenceDelta = parseInt(array[i].powerstats.power);
        (radarChartData.data.research) ? researchDelta = parseInt(radarChartData.data.research) - parseInt(array[i].powerstats.intelligence) : researchDelta = parseInt(array[i].powerstats.intelligence);
        (radarChartData.data.organise) ? organiseDelta = parseInt(radarChartData.data.organise) - parseInt(array[i].powerstats.combat) : organiseDelta = parseInt(array[i].powerstats.combat);
        let averageDelta = (createDelta + influenceDelta + researchDelta + organiseDelta) / 4;
        let newObject = new Object();
        newObject.delta = averageDelta;
        newObject.name = array[i].name;
        newObject.url = array[i].image.url;
        newObject.research = array[i].powerstats.intelligence;
        newObject.create = array[i].powerstats.speed;
        newObject.influence = array[i].powerstats.power;
        newObject.organise = array[i].powerstats.combat;
        deltaToSuperHeroes.push(newObject);
    };
    getMinimumDelta(deltaToSuperHeroes);
}


const getMinimumDelta = (array) => {
    let filteredArr = array.filter(data => isNaN(data.delta) === false);
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
    $('#bottom-links').append($('<img>').attr('src', `${object.url}`).attr('width', '80%'));
    $('#bottom-links').append($('<div>').text(`Research: ${object.research}`));
    $('#bottom-links').append($('<div>').text(`Create: ${object.create}`));
    $('#bottom-links').append($('<div>').text(`Influence: ${object.influence}`));
    $('#bottom-links').append($('<div>').text(`Organise: ${object.organise}`));
}

