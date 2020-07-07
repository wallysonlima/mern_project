const fs = require('fs');

const userName = 'Wallyson';

console.log(userName);

fs.writeFile('user-data.txt', 'Name:' + userName, (err)=> {
    if (err) {
        console.log(err);
        return;
    }
    console.log("WROTE FILE");
});