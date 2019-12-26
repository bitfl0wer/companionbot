exports.getCompanion = function (rarity, client) {
    let promise = false;
    while (promise === false) {
        let ran = client.companions.randomKey(1);
        if(client.companions.get(ran, 'rarity') === rarity){
            promise = true;
            return ran;
        }
    }
};