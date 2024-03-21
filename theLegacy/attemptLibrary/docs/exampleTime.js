/*  Time is important, it will run out before we know it,
      To make sure we order our caskets in time we watch the seconds of our life tick by faster and faster,
      for that we would want tools to ensure seeying our coming demise.
    .clock() is our first example, it helps us see the current time in both military time and AM/PM.
    .clock() returns a JSON with 2 entries:
      eu: Military time *13:37:00*
      us: AM/PM time *01:37:00 PM*  */
time.clock(time);

/*  .stamp() returns the current time in miliseconds.  */
time.stamp(time);

/*  .discord() returns a JSON with several pre-processed timestamps for Discord to display:
      shortDate: 02/06/2022.
      longDate: 2 June 2022.
      shortTime: 16:51.
      longTime: 16:51:00.
      longDateShortTime: 2 June 2022 at 16:51.
      completeDateShortTime: Thursday, 2 June 2022 at 16:51.
      relativeTime: 4 minutes ago.
    You can also use .stamp() in combination with .discord():
      time.discord(time.stamp()).  */
time.discord(time);

/*  .hms(value) converts seconds to hours:minutes:seconds  */
time.hms(seconds);

/*  .date() returns a JSON with the current date formatted in different ways:
      nice,
      iso,
      eur,
      us,
      ugly.  */
time.date(date);
