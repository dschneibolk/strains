
$(document).ready(function () {

    var key = "PBbUlIS";

    $(".search").click(function () {
        var userSearch = (mySearch).value;

        var queryURL = "http://strainapi.evanbusse.com/" + key + "/strains/search/name/" + userSearch;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#strain").html("<h1>" + response[0].name + "</h1> <br>");
            $("#strain").append("<h3>" + response[0].race + "</h1> <br>");
            $("#strain").append("<p>" + response[0].desc + "</p><br>");

            var strainID = response[0].id;
            console.log(response[0].race);
            if (response[0].race === "sativa") {
                var max_danceability = 100;
                var genre= "electronic";
                console.log("sativa");
            } else if (response[0].race === "hybrid") {
                var max_danceability = 35;
                var genre= "alternative";
                console.log("hybrid");
            } else if (response[0].race === "indica") {
                var max_danceability = 10;
                var genre= "chill";
                console.log("indica");
            }
            //search effects
            var effectURL = "http://strainapi.evanbusse.com/" + key + "/strains/data/effects/" + strainID;

            $.ajax({
                url: effectURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#strain").append("<p> <strong> Medical: </strong>" + response.medical + "</p>");
                $("#strain").append("<p> <strong> Positive: </strong>: " + response.positive + "</p>");
                $("#strain").append("<p> <strong> Negative: </strong>: " + response.negative + "</p>");

            });

            //search flavors
            var effectURL = "http://strainapi.evanbusse.com/" + key + "/strains/data/flavors/" + strainID;

            $.ajax({
                url: effectURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#strain").append("<p> <strong> Flavors: </strong>" + response + "</p>");


            });


            userSearch = (mySearch).value;
            var token = 'BQBP3c00DQAtqU9EWNLk10mT9Ew6ILGD_t-8NsFkrZ3Ak2Mt0ZL1OLnDWb0SJPoaJDEdqaR0YEsd62rIk9nOkN0B4iu4QnzsnkHTdAEUtpOw4tguwI0VdLRSB4dbjHxEkQ1ntR-wH1Erb2CfzkZETqDv59OYMbSoxzmrx5yMsQUKkxy3XV40Lza-';
            var queryURL = "https://api.spotify.com/v1/recommendations?limit=1&market=ES&seed_genres=" + genre + "&max_danceability=" + max_danceability;
            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then(function (response) {
                    //Uri (song specific) needeed
        
                    var songUri= response.tracks[0].uri;
                    console.log(songUri);
                   $("#uri").attr("href", songUri);
                });
                



        });


        userSearch = (mySearch).value;
        return false;

    });
});


//       var i;
// for (i = 0; i < cars.length; i++) { 
//   text += cars[i] + "<br>";
// }