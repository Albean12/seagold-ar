import { debugLog } from './ui.js';

export function loadMapWithGeolocation() {
  const mapPlane = document.getElementById("mapPlane");
  if (!mapPlane) {
    debugLog("❌ mapPlane not found.");
    return;
  }

  const GOOGLE_API_KEY = "AIzaSyBoAmNMyi-pULIdPSAjDMbRsrHMWeXLLrE";
  const dormPos = { lat: 14.603919, lng: 120.987760 };
  const baseUrl = `https://maps.googleapis.com/maps/api/staticmap?zoom=16&size=600x400&maptype=roadmap&key=${GOOGLE_API_KEY}&markers=color:red%7Clabel:D%7C${dormPos.lat},${dormPos.lng}`;

  const buildMapUrl = (userCoords) => {
    return `${baseUrl}&markers=color:blue%7Clabel:U%7C${userCoords.lat},${userCoords.lng}`;
  };

  const loadImage = (src) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const secure = src.replace(/^http:/, 'https:');
      mapPlane.setAttribute('material', `shader: flat; src: ${secure}`);
      mapPlane.setAttribute('visible', true);
      debugLog("🗺️ Map successfully applied.");
    };
    img.onerror = () => {
      debugLog("❌ Map failed to load. Using fallback.");
      mapPlane.setAttribute('material', 'shader: flat; color: #4a954e');
      mapPlane.setAttribute('visible', true);
    };
    img.src = src;
  };

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const user = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        loadImage(buildMapUrl(user));
      },
      (err) => {
        debugLog("⚠️ Geolocation error or denied. Loading static dorm map.");
        loadImage(baseUrl);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  } else {
    debugLog("⚠️ Geolocation not supported.");
    loadImage(baseUrl);
  }
}
