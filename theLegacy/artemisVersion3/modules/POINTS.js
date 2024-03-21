////////////////////////////////////
//Points and levels get decided here
//Perhaps thanks and such too.
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm, mmbr) {
    score = await getScore.get(mmbr.user.id, c.d.guild_id);
    if (score) {
      score.points++;
      const curLevel = Math.floor(0.5 * Math.sqrt(score.points));
      score.level = curLevel;
      setScore.run(score);
    } else {
      score = {
        id: `${mmbr.user.id}-${c.d.guild_id}`,
        user: `${mmbr.user.id}`,
        guild: `${c.d.guild_id}`,
        points: 1,
        level: 1,
        warning: 0,
        muted: 0,
        permit: 0,
        bonus: 0,
      };
      setScore.run(score);
    }
  },
};
