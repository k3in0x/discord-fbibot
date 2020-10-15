module.exports = client => {
    console.log('Let\'s get this bread!');
    
        client.user.setPresence({
            status: 'dnd',
            activity: {
                name: 'fbi help',
                type: 'LISTENING',
            }
        });
}