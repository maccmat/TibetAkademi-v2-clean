import { NextRequest, NextResponse } from 'next/server';
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
const initializeCommentSystem = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify({ comments: [] }), 'utf8');
  }
};

// Get all comments
const getAllComments = (): Comment[] => {
  try {
    initializeCommentSystem();
    const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
    return JSON.parse(data).comments;
  } catch (error) {
    console.error('Error reading comments file:', error);
    return [];
  }
};

// Add a new comment (always starts as pending)
const addComment = (comment: Omit<Comment, 'id' | 'status' | 'timestamp'>): Comment => {
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
const updateCommentStatus = (id: string, status: 'approved' | 'rejected'): boolean => {
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
const deleteComment = (id: string): boolean => {
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

// Initialize with mock data if needed (for development)
export const initializeWithMockData = () => {
  initializeCommentSystem();
  const mockComments = [
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
      message: "Erasmus+ programı sayesinde İspanya'da bir ay geçirdim. Kesinlikle herkese tavsiye ederim!",
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
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify({ comments: mockComments }, null, 2), 'utf8');
};

// API Routes handlers

// GET /api/comments - Get all comments or filtered by status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const allComments = getAllComments();
    
    if (status) {
      const filteredComments = allComments.filter(comment => comment.status === status)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return NextResponse.json({ comments: filteredComments });
    }
    
    return NextResponse.json({ comments: allComments });
  } catch (error) {
    console.error('Error in GET /api/comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST /api/comments - Add a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.userName || !body.message) {
      return NextResponse.json(
        { error: 'userName and message are required fields' },
        { status: 400 }
      );
    }
    
    const newComment = addComment({
      userName: body.userName,
      message: body.message,
      socialMedia: body.socialMedia,
      socialHandle: body.socialHandle
    });
    
    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/comments:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}

// Initialize with mock data on first load (development only)
if (process.env.NODE_ENV === 'development') {
  try {
    initializeWithMockData();
  } catch (error) {
    console.error('Error initializing mock data:', error);
  }
}
