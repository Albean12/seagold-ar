import { handleVideoPlayback, detachVideoTexture } from './videoManager.js';
import { loadMapWithGeolocation } from './mapLoader.js';
import { debugLog, enableTapRedirect } from './ui.js';

let isResetting = false;
let mapRefreshInterval = null;

export function setupAnchorEvents() {
  const anchorFront = document.getElementById('anchorFront');
  const anchorBack = document.getElementById('anchorBack');
  const card = document.getElementById('cardBox');

  // Front Target (AR Card + Videos)
  if (anchorFront) {
    anchorFront.addEventListener('targetFound', () => {
      debugLog("🎯 Front marker detected");
      enableTapRedirect();

      const videoEl = document.getElementById('topVideoEntity');
      const leftEl = document.getElementById('leftVideoEntity');

      videoEl?.emit('startSlideOut');
      videoEl?.addEventListener('animationcomplete__slideout', () => {
        handleVideoPlayback();
        leftEl?.emit('startSlideOut');
        leftEl?.addEventListener('animationcomplete__slideout', () => {
          card?.emit('startSlideOut');
        }, { once: true });
      }, { once: true });
    });

    anchorFront.addEventListener('targetLost', () => {
      if (isResetting) return;
      isResetting = true;
      debugLog("🔁 Marker lost – DETACHING video textures");

      setTimeout(() => {
        detachVideoTexture('#topVideo', '#topVideoEntity');
        detachVideoTexture('#leftVideo', '#leftVideoEntity');

        ['#topVideoEntity', '#leftVideoEntity'].forEach(id => {
          const el = document.querySelector(id);
          if (el) {
            el.setAttribute('visible', false);
            el.setAttribute('position', '0 0.2 -0.1');
          }
        });

        card?.setAttribute('rotation', '0 0 0');
        isResetting = false;
        debugLog("✅ Video textures detached and reset applied");
      }, 300);
    });
  }

  // Back Target (Live Map)
  if (anchorBack) {
    anchorBack.addEventListener('targetFound', () => {
      debugLog("🗺️ Back marker detected – loading map");
      const mapPlane = document.getElementById('mapPlane');
      mapPlane?.emit('startMapAnim');
      loadMapWithGeolocation();

      // Optional: auto-refresh map every 10s while marker is held
      mapRefreshInterval = setInterval(() => {
        debugLog("🔄 Refreshing map via geolocation...");
        loadMapWithGeolocation();
      }, 10000);
    });

    anchorBack.addEventListener('targetLost', () => {
      debugLog("📴 Back marker lost – resetting map");

      const mapEl = document.getElementById('mapPlane');
      if (mapEl) {
        mapEl.setAttribute('visible', false);
        mapEl.setAttribute('position', '0 0.2 0.01');
        mapEl.setAttribute('material', 'shader: flat; color: #4a954e');
      }

      // Stop map refresh
      if (mapRefreshInterval) {
        clearInterval(mapRefreshInterval);
        mapRefreshInterval = null;
        debugLog("🛑 Stopped map auto-refresh");
      }
    });
  }
}
