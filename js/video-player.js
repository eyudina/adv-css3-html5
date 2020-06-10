//
// Video Player
//

const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const btnPlayPause = player.querySelector('.player__controls--button');
const iconPlay = player.querySelector('.player__controls--button-play');
const iconPause = player.querySelector('.player__controls--button-pause');

iconPause.style.display = 'none';

const togglePlay = () => {
    const playState = video.paused ? 'play' : 'pause';
    video[playState]();
}

const togglePlayIcon = () => {
    iconPlay.style.display = video.paused ? 'block' : 'none';
    iconPause.style.display = video.paused ? 'none' : 'block';
}

btnPlayPause.addEventListener('click', togglePlay);
video.addEventListener('ended', togglePlayIcon);
video.addEventListener('play', togglePlayIcon);
video.addEventListener('pause', togglePlayIcon);
