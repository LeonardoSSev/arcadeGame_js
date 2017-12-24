
		var canvas;
		var canvasContext;
		var ballX = 10;
		var ballSpeedX = 10;
		var ballY = 4;
		var ballSpeedY = 5;

		var paddle1Y = 250;
		var paddle2Y = 250;

		var score1 = 0;
		var score2 = 0;

		var winningScreen = false;

		const WINNING_SCORE = 3;
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
				paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
			});
		}		

		function ballReset(){
			if(score1 >= WINNING_SCORE || score2 >= WINNING_SCORE){
				winningScreen = true;
				score1 = 0;
				score2 = 0;
			}
			ballSpeedX = -ballSpeedX;
			ballX = canvas.width/2;
			ballY = canvas.width/2;
		}

		function computerMovement(){
			var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
			if(paddle2YCenter < ballY-35){
				paddle2Y+=6;
			} else if(paddle2YCenter > ballY+35){
				paddle2Y-=6;
			}
		}

		function moveEverything(){
			computerMovement();

			if(ballX > canvas.width){
				if(ballY > paddle2Y &&
					ballY < paddle2Y+PADDLE_HEIGHT){
						ballSpeedX = -ballSpeedX;

						var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
						ballSpeedY = deltaY * 0.35;
				}else{
					score1++;
					ballReset();
				}
			}
			if(ballX < 0){
				if(ballY > paddle1Y &&
					ballY < paddle1Y+PADDLE_HEIGHT){
						ballSpeedX = -ballSpeedX;
					var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
						ballSpeedY = deltaY * 0.35;
				}else{
					score2++;
					ballReset();
				}
				
			}

			ballX += ballSpeedX;
			ballY += ballSpeedY;

			if(ballY > canvas.height){
				ballSpeedY = -ballSpeedY;
			}
			if(ballY < 0){
				ballSpeedY = -ballSpeedY;
			}
			
		}

		function drawEverything(){
			drawRect(0, 0, canvas.width, canvas.height, "black");
			if(winningScreen){
				canvasContext.fillStyle = "white";
				canvasContext.font = "30px Arial";
				canvasContext.fillText("Click to continue", canvas.width/2, canvas.height/2);		
			}else{
				drawRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
				drawRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
				drawCircle(ballX, ballY, 10, "white");
				canvasContext.fillStyle = "white";
				canvasContext.fillText(score1, 30, 550);
				canvasContext.fillText(score2, canvas.width-30, canvas.height-50);
			}
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