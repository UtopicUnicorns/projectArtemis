export async function toParseMe( data ) { /* Parser function to export */
  try { /* Use try..catch to ensure flow */
    //console.log(data); /*  */
  } catch(e) { /* When stuff goes wrong, fire error and unparsed event */
    branch.emit('logger', 'parseError', data.eventName, e); /* Emit error */
    branch.emit(data.eventName, 'error parsing, refer to data field for unparsed data', data) /* Emit unparsed */
  }
}
