const npm = require('../modules/NPM.js');
npm.npm();
module.exports = {
    name: 'join',
    description: '[level] Join a self assignable role',
    execute(message) {
        const getGuild = db.prepare("SELECT * FROM guildhub WHERE guild = ?");
        const prefixstart = getGuild.get(message.guild.id);
        const prefix = prefixstart.prefix;
        //
        let getUsage = db.prepare("SELECT * FROM usage WHERE command = ?");
        let setUsage = db.prepare("INSERT OR REPLACE INTO usage (command, number) VALUES (@command, @number);");
        usage = getUsage.get('join');
        usage.number++;
        setUsage.run(usage);
        //
        const args = message.content.slice(prefix.length + 5);
        const member = message.member;
        const allroles = db.prepare("SELECT * FROM roles WHERE guild = ?;").all(message.guild.id);
        let array2 = [];
        for (const data of allroles) {
            array2.push(message.guild.roles.find(r => r.id == data.roles).name);
        }
        if (array2.includes(args)) {
            const role = message.guild.roles.find(r => r.name === args);
            let checking = message.member.roles.find(r => r.name === args);
            if (checking) return message.reply("You already have this role.");
            member.addRole(role).catch(console.error);
            const embed = new Discord.RichEmbed()
                .setDescription(message.author)
                .setColor('RANDOM')
                .addField('Joined: ', role);
            return message.channel.send({
                embed
            });
        }
        message.reply("Invalid role!");
    }
};