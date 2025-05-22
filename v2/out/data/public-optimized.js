// public.js - Tibet Akademi kullanıcı tarafı JavaScript - Optimize edilmiş versiyon
// Bu dosya, kullanıcı tarafındaki etkileşimli öğeler için gerekli işlevleri içerir

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
  // Lazy loading uygula
  initLazyLoading();
  
  // Yorum formunu başlat
  initCommentForm();
  
  // Sosyal medya paylaşım butonlarını başlat
  initSocialSharing();
  
  // Galeri görüntüleyiciyi başlat (eğer sayfada galeri varsa)
  if (document.querySelector('.gallery-grid')) {
    initGalleryViewer();
  }
});

// Lazy loading uygula
function initLazyLoading() {
  // Tüm resimleri ve videoları seç
  const lazyImages = document.querySelectorAll('img[data-src], video[data-src]');
  
  // IntersectionObserver kullanarak lazy loading uygula
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyElement = entry.target;
          
          if (lazyElement.tagName === 'IMG') {
            lazyElement.src = lazyElement.dataset.src;
            if (lazyElement.dataset.srcset) {
              lazyElement.srcset = lazyElement.dataset.srcset;
            }
          } else if (lazyElement.tagName === 'VIDEO') {
            const sources = lazyElement.querySelectorAll('source');
            sources.forEach(function(source) {
              if (source.dataset.src) {
                source.src = source.dataset.src;
              }
            });
            lazyElement.load();
          }
          
          lazyElement.removeAttribute('data-src');
          lazyElement.removeAttribute('data-srcset');
          lazyObserver.unobserve(lazyElement);
        }
      });
    });
    
    lazyImages.forEach(function(lazyElement) {
      lazyObserver.observe(lazyElement);
    });
  } else {
    // IntersectionObserver desteklenmiyor, basit bir çözüm uygula
    setTimeout(function() {
      lazyImages.forEach(function(lazyElement) {
        if (lazyElement.tagName === 'IMG') {
          lazyElement.src = lazyElement.dataset.src;
          if (lazyElement.dataset.srcset) {
            lazyElement.srcset = lazyElement.dataset.srcset;
          }
        } else if (lazyElement.tagName === 'VIDEO') {
          const sources = lazyElement.querySelectorAll('source');
          sources.forEach(function(source) {
            if (source.dataset.src) {
              source.src = source.dataset.src;
            }
          });
          lazyElement.load();
        }
        
        lazyElement.removeAttribute('data-src');
        lazyElement.removeAttribute('data-srcset');
      });
    }, 1000);
  }
}

// Yorum formunu başlat
function initCommentForm() {
  const commentForm = document.querySelector('.comment-form');
  if (!commentForm) return;
  
  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const formData = new FormData(commentForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const comment = formData.get('comment');
    
    // Basit doğrulama
    if (!name || !email || !comment) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    
    // Yorum gönderme işlemi (örnek)
    console.log('Yorum gönderiliyor:', { name, email, comment });
    
    // Başarılı gönderim sonrası
    alert('Yorumunuz başarıyla gönderildi. Onaylandıktan sonra yayınlanacaktır.');
    commentForm.reset();
  });
}

// Sosyal medya paylaşım butonlarını başlat
function initSocialSharing() {
  const shareButtons = document.querySelectorAll('.share-button');
  if (!shareButtons.length) return;
  
  shareButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const platform = this.dataset.platform;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl = '';
      
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'whatsapp':
          shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
}

// Galeri görüntüleyiciyi başlat
function initGalleryViewer() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;
  
  // Galeri görüntüleyici oluştur
  const viewer = document.createElement('div');
  viewer.className = 'gallery-viewer';
  viewer.innerHTML = `
    <div class="gallery-viewer-overlay"></div>
    <div class="gallery-viewer-content">
      <button class="gallery-viewer-close">&times;</button>
      <div class="gallery-viewer-image-container">
        <img class="gallery-viewer-image" src="" alt="">
      </div>
      <div class="gallery-viewer-caption"></div>
      <button class="gallery-viewer-prev">&lt;</button>
      <button class="gallery-viewer-next">&gt;</button>
    </div>
  `;
  document.body.appendChild(viewer);
  
  // Görüntüleyici elemanlarını seç
  const viewerOverlay = viewer.querySelector('.gallery-viewer-overlay');
  const viewerContent = viewer.querySelector('.gallery-viewer-content');
  const viewerClose = viewer.querySelector('.gallery-viewer-close');
  const viewerImage = viewer.querySelector('.gallery-viewer-image');
  const viewerCaption = viewer.querySelector('.gallery-viewer-caption');
  const viewerPrev = viewer.querySelector('.gallery-viewer-prev');
  const viewerNext = viewer.querySelector('.gallery-viewer-next');
  
  // Görüntüleyiciyi kapat
  function closeViewer() {
    viewer.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  // Görüntüleyiciyi aç
  let currentIndex = 0;
  function openViewer(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    const image = item.querySelector('img');
    const caption = item.dataset.caption || '';
    
    viewerImage.src = image.dataset.src || image.src;
    viewerCaption.textContent = caption;
    
    viewer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Önceki/sonraki butonlarını güncelle
    viewerPrev.style.display = currentIndex > 0 ? 'block' : 'none';
    viewerNext.style.display = currentIndex < galleryItems.length - 1 ? 'block' : 'none';
  }
  
  // Önceki resme git
  function showPrevImage() {
    if (currentIndex > 0) {
      openViewer(currentIndex - 1);
    }
  }
  
  // Sonraki resme git
  function showNextImage() {
    if (currentIndex < galleryItems.length - 1) {
      openViewer(currentIndex + 1);
    }
  }
  
  // Olay dinleyicileri ekle
  galleryItems.forEach(function(item, index) {
    item.addEventListener('click', function() {
      openViewer(index);
    });
  });
  
  viewerOverlay.addEventListener('click', closeViewer);
  viewerClose.addEventListener('click', closeViewer);
  viewerPrev.addEventListener('click', showPrevImage);
  viewerNext.addEventListener('click', showNextImage);
  
  // Klavye olaylarını dinle
  document.addEventListener('keydown', function(e) {
    if (viewer.style.display === 'block') {
      if (e.key === 'Escape') {
        closeViewer();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });
}
