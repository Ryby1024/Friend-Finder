const friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function (req, res) {

        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        let user = req.body;
        let userName = user.name;
        let userScores = user.scores;
        

        let num = userScores.map(function(item){
            return parseInt(item, 10);
        });
        user = {
            name: req.body.name,
            photo: req.body.photo,
            scores: num
        };

        let sum = num.reduce((a, b) => a + b, 0);

        for(let i = 0; i < friends.length; i++){
            totalDifference = 0;

            let friendScore = friends[i].scores.reduce((a,b) => a + b, 0);
            totalDifference += Math.abs(sum - friendScore);
            if(totalDifference <= bestMatch.friendDifference){
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
        
            friends.push(user);
            console.log("Friend added");
            res.json(bestMatch);
    

    });
};
