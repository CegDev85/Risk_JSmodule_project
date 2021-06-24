use risk_project;
db.dropDatabase();

db.players.insertMany([
    {
        name: "Jimmy the Rocket",
        TroopsDeployed: 103,
        TroopsLost: 34,
        TroopsDefeated: 71,
        Territories: 60,
        Victories: 34
    },
    {
        name: "Col Smashh Mouth",
        TroopsDeployed: 45,
        TroopsLost: 90,
        TroopsDefeated: 50,
        Territories: 14,
        Victories: 8
    }
]);