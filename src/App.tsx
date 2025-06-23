import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import "./App.css";
import "./font.css";
import hov_2 from "/hov_2.mp3";
const captcha = "/captcha.mp4";
import AIChat from "./AIChat";
import { useMediaQuery } from "@chakra-ui/react";
import RecentBlogPosts from "./RecentBlogPosts";
import RecentTechBlogPosts from "./RecentTechBlogPosts";

const soft = [
  "treed-gpt",
  "gameboy-rs",
  "sc_private_miner",
  "nylang",
  "family_king_joystick_hack",
  "cj_v74cl_hacks",
  "jumangodev_y2k",
  "nylisp",
  "pen.el",
  "who_unfollowed_sc_batch",
  "power_tone",
  "surveillance_list",
  "ghidra_gpt3",
  "screamdb",
  "chip8-rs",
  "hentai_dream_95",
  "rust_path_tracer",
  "nysh",
  "dog_rotation",
  "jungle98",
  "hack-the-music",
];

const music = [
  {
    title: "safi",
    href: "https://soundcloud.com/jumang4423/safi",
    imgSrc:
      "https://i1.sndcdn.com/artworks-POMNmyiRUI9fA0kJ-yuhYhw-t500x500.png",
  },
  {
    title: "frail",
    href: "https://soundcloud.com/jumang4423/frail",
    imgSrc:
      "https://i1.sndcdn.com/artworks-dzLoHPQgjDSU2a1m-2yoiIg-t500x500.jpg",
  },
  {
    title: "tuna",
    href: "https://soundcloud.com/jumang4423/2na",
    imgSrc:
      "https://i1.sndcdn.com/artworks-TXubNLB7Erl1yJqy-DtAWSA-t500x500.jpg",
  },
  {
    title: "captcha",
    href: "https://soundcloud.com/jumang4423/captcha",
    imgSrc:
      "https://i1.sndcdn.com/artworks-57i5LYJ8UyHmbkYl-xUy6aQ-t500x500.jpg",
  },
  {
    title: "away (remix)",
    href: "https://soundcloud.com/jumang4423/lazydoll-away-jumango-remix",
    imgSrc:
      "https://i1.sndcdn.com/artworks-1PB8WApUghwg1BUx-V0V0DA-t500x500.jpg",
  },
  {
    title: "twinkle",
    href: "https://soundcloud.com/jumang4423/twinkle",
    imgSrc:
      "https://i1.sndcdn.com/artworks-EPu65YpZOrOimCxH-xKyKhw-t500x500.jpg",
  },
  {
    title: "trip",
    href: "https://soundcloud.com/jumang4423/trip",
    imgSrc:
      "https://i1.sndcdn.com/artworks-8Tz5URmo6iE8y0PL-JRLk4A-t500x500.jpg",
  },
  {
    title: "blanket",
    href: "https://soundcloud.com/jumang4423/blanket",
    imgSrc:
      "https://i1.sndcdn.com/artworks-1byv2IPH6K2T7CJC-PYdCpQ-t500x500.jpg",
  },
  {
    title: "loop",
    href: "https://soundcloud.com/jumang4423/loop",
    imgSrc:
      "https://i1.sndcdn.com/artworks-1PB8WApUghwg1BUx-V0V0DA-t500x500.jpg",
  },
  {
    title: "me",
    href: "https://soundcloud.com/jumang4423/me-by-jumango",
    imgSrc:
      "https://i1.sndcdn.com/artworks-1PB8WApUghwg1BUx-V0V0DA-t500x500.jpg",
  },
  {
    title: "finally",
    href: "https://soundcloud.com/jumang4423/finally",
    imgSrc:
      "https://i1.sndcdn.com/artworks-1PB8WApUghwg1BUx-V0V0DA-t500x500.jpg",
  },
];

const kewlp = [
  {
    title: "wag_gaw",
    href: "https://soundcloud.com/wag_gaw",
  },
  {
    title: "hakushi-hasegawa",
    href: "https://soundcloud.com/hakushi-hasegawa",
  },
  {
    title: "heoliene",
    href: "https://soundcloud.com/heoliene",
  },
  {
    title: "ulla",
    href: "https://soundcloud.com/ullastraus",
  },
  {
    title: "vanfleet",
    href: "https://soundcloud.com/vanfleet",
  },
  {
    title: "1_mm",
    href: "https://soundcloud.com/1_mm",
  },
  {
    title: "voboku",
    href: "https://soundcloud.com/voboku",
  },
  {
    title: "unitkai",
    href: "https://soundcloud.com/unitkai",
  },
  {
    title: "mononomonooto",
    href: "https://soundcloud.com/mononomonooto",
  },
  {
    title: "0-nobody",
    href: "https://soundcloud.com/0-nobody",
  },
  {
    title: "syzymusic",
    href: "https://soundcloud.com/syzymusic",
  },
  {
    title: "indigoindigo000",
    href: "https://soundcloud.com/indigoindigo000",
  },
  {
    title: "acounta",
    href: "https://soundcloud.com/acounta",
  },
  {
    title: "themetaroom",
    href: "https://soundcloud.com/themetaroom",
  },
  {
    title: "yanagamiyuki",
    href: "https://soundcloud.com/yanagamiyuki",
  },
  {
    title: "sv1",
    href: "https://soundcloud.com/sv1",
  },
  {
    title: "aruku_a_dark",
    href: "https://soundcloud.com/aruku_a_dark",
  },
  {
    title: "shibeat",
    href: "https://soundcloud.com/shibeat",
  },
  {
    title: "factal",
    href: "https://soundcloud.com/factal",
  },
  {
    title: "tau contrib",
    href: "https://soundcloud.com/taucontrib",
  },
];

function Header({ onPlay }: { onPlay: () => void }) {
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <div
      style={{
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        marginTop: "-16px",
        justifyContent: "center",
        marginBottom: "-12px",
        flexDirection: "column",
      }}
    >
      {!isMobile && (
        <video
          src={captcha}
          autoPlay
          loop
          playsInline
          muted
          width={550}
          style={{
            marginLeft: "-8px",
            marginTop: "-16px",
            objectFit: "cover",
            filter: "brightness(1.01)",
          }}
        />
      )}
      {isMobile && (
        <img
          src="/juma.png"
          alt="Juma"
          style={{
            objectFit: "cover",
            paddingTop: "10px",
            width: "100%",
          }}
        />
      )}
      <div
        style={{ alignSelf: "flex-end", color: "gray", marginRight: "12px" }}
      >
        art
        <Link href="https://x.com/ggeyegg" onPlay={onPlay}>
          @eggeye
        </Link>
      </div>
    </div>
  );
}

function Link({
  children,
  href,
  onPlay,
  disabled = false,
  style = {},
}: {
  children: any;
  href: string;
  onPlay: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.a
      initial={{ scale: 1.0 }}
      whileHover={{ scale: disabled ? 1.0 : 1.25 }}
      rel="noreferrer"
      href={disabled ? "#" : href}
      target="_blank"
      style={{
        marginLeft: "6px",
        color: "gray",
        borderRadius: "100%",
        border: "1px solid lightgray",
        fontWeight: "normal",
        padding: "0 0px",
        filter: `opacity(${disabled ? 0.3 : 1.0})`,
        ...style,
      }}
      onClick={() => {
        onPlay();
      }}
    >
      {children}
    </motion.a>
  );
}

function Subtitle({ title }: { title: string }) {
  return (
    <div
      style={{
        marginTop: "8px",
        width: "150px",
        color: "#d0f0d8",
        fontSize: "24px",
        transform: "scaleX(2.2) translateX(40px)",
        textAlign: "left",
      }}
    >
      ({title})
    </div>
  );
}

function SoundCloudLinkCard({
  imgSrc,
  href,
  title,
  onPlay,
}: {
  imgSrc?: string;
  href: string;
  title: string;
  onPlay: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "4px",
      }}
    >
      <img
        src={imgSrc}
        width={32}
        height={32}
        style={{ borderRadius: "100%" }}
      />
      <Link href={href} onPlay={onPlay}>
        {title}
      </Link>
    </div>
  );
}

function Description({ onPlay }: { onPlay: () => void }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "//assets.pinterest.com/js/pinit.js";
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      style={{
        marginLeft: "16px",
        marginRight: "16px",
      }}
    >
      <div style={{ marginTop: "16px" }}>
        <Subtitle title="music" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            // border: "1px solid lightgray",
            borderRadius: "100%",
            alignItems: "center",
            gap: "0px 4px",
          }}
        >
          {music.map((m) => (
            <SoundCloudLinkCard
              href={m.href}
              title={m.title}
              onPlay={onPlay}
              imgSrc={m.imgSrc}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        <Subtitle title="sns" />
        <div
          style={{
            // border: "1px solid lightgray",
            borderRadius: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "0px 0px",
              }}
            >
              <Link href="https://soundcloud.com/jumang4423/" onPlay={onPlay}>
                soundcloud
              </Link>
              <Link onPlay={onPlay} href="https://scrapbox.io/jumang4423/">
                scrapbox
              </Link>
              <Link onPlay={onPlay} href="https://github.com/jumang4423/">
                github
              </Link>
              <Link onPlay={onPlay} href="https://twitter.com/jumang4423/">
                x(twitter)
              </Link>
              <Link
                onPlay={onPlay}
                href="https://vrchat.com/home/user/usr_4b57f0ea-9bb7-4a9a-9f6c-42b3734c9ee3/"
              >
                vrchat
              </Link>
              <Link onPlay={onPlay} href="https://jumango.bandcamp.com/">
                bandcamp
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        <div
          style={{
            alignItems: "center",
          }}
        >
          <Subtitle title="thoughts" />
          <RecentBlogPosts onPlay={onPlay} />
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        <div
          style={{
            alignItems: "center",
          }}
        >
          <Subtitle title="tech blog" />
          <RecentTechBlogPosts onPlay={onPlay} />
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        <Subtitle title="software" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // border: "1px solid lightgray",
            borderRadius: "100%",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px 0px",
          }}
        >
          {soft.map((m: string, i: number) => (
            <Link
              href={`https://github.com/jumang4423/${m}`}
              onPlay={onPlay}
              key={i}
            >
              {m}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        <Subtitle title="cool people" />
        <div
          style={{
            // border: "1px solid lightgray",
            borderRadius: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px 0px",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          {kewlp.map((m, i: number) => (
            <Link href={m.href} onPlay={onPlay} key={i}>
              {m.title}
            </Link>
          ))}
        </div>
      </div>

      <Subtitle title="pinterest" />
      <div
        style={{
          marginTop: "16px",
        }}
      >
        <a
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: isScriptLoaded ? "flex" : "none",
          }}
          data-pin-do="embedUser"
          href={"https://www.pinterest.com/jumang4423/"}
        />
      </div>
      <Subtitle title="harbot" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <iframe
          src="https://weepjp.neocities.org/harbot/"
          style={{
            border: "none",
            marginTop: "8px",
            width: "135px",
            height: "210px",
            marginBottom: "16px",
          }}
          scrolling="no"
        />
        <div
          style={{
            marginLeft: "16px",
            marginTop: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "gray",
            borderRadius: "100%",
            border: "1px solid lightgray",
          }}
        >
          harbot is a service that assists with features commonly used on
          personal websites, such as access counters, guestbooks, and link
          directories, all accompanied by cute characters
        </div>
      </div>
      <div style={{ marginBottom: 256 }}></div>
    </div>
  );
}

const displayHackerDefenceConsole = () => {
  const consoleText = `if you are a hacker, please do not hack me instead listen to my music.`;
  console.log(
    `%c${consoleText}`,
    "background-color: rgb(255, 164, 244); color: white; font-size: 24px; border-radius: 8px; padding: 8px;"
  );
};

function App() {
  const volume = 0.5;
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [play2] = useSound(hov_2, {
    volume,
    playbackRate,
  });
  const onPlay = () => {
    play2();
    const randomRate = Math.random() * 2.0 + 0.25;
    setPlaybackRate(randomRate);
  };

  useEffect(() => {
    displayHackerDefenceConsole();
  }, []);
  return (
    <div
      style={{
        fontFamily: "Iosevka Aile Iaso, Transparent",
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
      <Header onPlay={onPlay} />
      <AIChat />
      <Description onPlay={onPlay} />
    </div>
  );
}

export default App;
