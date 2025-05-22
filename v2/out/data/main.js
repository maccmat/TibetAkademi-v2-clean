// main.js - Tibet Akademi ana JavaScript dosyası - Optimize edilmiş versiyon
// Bu dosya, tüm sayfalar için ortak işlevleri içerir ve diğer JS dosyalarını yükler

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
  // Aktif menü öğesini belirle
  highlightActiveMenuItem();
  
  // Mobil menü işlevselliği
  initMobileMenu();
  
  // Sayfa türünü belirle ve ilgili JS'yi yükle - Optimize edilmiş
  loadPageSpecificScripts();
});

// Aktif menü öğesini belirle
function highlightActiveMenuItem() {
  const currentPath = window.location.pathname;
  console.log('Current path for menu highlighting:', currentPath);
  
  // Tüm menü öğelerini seç
  const menuItems = document.querySelectorAll('header a');
  
  // Önce tüm aktif sınıfları kaldır
  menuItems.forEach(item => {
    item.classList.remove('text-primary-color', 'font-semibold', 'border-b-2', 'border-primary-color');
    if (item.classList.contains('text-gray-700')) {
      item.classList.remove('text-black');
      item.classList.add('text-gray-700');
    }
  });
  
  // Eşleşen menü öğesini bul ve aktif yap
  let activeMenuItem = null;
  
  // Tam eşleşme kontrolü
  menuItems.forEach(item => {
    const itemPath = new URL(item.href).pathname;
    if (itemPath === currentPath) {
      activeMenuItem = item;
    }
  });
  
  // Tam eşleşme yoksa, alt sayfa kontrolü
  if (!activeMenuItem && currentPath !== '/') {
    menuItems.forEach(item => {
      const itemPath = new URL(item.href).pathname;
      if (itemPath !== '/' && currentPath.startsWith(itemPath)) {
        activeMenuItem = item;
      }
    });
  }
  
  // Ana sayfa için özel kontrol
  if (currentPath === '/' || currentPath === '') {
    menuItems.forEach(item => {
      const itemPath = new URL(item.href).pathname;
      if (itemPath === '/' && item.textContent.trim() === 'Ana Sayfa') {
        activeMenuItem = item;
      }
    });
  }
  
  // Aktif menü öğesini vurgula
  if (activeMenuItem) {
    console.log('Setting active menu item:', activeMenuItem.textContent.trim());
    activeMenuItem.classList.add('text-primary-color', 'font-semibold');
    
    // Mobil menüde de aktif et
    const mobileMenuItems = document.querySelectorAll('.md\\:hidden.fixed.inset-0 a');
    mobileMenuItems.forEach(item => {
      if (item.textContent.trim() === activeMenuItem.textContent.trim()) {
        item.classList.add('text-primary-color', 'font-semibold');
      }
    });
  } else {
    console.log('No matching menu item found for:', currentPath);
  }
}

// Mobil menü işlevselliği - Optimize edilmiş
function initMobileMenu() {
  const menuButton = document.querySelector('button[aria-controls="navbar-sticky-content"]');
  const mobileMenu = document.querySelector('.md\\:hidden.fixed.inset-0');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        // Menüyü kapat
        this.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('opacity-100');
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        
        // Menü simgesini döndür
        const menuIcon = this.querySelector('svg');
        if (menuIcon) {
          menuIcon.classList.remove('rotate-90');
        }
      } else {
        // Menüyü aç
        this.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100');
        
        // Menü simgesini döndür
        const menuIcon = this.querySelector('svg');
        if (menuIcon) {
          menuIcon.classList.add('rotate-90');
        }
        
        // Animasyonları başlat - Optimize edilmiş
        const menuItems = mobileMenu.querySelectorAll('a');
        const socialIcons = mobileMenu.querySelectorAll('.flex.items-center.space-x-6 a');
        
        menuItems.forEach((item, index) => {
          item.style.animationDelay = `${index * 0.05}s`; // Daha hızlı animasyon
          item.style.animation = 'fadeInDown 0.3s forwards'; // Daha hızlı animasyon
        });
        
        socialIcons.forEach((icon, index) => {
          icon.style.animationDelay = `${0.3 + (index * 0.05)}s`; // Daha hızlı animasyon
          icon.style.animation = 'fadeInUp 0.3s forwards'; // Daha hızlı animasyon
        });
      }
    });
  }
}

// Sayfa türünü belirle ve ilgili JS'yi yükle - Optimize edilmiş
function loadPageSpecificScripts() {
  // Admin sayfası mı kontrol et
  if (window.location.pathname.includes('/admin')) {
    // Admin sayfası için gerekli scriptleri async olarak yükle
    loadScriptAsync('/data/comments.js');
    loadScriptAsync('/data/admin-simple.js'); // Yeni optimize edilmiş admin script
    return;
  }
  
  // Diğer sayfalar için comments.js ve public.js async olarak yükle
  loadScriptAsync('/data/comments.js');
  loadScriptAsync('/data/public.js');
}

// Async script yükleme fonksiyonu - Optimize edilmiş
function loadScriptAsync(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true; // Asenkron yükleme
  document.head.appendChild(script);
}

// Eski dinamik script yükleme fonksiyonu - Geriye dönük uyumluluk için korundu
function loadScript(src, callback) {
  loadScriptAsync(src);
  if (callback) {
    setTimeout(callback, 10); // Geriye dönük uyumluluk için basit bir çözüm
  }
}
