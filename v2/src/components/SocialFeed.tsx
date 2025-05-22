interface SocialPost {
  id: string;
  platform: "Facebook" | "Instagram" | "Twitter" | "LinkedIn"; // Add more as needed
  user: string;
  avatarUrl?: string; // Optional: URL to user's avatar
  content: string;
  timestamp: string; // Or Date object, depending on how you want to handle it
  likes?: number;
  comments?: number;
  postUrl: string; // Link to the original post
}

// Placeholder data - in a real app, this would come from an API
const mockSocialPosts: SocialPost[] = [
  {
    id: "1",
    platform: "Twitter",
    user: "InnovatorMax",
    avatarUrl: "/placeholder-avatar-1.jpg", // Placeholder image in /public
    content: "Just launched Project Alpha! So excited to see how our AI-powered analytics can help businesses grow. #AI #DataScience #Innovation",
    timestamp: "2h ago",
    likes: 152,
    comments: 18,
    postUrl: "#"
  },
  {
    id: "2",
    platform: "LinkedIn",
    user: "Jane Doe, PMP",
    avatarUrl: "/placeholder-avatar-2.jpg", // Placeholder image in /public
    content: "Reflecting on the successful completion of Service Beta, our new community engagement portal. Collaboration and user feedback were key to its success. Grateful for an amazing team! #ProjectManagement #CommunityBuilding #TechForGood",
    timestamp: "1d ago",
    likes: 230,
    comments: 45,
    postUrl: "#"
  },
  {
    id: "3",
    platform: "Instagram",
    user: "EcoExplorer",
    avatarUrl: "/placeholder-avatar-3.jpg", // Placeholder image in /public
    content: "Harvest day for Initiative Gamma! 🌱 Our urban farming kits are making a real difference. #Sustainability #UrbanFarming #GreenTech",
    timestamp: "3d ago",
    likes: 450,
    comments: 60,
    postUrl: "#"
  }
];

const SocialFeed = () => {
  // In a real app, you might fetch posts here using useEffect and useState
  const posts = mockSocialPosts;

  const getPlatformIcon = (platform: SocialPost["platform"]) => {
    // This is a simple example. You might use an icon library like react-icons.
    if (platform === "Twitter") return "🐦";
    if (platform === "LinkedIn") return "💼";
    if (platform === "Instagram") return "📸";
    return "🌐";
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.map((post) => (
        <a 
          key={post.id} 
          href={post.postUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block bg-white p-6 rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200 border border-primary-100"
        >
          <div className="flex items-start space-x-4">
            {post.avatarUrl && (
              <img src={post.avatarUrl} alt={`${post.user} avatar`} className="w-12 h-12 rounded-full object-cover"/>
            )}
            {!post.avatarUrl && (
                 <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-xl text-white">
                    {post.user.substring(0,1).toUpperCase()}
                 </div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                    <span className="font-semibold text-primary-600">{post.user}</span>
                    <span className="text-gray-600 text-sm ml-2">@{post.platform} {getPlatformIcon(post.platform)}</span>
                </div>
                <span className="text-xs text-gray-500">{post.timestamp}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
              {(post.likes !== undefined || post.comments !== undefined) && (
                <div className="mt-3 flex items-center space-x-4 text-xs text-gray-600">
                  {post.likes !== undefined && <span>❤️ {post.likes} Likes</span>}
                  {post.comments !== undefined && <span>💬 {post.comments} Comments</span>}
                </div>
              )}
            </div>
          </div>
        </a>
      ))}
      {posts.length === 0 && (
        <p className="text-center text-gray-500">No social media posts to display yet.</p>
      )}
    </div>
  );
};

export default SocialFeed;

