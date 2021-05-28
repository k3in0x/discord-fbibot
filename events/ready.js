module.exports = client => {
    console.log('Lets get this bread!');

        client.user.setPresence({
            status: 'online',
            activity: {
                name: 'f!help',
                type: 'LISTENING',
            }
        });
}
