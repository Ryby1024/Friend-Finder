const friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function (req, res) {


        let bestMatch;
        let arrayCheck = 0;
        let = friendDifference = 100;
        let user = req.body;



        let num = user.scores.map(function (item) {
            return parseInt(item, 10);
        });

        let sum = num.reduce((a, b) => a + b, 0);

        for (let i = 0; i < friends.length; i++) {


            let friendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            let totalDifference = Math.abs(sum - friendScore);
            if (totalDifference <= friendDifference) {
                bestMatch = friends[i]
                friendDifference = totalDifference;
            }
            arrayCheck++;
            
        };

        if (friends.length === arrayCheck) {
            friends.push(user);
            console.log(user);
            console.log("Friend added");
            res.json(bestMatch);
        }


    });
};
