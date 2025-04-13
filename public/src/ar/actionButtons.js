export function setupActionButtons() {
  const topVideo = document.getElementById('topVideoEntity');
  const leftVideo = document.getElementById('leftVideoEntity');
  const galleryBtn = document.getElementById('galleryButton');
  const unitsBtn = document.getElementById('unitsButton');

  let topVideoReady = false;
  let leftVideoReady = false;

  // Attach AFTER animation is done
  topVideo?.addEventListener('animationcomplete__slideout', () => {
    topVideoReady = true;
    topVideo.addEventListener('click', () => {
      if (!topVideoReady) return;
      galleryBtn?.emit('revealButton');
    });
  });

  leftVideo?.addEventListener('animationcomplete__slideout', () => {
    leftVideoReady = true;
    leftVideo.addEventListener('click', () => {
      if (!leftVideoReady) return;
      unitsBtn?.emit('revealButton');
    });
  });

  galleryBtn?.addEventListener('click', () => {
    window.open('https://seagold-dormitory.vercel.app/gallery', '_blank');
  });

  unitsBtn?.addEventListener('click', () => {
    window.open('https://seagold-dormitory.vercel.app/units', '_blank');
  });
}
