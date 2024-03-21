All endpoints support and may need to be both caught if error and caught if response:

.then((val) => 
	console.log(val))
	
.catch((err) => 
	console.error(err))
