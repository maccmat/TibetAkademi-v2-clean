// Facebook API integration for fetching page posts

interface FacebookPostRaw {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
  likes: {
    summary: {
      total_count: number;
    };
  };
  comments: {
    summary: {
      total_count: number;
    };
  };
}

interface FacebookResponse {
  data: FacebookPostRaw[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
  likes?: { summary: { total_count: number } };
  comments?: { summary: { total_count: number } };
}

/**
 * Fetch posts from a Facebook page
 * @param pageId - The Facebook page ID
 * @param accessToken - Facebook API access token
 * @param limit - Number of posts to fetch (default: 5)
 * @returns Array of Facebook posts
 */
export async function fetchFacebookPosts(
  pageId: string,
  accessToken: string,
  limit: number = 5
): Promise<FacebookPost[]> {
  try {
    const apiUrl = `https://graph.facebook.com/v18.0/${pageId}/posts`;
    const params = new URLSearchParams({
      access_token: accessToken,
      limit: limit.toString(),
      fields: 'id,message,created_time,full_picture,permalink_url,likes.summary(true),comments.summary(true)',
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Facebook API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data: FacebookResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return [];
  }
}

/**
 * Get mock Facebook posts for development/testing
 * @returns Array of mock Facebook posts
 */
export function getMockFacebookPosts(): FacebookPost[] {
  return [
    {
      id: '1',
      message: 'Yeni projemiz "Kültürlerarası Diyalog" kapsamında Avrupa\'dan gelen katılımcılarla harika bir çalıştay gerçekleştirdik!',
      created_time: '2025-05-20T10:30:00+0000',
      full_picture: '/placeholder-project-1.jpg',
      permalink_url: 'https://facebook.com/post1',
      likes: { summary: { total_count: 45 } },
      comments: { summary: { total_count: 12 } }
    },
    {
      id: '2',
      message: 'Erasmus+ programı kapsamında yeni başvuru dönemimiz başladı! Detaylı bilgi için web sitemizi ziyaret edebilirsiniz.',
      created_time: '2025-05-18T14:15:00+0000',
      full_picture: '/placeholder-project-2.jpg',
      permalink_url: 'https://facebook.com/post2',
      likes: { summary: { total_count: 32 } },
      comments: { summary: { total_count: 8 } }
    },
    {
      id: '3',
      message: 'Geçen haftaki "Gençlik Köprüsü" etkinliğimizden kareler. Tüm katılımcılara teşekkür ederiz!',
      created_time: '2025-05-15T09:45:00+0000',
      full_picture: '/placeholder-project-3.jpg',
      permalink_url: 'https://facebook.com/post3',
      likes: { summary: { total_count: 67 } },
      comments: { summary: { total_count: 15 } }
    },
    {
      id: '4',
      message: 'Avrupa Dayanışma Programı kapsamında yeni gönüllülerimiz aramıza katıldı. Kendilerine hoş geldiniz diyoruz!',
      created_time: '2025-05-12T16:20:00+0000',
      full_picture: '/placeholder-project-4.jpg',
      permalink_url: 'https://facebook.com/post4',
      likes: { summary: { total_count: 53 } },
      comments: { summary: { total_count: 9 } }
    },
    {
      id: '5',
      message: 'Sürdürülebilir çevre projemiz kapsamında düzenlediğimiz atölye çalışmasından görüntüler. #SürdürülebilirGelecek',
      created_time: '2025-05-10T11:05:00+0000',
      full_picture: '/placeholder-project-5.jpg',
      permalink_url: 'https://facebook.com/post5',
      likes: { summary: { total_count: 41 } },
      comments: { summary: { total_count: 7 } }
    }
  ];
}
