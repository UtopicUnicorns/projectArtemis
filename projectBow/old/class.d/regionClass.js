class regionConstruct {
                        get(msg)  {
                                    return exit.call('listVoiceRegions', {data: '', type: `application/json`});
                                  }
                      }

module.exports = regionConstruct;
