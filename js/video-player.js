class VideoPlayer {
    constructor(container) {
        this._container = container
        this._videoUrl = this._container.getAttribute('data-video-url')
        this._poster = this._container.getAttribute('data-poster')
        this._dataWidth = this._container.getAttribute('data-width')
        this._initialize()
    }

    _initialize() {
        this._initializeContent()
        this._initializeFields()
        this._initializeHandlers()
    }

    _initializeContent() {
        this._container.innerHTML = `
            <video class="player__video" width="${this._dataWidth}" controls poster="${this._poster}">
              <source src="${this._videoUrl}">
              <div class="message">
                <p class="message__heading">Your browser doesn't support the video tag.</p>
                <p class="message__description">Click <a class="link-filled" href="https://www.google.com/chrome/">here</a>
                  to download the Chrome browser<br>for your operating system.
                </p>
              </div>
            </video>
            <div class="player__controls">
              <button class="player__controls--button" accesskey="p">
              <img class="player__controls--button-play" src="assets/icons/play.svg" alt="Play"/>
              <img class="player__controls--button-pause" src="assets/icons/pause.svg" alt="Pause"/></button>
            </div>
        `
    }

    _initializeFields() {
        this._video = this._container.querySelector('.player__video')
        this._btnPlayPause = this._container.querySelector('.player__controls--button')
        this._iconPlay = this._container.querySelector('.player__controls--button-play')
        this._iconPause = this._container.querySelector('.player__controls--button-pause')
        this._iconPause.style.display = 'none'
    }

    _initializeHandlers() {
        this._btnPlayPause.addEventListener('click', () => this.togglePlay())
        this._video.addEventListener('play',  () => this.togglePlayIcon())
        this._video.addEventListener('pause', () => this.togglePlayIcon())
        this._video.addEventListener('ended', () => this.togglePlayIcon())
    }

    togglePlay() {
        const playState = this._video.paused ? 'play' : 'pause'
        this._video[playState]()
    }

    togglePlayIcon() {
        this._iconPlay.style.display  = this._video.paused ? 'block' : 'none'
        this._iconPause.style.display = this._video.paused ? 'none' : 'block'
    }
}

const videoContainers = document.querySelectorAll('.player')

videoContainers.forEach(container => {
    new VideoPlayer(container)
})