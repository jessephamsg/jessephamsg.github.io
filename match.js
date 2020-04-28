let industryBenchmark = {};

const buildMatchComponents = () => {
    $('.middle-section').append($('<div>').attr('id', 'bottom-links'));
}

const getHeroesData = () => {
    $.ajax({
        url: 'https://superheroapi.com/api/10217003627744629/107',
        success: (data) => {
            industryBenchmark = {...data};
            $('#bottom-links').append($('<img>').attr('src', `${industryBenchmark.image.url}`).attr('width', '80%'));
            $('#bottom-links').append($('<div>').text(`Research: ${industryBenchmark.powerstats.intelligence}`));
            $('#bottom-links').append($('<div>').text(`Create: ${industryBenchmark.powerstats.speed}`));
            $('#bottom-links').append($('<div>').text(`Influence: ${industryBenchmark.powerstats.power}`));
            $('#bottom-links').append($('<div>').text(`Organise: ${industryBenchmark.powerstats.combat}`));
        }
    })
}

$(()=> {
    getHeroesData();
})