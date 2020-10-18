module.exports = client => {
    console.log('Let\'s get this bread!');
    
        client.user.setPresence({
            status: 'online',
            activity: {
                name: 'fbi help',
                type: 'LISTENING',
            }
        });
}
