if(typeof(MP) !== 'object') var MP = {};

MP.error = function (msg) {
    switch(typeof(msg)) {
        case 'string':
            console.error('MP Error: ', msg);
            break;

        case 'object':
            console.error('MP Error: ', msg);
            break;

        default:
            console.error('MP Error: ', 'Undefined');
            break;
    }

    return {error:true, msg:msg};
}