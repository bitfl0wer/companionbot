exports.run = (client, message, args) => {
    const randomFloat = require('random-float');
    let ranx = 0;
    for(let i = 0; i <= 20000; i++) {
        ranx = ranx + randomFloat(0, 100);
    }
    ranx = ranx / 20000;
    ranx = parseFloat(ranx.toFixed(2))
    message.channel.send(ranx);
};