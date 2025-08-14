import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Divider, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
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

interface GenericMicroCMSBlogProps {
  endpoint: "blog" | "tech_blog";
  routeBase: "/blog" | "/tech_blog";
  linkColor: string;
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

function GenericMicroCMSBlog({ 
  endpoint, 
  routeBase, 
  linkColor 
}: GenericMicroCMSBlogProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile] = useMediaQuery("(max-width: 540px)");

  useEffect(() => {
    if (!id) {
      setError(`No ${endpoint === "blog" ? "blog" : "tech blog"} ID provided.`);
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const data = await client.get({
          endpoint: endpoint,
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
        setError(`Failed to fetch ${endpoint === "blog" ? "blog" : "tech blog"} post.`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, endpoint]);

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
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              animation: "rotate 7s linear infinite",
              marginRight: "9px", /* 90% of 10px */
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
              marginBottom: "14.4px", /* 90% of 16px */
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

export default GenericMicroCMSBlog;