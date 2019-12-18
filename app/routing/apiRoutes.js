const friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function (req, res) {


        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        };
        let arrayCheck = 0;
        let user = req.body;



        let num = user.scores.map(function (item) {
            return parseInt(item, 10);
        });

        user = {
            name: req.body.name,
            photo: req.body.photo,
            scores: num
        };

        let sum = num.reduce((a, b) => a + b, 0);

        for (let i = 0; i < friends.length; i++) {
            totalDifference= 0;
            let friendScore = friends[i].scores.reduce((a, b) => a + b, 0);
             totalDifference = Math.abs(sum - friendScore);
            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
            arrayCheck++;
            
        };

        if (friends.length == arrayCheck) {
            friends.push(user);
            console.log(user);
            console.log("Friend added");
            res.json(bestMatch);
        }


    });
};
