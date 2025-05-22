'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

// Types for comments
interface CommentFormProps {
  onSubmit: (comment: {
    userName: string;
    message: string;
    socialMedia?: string;
    socialHandle?: string;
  }) => void;
  onCancel?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, onCancel }) => {
  // State for comment form
  const [commentForm, setCommentForm] = useState({
    userName: '',
    message: '',
    socialMedia: '',
    socialHandle: ''
  });
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!commentForm.userName.trim() || !commentForm.message.trim()) {
      alert('Lütfen isim ve mesaj alanlarını doldurunuz.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create comment object
      const newComment = {
        userName: commentForm.userName,
        message: commentForm.message,
        socialMedia: commentForm.socialMedia || undefined,
        socialHandle: commentForm.socialHandle || undefined
      };
      
      // Submit comment
      await onSubmit(newComment);
      
      // Reset form
      setCommentForm({
        userName: '',
        message: '',
        socialMedia: '',
        socialHandle: ''
      });
      
      // Show success message
      setSubmitSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        if (onCancel) onCancel();
      }, 3000);
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Yorumunuz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      {submitSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Yorumunuz başarıyla gönderildi!</p>
          <p className="text-sm">Yorumunuz onaylandıktan sonra yayınlanacaktır. Teşekkür ederiz.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmitComment}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              İsim Soyisim *
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={commentForm.userName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mesajınız *
            </label>
            <textarea
              id="message"
              name="message"
              value={commentForm.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700 mb-1">
                Sosyal Medya (Opsiyonel)
              </label>
              <input
                type="text"
                id="socialMedia"
                name="socialMedia"
                value={commentForm.socialMedia}
                onChange={handleInputChange}
                placeholder="Instagram, Twitter, vb."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="socialHandle" className="block text-sm font-medium text-gray-700 mb-1">
                Kullanıcı Adı (Opsiyonel)
              </label>
              <input
                type="text"
                id="socialHandle"
                name="socialHandle"
                value={commentForm.socialHandle}
                onChange={handleInputChange}
                placeholder="@kullaniciadi"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                İptal
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Gönder
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
