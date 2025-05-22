/**
 * Simple JSON-based comment system with moderation
 * This file provides functions to handle comments without a database
 */

import fs from 'fs';
import path from 'path';

// Types for comments
export interface Comment {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
  socialMedia?: string;
  socialHandle?: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Default paths for JSON files
const DATA_DIR = path.join(process.cwd(), 'data');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');

// Ensure data directory exists
export const initializeCommentSystem = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify({ comments: [] }), 'utf8');
  }
};

// Get all comments
export const getAllComments = (): Comment[] => {
  try {
    initializeCommentSystem();
    const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
    return JSON.parse(data).comments;
  } catch (error) {
    console.error('Error reading comments file:', error);
    return [];
  }
};

// Get only approved comments
export const getApprovedComments = (): Comment[] => {
  const allComments = getAllComments();
  return allComments
    .filter(comment => comment.status === 'approved')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Get pending comments for moderation
export const getPendingComments = (): Comment[] => {
  const allComments = getAllComments();
  return allComments
    .filter(comment => comment.status === 'pending')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Add a new comment (always starts as pending)
export const addComment = (comment: Omit<Comment, 'id' | 'status' | 'timestamp'>): Comment => {
  const allComments = getAllComments();
  
  const newComment: Comment = {
    ...comment,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  
  allComments.push(newComment);
  
  try {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify({ comments: allComments }, null, 2), 'utf8');
    return newComment;
  } catch (error) {
    console.error('Error saving comment:', error);
    throw new Error('Failed to save comment');
  }
};

// Update comment status (approve or reject)
export const updateCommentStatus = (id: string, status: 'approved' | 'rejected'): boolean => {
  const allComments = getAllComments();
  const commentIndex = allComments.findIndex(comment => comment.id === id);
  
  if (commentIndex === -1) {
    return false;
  }
  
  allComments[commentIndex].status = status;
  
  try {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify({ comments: allComments }, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error updating comment status:', error);
    return false;
  }
};

// Delete a comment
export const deleteComment = (id: string): boolean => {
  const allComments = getAllComments();
  const filteredComments = allComments.filter(comment => comment.id !== id);
  
  if (filteredComments.length === allComments.length) {
    return false; // No comment was removed
  }
  
  try {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify({ comments: filteredComments }, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error deleting comment:', error);
    return false;
  }
};

// Get mock comments for development/testing
export const getMockComments = (): Comment[] => {
  return [
    {
      id: '1',
      userName: 'Ayşe Yılmaz',
      message: 'Kültürlerarası Diyalog projesine katıldım, harika bir deneyimdi! Yeni arkadaşlar edinmek ve farklı kültürleri tanımak için mükemmel bir fırsat.',
      timestamp: '2025-05-21T08:30:00+0000',
      socialMedia: 'Instagram',
      socialHandle: '@ayse.yilmaz',
      status: 'approved'
    },
    {
      id: '2',
      userName: 'Mehmet Kaya',
      message: "Erasmus+ programı sayesinde İspanya&apos;da bir ay geçirdim. Kesinlikle herkese tavsiye ederim!",
      timestamp: '2025-05-20T15:45:00+0000',
      socialMedia: 'Twitter',
      socialHandle: '@mehmetkaya',
      status: 'approved'
    },
    {
      id: '3',
      userName: 'Zeynep Demir',
      message: 'Gençlik Köprüsü etkinliğinde edindiğim deneyimler kariyerimde bana çok yardımcı oldu. Teşekkürler Tibet Akademi!',
      timestamp: '2025-05-19T11:20:00+0000',
      status: 'approved'
    },
    {
      id: '4',
      userName: 'Ali Yıldız',
      message: 'Sürdürülebilir çevre projesi kapsamında düzenlenen atölye çalışması çok verimli geçti. Öğrendiklerimi kendi çevremde de uygulamaya başladım.',
      timestamp: '2025-05-18T09:15:00+0000',
      socialMedia: 'LinkedIn',
      socialHandle: '@aliyildiz',
      status: 'pending'
    }
  ];
};

// Initialize with mock data if needed (for development)
export const initializeWithMockData = () => {
  initializeCommentSystem();
  const mockComments = getMockComments();
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify({ comments: mockComments }, null, 2), 'utf8');
};
