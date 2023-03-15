"use strict";
const timer = document.querySelector(".main-time");
const actionBtns = document.querySelectorAll(".main-menu-item");
const startBtn = document.getElementById("startBtn");
const shortBreak = document.querySelector('.shortBreak');
const longBreak = document.querySelector('.longBreak')
const pomodoro = document.querySelector('.pomodoro')

let time = 1500;
let intervalID;

shortBreak.addEventListener('click', function(){
	document.body.style.background = 'blue';
	document.querySelector('.main').style.background = "darkblue"
})

longBreak.addEventListener('click', function(){
	document.body.style.background = 'yellow';
	document.querySelector('.main').style.background = "rgb(141, 180, 83)"
})
pomodoro.addEventListener('click', function(){
	document.body.style.background = 'rgb(186, 73, 73)';
	document.querySelector('.main').style.background = "#c15c5c"	
})
function timeConvertor(time) {
	const minute = Math.floor(time / 60); // 1480 -> 24
	const second = time % 60; // 1480 % 60 = 40

	let result = (minute < 10 ? "0" : "") + minute;
	result += ":" + (second < 10 ? "0" : "") + second;

	return result;
}

// ui functions
function handleStart() {
	const isActive = startBtn.classList.contains("active");
	startBtn.classList.toggle("active");
	startBtn.innerText = isActive ? "START" : "PAUSE";

	const value = timeConvertor(time);
	console.log("value = ", value);
	if (isActive) {
		clearInterval(intervalID);
	} else {
		intervalID = setInterval(() => {
			time--;
			if(time <0){
				return;
			}
			timer.innerText = timeConvertor(time);
		}, 1000);
	}
}

function handleActionBtnClick(actionBtn) {
	const currentTime = +actionBtn.getAttribute("time");
	const isActive = actionBtn.classList.contains("active");
    
	if (!isActive) {
		const isYes = startBtn.classList.contains("active") ? confirm(`${actionBtn.innerText} 🧐 ? `) : true;

		if (isYes) {
			for (let btn of actionBtns) {
				btn.classList.remove("active");
			}

			clearInterval(intervalID);
			time = currentTime;
			timer.innerText = timeConvertor(time);
			startBtn.classList.remove("active");
			startBtn.innerText = `START`;
			actionBtn.classList.add("active");
		}
	}
}

function init() {
	startBtn.addEventListener("click", handleStart);

	actionBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => handleActionBtnClick(btn));
	});
}

init();
