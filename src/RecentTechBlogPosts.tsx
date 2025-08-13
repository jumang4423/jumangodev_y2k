import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { createClient } from "microcms-js-sdk";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

interface TechBlogPost {
  id: string;
  title: string;
  publishedAt: string;
  emoji: string;
}

const client = createClient({
  serviceDomain: "jumang4423",
  apiKey: "NrXtEm2HTvhho5hgmmmqCUmZwgEpGvqGp2x3",
});

function Link({
  children,
  to,
  onPlay,
  disabled = false,
  style = {},
}: {
  children: React.ReactNode;
  to: string;
  onPlay: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ scale: 1.0 }}
      whileHover={{ scale: disabled ? 1.0 : 1.125 }} /* 90% of 1.25 */
      style={{
        marginLeft: "5.4px", /* 90% of 6px */
        color: "black",
        borderRadius: "100%",
        border: "0.9px solid lightgray", /* 90% of 1px */
        fontWeight: "normal",
        padding: "0 0px",
        filter: `opacity(${disabled ? 0.3 : 1.0})`,
        ...style,
      }}
    >
      <RouterLink
        to={disabled ? "#" : to}
        onClick={() => {
          onPlay();
        }}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          padding: "0 7.2px", /* 90% of 8px */
          fontWeight: "normal",
        }}
      >
        {children}
      </RouterLink>
    </motion.div>
  );
}

function RecentTechBlogPosts({ onPlay }: { onPlay: () => void }) {
  const [techBlogs, setTechBlogs] = useState<TechBlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechBlogs = async () => {
      try {
        const data = await client.get({
          endpoint: "tech_blog",
          queries: { limit: 5 },
        });
        setTechBlogs(
          data.contents.map(
            (content: { id: string; title: string; publishedAt: string }) => ({
              id: content.id,
              title: content.title,
              publishedAt: content.publishedAt,
              emoji: content.emoji,
            })
          )
        );
      } catch (err) {
        setError("Failed to fetch tech blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechBlogs();
  }, []);

  if (loading || error) {
    return null;
  }

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        // border: "1px solid lightgray",
        borderRadius: "100%",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0px 0px",
        maxWidth: "100%",
      }}
    >
      {techBlogs.map((techBlog) => (
        <Link key={techBlog.id} to={`/tech_blog/${techBlog.id}`} onPlay={onPlay}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                animation: "rotate 7s linear infinite",
                marginRight: "3.6px", /* 90% of 4px */
              }}
            >
              {techBlog.emoji}
            </div>
            <style>
              {`
              @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
            </style>
            {techBlog.title}
          </div>
        </Link>
      ))}
      <Link to="/tech_blog" onPlay={onPlay}>
        more...
      </Link>
    </Box>
  );
}

export default RecentTechBlogPosts;