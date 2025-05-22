// public.js - Tibet Akademi kullanıcı arayüzü işlevselliği
// Bu dosya, yorumların ana sayfada ve "Sizden Gelenler" sayfasında gösterilmesini sağlar

document.addEventListener('DOMContentLoaded', function() {
  // Ana sayfadaki yorumları yükle
  const homeCommentsSection = document.querySelector('.home-comments-section');
  if (homeCommentsSection) {
    loadHomePageComments();
  }
  
  // Sizden Gelenler sayfasındaki yorumları yükle
  const commentsPage = document.querySelector('.comments-page');
  if (commentsPage) {
    loadCommentsPage();
  }
  
  // Yorum formunu başlat
  initCommentForm();
});

// Ana sayfadaki yorumları yükle
function loadHomePageComments() {
  const commentsContainer = document.querySelector('.home-comments-container');
  if (!commentsContainer) return;
  
  loadComments().then(comments => {
    // En son onaylanan 2 yorumu göster
    const recentComments = comments.approvedComments.slice(0, 2);
    
    if (recentComments.length === 0) {
      commentsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Henüz yorum bulunmuyor.</p>';
      return;
    }
    
    let html = '';
    
    recentComments.forEach(comment => {
      html += `
        <div class="bg-white rounded-lg shadow-md p-4 mb-4">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-3">
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                ${comment.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <div class="flex items-center">
                <h4 class="font-semibold">${comment.name}</h4>
                <span class="text-gray-500 text-xs ml-2">${comment.date} • ${comment.source}</span>
              </div>
              <p class="text-gray-700 mt-1">${comment.content}</p>
            </div>
          </div>
        </div>
      `;
    });
    
    commentsContainer.innerHTML = html;
  });
}

// Sizden Gelenler sayfasındaki yorumları yükle
function loadCommentsPage() {
  const commentsContainer = document.querySelector('.comments-list-container');
  if (!commentsContainer) return;
  
  loadComments().then(comments => {
    if (comments.approvedComments.length === 0) {
      commentsContainer.innerHTML = '<div class="text-center py-8"><p class="text-gray-600">Henüz onaylanmış yorum bulunmuyor.</p></div>';
      return;
    }
    
    let html = '';
    
    comments.approvedComments.forEach(comment => {
      html += `
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
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
        </div>
      `;
    });
    
    commentsContainer.innerHTML = html;
  });
  
  // Facebook paylaşımlarını yükle
  const facebookContainer = document.querySelector('.facebook-posts-container');
  if (facebookContainer) {
    loadComments().then(comments => {
      if (comments.facebookPosts.length === 0) {
        facebookContainer.innerHTML = '<div class="text-center py-8"><p class="text-gray-600">Henüz Facebook paylaşımı bulunmuyor.</p></div>';
        return;
      }
      
      let html = '';
      
      comments.facebookPosts.forEach(post => {
        html += `
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
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
            <div class="mt-4 text-center">
              <a href="https://facebook.com/tibetakademi" target="_blank" rel="noopener noreferrer" class="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Facebook'ta Görüntüle
              </a>
            </div>
          </div>
        `;
      });
      
      facebookContainer.innerHTML = html;
    });
  }
}

// Yorum formunu başlat
function initCommentForm() {
  const commentForm = document.querySelector('.comment-form');
  if (!commentForm) return;
  
  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = this.querySelector('input[name="name"]');
    const emailInput = this.querySelector('input[name="email"]');
    const commentInput = this.querySelector('textarea[name="comment"]');
    
    if (!nameInput || !emailInput || !commentInput) return;
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const content = commentInput.value.trim();
    
    if (!name || !email || !content) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    
    // Yeni yorumu ekle
    addNewComment({
      name: name,
      username: `@${name.toLowerCase().replace(/\s+/g, '.')}`,
      content: content,
      source: 'Website'
    }).then(result => {
      if (result.success) {
        // Formu temizle
        nameInput.value = '';
        emailInput.value = '';
        commentInput.value = '';
        
        // Başarı mesajı göster
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 text-green-700 p-4 rounded-lg mt-4';
        successMessage.innerHTML = '<p>Yorumunuz başarıyla gönderildi ve onay bekliyor. Teşekkür ederiz!</p>';
        
        commentForm.appendChild(successMessage);
        
        // Mesajı 5 saniye sonra kaldır
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      } else {
        alert('Yorumunuz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    });
  });
}
