export function simulateLoading() {
    const progressFill = document.getElementById('progress-fill');
    let progress = 0;
  
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
  
        setTimeout(() => {
          const loader = document.getElementById('ar-loader');
          if (loader) {
            loader.style.opacity = 0;
            setTimeout(() => loader.style.display = 'none', 500);
          }
        }, 300);
      }
      if (progressFill) {
        progressFill.style.width = `${progress}%`;
      }
    }, 300);
  }
  
  export function debugLog(msg) {
    const consoleEl = document.getElementById('debug-console');
    if (!consoleEl) return;
  
    const entry = document.createElement('div');
    entry.textContent = `[DEBUG ${new Date().toLocaleTimeString()}]: ${msg}`;
    consoleEl.appendChild(entry);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  
    console.log(msg); // Also log to browser dev console
  }
  
  export function enableTapRedirect() {
    debugLog("📲 AR scene tap redirect enabled");
    const openSite = () => {
      debugLog("🌐 Redirecting to: https://seagold-dormitory.vercel.app");
      window.open('https://seagold-dormitory.vercel.app', '_blank');
    };
    document.body.addEventListener('click', openSite, { once: true });
  }
  