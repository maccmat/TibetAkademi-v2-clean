// admin-simple.js - Tibet Akademi admin panel basit giriş mantığı
// Bu dosya, statik ortamda çalışacak şekilde tasarlanmıştır

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
  console.log('Admin-simple.js loaded and running');
  
  // Form submit olayını dinle
  const loginForm = document.querySelector('form');
  if (loginForm) {
    console.log('Login form found, adding submit event listener');
    
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      
      const passwordInput = document.getElementById('password');
      if (!passwordInput) {
        console.error('Password input not found');
        return;
      }
      
      const password = passwordInput.value;
      console.log('Password entered:', password);
      
      // Şifre kontrolü
      if (password === 'tibet2025') {
        console.log('Password correct, showing admin panel');
        showAdminPanel();
      } else {
        console.log('Incorrect password');
        alert('Hatalı şifre!');
      }
    });
  } else {
    console.error('Login form not found');
  }
  
  // Giriş butonuna tıklama olayını dinle (alternatif yöntem)
  const loginButton = document.querySelector('button');
  if (loginButton) {
    console.log('Login button found, adding click event listener');
    
    loginButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Login button clicked');
      
      const passwordInput = document.getElementById('password');
      if (!passwordInput) {
        console.error('Password input not found');
        return;
      }
      
      const password = passwordInput.value;
      console.log('Password entered:', password);
      
      // Şifre kontrolü
      if (password === 'tibet2025') {
        console.log('Password correct, showing admin panel');
        showAdminPanel();
      } else {
        console.log('Incorrect password');
        alert('Hatalı şifre!');
      }
    });
  } else {
    console.error('Login button not found');
  }
});

// Admin panelini göster
function showAdminPanel() {
  console.log('Showing admin panel');
  
  // Login formunu içeren container'ı bul
  const loginContainer = document.querySelector('.sm\\:mx-auto.sm\\:w-full.sm\\:max-w-md');
  if (!loginContainer) {
    console.error('Login container not found');
    return;
  }
  
  // Login formunu gizle
  loginContainer.style.display = 'none';
  console.log('Login form hidden');
  
  // Ana içerik alanını bul
  const mainContent = document.querySelector('main');
  if (!mainContent) {
    console.error('Main content area not found');
    return;
  }
  
  // Admin panel HTML'ini oluştur
  const adminPanelHTML = `
    <div class="admin-dashboard container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Tibet Akademi Admin Paneli</h1>
        <a href="/" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors">
          Siteye Dön
        </a>
      </div>
      
      <div class="flex border-b border-gray-200 mb-6">
        <button id="tab-pending" class="py-3 px-6 border-b-2 border-primary-color text-primary-color font-medium">
          Bekleyen Yorumlar (<span id="pending-count">3</span>)
        </button>
        <button id="tab-approved" class="py-3 px-6 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
          Onaylanmış Yorumlar (<span id="approved-count">2</span>)
        </button>
        <button id="tab-facebook" class="py-3 px-6 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
          Facebook Paylaşımları (<span id="facebook-count">1</span>)
        </button>
      </div>
      
      <div id="admin-content" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-6">Bekleyen Yorumlar</h2>
        
        <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="1">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
                A
              </div>
            </div>
            <div class="flex-grow">
              <div class="flex items-center">
                <h3 class="font-semibold">Ahmet Yılmaz</h3>
                <span class="text-gray-500 text-sm ml-2">@ahmet.yilmaz</span>
              </div>
              <p class="my-2">Tibet Akademi'nin Erasmus+ projeleri sayesinde harika bir deneyim yaşadım. Kültürlerarası öğrenme fırsatları sunduğunuz için teşekkür ederim!</p>
              <div class="text-gray-500 text-sm">
                22 Mayıs 2025 • Website
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button class="reject-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded mr-2 transition-colors">
              Reddet
            </button>
            <button class="approve-btn bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 px-4 rounded transition-colors">
              Onayla
            </button>
          </div>
        </div>
        
        <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="2">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
                M
              </div>
            </div>
            <div class="flex-grow">
              <div class="flex items-center">
                <h3 class="font-semibold">Mehmet Kaya</h3>
                <span class="text-gray-500 text-sm ml-2">@mehmet.kaya</span>
              </div>
              <p class="my-2">Projenize katılmak benim için çok değerli bir deneyimdi. Farklı kültürlerden insanlarla tanışma fırsatı buldum ve ufkum genişledi.</p>
              <div class="text-gray-500 text-sm">
                21 Mayıs 2025 • Website
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button class="reject-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded mr-2 transition-colors">
              Reddet
            </button>
            <button class="approve-btn bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 px-4 rounded transition-colors">
              Onayla
            </button>
          </div>
        </div>
        
        <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="3">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
                Z
              </div>
            </div>
            <div class="flex-grow">
              <div class="flex items-center">
                <h3 class="font-semibold">Zeynep Demir</h3>
                <span class="text-gray-500 text-sm ml-2">@zeynep.demir</span>
              </div>
              <p class="my-2">Tibet Akademi'nin düzenlediği eğitim programları gerçekten çok faydalı. Yeni beceriler kazandım ve uluslararası bir ağa dahil oldum.</p>
              <div class="text-gray-500 text-sm">
                20 Mayıs 2025 • Website
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button class="reject-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded mr-2 transition-colors">
              Reddet
            </button>
            <button class="approve-btn bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 px-4 rounded transition-colors">
              Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Admin panelini sayfaya ekle
  mainContent.innerHTML = adminPanelHTML;
  console.log('Admin panel added to page');
  
  // Tab değiştirme işlevselliğini ekle
  addTabSwitchingFunctionality();
  
  // Buton olaylarını ekle
  addButtonEventListeners();
}

// Tab değiştirme işlevselliğini ekle
function addTabSwitchingFunctionality() {
  console.log('Adding tab switching functionality');
  
  const tabPending = document.getElementById('tab-pending');
  const tabApproved = document.getElementById('tab-approved');
  const tabFacebook = document.getElementById('tab-facebook');
  
  if (!tabPending || !tabApproved || !tabFacebook) {
    console.error('Tab elements not found');
    return;
  }
  
  tabPending.addEventListener('click', function() {
    console.log('Pending tab clicked');
    setActiveTab(tabPending);
    showPendingComments();
  });
  
  tabApproved.addEventListener('click', function() {
    console.log('Approved tab clicked');
    setActiveTab(tabApproved);
    showApprovedComments();
  });
  
  tabFacebook.addEventListener('click', function() {
    console.log('Facebook tab clicked');
    setActiveTab(tabFacebook);
    showFacebookPosts();
  });
}

// Aktif tab'ı ayarla
function setActiveTab(activeTab) {
  console.log('Setting active tab:', activeTab.id);
  
  const tabs = [
    document.getElementById('tab-pending'),
    document.getElementById('tab-approved'),
    document.getElementById('tab-facebook')
  ];
  
  tabs.forEach(tab => {
    if (tab === activeTab) {
      tab.className = 'py-3 px-6 border-b-2 border-primary-color text-primary-color font-medium';
    } else {
      tab.className = 'py-3 px-6 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium';
    }
  });
}

// Bekleyen yorumları göster
function showPendingComments() {
  console.log('Showing pending comments');
  
  const contentArea = document.getElementById('admin-content');
  if (!contentArea) {
    console.error('Content area not found');
    return;
  }
  
  contentArea.innerHTML = `
    <h2 class="text-2xl font-semibold mb-6">Bekleyen Yorumlar</h2>
    
    <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="1">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
            A
          </div>
        </div>
        <div class="flex-grow">
          <div class="flex items-center">
            <h3 class="font-semibold">Ahmet Yılmaz</h3>
            <span class="text-gray-500 text-sm ml-2">@ahmet.yilmaz</span>
          </div>
          <p class="my-2">Tibet Akademi'nin Erasmus+ projeleri sayesinde harika bir deneyim yaşadım. Kültürlerarası öğrenme fırsatları sunduğunuz için teşekkür ederim!</p>
          <div class="text-gray-500 text-sm">
            22 Mayıs 2025 • Website
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button class="reject-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded mr-2 transition-colors">
          Reddet
        </button>
        <button class="approve-btn bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 px-4 rounded transition-colors">
          Onayla
        </button>
      </div>
    </div>
    
    <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="2">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
            M
          </div>
        </div>
        <div class="flex-grow">
          <div class="flex items-center">
            <h3 class="font-semibold">Mehmet Kaya</h3>
            <span class="text-gray-500 text-sm ml-2">@mehmet.kaya</span>
          </div>
          <p class="my-2">Projenize katılmak benim için çok değerli bir deneyimdi. Farklı kültürlerden insanlarla tanışma fırsatı buldum ve ufkum genişledi.</p>
          <div class="text-gray-500 text-sm">
            21 Mayıs 2025 • Website
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button class="reject-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded mr-2 transition-colors">
          Reddet
        </button>
        <button class="approve-btn bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 px-4 rounded transition-colors">
          Onayla
        </button>
      </div>
    </div>
    
    <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="3">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
            Z
          </div>
        </div>
        <div class="flex-grow">
          <div class="flex items-center">
            <h3 class="font-semibold">Zeynep Demir</h3>
            <span class="text-gray-500 text-sm ml-2">@zeynep.demir</span>
          </div>
          <p class="my-2">Tibet Akademi'nin düzenlediği eğitim programları gerçekten çok faydalı. Yeni beceriler kazandım ve uluslararası bir ağa dahil oldum.</p>
          <div class="text-gray-500 text-sm">
            20 Mayıs 2025 • Website
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button class="reject-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded mr-2 transition-colors">
          Reddet
        </button>
        <button class="approve-btn bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 px-4 rounded transition-colors">
          Onayla
        </button>
      </div>
    </div>
  `;
  
  // Buton olaylarını ekle
  addButtonEventListeners();
}

// Onaylanmış yorumları göster
function showApprovedComments() {
  console.log('Showing approved comments');
  
  const contentArea = document.getElementById('admin-content');
  if (!contentArea) {
    console.error('Content area not found');
    return;
  }
  
  contentArea.innerHTML = `
    <h2 class="text-2xl font-semibold mb-6">Onaylanmış Yorumlar</h2>
    
    <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="4">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
            E
          </div>
        </div>
        <div class="flex-grow">
          <div class="flex items-center">
            <h3 class="font-semibold">Elif Şahin</h3>
            <span class="text-gray-500 text-sm ml-2">@elif.sahin</span>
          </div>
          <p class="my-2">Tibet Akademi ile katıldığım Erasmus+ projesi hayatımın en güzel deneyimlerinden biriydi. Yeni arkadaşlıklar kurdum ve farklı kültürleri tanıma fırsatı buldum.</p>
          <div class="text-gray-500 text-sm">
            19 Mayıs 2025 • Website
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button class="delete-approved-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded transition-colors">
          Sil
        </button>
      </div>
    </div>
    
    <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="5">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
            C
          </div>
        </div>
        <div class="flex-grow">
          <div class="flex items-center">
            <h3 class="font-semibold">Can Öztürk</h3>
            <span class="text-gray-500 text-sm ml-2">@can.ozturk</span>
          </div>
          <p class="my-2">Tibet Akademi'nin eğitim programları sayesinde hem kişisel hem de profesyonel anlamda kendimi geliştirme fırsatı buldum. Teşekkürler!</p>
          <div class="text-gray-500 text-sm">
            18 Mayıs 2025 • Website
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button class="delete-approved-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded transition-colors">
          Sil
        </button>
      </div>
    </div>
  `;
  
  // Buton olaylarını ekle
  addButtonEventListeners();
}

// Facebook paylaşımlarını göster
function showFacebookPosts() {
  console.log('Showing Facebook posts');
  
  const contentArea = document.getElementById('admin-content');
  if (!contentArea) {
    console.error('Content area not found');
    return;
  }
  
  contentArea.innerHTML = `
    <h2 class="text-2xl font-semibold mb-6">Facebook Paylaşımları</h2>
    
    <div class="post-item bg-gray-50 p-4 rounded-lg mb-4" data-id="1">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </div>
        </div>
        <div class="flex-grow">
          <p class="my-2">Tibet Akademi olarak yeni Erasmus+ projemizi duyurmaktan mutluluk duyuyoruz! Detaylı bilgi için web sitemizi ziyaret edebilirsiniz. #ErasmusPlus #TibetAkademi #KültürlerarasıEğitim</p>
          <div class="text-gray-500 text-sm">
            22 Mayıs 2025
          </div>
          <div class="flex items-center mt-2 text-sm text-gray-600">
            <span class="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart mr-1 text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              45
            </span>
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle mr-1 text-blue-500"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
              12
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button class="delete-post-btn bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-4 rounded transition-colors">
          Sil
        </button>
      </div>
    </div>
  `;
  
  // Buton olaylarını ekle
  addButtonEventListeners();
}

// Buton olaylarını ekle
function addButtonEventListeners() {
  console.log('Adding button event listeners');
  
  // Reddet butonları
  document.querySelectorAll('.reject-btn').forEach(button => {
    button.addEventListener('click', function() {
      const commentItem = this.closest('.comment-item');
      const commentId = commentItem.dataset.id;
      console.log('Reject button clicked for comment ID:', commentId);
      
      // Yorumu kaldır
      commentItem.remove();
      
      // Bekleyen yorum sayısını güncelle
      const pendingCount = document.getElementById('pending-count');
      if (pendingCount) {
        pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
      }
    });
  });
  
  // Onayla butonları
  document.querySelectorAll('.approve-btn').forEach(button => {
    button.addEventListener('click', function() {
      const commentItem = this.closest('.comment-item');
      const commentId = commentItem.dataset.id;
      console.log('Approve button clicked for comment ID:', commentId);
      
      // Yorumu kaldır
      commentItem.remove();
      
      // Bekleyen ve onaylanmış yorum sayılarını güncelle
      const pendingCount = document.getElementById('pending-count');
      const approvedCount = document.getElementById('approved-count');
      
      if (pendingCount) {
        pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
      }
      
      if (approvedCount) {
        approvedCount.textContent = parseInt(approvedCount.textContent) + 1;
      }
    });
  });
  
  // Onaylanmış yorumları silme butonları
  document.querySelectorAll('.delete-approved-btn').forEach(button => {
    button.addEventListener('click', function() {
      const commentItem = this.closest('.comment-item');
      const commentId = commentItem.dataset.id;
      console.log('Delete approved comment button clicked for comment ID:', commentId);
      
      // Yorumu kaldır
      commentItem.remove();
      
      // Onaylanmış yorum sayısını güncelle
      const approvedCount = document.getElementById('approved-count');
      if (approvedCount) {
        approvedCount.textContent = parseInt(approvedCount.textContent) - 1;
      }
    });
  });
  
  // Facebook paylaşımlarını silme butonları
  document.querySelectorAll('.delete-post-btn').forEach(button => {
    button.addEventListener('click', function() {
      const postItem = this.closest('.post-item');
      const postId = postItem.dataset.id;
      console.log('Delete post button clicked for post ID:', postId);
      
      // Paylaşımı kaldır
      postItem.remove();
      
      // Facebook paylaşımı sayısını güncelle
      const facebookCount = document.getElementById('facebook-count');
      if (facebookCount) {
        facebookCount.textContent = parseInt(facebookCount.textContent) - 1;
      }
    });
  });
}
