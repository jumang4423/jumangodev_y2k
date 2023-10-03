import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./App.css";
import "./font.css";

function Header() {
  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-5px",
      }}
    >
      <motion.div
        initial={{ scaleX: 1.0, scaleY: 0 }}
        whileTap={{ scaleY: 0 }}
        animate={{
          scaleY: 1.0,
        }}
      >
        <video
          src="/logo_b.mp4"
          autoPlay
          loop
          playsInline
          muted
          width={520}
          height={200}
          style={{
            objectFit: "cover",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

const initLine = [
  "🌈",
  "✨",
  "🎵",
  "🌱",
  "💿",
  "🎹",
  "🎶",
  "🎧",
  "🎤",
  "🐶",
  "🐹",
];
const initLines = [...initLine, ...initLine];
function RainbowLine() {
  const [lines, setLines] = useState<Array<string>>(initLines);
  useEffect(() => {
    const interval = setInterval(() => {
      // shaffle 12 times
      setLines((lines) => {
        for (let i = 0; i < 3; i++) {
          const a = Math.floor(Math.random() * lines.length);
          const b = Math.floor(Math.random() * lines.length);
          const tmp = lines[a];
          lines[a] = lines[b];
          lines[b] = tmp;
        }
        return [...lines];
      });
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div
      style={{
        marginBottom: "16px",
        marginTop: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {lines}
    </div>
  );
}

function Link({ children, href }: { children: any; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        marginLeft: "8px",
        backgroundColor: "rgb(255, 164, 244)",
        color: "white",
        textDecoration: "underline",
      }}
    >
      {children}
    </a>
  );
}

interface Emotions {
  [key: string]: {
    backgroundColor: string;
    color: string;
  };
}

const emotions: Emotions = {
  generic: {
    backgroundColor: "rgb(255, 164, 244)",
    color: "white",
  },
  futuristic: {
    backgroundColor: "skyblue",
    color: "white",
  },
};

function Highlight({ text, emotion }: { text: string; emotion: string }) {
  return (
    <div
      style={{
        backgroundColor: emotions[emotion]?.backgroundColor,
        color: emotions[emotion]?.color,
        display: "inline-block",
      }}
    >
      {text}
    </div>
  );
}

function Subtitle({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "32px",
        fontFamily: "Dissolved Exchange Regular",
        color: "rgb(255, 164, 244)",
      }}
    >
      <img src="/flower01.png" width={32} height={32} />
      <div style={{ display: "inline-block", marginLeft: "8px" }}>{title}</div>
    </div>
  );
}

function SoundCloudLinkCard({
  imgSrc,
  href,
  title,
}: {
  imgSrc?: string;
  href: string;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "8px",
      }}
    >
      <img src={imgSrc} width={32} height={32} />
      <Link href={href}>{title}</Link>
    </div>
  );
}

function Description() {
  // left sided text
  return (
    <div style={{}}>
      <Subtitle title="about" />
      <div>
        jumango(@jumang4423) is a bedroom producer and hacker from japan.
      </div>
      <div>i make futuristic music and software.</div>
      <Subtitle title="find me" />
      <div>
        <div>jumango's work is most audible via:</div>
        <Link href="https://soundcloud.com/jumang4423">SoundCloud</Link>,
        <Link href="https://jumango.bandcamp.com/">Bandcamp</Link>,
        <Link href="https://vrchat.com/home/user/usr_4b57f0ea-9bb7-4a9a-9f6c-42b3734c9ee3">
          VRChat
        </Link>{" "}
        or
        <Link href="https://twitter.com/jumang4423">Twitter</Link>
      </div>
      <Subtitle title="releases" />
      <SoundCloudLinkCard
        href="https://soundcloud.com/jumang4423/twinkle"
        title="twinkle"
        imgSrc="https://i1.sndcdn.com/artworks-EPu65YpZOrOimCxH-xKyKhw-t500x500.jpg"
      />
      <SoundCloudLinkCard
        href="https://soundcloud.com/jumang4423/frail"
        title="frail"
        imgSrc="https://i1.sndcdn.com/artworks-dzLoHPQgjDSU2a1m-2yoiIg-t500x500.jpg"
      />
      <SoundCloudLinkCard
        href="https://soundcloud.com/jumang4423/trip"
        title="trip"
        imgSrc="https://i1.sndcdn.com/artworks-8Tz5URmo6iE8y0PL-JRLk4A-t500x500.jpg"
      />
      <SoundCloudLinkCard
        href="https://soundcloud.com/jumang4423/blanket"
        title="blanket"
        imgSrc="https://i1.sndcdn.com/artworks-1byv2IPH6K2T7CJC-PYdCpQ-t500x500.jpg"
      />

      <Subtitle title="tags" />
      <div>#jumang4423 #futuristic #cute</div>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        fontFamily: "Iosevka Web, Transparent",
        maxWidth: "500px",
        margin: "0 0 0 0",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        fontSize: "18px",
      }}
    >
      <Header />
      <Description />
      <RainbowLine />
    </div>
  );
}

export default App;
