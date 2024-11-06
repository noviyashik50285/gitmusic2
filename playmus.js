"use strict";
const musicTitleEl = document.getElementById("music_title");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "music/verish.mp3",
    displayName: "Веришь мне",
  },
  {
    path: "music/zhizn.mp3",
    displayName: "Жизнь",
  },
  {
    path: "music/more.mp3",
    displayName: "Море",
  },
  {
    path: "music/20let.mp3",
    displayName: "20 лет спустя",
  },
  {
    path: "music/raduga.mp3",
    displayName: "Радуга",
  },
  {
    path: "music/inogda.mp3",
    displayName: "Иногда",
  },
  {
    path: "music/vesna.mp3",
    displayName: "Весна",
  },
  {
    path: "music/ishuteba.mp3",
    displayName: "Ищу тебя",
  },
  {
    path: "music/срarlston.mp3",
    displayName: "Чарльстон",
  },
  {
    path: "music/dobriyden.mp3",
    displayName: "Добрый день",
  },
  {
    path: "music/mistoboy.mp3",
    displayName: "Мы с тобой",
  },
  {
    path: "music/roddom.mp3",
    displayName: "Родительский дом",
  },
  {
    path: "music/gdeiyn.mp3",
    displayName: "Ты где, июнь",
  },
  {
    path: "music/gardem.mp3",
    displayName: "Гардемарины",
  },
  {
    path: "music/estmig.mp3",
    displayName: "Есть только миг",
  },
  {
    path: "music/mgnoven.mp3",
    displayName: "Мгновения",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);

