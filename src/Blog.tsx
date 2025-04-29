import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Divider, Spinner, Text } from "@chakra-ui/react";
import { SimplePool } from "nostr-tools/pool";
import { bytesToHex } from "@noble/hashes/utils";
import { bech32 } from "bech32";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  kind: number;
  d: string;
  published_at: string;
  pubkey: string;
}

function Blog() {
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
    const decoded = bech32.decode(
      "npub1na482zlyyhvz9nml4hvypm439dp5r4ktuxphq9aqtd0ae2hl674sy2aedf"
    );
    const bytes = bech32.fromWords(decoded.words);
    const pubkey = bytesToHex(new Uint8Array(bytes));

    const pool = new SimplePool();
    const relays = [
      "wss://relay.nostr.band",
      "wss://relay.nostr.bg",
      "wss://relay.snort.social",
      "wss://nos.lol",
    ];

    const subscription = pool.subscribeMany(
      relays,
      [
        {
          ids: [id],
          authors: [pubkey],
          kinds: [30023],
        },
      ],
      {
        onevent(event) {
          const blogPost: BlogPost = {
            kind: event.kind,
            d: event.tags.find((t: string[]) => t[0] === "d")?.[1] || "",
            published_at:
              event.tags.find((t: string[]) => t[0] === "published_at")?.[1] ||
              "",
            pubkey: event.pubkey,
            id: event.id,
            title:
              event.tags.find((t: string[]) => t[0] === "title")?.[1] ||
              "Untitled",
            content:
              event.content || "No content available for this blog post.",
          };
          setBlog(blogPost);
          setLoading(false);
        },
        oneose() {
          subscription.close();
          setLoading(false);
        },
      }
    );

    return () => {
      subscription.close();
    };
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
        fontFamily: "Iosevka Aile Iaso, Kiwi Maru,Transparent",
        maxWidth: "600px",
        fontSize: "17px",
        wordBreak: "break-all",
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
      <Box p="6" wordBreak="break-all">
        <Box display="flex" gap="2">
          <Button onClick={() => navigate("/")}>Back</Button>
          <Button
            onClick={() => {
              window.open(`https://flycat.club/event/${blog.id}`, "_blank");
            }}
            variant="outline"
            rightIcon={<ExternalLinkIcon />}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              flycat
            </Box>
          </Button>
        </Box>
        <Box mt="8">
          <Divider />
        </Box>
        <Text fontSize="8xl" fontWeight="bold" mt="-4">
          {blog.title}
        </Text>
        <Text fontSize="xl" color="gray" mb="4">
          {">"} published at{" "}
          {new Date(Number(blog.published_at) * 1000).toLocaleDateString()}
        </Text>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </Box>
    </div>
  );
}

export default Blog;
