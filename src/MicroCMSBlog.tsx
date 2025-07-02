import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Divider, Spinner, Text } from "@chakra-ui/react";
import { createClient } from "microcms-js-sdk";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
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

function MicroCMSBlog() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No blog ID provided.");
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const data = await client.get({
          endpoint: "blog",
          contentId: id,
        });
        setBlog({
          id: data.id,
          title: data.title,
          content: data.content,
          publishedAt: data.publishedAt,
          updatedAt: data.updatedAt,
          emoji: data.emoji,
          eyecatch: data.eyecatch,
        });
        window.scrollTo(0, 0);
      } catch (err) {
        setError("Failed to fetch blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

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

  if (!blog) {
    return null;
  }

  return (
    <div
      style={{
        fontFamily: "Doto, Kiwi Maru, Transparent",
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
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              animation: "rotate 7s linear infinite",
              marginRight: "10px",
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
          {blog.title}
        </Text>
        <Text fontSize="xl" color="gray" mb="1" mt="2">
          {">"} published at {new Date(blog.publishedAt).toLocaleDateString()}
        </Text>
        <Box>
          <img
            src={blog.eyecatch.url}
            alt={blog.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "32px",
              marginBottom: "16px",
            }}
          />
        </Box>
        <div
          className="blog_html"
          dangerouslySetInnerHTML={{ __html: blog.content }}
          style={{
            color: "gray",
            lineHeight: "1.6",
          }}
        />
      </Box>
    </div>
  );
}

export default MicroCMSBlog;
