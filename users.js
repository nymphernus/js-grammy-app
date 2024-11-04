const fs = require('fs');

const userDataFile = 'userData.json';

if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', 'BOT_API_KEY=\nOPENWEATHERMAP_API_KEY=');
}

if (!fs.existsSync(userDataFile)) {
    fs.writeFileSync(userDataFile, '{}');
}

let userData = JSON.parse(fs.readFileSync(userDataFile));

async function updateUserData(user) {
    userData[user.id] = {
        username: user.username,
        nickname: user.first_name
    };
    fs.writeFileSync(userDataFile, JSON.stringify(userData, null, 2));
}
async function userDataCheck(user) {
    if (!userData[user.id]) {
        await updateUserData(user);
    }
    else return true;
}

module.exports = {
    users: {
        userDataCheck
    }
}