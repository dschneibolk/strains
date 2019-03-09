
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

              });


              userSearch = (mySearch).value;
              return false;

          });
      });
