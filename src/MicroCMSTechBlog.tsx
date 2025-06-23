import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Divider, Spinner, Text } from "@chakra-ui/react";
import { createClient } from "microcms-js-sdk";
import { motion } from "framer-motion";

interface TechBlogPost {
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

function MicroCMSTechBlog() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [techBlog, setTechBlog] = useState<TechBlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No tech blog ID provided.");
      setLoading(false);
      return;
    }

    const fetchTechBlog = async () => {
      try {
        const data = await client.get({
          endpoint: "tech_blog",
          contentId: id,
        });
        setTechBlog({
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
        setError("Failed to fetch tech blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechBlog();
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

  if (!techBlog) {
    return null;
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
        </Text>
        <Text fontSize="xl" color="gray" mb="1" mt="2">
          {">"} published at {new Date(techBlog.publishedAt).toLocaleDateString()}
        </Text>
        <Box>
          <img
            src={techBlog.eyecatch.url}
            alt={techBlog.title}
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
          dangerouslySetInnerHTML={{ __html: techBlog.content }}
          style={{
            color: "gray",
            lineHeight: "1.6",
          }}
        />
      </Box>
    </div>
  );
}

export default MicroCMSTechBlog;