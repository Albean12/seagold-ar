import { debugLog } from './ui.js';

export function handleVideoPlayback() {
  document.querySelectorAll('video').forEach(video => {
    const tryPlay = () => {
      if (video.paused && video.readyState >= 3) {
        video.play().catch(() => setTimeout(tryPlay, 1000));
      }
    };
    tryPlay();
  });
}

export function detachVideoTexture(videoId, entityId) {
  const video = document.querySelector(videoId);
  const entity = document.querySelector(entityId);

  if (video && entity) {
    try {
      // Pause and reset video
      if (!video.paused && video.readyState >= 2) {
        video.pause();
        video.currentTime = 0;
        debugLog(`⏸ Paused and reset ${videoId}`);
      }
    } catch (err) {
      debugLog(`⚠️ Pause error on ${videoId}: ${err.message}`);
    }

    // Unbind material to clear WebGL texture
    entity.setAttribute('material', 'src', '');
    entity.setAttribute('visible', false);
    debugLog(`🧼 Cleared material and hid ${entityId}`);

    // Rebind material after short delay to force texture refresh
    setTimeout(() => {
      entity.setAttribute('material', `shader: flat; src: ${videoId}; side: double`);
      entity.setAttribute('visible', true);
      debugLog(`🔁 Rebound texture to ${entityId}`);
    }, 100);
  }
}
