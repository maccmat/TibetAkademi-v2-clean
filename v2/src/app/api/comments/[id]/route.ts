import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Default paths for JSON files
const DATA_DIR = path.join(process.cwd(), 'data');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');

// Get all comments
const getAllComments = () => {
  try {
    if (!fs.existsSync(DATA_DIR) || !fs.existsSync(COMMENTS_FILE)) {
      return [];
    }
    
    const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
    return JSON.parse(data).comments;
  } catch (error) {
    console.error('Error reading comments file:', error);
    return [];
  }
};

// Update comment status (approve or reject)
const updateCommentStatus = (id: string, status: 'approved' | 'rejected') => {
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
const deleteComment = (id: string) => {
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

// PUT /api/comments/[id]/status - Update comment status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    if (!body.status || !['approved', 'rejected'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "approved" or "rejected"' },
        { status: 400 }
      );
    }
    
    const success = updateCommentStatus(id, body.status);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Comment not found or could not be updated' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PUT /api/comments/[id]/status:', error);
    return NextResponse.json(
      { error: 'Failed to update comment status' },
      { status: 500 }
    );
  }
}

// DELETE /api/comments/[id] - Delete a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const success = deleteComment(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Comment not found or could not be deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/comments/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
