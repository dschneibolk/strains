$(document).ready(function () {


    //======= Strains API =======
    $("#strainDiv").hide();

    var key = "PBbUlIS";


    $(".search").click(function () {
        var userSearch = (mySearch).value;

        var queryURL = "http://strainapi.evanbusse.com/" + key + "/strains/search/name/" + userSearch;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#strainDiv").show();
            console.log(response);
            $("#strainTitle").html("<h1 class='white'>" + response[0].name + "</h1> <hr class='hr-green'>");
            $("#strainRace").html("<h4 class='white'>" + response[0].race + "</h4> <br>");
            $("#strainDesc").html("<p class='white'>" + response[0].desc + "</p><br>");

            
            var strainID = response[0].id;
            console.log(response[0].race);
            if (response[0].race === "sativa") {
                var max_danceability = 1;
                var genre = "electronic%2C%20hip-hop";
                var foodPair= "mango";
                console.log("sativa");
            } else if (response[0].race === "hybrid") {
                var max_danceability = .5;
                var genre = "alternative%2C%20hip-hop";
                var foodPair= "salami";
                console.log("hybrid");
            } else if (response[0].race === "indica") {
                var max_danceability = .2;
                var genre = "chill%2C%20classical";
                var foodPair = "mushroom";
                console.log("indica");
            }


            //search effects
            var effectURL = "http://strainapi.evanbusse.com/" + key + "/strains/data/effects/" + strainID;

            $.ajax({
                url: effectURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#strainMedical").html("<p class='green'> <strong> Medical:</strong> <span class='white'>" + response.medical + "</span></p>");
                $("#strainPositive").html("<p class='green'> <strong> Positive:</strong> <span class='white'>" + response.positive + "</span></p>");
                $("#strainNegative").html("<p class='green'> <strong> Negative:</strong> <span class='white'>" + response.negative + "</span></p>");

            });

            //search flavors
            var effectURL = "http://strainapi.evanbusse.com/" + key + "/strains/data/flavors/" + strainID;

            $.ajax({
                url: effectURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#strainFlavors").append("<p class='green'> <strong> Flavors: </strong><span class='white'>" + response + "</span></p>");


            });
            userSearch = (mySearch).value;
            var token = 'BQAZ1g1duQugNXdwRkJCMmnOilUlt7fZFn9fBkvtDJi5ZRkP4V2rR7uURwxa2byrhoUfI6_S7zBhj8eqXGGpL6j323bLGHCHIt7WiCVJ0CzKXEG2lql3vP5VMkv31w4IeyrQE4rC_vUNONmWOEN7y5RvjY0mpEQVimIVEypLvIbaQhiELpG2vCfe';
            var queryURL = "https://api.spotify.com/v1/recommendations?limit=3&market=ES&seed_genres=" + genre + "&max_danceability=" + max_danceability;
            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(function (response) {
                console.log(response)
                //Uri (song specific) needeed
                for (var i = 0; i < response.tracks.length; i++) {
                    var songId = response.tracks[i].id;
                    var hrefStatic = "https://open.spotify.com/embed/track/" + songId;
                    var duration = response.tracks[i].duration_ms;
                    console.log(response);
                    console.log(songId);
                    console.log(duration);
                    $("iframe").attr("src", hrefStatic);
                    //console.log(response.tracks[i].duration_ms);
                }
                // var i = 0;
                // var intervalid = setInterval( function() {
                //     if (i < response.tracks.length) {
                //         console.log(response.tracks[i].id);
                //         i++;
                //     } else {
                //         clearInterval(intervalid)
                //         console.log("clearing interval")
                //     }
                // },10000)
                

            });
              
           
            $.ajax({
                url:  "https://api.punkapi.com/v2/beers?food=" + foodPair,
            }) .then(function(response){
                console.log(response);
            })

        });


        userSearch = (mySearch).value;
        return false;

    });


    $("#strainDiv").hide();




    //======= newsAPI =======


    var url = 'https://newsapi.org/v2/everything?' +
        'q=Cannabis&Music' +
        'from=2019-03-12&' +
        'sortBy=popularity&' +
        'apiKey=eb685845ec724a788b048c258c786cd7';

    var req = new Request(url);

    fetch(req)
        .then((response) => {
            console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log(data);

            let articleDiv = ""; 
            let articleCard = "";

            for (i = 0; i < 9; i++) {

                articleDiv = $("<div class='col-md-4'>");
                articleCard = $("<div class='card mb-5'>");
                articleImg = $("<img>");
                articleDesc = $("<p>");
                articleTitle = $("<a>");
                articleSource = $("<p>");
                articleDate = $("<p>");

                articleDiv.append(articleCard);
                $("#news-blog").append(articleDiv);
                articleCard.append(articleImg, articleTitle, articleDesc, articleDate, articleSource);
               
                //img
                articleImg.attr("class", "card-img-top img-fluid");
                articleImg.attr("id", "articleImg");
                articleImg.attr('src', data.articles[i].urlToImage);

                //title
                articleTitle.attr('href', data.articles[i].url);
                articleTitle.attr('class', "pl-2 pr-2");
                articleTitle.attr('id', "articleTitle");
                articleTitle.html(data.articles[i].title);

                //description
                articleDesc.html(data.articles[i].description);
                articleDesc.attr("id", "articleDesc");
                articleDesc.attr("class", "pl-2 pr-2");

                //source
                articleSource.attr("class", "card-footer mb-0");
                articleSource.html(data.articles[i].source.name);


            }
        });
});


