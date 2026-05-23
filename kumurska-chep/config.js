// config.js - Оюндун негизги орнотуулары

const CONFIG = {
    width: 1200,
    height: 700,
    backgroundColor: '#0a1f0a', // Кара-жашыл фон (токой стили)
    title: "Kumurska Chep",
    
    // Ресурстар
    resources: {
        leaves: 500,
        honey: 200,
        dirt: 300,
        water: 150
    },
    
    // Оюн параметрлери
    maxZoom: 1.5,
    minZoom: 0.6,
    
    debug: true   // true болсо консолдо маалымат чыгат
};

console.log("✅ Config жүктөлдү - Kumurska Chep");
