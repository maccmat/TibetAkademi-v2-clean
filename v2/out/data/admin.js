// admin.js - Tibet Akademi admin panel işlevselliği
// Bu dosya, admin panelindeki yorum yönetim işlevlerini kontrol eder

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
  console.log('Admin.js loaded and running');
  
  // Admin giriş formunu kontrol et
  const loginForm = document.querySelector('form');
  console.log('Login form found:', !!loginForm);
  
  if (loginForm) {
    console.log('Adding submit event listener to login form');
    
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      
      const passwordInput = document.getElementById('password');
      console.log('Password input found:', !!passwordInput);
      
      if (!passwordInput) {
        console.error('Password input not found');
        return;
      }
      
      const password = passwordInput.value;
      console.log('Password entered:', password);
      
      // Şifre kontrolü
      if (password === 'tibet2025') {
        console.log('Password correct, loading admin panel');
        loadAdminPanel();
      } else {
        console.log('Incorrect password');
        alert('Hatalı şifre!');
      }
    });
  } else {
    console.log('Login form not found, checking if already in admin dashboard');
    // Zaten giriş yapılmışsa admin panelini yükle
    if (document.querySelector('.admin-dashboard')) {
      console.log('Admin dashboard found, initializing');
      initializeAdminPanel();
    } else {
      console.log('Neither login form nor admin dashboard found');
    }
  }
  
  // Doğrudan giriş butonu için alternatif olay dinleyici
  const loginButton = document.querySelector('button[type="submit"]');
  if (loginButton) {
    console.log('Adding click event listener to login button');
    
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
        console.log('Password correct, loading admin panel');
        loadAdminPanel();
      } else {
        console.log('Incorrect password');
        alert('Hatalı şifre!');
      }
    });
  }
});

// Admin panelini yükle
function loadAdminPanel() {
  console.log('Loading admin panel');
  
  // Giriş formunu gizle
  const loginContainer = document.querySelector('.sm\\:mx-auto.sm\\:w-full.sm\\:max-w-md');
  if (loginContainer) {
    console.log('Login container found, hiding it');
    loginContainer.style.display = 'none';
  } else {
    console.error('Login container not found');
  }
  
  // Admin panelini oluştur ve göster
  const adminContainer = document.createElement('div');
  adminContainer.className = 'admin-dashboard container mx-auto px-4 py-8';
  
  // Admin panel başlığı
  const header = document.createElement('div');
  header.className = 'flex justify-between items-center mb-8';
  header.innerHTML = `
    <h1 class="text-3xl font-bold">Tibet Akademi Admin Paneli</h1>
    <a href="/" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors">
      Siteye Dön
    </a>
  `;
  
  // Tab menüsü
  const tabMenu = document.createElement('div');
  tabMenu.className = 'flex border-b border-gray-200 mb-6';
  tabMenu.innerHTML = `
    <button id="tab-pending" class="py-3 px-6 border-b-2 border-primary-color text-primary-color font-medium">
      Bekleyen Yorumlar (<span id="pending-count">0</span>)
    </button>
    <button id="tab-approved" class="py-3 px-6 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
      Onaylanmış Yorumlar (<span id="approved-count">0</span>)
    </button>
    <button id="tab-facebook" class="py-3 px-6 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
      Facebook Paylaşımları (<span id="facebook-count">0</span>)
    </button>
  `;
  
  // İçerik alanı
  const contentArea = document.createElement('div');
  contentArea.id = 'admin-content';
  contentArea.className = 'bg-white rounded-lg shadow-md p-6';
  contentArea.innerHTML = `
    <div class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color mx-auto"></div>
      <p class="mt-4 text-gray-600">Yorumlar yükleniyor...</p>
    </div>
  `;
  
  // Admin panelini sayfaya ekle
  adminContainer.appendChild(header);
  adminContainer.appendChild(tabMenu);
  adminContainer.appendChild(contentArea);
  
  // Admin panelini sayfaya ekle
  const mainContent = document.querySelector('main');
  if (mainContent) {
    console.log('Main content found, adding admin panel');
    mainContent.innerHTML = '';
    mainContent.appendChild(adminContainer);
    
    // Admin panel işlevselliğini başlat
    initializeAdminPanel();
  } else {
    console.error('Main content element not found');
  }
}

// Admin panel işlevselliğini başlat
function initializeAdminPanel() {
  console.log('Initializing admin panel');
  
  // Tab değiştirme işlevselliği
  const tabPending = document.getElementById('tab-pending');
  const tabApproved = document.getElementById('tab-approved');
  const tabFacebook = document.getElementById('tab-facebook');
  
  if (tabPending && tabApproved && tabFacebook) {
    console.log('Tab elements found');
    
    // Yorum sayılarını güncelle
    updateCommentCounts();
    
    // Varsayılan olarak bekleyen yorumları göster
    showPendingComments();
    
    // Tab tıklama olaylarını ekle
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
  } else {
    console.error('Tab elements not found');
  }
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
  
  contentArea.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color mx-auto"></div><p class="mt-4 text-gray-600">Yorumlar yükleniyor...</p></div>';
  
  // Yorumları yükle
  loadComments().then(comments => {
    console.log('Comments loaded:', comments);
    
    if (comments.pendingComments.length === 0) {
      contentArea.innerHTML = '<div class="text-center py-8"><p class="text-gray-600">Bekleyen yorum bulunmuyor.</p></div>';
      return;
    }
    
    let html = '<h2 class="text-2xl font-semibold mb-6">Bekleyen Yorumlar</h2>';
    
    comments.pendingComments.forEach(comment => {
      html += `
        <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="${comment.id}">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
                ${comment.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div class="flex-grow">
              <div class="flex items-center">
                <h3 class="font-semibold">${comment.name}</h3>
                <span class="text-gray-500 text-sm ml-2">${comment.username}</span>
              </div>
              <p class="my-2">${comment.content}</p>
              <div class="text-gray-500 text-sm">
                ${comment.date} • ${comment.source}
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
    });
    
    contentArea.innerHTML = html;
    
    // Buton olaylarını ekle
    document.querySelectorAll('.reject-btn').forEach(button => {
      button.addEventListener('click', function() {
        const commentId = this.closest('.comment-item').dataset.id;
        rejectComment(commentId).then(result => {
          if (result.success) {
            updateCommentCounts();
            showPendingComments();
          } else {
            alert(result.message);
          }
        });
      });
    });
    
    document.querySelectorAll('.approve-btn').forEach(button => {
      button.addEventListener('click', function() {
        const commentId = this.closest('.comment-item').dataset.id;
        approveComment(commentId).then(result => {
          if (result.success) {
            updateCommentCounts();
            showPendingComments();
          } else {
            alert(result.message);
          }
        });
      });
    });
  });
}

// Onaylanmış yorumları göster
function showApprovedComments() {
  console.log('Showing approved comments');
  
  const contentArea = document.getElementById('admin-content');
  if (!contentArea) {
    console.error('Content area not found');
    return;
  }
  
  contentArea.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color mx-auto"></div><p class="mt-4 text-gray-600">Yorumlar yükleniyor...</p></div>';
  
  // Yorumları yükle
  loadComments().then(comments => {
    if (comments.approvedComments.length === 0) {
      contentArea.innerHTML = '<div class="text-center py-8"><p class="text-gray-600">Onaylanmış yorum bulunmuyor.</p></div>';
      return;
    }
    
    let html = '<h2 class="text-2xl font-semibold mb-6">Onaylanmış Yorumlar</h2>';
    
    comments.approvedComments.forEach(comment => {
      html += `
        <div class="comment-item bg-gray-50 p-4 rounded-lg mb-4" data-id="${comment.id}">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
                ${comment.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div class="flex-grow">
              <div class="flex items-center">
                <h3 class="font-semibold">${comment.name}</h3>
                <span class="text-gray-500 text-sm ml-2">${comment.username}</span>
              </div>
              <p class="my-2">${comment.content}</p>
              <div class="text-gray-500 text-sm">
                ${comment.date} • ${comment.source}
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
    });
    
    contentArea.innerHTML = html;
    
    // Buton olaylarını ekle
    document.querySelectorAll('.delete-approved-btn').forEach(button => {
      button.addEventListener('click', function() {
        const commentId = this.closest('.comment-item').dataset.id;
        deleteApprovedComment(commentId).then(result => {
          if (result.success) {
            updateCommentCounts();
            showApprovedComments();
          } else {
            alert(result.message);
          }
        });
      });
    });
  });
}

// Facebook paylaşımlarını göster
function showFacebookPosts() {
  console.log('Showing Facebook posts');
  
  const contentArea = document.getElementById('admin-content');
  if (!contentArea) {
    console.error('Content area not found');
    return;
  }
  
  contentArea.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color mx-auto"></div><p class="mt-4 text-gray-600">Paylaşımlar yükleniyor...</p></div>';
  
  // Paylaşımları yükle
  loadComments().then(comments => {
    if (comments.facebookPosts.length === 0) {
      contentArea.innerHTML = '<div class="text-center py-8"><p class="text-gray-600">Facebook paylaşımı bulunmuyor.</p></div>';
      return;
    }
    
    let html = '<h2 class="text-2xl font-semibold mb-6">Facebook Paylaşımları</h2>';
    
    comments.facebookPosts.forEach(post => {
      html += `
        <div class="post-item bg-gray-50 p-4 rounded-lg mb-4" data-id="${post.id}">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </div>
            </div>
            <div class="flex-grow">
              <p class="my-2">${post.content}</p>
              <div class="text-gray-500 text-sm">
                ${post.date}
              </div>
              <div class="flex items-center mt-2 text-sm text-gray-600">
                <span class="flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart mr-1 text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                  ${post.likes}
                </span>
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle mr-1 text-blue-500"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                  ${post.comments}
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
    });
    
    contentArea.innerHTML = html;
    
    // Buton olaylarını ekle
    document.querySelectorAll('.delete-post-btn').forEach(button => {
      button.addEventListener('click', function() {
        const postId = this.closest('.post-item').dataset.id;
        deleteFacebookPost(postId).then(result => {
          if (result.success) {
            updateCommentCounts();
            showFacebookPosts();
          } else {
            alert(result.message);
          }
        });
      });
    });
  });
}

// Yorum sayılarını güncelle
function updateCommentCounts() {
  console.log('Updating comment counts');
  
  getCommentCounts().then(counts => {
    const pendingCount = document.getElementById('pending-count');
    const approvedCount = document.getElementById('approved-count');
    const facebookCount = document.getElementById('facebook-count');
    
    if (pendingCount) pendingCount.textContent = counts.pendingCount;
    if (approvedCount) approvedCount.textContent = counts.approvedCount;
    if (facebookCount) facebookCount.textContent = counts.facebookCount;
  });
}
