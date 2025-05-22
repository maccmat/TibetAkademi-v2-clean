'use client';

import React, { useState, useEffect } from 'react';
import { User, Check, X, Trash, Shield, LogOut } from 'lucide-react';
import Link from 'next/link';

// Types for comments
interface Comment {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
  socialMedia?: string;
  socialHandle?: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Simple password for admin access
const ADMIN_PASSWORD = 'tibet2025'; // This should be changed in production

const AdminPanel = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Comments state
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [approvedComments, setApprovedComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [loading, setLoading] = useState(true);
  
  // Action feedback
  const [actionFeedback, setActionFeedback] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Check if user is already authenticated (using sessionStorage)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('tibetAdminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load comments when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadComments();
    }
  }, [isAuthenticated, activeTab]);

  // Load comments from API
  const loadComments = async () => {
    setLoading(true);
    try {
      const status = activeTab === 'pending' ? 'pending' : 'approved';
      const response = await fetch(`/api/comments?status=${status}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      
      const data = await response.json();
      
      if (activeTab === 'pending') {
        setPendingComments(data.comments);
      } else {
        setApprovedComments(data.comments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      showFeedback('Yorumlar yüklenirken bir hata oluştu.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('tibetAdminAuth', 'true');
      setLoginError('');
    } else {
      setLoginError('Hatalı şifre. Lütfen tekrar deneyin.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tibetAdminAuth');
  };

  // Approve a comment
  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve comment');
      }
      
      // Update local state
      setPendingComments(prev => prev.filter(comment => comment.id !== id));
      showFeedback('Yorum başarıyla onaylandı.', 'success');
      
    } catch (error) {
      console.error('Error approving comment:', error);
      showFeedback('Yorum onaylanırken bir hata oluştu.', 'error');
    }
  };

  // Reject a comment
  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject comment');
      }
      
      // Update local state
      setPendingComments(prev => prev.filter(comment => comment.id !== id));
      showFeedback('Yorum başarıyla reddedildi.', 'success');
      
    } catch (error) {
      console.error('Error rejecting comment:', error);
      showFeedback('Yorum reddedilirken bir hata oluştu.', 'error');
    }
  };

  // Delete a comment
  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      
      // Update local state
      if (activeTab === 'pending') {
        setPendingComments(prev => prev.filter(comment => comment.id !== id));
      } else {
        setApprovedComments(prev => prev.filter(comment => comment.id !== id));
      }
      
      showFeedback('Yorum başarıyla silindi.', 'success');
      
    } catch (error) {
      console.error('Error deleting comment:', error);
      showFeedback('Yorum silinirken bir hata oluştu.', 'error');
    }
  };

  // Show feedback message
  const showFeedback = (message: string, type: 'success' | 'error') => {
    setActionFeedback({ message, type });
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
      setActionFeedback(null);
    }, 3000);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Yönetici Girişi</h1>
          </div>
          
          <form onSubmit={handleLogin}>
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {loginError}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Giriş Yap
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-purple-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">Tibet Akademi Yönetim Paneli</h1>
            </div>
            
            <div className="flex items-center">
              <Link href="/" className="text-gray-600 hover:text-gray-800 mr-4">
                Ana Sayfa
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'pending'
                  ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Onay Bekleyen Yorumlar
              {pendingComments.length > 0 && (
                <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {pendingComments.length}
                </span>
              )}
            </button>
            
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'approved'
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-500'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('approved')}
            >
              Onaylanmış Yorumlar
            </button>
          </div>
          
          {/* Feedback message */}
          {actionFeedback && (
            <div className={`${
              actionFeedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            } px-4 py-3 border-b`}>
              {actionFeedback.message}
            </div>
          )}
          
          {/* Comments list */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <>
                {activeTab === 'pending' ? (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Onay Bekleyen Yorumlar</h2>
                    
                    {pendingComments.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Onay bekleyen yorum bulunmuyor.</p>
                    ) : (
                      <div className="space-y-6">
                        {pendingComments.map(comment => (
                          <div key={comment.id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-800">{comment.userName}</h3>
                                <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleApprove(comment.id)}
                                  className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                  title="Onayla"
                                >
                                  <Check className="w-5 h-5" />
                                </button>
                                
                                <button
                                  onClick={() => handleReject(comment.id)}
                                  className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                  title="Reddet"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                                
                                <button
                                  onClick={() => handleDelete(comment.id)}
                                  className="p-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                  title="Sil"
                                >
                                  <Trash className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-2">{comment.message}</p>
                            
                            {(comment.socialMedia && comment.socialHandle) && (
                              <div className="flex items-center text-sm text-gray-600">
                                <span>{comment.socialMedia}: {comment.socialHandle}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Onaylanmış Yorumlar</h2>
                    
                    {approvedComments.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Onaylanmış yorum bulunmuyor.</p>
                    ) : (
                      <div className="space-y-6">
                        {approvedComments.map(comment => (
                          <div key={comment.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-800">{comment.userName}</h3>
                                <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                              </div>
                              
                              <button
                                onClick={() => handleDelete(comment.id)}
                                className="p-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                title="Sil"
                              >
                                <Trash className="w-5 h-5" />
                              </button>
                            </div>
                            
                            <p className="text-gray-700 mb-2">{comment.message}</p>
                            
                            {(comment.socialMedia && comment.socialHandle) && (
                              <div className="text-sm text-gray-600">
                                <span>{comment.socialMedia}: {comment.socialHandle}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
