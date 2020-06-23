const counter = document.querySelector('.counter');
const btn = document.querySelector('.buttons');
const secondsInput = document.getElementById('seconds');

var seconds;
var minuts;
var remseconds;
var toCount;

function subm() {
	display("submit", "start");
	seconds = Number(secondsInput.value);
	//拿取填入數值
	timeDisplay.textContent = `${Math.floor(seconds / 60)}:${Math.floor(
		seconds % 60
	)}`

	counting();
}


function display(first, second) {
	document.getElementById(first).style.display = "none";
	document.getElementById(second).style.display = "block";
}

function check(stat) {
	toCount = stat.value;
	if (stat.id == "start") {
		display("start", "stop");
	}
	else if (stat.id == "stop") {
		display("stop", "continue");
	}
	else {
		display('continue', "stop");
	}
}

function count() {
	counter.innerHTML = "Done!";
	btn.style.opacity = '0';
}

function counting() {
	remseconds = seconds % 60;
	minuts = Math.floor(seconds / 60);

	if (remseconds < 10) {
		remseconds = "0" + remseconds;
	}

	if (minuts < 10) {
		minuts = "0" + minuts;
	}

	counter.innerHTML = minuts + " : " + remseconds;
	setInterval(count, 1000);
}


//圓圈

const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = Number(secondsInput.value);

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;




sounds.forEach(sound => {
	sound.addEventListener("click", function () {
		song.src = this.getAttribute("data-sound");
		video.src = this.getAttribute("data-video");
		checkPlaying(song);
	});
});

play.addEventListener("click", function () {
	checkPlaying(song);
});

replay.addEventListener("click", function () {
	restartSong(song);

});


const restartSong = song => {
	let currentTime = song.currentTime;
	song.currentTime = 0;
	console.log("ciao")

}

timeSelect.forEach(option => {
	option.addEventListener("click", function () {
		fakeDuration = this.getAttribute("data-time");
		timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
			fakeDuration % 60
		)}`;
	});
});

const checkPlaying = song => {
	if (song.paused) {
		song.play();
		video.play();
		play.src = "./svg/pause.svg";
	} else {
		song.pause();
		video.pause();
		play.src = "./svg/play.svg";
	}
};

song.ontimeupdate = function () {
	let fakeDuration = Number(secondsInput.value)
	let currentTime = song.currentTime;
	let elapsed = fakeDuration - currentTime;
	let seconds = Math.floor(elapsed % 60);
	let minutes = Math.floor(elapsed / 60);
	timeDisplay.textContent = `${minutes}:${seconds}`;
	let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
	outline.style.strokeDashoffset = progress;

	if (currentTime >= fakeDuration) {
		song.pause();
		song.currentTime = 0;
		play.src = "./svg/play.svg";
		video.pause();
	}
};

function counting() {
	counter.innerHTML = "開始冥想~";
	btn.style.opacity = '0';
}

//圓圈的時間拿取
timeSelect.forEach(option => {
	option.addEventListener("click", function () {
		fakeDuration = this.getAttribute("data-time");
		timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
			fakeDuration % 60
		)}`;
	});
});

