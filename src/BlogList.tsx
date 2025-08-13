import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Spinner, Text } from "@chakra-ui/react";
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

function Link({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      initial={{ scale: 1.0 }}
      whileHover={{ scale: disabled ? 1.0 : 1.125 }} /* 90% of 1.25 */
      style={{
        marginLeft: "5.4px", /* 90% of 6px */
        color: "gray",
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

function BlogList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.get({
          endpoint: "blog",
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
        setError("Failed to fetch blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
        maxWidth: "540px", /* 90% of 600px */
        fontSize: "15.3px", /* 90% of 17px */
        wordBreak: "break-all",
        margin: "0 auto",
        padding: "0.9rem", /* 90% of 1rem */
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
          <Link onClick={() => navigate("/")}>Back</Link>
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
          Thoughts
        </Text>
        <Box mt="8">
          {blogs.map((blog) => (
            <Box
              key={blog.id}
              p="4"
              border="0.9px solid lightgray" /* 90% of 1px */
              borderRadius="100%"
              mb="4"
              cursor="pointer"
              onClick={() => navigate(`/blog/${blog.id}`)}
              _hover={{ bg: "gray.50" }}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "14.4px", /* 90% of 16px */
                alignItems: "center",
              }}
            >
              <img
                src={blog.eyecatch.url}
                alt={blog.title}
                style={{
                  width: "115.2px", /* 90% of 128px */
                  height: "auto",
                  borderRadius: "28.8px", /* 90% of 32px */
                  marginBottom: "14.4px", /* 90% of 16px */
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box display="flex" alignItems="center">
                  <div
                    style={{
                      animation: "rotate 7s linear infinite",
                      marginRight: "3.6px", /* 90% of 4px */
                    }}
                  >
                    {blog.emoji}
                  </div>
                  <style>
                    {`
                    @keyframes rotate {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                  `}
                  </style>
                  <Text fontSize="xl" fontWeight="bold" color="gray">
                    {blog.title}
                  </Text>
                </Box>
                <Text fontSize="sm" color="gray">
                  {">"} published at{" "}
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </Text>
              </div>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default BlogList;
