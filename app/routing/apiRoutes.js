const friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function (req, res) {

        // Declaring some variables
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        };
        let arrayCheck = 0;
        let user = req.body;


        // Putting user scores into a new array and parseInt them
        let num = user.scores.map(function (item) {
            return parseInt(item, 10);
        });
        // Setting the user variable equal to the users responses including the scores to the new num array created
        user = {
            name: req.body.name,
            photo: req.body.photo,
            scores: num
        };
        // Making a new variable sum equal to the total value of the numbers in the num array created earlier using the reduce method
        let sum = num.reduce((a, b) => a + b, 0);
        // Making a new variable friendScore that loops through the friends array and makes a total value of the scores
        for (let i = 0; i < friends.length; i++) {
            totalDifference= 0;
            let friendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            // Sets the value of the variable totalDifference to the absolute value of sum - friendscore
             totalDifference = Math.abs(sum - friendScore);
            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
            arrayCheck++;
            
        };
        // Checks to make sure every possible person in the friends array has been checked before pushing the result to the friends array

        if (friends.length === arrayCheck) {
            friends.push(user);
            console.log(user);
            console.log("Friend added");
            res.json(bestMatch);
        }


    });
};
