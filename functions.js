var canvas;
		var canvasContext;
		var ballX = 10;
		var ballSpeedX = 5;
		var ballY = 4;
		var ballSpeedY = 5;

		var paddle1Y = 250;
		var paddle2Y = 250;
		const PADDLE_THICKNESS = 10;
		const PADDLE_HEIGHT = 100;

		function calculateMousePos(evt){
			var rect = canvas.getBoundingClientRect();
			var root = document.documentElement;
			var mouseX = evt.clientX - rect.left - root.scrollLeft;
			var mouseY = evt.clientY - rect.top - root.scrollTop;

			return {
				x:mouseX,
				y:mouseY
			}
		}

		window.onload = function(){
			console.log("Hello World");
			canvas = document.getElementById("gameCanvas");
			canvasContext = canvas.getContext("2d");
			framesPerSecond = 30;
			setInterval(function(){
						moveEverything();
						drawEverything();
			}, 20, framesPerSecond);

			canvas.addEventListener('mousemove', function(evt){
				var mousePos = calculateMousePos(evt);
				paddle2Y = mousePos.y-(PADDLE_HEIGHT/2);
			});
		}		

		function ballReset(){
			ballSpeedX = -ballSpeedX;
			ballX = canvas.width/2;
			ballY = canvas.width/2;
		}

		function moveEverything(){
			ballX += ballSpeedX;
			ballY += ballSpeedY;
			if(ballY > canvas.height){
				ballSpeedY = -ballSpeedY;
			}
			if(ballY < 0){
				ballSpeedY = -ballSpeedY;
			}
			if(ballX > canvas.width){
				if(ballY > paddle2Y &&
					ballY < paddle2Y+PADDLE_HEIGHT){
						ballSpeedX = -ballSpeedX;
				}else{
					ballReset();	
				}
			}
			if(ballX < 0){
				if(ballY > paddle1Y &&
					ballY < paddle1Y+PADDLE_HEIGHT){
						ballSpeedX = -ballSpeedX;
				}else{
					ballReset();	
				}
				
			}
		}

		function drawEverything(){
			drawRect(0, 0, canvas.width, canvas.height, "black");
			drawRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
			drawRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
			drawCircle(ballX, ballY, 10, "white")			
		}

		function drawCircle(centerX, centerY, radius, colorCircle){
			canvasContext.fillStyle = colorCircle;
			canvasContext.beginPath();
			canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
			canvasContext.fill();
		}

		function drawRect(leftX, topY, width, height, color){
			canvasContext.fillStyle = color;
			canvasContext.fillRect(leftX, topY, width, height);			
		}