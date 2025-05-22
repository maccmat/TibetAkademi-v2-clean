// main.js - Tibet Akademi ana JavaScript dosyası
// Bu dosya, tüm sayfalar için ortak işlevleri içerir ve diğer JS dosyalarını yükler

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
  // Mobil menü işlevselliği
  initMobileMenu();
  
  // Sayfa türünü belirle ve ilgili JS'yi yükle
  loadPageSpecificScripts();
});

// Mobil menü işlevselliği
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
        
        // Animasyonları başlat
        const menuItems = mobileMenu.querySelectorAll('a');
        const socialIcons = mobileMenu.querySelectorAll('.flex.items-center.space-x-6 a');
        
        menuItems.forEach((item, index) => {
          item.style.animationDelay = `${index * 0.1}s`;
          item.style.animation = 'fadeInDown 0.5s forwards';
        });
        
        socialIcons.forEach((icon, index) => {
          icon.style.animationDelay = `${0.5 + (index * 0.1)}s`;
          icon.style.animation = 'fadeInUp 0.5s forwards';
        });
      }
    });
  }
}

// Sayfa türünü belirle ve ilgili JS'yi yükle
function loadPageSpecificScripts() {
  // Admin sayfası mı kontrol et
  if (window.location.pathname.includes('/admin')) {
    loadScript('/data/comments.js', function() {
      loadScript('/data/admin.js');
    });
    return;
  }
  
  // Diğer sayfalar için comments.js ve public.js yükle
  loadScript('/data/comments.js', function() {
    loadScript('/data/public.js');
  });
}

// Dinamik script yükleme fonksiyonu
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback || function() {};
  document.head.appendChild(script);
}
