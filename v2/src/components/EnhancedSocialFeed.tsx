'use client';

import React, { useState, useEffect } from 'react';
import { Facebook, Send, User, Link as LinkIcon } from 'lucide-react';
import { FacebookPost, getMockFacebookPosts } from '@/app/lib/facebook-api';
import CommentForm from '@/components/CommentForm';

// Facebook configuration
const FACEBOOK_PAGE_ID = 'YOUR_FACEBOOK_PAGE_ID'; // To be replaced with actual page ID
const FACEBOOK_ACCESS_TOKEN = 'YOUR_FACEBOOK_ACCESS_TOKEN'; // To be replaced with actual token
const USE_MOCK_DATA = true; // Set to false when ready to use real Facebook API

// Comment interface
interface Comment {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
  socialMedia?: string;
  socialHandle?: string;
  status: 'pending' | 'approved' | 'rejected';
}

const EnhancedSocialFeed = () => {
  // State for Facebook posts
  const [facebookPosts, setFacebookPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for user comments
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  
  // State for form visibility
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Fetch Facebook posts
  useEffect(() => {
    const loadFacebookPosts = async () => {
      setLoading(true);
      try {
        // For now, we're using mock data
        // In production, this would be a real API call
        const posts = getMockFacebookPosts();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setFacebookPosts(posts);
      } catch (error) {
        console.error('Error loading Facebook posts:', error);
        // Fallback to mock data if API fails
        setFacebookPosts(getMockFacebookPosts());
      } finally {
        setLoading(false);
      }
    };
    
    loadFacebookPosts();
  }, []);

  // Load approved comments from API
  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const response = await fetch('/api/comments?status=approved');
        
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        
        const data = await response.json();
        setUserComments(data.comments);
      } catch (error) {
        console.error('Error loading comments:', error);
        setUserComments([]);
      } finally {
        setLoadingComments(false);
      }
    };
    
    fetchComments();
  }, []);

  // Handle comment submission
  const handleSubmitComment = async (commentData: {
    userName: string;
    message: string;
    socialMedia?: string;
    socialHandle?: string;
  }) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      
      return true;
    } catch (error) {
      console.error('Error submitting comment:', error);
      throw error;
    }
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Son Gelişmeler ve Paylaşımlar</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Facebook Posts Column */}
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
            <div className="flex items-center mb-6">
              <Facebook className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-semibold">Facebook Paylaşımlarımız</h3>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-8">
                {facebookPosts.map(post => (
                  <div key={post.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start">
                      {post.full_picture && (
                        <div className="w-24 h-24 mr-4 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={post.full_picture} 
                            alt="Post image" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-gray-800 mb-3">{post.message}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {formatDate(post.created_time)}
                          </div>
                          <div className="flex space-x-4 text-sm text-gray-600">
                            <span>❤️ {post.likes?.summary.total_count || 0}</span>
                            <span>💬 {post.comments?.summary.total_count || 0}</span>
                          </div>
                        </div>
                        <a 
                          href={post.permalink_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                        >
                          Facebook&apos;ta Görüntüle
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6 text-center">
              <a 
                href="https://facebook.com/tibetakademi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Tüm Paylaşımları Görüntüle
              </a>
            </div>
          </div>
          
          {/* User Comments Column */}
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <User className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-semibold">Katılımcı Yorumları</h3>
              </div>
              <button 
                onClick={() => setShowCommentForm(!showCommentForm)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Yorum Yap
              </button>
            </div>
            
            {/* Comment Form */}
            {showCommentForm && (
              <CommentForm 
                onSubmit={handleSubmitComment}
                onCancel={() => setShowCommentForm(false)}
              />
            )}
            
            {/* Comments List */}
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {loadingComments ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <>
                  {userComments.map(comment => (
                    <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{comment.userName}</h4>
                        <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{comment.message}</p>
                      
                      {(comment.socialMedia && comment.socialHandle) && (
                        <div className="flex items-center text-sm text-gray-600">
                          <LinkIcon className="w-3 h-3 mr-1" />
                          <span>{comment.socialMedia}: {comment.socialHandle}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {userComments.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Henüz yorum bulunmuyor. İlk yorumu siz yapın!</p>
                  )}
                </>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href="/sizden-gelenler" 
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Tüm Yorumları Görüntüle
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedSocialFeed;
