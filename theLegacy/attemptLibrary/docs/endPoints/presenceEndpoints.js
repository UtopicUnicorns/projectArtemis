/*  Set bots presence.
    Refer to presence object for presence example.
    Make sure to pass the msg event for the socket.  */
presence
  .set(presenceObject, msg);

/*  presenceObject is the object you send along in the presence.set.  */
presenceObject =  {
                    status: statusString,
                    activities: activityObject
                  };

/*  Pick one.  */
statusString = ['idle', 'dnd', 'online', 'offline'];

/*  Example activity object  */
activityObject =  {
                    name: 'Activity name',
                    type: activityType
                  };

/*  Pick one  */
activityType = ['game', 'streaming', 'listening', 'watching', 'custom', 'competing'];
