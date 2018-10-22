var express = require('express');
var request = require('request');
var app = express();

app.get('/cities/search/findByNameIgnoreCaseContaining', function (req, res) {

    res.header('Access-Control-Allow-Origin', "*");
    let page = req.query.page ? parseInt(req.query.page) : 0;
    let size = req.query.size ? parseInt(req.query.size) : 20;
    let sort = req.query.sort;
    let name = req.query.name;
    let urlBase = "https://customers-challenge.herokuapp.com";
    let url = `${urlBase}/cities/search/findByNameIgnoreCaseContaining?name=${name}`;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let newResponse = {
                _embedded: { cities: [] },
                page: {
                    "size": size,
                    "totalElements": 0,
                    "totalPages": 1,
                    "number": 0
                }
            }

            try {

                body = JSON.parse(body);
                body._embedded.cities.sort((a, b) => (a.name).localeCompare(b.name));
                if (sort == "name,desc") {
                    body._embedded.cities.reverse();
                }
                body._embedded.cities.forEach((element, i) => {
                    if (i >= (page * size) && i < ((page + 1) * size)) {
                        newResponse._embedded.cities.push(element);
                    }
                });
                newResponse.page = {
                    "size": size,
                    "totalElements": body._embedded.cities.length,
                    "totalPages": parseInt((body._embedded.cities.length / size) + 1),
                    "number": parseInt(page)
                }
                res.send(newResponse);
            } catch (e) {
                console.log(e);
                res.send(newResponse);
            }



        }
    });


});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
