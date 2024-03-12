import { SONG_KEY, SONGS_FOLDER_URL } from "./constants.js";

/**
 * @returns {string|null}
 */
export function getSongIdFromSearch() {
    if (window.location.search.length <= 1) {
        return null;
    }

    const song = window.location.search
        .slice(1)
        .split('&')
        .map(fragment => fragment.split('='))
        .map(params => ({ key: params[0], value: params[1] }))
        .find(params => params.key == SONG_KEY);

    return song.value ?? null;
}

/**
 * @param {string} songId
 * @param {{id: string; name: string; author: string; audio: {format: string; mimeType: string;}; cover: {format: string;};}[]} songs 
 * @return {Promise<{blob: Blob; data: {id: string; name: string; author: string; audio: {format: string; mimeType: string;}; cover: {format: string;};}}>}
 */
export function getSelectedSong(songId, songs) {

    const song = songs
        .find(s => s.id.toLowerCase() == songId?.toLowerCase());

    if (!song) {
        return Promise.resolve();
    }

    const songUrl = SONGS_FOLDER_URL + `/${song.id}.${song.audio.format}`;

    return fetch(songUrl)
        .then(res => {

            if (song) {
                return {
                    data: song,
                    blob: res.blob()
                };
            }

            return null;
        });
};

/**
 * @returns {HTMLAudioElement}
 */
export function getAppSongElement() {
    return document.getElementById('app-song');
};

/**
 * @returns {HTMLImageElement}
 */
export function getAppSongCoverElement() {
    return document.getElementById('song-cover');
};

/**
 * @param {number} time 
 * @returns {string}
 */
function timeToString(time) {

    const seconds = Math.floor(time);

    if (time < 60) {
        return `00:${seconds.toString().padStart(2, '0')}`;
    }

    const secondsLeft = Math.floor(seconds % 60);
    const minutes = Math.floor(seconds / 60);

    return `${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}

/**
 * @param {number} totalTime 
 */
export function setSongTotalTime(totalTime) {
    
    const totalTimeEl = document.getElementById('song-total-time');
    const totalTimeStr = timeToString(totalTime);

    totalTimeEl.innerText = totalTimeStr;
};

/**
 * @param {number} currentTime
 * @param {number} total
 * @returns {void}
 */
export function setSongCurrentTime(currentTime, total) {

    const currentTimeProgressBarEl = document.getElementById('song-current-time-progress-bar');
    const currentTimeEl = document.getElementById('song-current-time');

    let timerWidth = 0;

    if (currentTime > 0 && total > 0) {
        timerWidth = (currentTime * 100) / total;
    }

    currentTimeProgressBarEl.style.width = `${timerWidth}%`;
    currentTimeEl.innerText = timeToString(currentTime);
}