import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
import { createClient } from "microcms-js-sdk";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  publishedAt: string;
  emoji: string;
  eyecatch: {
    url: string;
  };
}

const client = createClient({
  serviceDomain: "jumang4423",
  apiKey: "NrXtEm2HTvhho5hgmmmqCUmZwgEpGvqGp2x3",
});

interface GenericBlogListProps {
  endpoint: "blog" | "tech_blog";
  routeBase: "/blog" | "/tech_blog";
  title: string;
  linkColor: string;
  borderWidth: string;
}

function Link({
  children,
  onClick,
  disabled = false,
  color = "gray",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
}) {
  return (
    <motion.button
      initial={{ scale: 1.0 }}
      whileHover={{ scale: disabled ? 1.0 : 1.125 }} /* 90% of 1.25 */
      style={{
        marginLeft: "5.4px", /* 90% of 6px */
        color: color,
        borderRadius: "100%",
        border: "0.9px solid lightgray", /* 90% of 1px */
        fontWeight: "normal",
        padding: "0 7.2px", /* 90% of 8px */
        filter: `opacity(${disabled ? 0.3 : 1.0})`,
        background: "none",
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

function GenericBlogList({ 
  endpoint, 
  routeBase, 
  title, 
  linkColor, 
  borderWidth 
}: GenericBlogListProps) {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile] = useMediaQuery("(max-width: 540px)");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.get({
          endpoint: endpoint,
        });
        setBlogs(
          data.contents.map(
            (content: { id: string; title: string; publishedAt: string }) => ({
              id: content.id,
              title: content.title,
              publishedAt: content.publishedAt,
              emoji: content.emoji,
              eyecatch: content.eyecatch,
            })
          )
        );
      } catch (err) {
        setError(`Failed to fetch ${endpoint === "blog" ? "blog" : "tech blog"} posts.`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [endpoint]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="4">
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Doto, Kiwi Maru, Transparent",
        width: isMobile ? "100%" : "740px",
        maxWidth: "100%",
        fontSize: "15.3px", /* 90% of 17px */
        wordBreak: "break-all",
        margin: "0 auto",
        padding: isMobile ? "0 16px" : "0",
        boxSizing: "border-box",
      }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.xeiaso.net/static/css/iosevka/family.css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Kiwi+Maru&display=swap"
        rel="stylesheet"
      />
      <Box p="1" wordBreak="break-all">
        <Box display="flex">
          <Link onClick={() => navigate("/")} color={linkColor}>Back</Link>
        </Box>
        <Box mt="2" width="100%">
          <Divider />
        </Box>
        <Text
          fontSize="6xl"
          fontWeight="bold"
          color="gray"
          style={{
            border: "0.9px solid lightgray", /* 90% of 1px */
            borderRadius: "100%",
            padding: "0 9px", /* 90% of 10px */
            marginTop: "9px", /* 90% of 10px */
          }}
        >
          {title}
        </Text>
        <Box mt="8" style={{ display: "grid", gap: "14px" }}>
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
              style={{
                background: "white",
                border: "1px solid lightgray",
                borderRadius: "24px",
                padding: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "16px",
                alignItems: isMobile ? "flex-start" : "center",
              }}
              onClick={() => navigate(`${routeBase}/${blog.id}`)}
            >
              <img
                src={blog.eyecatch.url}
                alt={blog.title}
                style={{
                  width: isMobile ? "100%" : "100px",
                  height: isMobile ? "180px" : "100px",
                  border: "1px solid lightgray",
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: "6px",
                }}
              >
                <Box display="flex" alignItems="center" gap="8px">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {blog.emoji}
                  </motion.div>
                  <Text 
                    fontSize="xl" 
                    fontWeight="bold" 
                    color="gray.700"
                  >
                    {blog.title}
                  </Text>
                </Box>
                <Text 
                  fontSize="sm" 
                  color="gray.500"
                >
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Text>
              </div>
              {!isMobile && (
                <motion.div
                  whileHover={{ x: 3 }}
                  style={{
                    fontSize: "20px",
                    color: "gray",
                  }}
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default GenericBlogList;