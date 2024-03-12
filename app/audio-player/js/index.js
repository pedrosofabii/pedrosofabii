import { SONGS_LIST_URL, SONGS_FOLDER_URL, SONG_COVERS_FOLDER_URL, SONG_KEY, SONG_NOT_SUPPORTED_MESSAGE, SONG_BTN_PLAY_ICONS, SONGS_IDS_LIST } from "./constants.js";
import { getAppSongElement, getAppSongCoverElement, getSongIdFromSearch, getSelectedSong, setSongCurrentTime, setSongTotalTime } from "./functions.js";

const songId = getSongIdFromSearch();

const songEl = getAppSongElement();
const songCover = getAppSongCoverElement();
const songNameEl = document.getElementById('song-name');
const songAuthorEl = document.getElementById('song-author');
const songBtnPlay = document.getElementById('song-btn-play');

document.getElementById('choose-song-btn').onclick = () => {

    const songIdSeparator = '\n- ';
    const ids = songIdSeparator
        .concat(SONGS_IDS_LIST.join(songIdSeparator));
        
    alert(`Os códigos válidos de música são os seguintes: ${ids}`);

    const songId = prompt('Por favor, informe o código da música:');

    if (songId) {
        window.location.search = `${SONG_KEY}=${songId}`;
    }
};

fetch(SONGS_LIST_URL)
    .then(res => res.json())
    .then(async songs => {

        const song = await getSelectedSong(songId, songs);

        if (!song) {

            document.getElementById('main-error').classList.remove('hidden');
            return;
        }

        document.getElementById('main-song').classList.remove('hidden');

        const sourceEl = document.createElement('source');
        sourceEl.src = SONGS_FOLDER_URL + `/${song.data.id}.${song.data.audio.format}`;
        sourceEl.type = song.data.audio.mimeType;

        const notSupportedEl = document.createElement('span');
        notSupportedEl.innerText = SONG_NOT_SUPPORTED_MESSAGE;

        songNameEl.innerText = song.data.name;
        songAuthorEl.innerText = song.data.author;

        songEl.appendChild(sourceEl);
        songCover.src = SONG_COVERS_FOLDER_URL + `/${song.data.id}.${song.data.cover.format}`;
        
        songEl.load();

        songEl.addEventListener('loadeddata', () => {
            setSongTotalTime(songEl.duration);
        });

        songEl.addEventListener('timeupdate', () => {
            setSongCurrentTime(songEl.currentTime, songEl.duration);
        });

        songBtnPlay.onclick = () => {

            if (songEl.paused) {
                songBtnPlay.innerText = SONG_BTN_PLAY_ICONS.pause;
                songEl.play();
            } else {
                songBtnPlay.innerText = SONG_BTN_PLAY_ICONS.play;
                songEl.pause();
            }
        };
    });
