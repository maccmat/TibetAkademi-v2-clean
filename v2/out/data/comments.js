// comments.js - Tibet Akademi yorum yönetim sistemi
// Bu dosya, yorum onaylama ve silme işlevlerini yönetir

// Yorumları localStorage'dan yükle veya varsayılan değerleri kullan
function loadComments() {
  const savedComments = localStorage.getItem('tibetAkademiComments');
  if (savedComments) {
    return JSON.parse(savedComments);
  } else {
    // Varsayılan yorumları fetch et
    return fetch('/data/comments.json')
      .then(response => response.json())
      .then(data => {
        saveComments(data);
        return data;
      })
      .catch(error => {
        console.error('Yorumlar yüklenirken hata oluştu:', error);
        return {
          pendingComments: [],
          approvedComments: [],
          facebookPosts: []
        };
      });
  }
}

// Yorumları localStorage'a kaydet
function saveComments(comments) {
  localStorage.setItem('tibetAkademiComments', JSON.stringify(comments));
}

// Bekleyen bir yorumu onayla
function approveComment(commentId) {
  return loadComments()
    .then(comments => {
      // Bekleyen yorumlar arasında ID'ye göre ara
      const commentIndex = comments.pendingComments.findIndex(comment => comment.id === commentId);
      
      if (commentIndex !== -1) {
        // Yorumu bekleyen yorumlardan çıkar
        const approvedComment = comments.pendingComments.splice(commentIndex, 1)[0];
        
        // Yorumu onaylanmış yorumlara ekle
        comments.approvedComments.unshift(approvedComment);
        
        // Değişiklikleri kaydet
        saveComments(comments);
        
        return {
          success: true,
          message: 'Yorum başarıyla onaylandı',
          comments: comments
        };
      } else {
        return {
          success: false,
          message: 'Yorum bulunamadı',
          comments: comments
        };
      }
    });
}

// Bekleyen bir yorumu reddet/sil
function rejectComment(commentId) {
  return loadComments()
    .then(comments => {
      // Bekleyen yorumlar arasında ID'ye göre ara
      const commentIndex = comments.pendingComments.findIndex(comment => comment.id === commentId);
      
      if (commentIndex !== -1) {
        // Yorumu bekleyen yorumlardan çıkar
        comments.pendingComments.splice(commentIndex, 1);
        
        // Değişiklikleri kaydet
        saveComments(comments);
        
        return {
          success: true,
          message: 'Yorum başarıyla silindi',
          comments: comments
        };
      } else {
        return {
          success: false,
          message: 'Yorum bulunamadı',
          comments: comments
        };
      }
    });
}

// Onaylanmış bir yorumu sil
function deleteApprovedComment(commentId) {
  return loadComments()
    .then(comments => {
      // Onaylanmış yorumlar arasında ID'ye göre ara
      const commentIndex = comments.approvedComments.findIndex(comment => comment.id === commentId);
      
      if (commentIndex !== -1) {
        // Yorumu onaylanmış yorumlardan çıkar
        comments.approvedComments.splice(commentIndex, 1);
        
        // Değişiklikleri kaydet
        saveComments(comments);
        
        return {
          success: true,
          message: 'Onaylanmış yorum başarıyla silindi',
          comments: comments
        };
      } else {
        return {
          success: false,
          message: 'Yorum bulunamadı',
          comments: comments
        };
      }
    });
}

// Facebook paylaşımını sil
function deleteFacebookPost(postId) {
  return loadComments()
    .then(comments => {
      // Facebook paylaşımları arasında ID'ye göre ara
      const postIndex = comments.facebookPosts.findIndex(post => post.id === postId);
      
      if (postIndex !== -1) {
        // Paylaşımı Facebook paylaşımlarından çıkar
        comments.facebookPosts.splice(postIndex, 1);
        
        // Değişiklikleri kaydet
        saveComments(comments);
        
        return {
          success: true,
          message: 'Facebook paylaşımı başarıyla silindi',
          comments: comments
        };
      } else {
        return {
          success: false,
          message: 'Paylaşım bulunamadı',
          comments: comments
        };
      }
    });
}

// Yeni yorum ekle (kullanıcı tarafından gönderilen)
function addNewComment(commentData) {
  return loadComments()
    .then(comments => {
      // Yeni yorum için ID oluştur
      const newId = Date.now().toString();
      
      // Yeni yorumu oluştur
      const newComment = {
        id: newId,
        name: commentData.name,
        username: commentData.username || `@${commentData.name.toLowerCase().replace(/\s+/g, '.')}`,
        content: commentData.content,
        date: new Date().toLocaleString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: commentData.source || 'Website'
      };
      
      // Yorumu bekleyen yorumlara ekle
      comments.pendingComments.unshift(newComment);
      
      // Değişiklikleri kaydet
      saveComments(comments);
      
      return {
        success: true,
        message: 'Yorumunuz başarıyla gönderildi ve onay bekliyor',
        comments: comments
      };
    });
}

// Tüm yorumları temizle (test için)
function resetComments() {
  localStorage.removeItem('tibetAkademiComments');
  return loadComments();
}

// Admin paneli için yorum sayılarını getir
function getCommentCounts() {
  return loadComments()
    .then(comments => {
      return {
        pendingCount: comments.pendingComments.length,
        approvedCount: comments.approvedComments.length,
        facebookCount: comments.facebookPosts.length
      };
    });
}
