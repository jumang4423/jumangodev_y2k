import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Spinner, Text } from "@chakra-ui/react";
import { createClient } from "microcms-js-sdk";
import { motion } from "framer-motion";

interface TechBlogPost {
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
      whileHover={{ scale: disabled ? 1.0 : 1.25 }}
      style={{
        marginLeft: "6px",
        color: "gray",
        borderRadius: "100%",
        border: "1px solid lightgray",
        fontWeight: "normal",
        padding: "0 8px",
        filter: `opacity(${disabled ? 0.3 : 1.0})`,
        background: "none",
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

function TechBlogList() {
  const navigate = useNavigate();
  const [techBlogs, setTechBlogs] = useState<TechBlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechBlogs = async () => {
      try {
        const data = await client.get({
          endpoint: "tech_blog",
        });
        setTechBlogs(
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
        setError("Failed to fetch tech blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechBlogs();
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
        fontFamily: "Iosevka Aile Iaso, Kiwi Maru,Transparent",
        maxWidth: "600px",
        fontSize: "17px",
        wordBreak: "break-all",
        margin: "0 auto",
        padding: "1rem",
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
            border: "1px solid lightgray",
            borderRadius: "100%",
            padding: "0 10px",
            marginTop: "10px",
          }}
        >
          Tech Blog Posts
        </Text>
        <Box mt="8">
          {techBlogs.map((techBlog) => (
            <Box
              key={techBlog.id}
              p="4"
              border="1px solid lightgray"
              borderRadius="100%"
              mb="4"
              cursor="pointer"
              onClick={() => navigate(`/tech_blog/${techBlog.id}`)}
              _hover={{ bg: "gray.50" }}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <img
                src={techBlog.eyecatch.url}
                alt={techBlog.title}
                style={{
                  width: "128px",
                  height: "auto",
                  borderRadius: "32px",
                  marginBottom: "16px",
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
                      marginRight: "4px",
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
                  <Text fontSize="xl" fontWeight="bold" color="gray">
                    {techBlog.title}
                  </Text>
                </Box>
                <Text fontSize="sm" color="gray">
                  {">"} published at{" "}
                  {new Date(techBlog.publishedAt).toLocaleDateString()}
                </Text>
              </div>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default TechBlogList;