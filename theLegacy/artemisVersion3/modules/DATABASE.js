////////////////////////////////////
//All databases get checked
//and created if needed here
////////////////////////////////////
exports.DATABASE = async function (c, client, CONFIG, npm) {
  const scores = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';"
    )
    .get();
  if (!scores["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, warning INTEGER, muted INTEGER, permit INTEGER, bonus INTEGER);"
      )
      .run();
    await db.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const Channelmanage = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guildhub';"
    )
    .get();
  if (!Channelmanage["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE guildhub (guild TEXT PRIMARY KEY, generalChannel TEXT, highlightChannel TEXT, muteChannel TEXT, logsChannel TEXT, streamChannel TEXT, reactionChannel TEXT, verificationChannel TEXT, supportChannel TEXT, supportInUseChannel TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_guidhub_id ON guildhub (guild);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const Rolemanage = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'roles';"
    )
    .get();
  if (!Rolemanage["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE roles (guild TEXT, roles TEXT PRIMARY KEY, emoji TEXT, description TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_roles_id ON roles (roles);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const commandusage = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'usage';"
    )
    .get();
  if (!commandusage["count(*)"]) {
    await db
      .prepare("CREATE TABLE usage (command TEXT PRIMARY KEY, number INTEGER);")
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_usage_id ON usage (command);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const userInfo = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userinfo';"
    )
    .get();
  if (!userInfo["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE userinfo (id TEXT PRIMARY KEY, username TEXT, nickname TEXT, specs TEXT, totalwarnings INTEGER, totalmutes INTEGER);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_userinfo_id ON userinfo (id);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const settings = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'settings';"
    )
    .get();
  if (!userInfo["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE settings (guildid TEXT PRIMARY KEY, streamHere TEXT, autoMod TEXT, prefix TEXT, leveling TEXT, wmessage TEXT, defaultrole TEXT, bonuspoints INTEGER, artemisTalks TEXT, wimage TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_settings_id ON settings (guildid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const logs = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'logs';"
    )
    .get();
  if (!logs["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE logs (guildid TEXT PRIMARY KEY, msgupdate TEXT, msgdelete TEXT, chancreate TEXT, chandelete TEXT, chanupdate TEXT, reactadd TEXT, reactdelete TEXT, invcreate TEXT, invdelete TEXT, grolecreate TEXT, groledelete TEXT, groleupdate TEXT, gmemadd TEXT, gmemupdate TEXT, gmemdelete TEXT, gbanadd TEXT, gbanremove TEXT, voiceupdate TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_logs_id ON logs (guildid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const stream = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'streamers';"
    )
    .get();
  if (!stream["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE streamers (streamerguild TEXT PRIMARY KEY, streamer TEXT, guild TEXT, status TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_streamers_id ON streamers (streamerguild);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const aCase = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'admincases';"
    )
    .get();
  if (!aCase["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE admincases (guildidcaseid TEXT PRIMARY KEY, caseid INTEGER, guildid TEXT, userid TEXT, username TEXT, type TEXT, reason TEXT, date TEXT, judge TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_admincases_id ON admincases (guildidcaseid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const caseTimers = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'admintimers';"
    )
    .get();
  if (!caseTimers["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE admintimers (GuildUserTime TEXT PRIMARY KEY, guildid TEXT, userid TEXT, type TEXT, time TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_admintimers_id ON admintimers (GuildUserTime);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const levelup = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levelup';"
    )
    .get();
  if (!levelup["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE levelup (GuildAndLevel TEXT PRIMARY KEY, guildid TEXT, level INTEGER, role TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_levelup_id ON levelup (GuildAndLevel);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const reminderTimes = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'remindtimers';"
    )
    .get();
  if (!reminderTimes["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE remindtimers (GuildUserTime TEXT PRIMARY KEY, reason TEXT, channel TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_remindtimers_id ON remindtimers (GuildUserTime);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const bumprecord = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'bumprecord';"
    )
    .get();
  if (!bumprecord["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE bumprecord (GuildUser TEXT PRIMARY KEY, user TEXT, guild TEXT, bump INTEGER, dbump INTEGER, dlmbump INTEGER, like INTEGER, dotbump INTEGER);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_bumprecord_id ON bumprecord (GuildUser);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const supportchannels = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'supportchannels';"
    )
    .get();
  if (!supportchannels["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE supportchannels (chanid TEXT PRIMARY KEY, inuse TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_supportchannels_id ON supportchannels (chanid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const sCase = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'supportcases';"
    )
    .get();
  if (!sCase["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE supportcases (caseid INTEGER PRIMARY KEY, userid TEXT, username TEXT, attachments TEXT, casemessage TEXT, date TEXT, solvedby TEXT, solution TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_supportcases_id ON supportcases (caseid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const supportinusechannels = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'supportinusechannels';"
    )
    .get();
  if (!supportinusechannels["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE supportinusechannels (chanid TEXT PRIMARY KEY, caseid INTEGER);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_supportinusechannels_id ON supportinusechannels (chanid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const hlmsg = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'hlmsg';"
    )
    .get();
  if (!hlmsg["count(*)"]) {
    await db.prepare("CREATE TABLE hlmsg (msgid TEXT PRIMARY KEY);").run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_hlmsg_id ON hlmsg (msgid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const topic = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'topic';"
    )
    .get();
  if (!topic["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE topic (gldidtime TEXT PRIMARY KEY, gldid TEXT, topictext TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_topic_id ON topic (gldidtime);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const badword = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'badword';"
    )
    .get();
  if (!badword["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE badword (gldidtime TEXT PRIMARY KEY, gldid TEXT, badwords TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_badword_id ON badword (gldidtime);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const badphrase = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'badphrase';"
    )
    .get();
  if (!badphrase["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE badphrase (gldidtime TEXT PRIMARY KEY, gldid TEXT, badphrases TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_badphrase_id ON badphrase (gldidtime);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const cc = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'cc';"
    )
    .get();
  if (!cc["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE cc (gldidtime TEXT PRIMARY KEY, gldid TEXT, ccname TEXT, cclocation TEXT, ccaction TEXT);"
      )
      .run();
    await db.prepare("CREATE UNIQUE INDEX idx_cc_id ON cc (gldidtime);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const ar = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'ar';"
    )
    .get();
  if (!ar["count(*)"]) {
    await db
      .prepare("CREATE TABLE ar (gldid TEXT PRIMARY KEY, status TEXT);")
      .run();
    await db.prepare("CREATE UNIQUE INDEX idx_ar_id ON ar (gldid);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const joinchain = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'joinchain';"
    )
    .get();
  if (!joinchain["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE joinchain (usridgldid TEXT PRIMARY KEY, gldid TEXT, usrid TEXT, joindate TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_joinchain_id ON joinchain (usridgldid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const nicknames = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'nicknames';"
    )
    .get();
  if (!nicknames["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE nicknames (usridgldid TEXT PRIMARY KEY, gldid TEXT, usrid TEXT, nickname TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_nicknames_id ON nicknames (usridgldid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const badnames = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'badnames';"
    )
    .get();
  if (!badnames["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE badnames (gldidbadname TEXT PRIMARY KEY, gldid TEXT, badname TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_badnames_id ON badnames (usridgldid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const redditlinks = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'redditlinks';"
    )
    .get();
  if (!redditlinks["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE redditlinks (gldurl TEXT PRIMARY KEY, gldid TEXT, link TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_redditlinks_id ON redditlinks (gldurl);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const filterexcept = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'filterexcept';"
    )
    .get();
  if (!filterexcept["count(*)"]) {
    await db
      .prepare("CREATE TABLE filterexcept (chnid TEXT PRIMARY KEY);")
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_filterexcept_id ON filterexcept (chnid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const wordignore = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'wordignore';"
    )
    .get();
  if (!wordignore["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE wordignore (wordchan TEXT PRIMARY KEY, chan TEXT, word TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_wordignore_id ON wordignore (wordchan);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const pwordban = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'pwordban';"
    )
    .get();
  if (!pwordban["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE pwordban (gldusridwrd TEXT PRIMARY KEY, usrid TEXT, gid TEXT, bword TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_pwordban_id ON pwordban (gldusridwrd);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const geograb = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'geograb';"
    )
    .get();
  if (!geograb["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE geograb (usrid TEXT PRIMARY KEY, loc TEXT, lastday TEXT, lon TEXT, lan TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_geograb_id ON geograb (usrid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const unblockurl = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'unblockurl';"
    )
    .get();
  if (!unblockurl["count(*)"]) {
    await db
      .prepare("CREATE TABLE unblockurl (chanid TEXT PRIMARY KEY);")
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_unblockurl_id ON unblockurl (chanid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }
};
