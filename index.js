const tor_axios = require("tor-axios");
const tor = tor_axios.torSetup({
    ip: "localhost",
    port: 9050,
});

const crypto = require("crypto");

const info = {
    dataSent: 0,
    ipUpdated: 0,
};

const url = "YOUR_URL"; // Change the endpoint

(async () => {
    const secondsBetweenUpdates = 20;
    updateTorSession(secondsBetweenUpdates);

    while (true) {
        // data to send for each request
        const options = {
            user: generateEmail(),
            pass: generatePassword(),
        };

        try {
            await sendPostRequest(url, options).then((res) => {
                console.clear();
                console.log(`Requests Sent: ${++info.dataSent}`);
                console.log(`IP updated ${info.ipUpdated} times.`);
            });
        } catch (err) {
            console.log(err);
            break;
        }
    }
})();

function generateEmail() {
    return (
        getRandomString(getRandomNumberBetween(6, 16)) +
        "@" +
        getRandomString(getRandomNumberBetween(4, 8)) +
        ".com"
    );
}

function generatePassword() {
    return getRandomString(getRandomNumberBetween(7, 20));
}

function getRandomString(num) {
    return crypto.randomBytes(num).toString("hex");
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function sendPostRequest(url, options) {
    return tor.post(url, options);
}

function updateTorSession(seconds) {
    setInterval(() => {
        tor.torNewSession();
        info.ipUpdated++;
    }, seconds * 1000);
}
