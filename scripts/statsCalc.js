function degreesToRadians(deg) {
	return (deg / 180) * Math.PI;
}

function percentToRadians(percentage) {
	var degrees = percentage * 360 / 100;

	return degreesToRadians(degrees + 270);
}

function drawPercentageCircle(percentage, radius, canvas, total, now, func) {
	var context = canvas.getContext('2d');

	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var startAngle = percentToRadians(0);
	var endAngle = percentToRadians(percentage);
  
	var counterClockwise = true;
  
	context.beginPath();
	context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
	context.lineWidth = 15;

	context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
	context.shadowColor = 'black';
	context.shadowBlur = 5;
	context.stroke();

	counterClockwise = false;

	context.beginPath();
	context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
	context.lineWidth = 15;

	context.strokeStyle = 'lightgreen';
	context.stroke();
	
	context.shadowBlur = 0;
	context.font = "2vh Helvetica";
	context.fillStyle = "black";
	context.textAlign = "center";
	context.fillText(`${func}`, x, y * 0.7);

	context.font = "2vh Helvetica";
	context.fillStyle = "black";
	context.textAlign = "center";

	context.fillText(`${percentage}%`, x, y * 1);

	context.font = "2vh Helvetica";
	context.fillStyle = "black";
	context.textAlign = "center";
	context.fillText(`${now.toLocaleString()}/${total.toLocaleString()}`, x, y * 1.3);
	context.fillText(`MegaBytes`, x, y * 1.45);
}
