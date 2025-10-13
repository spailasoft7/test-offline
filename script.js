if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/test-offline/service-worker.js');
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.error('Service Worker registration failed:', err));
}
