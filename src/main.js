import { setupAnchorEvents } from './ar/events.js';
import { simulateLoading } from './ar/ui.js';
import { setupCardFlip } from './ar/cardControl.js';
import { setupActionButtons } from './ar/actionButtons.js';

window.addEventListener('load', () => {
  simulateLoading();         // Show progress loader
  setupCardFlip();           // Flip animation on tap
  setupAnchorEvents();       // AR targetFound / targetLost event handling      
  setupActionButtons();
});
