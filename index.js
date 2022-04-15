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

const secondsBetweenIpUpdates = 20;
const millisecondsBetweenRequests = 30;

(async () => {
    updateTorSession(secondsBetweenIpUpdates);

    let sendRequests = true;

    while (sendRequests) {
        // data to send for each request
        const options = {
            user: generateEmail(),
            pass: generatePassword(),
        };

        try {
            sendPostRequest(url, options).then((res) => {
                if (res.status !== 200) {
                    sendRequests = false;
                    return;
                }
                ++info.dataSent;
            });
            await sleep(millisecondsBetweenRequests);

            console.clear();
            console.log(`Requests Sent: ${info.dataSent}`);
            console.log(`IP updated ${info.ipUpdated} times.`);
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
        getValidEmailDomain() +
        ".com"
    );
}

function getValidEmailDomain() {
    const domains = ["gmail", "outlook", "netease", "hotmail", "tencent"];
    const index = Math.floor(Math.random() * domains.length);
    return domains[index];
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

function sendPostRequest(url, options) {
    return tor.post(url, options);
}

function updateTorSession(seconds) {
    setInterval(() => {
        tor.torNewSession();
        info.ipUpdated++;
    }, seconds * 1000);
}

function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
