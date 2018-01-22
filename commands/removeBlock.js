/**
 * @param {Object} message - The message object
 * @param {Module} fs - The npm module fs
 * @param {string} prefix - The prefix
 * @param {array} contrib - Users that are allowed to use that command
**/
module.exports = (message, fs, prefix, contrib) => {
    try {
        let file = JSON.parse(fs.readFileSync("./src/config.json", "utf8"));
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (contrib.includes(message.author.tag)) {
            if (message.mentions.users.size != 0) {
                if (file.blockedIDs[message.mentions.users.first().id]) {
                    if (file.blockedIDs[message.mentions.users.first().id].blocked == "true") {
                        file.blockedIDs[message.mentions.users.first().id].blocked = "false";
                        fs.writeFileSync("./src/config.json", JSON.stringify(file));
                        message.channel.send("Successfully removed the block for `" + message.mentions.users.first().id + "`.")
                    }
                } else {
                    message.channel.send("ID is not blocked.");
                }
            } else {
                if (file.blockedIDs[args[1]]) {
                    if (file.blockedIDs[args[1]].blocked == "true") {
                        file.blockedIDs[args[1]].blocked = "false";
                        fs.writeFileSync("./src/config.json", JSON.stringify(file));
                        message.channel.send("Successfully removed the block for `" + args[1] + "`.")
                    }
                } else {
                    message.channel.send("ID is not blocked.");
                }
            }
        } else {
            return message.channel.send("Missing Permissions");
        }
    } catch (e) {
        console.log("[DISCORDCAPTCHA-removeBlock] >> " + e);
    }
};