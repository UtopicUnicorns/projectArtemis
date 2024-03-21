const npm = require('../modules/NPM.js');
npm.npm();
module.exports = {
    name: 'fox',
    description: '[fun] Random fox picture',
    execute(message) {
        const getGuild = db.prepare("SELECT * FROM guildhub WHERE guild = ?");
        const prefixstart = getGuild.get(message.guild.id);
        const prefix = prefixstart.prefix;
        let baseurl = "https://some-random-api.ml/img/fox";
        let url = baseurl;
        request(url, {
            json: true
        }, (err, res, body) => {
            if (err) return message.channel.send(err);
            const embed = new Discord.RichEmbed()
                .setImage(body.link)
            message.channel.send({
                embed: embed
            });
        });
        //
        let getUsage = db.prepare("SELECT * FROM usage WHERE command = ?");
        let setUsage = db.prepare("INSERT OR REPLACE INTO usage (command, number) VALUES (@command, @number);");
        usage = getUsage.get('fox');
        usage.number++;
        setUsage.run(usage);
        //
    }
};