exports.getCompanion = function (rarity, client) {
    let nocompanion = 0;
    let ran;
    let promise = false;
    while (promise === false) {
        if(nocompanion === 10000) {
            ran = 'Senko'; //THIS IS A TEMPORARY FIX
            promise = true;
            return ran;
        }
        ran = client.companions.randomKey(1);
        if(client.companions.get(ran, 'rarity') === rarity){
            promise = true;
            return ran;
        }
        nocompanion++
    }
};