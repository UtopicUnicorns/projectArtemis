class errorConstruct  {
                        error(info) {
                                      let newStackCon = info.stack.split('\n');
                                      let newStack = '';
                                      for (let i of newStackCon)  {
                                                                    let a = i.replace(/^\s+/g, '');
                                                                    if(!a.startsWith('TypeError')) { let t = a.split(' '); newStack += `\n  @ ${t[1]}\n    ==> ${t[2]}`; }
                                                                  }
                                      return `\nendPoint Error: ${info.message}` + newStack + '\n';
                                    }
                      }

module.exports = errorConstruct;
