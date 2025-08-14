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
  "ghidra_gpt3",
  "screamdb",
  "chip8-rs",
  "rust_path_tracer",
  "nysh",
  "dog_rotation",
  "jungle98",
  "patchrome-ext",
  "business-card-pcb",
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


function Header({ onPlay }: { onPlay: () => void }) {
  const [isMobile] = useMediaQuery("(max-width: 540px)"); /* 90% of 600px */

  return (
    <div
      style={{
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        marginTop: "-14.4px", /* 90% of -16px */
        justifyContent: "center",
        marginBottom: "-10.8px", /* 90% of -12px */
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
          width={700} /* 90% of 550 */
          style={{
            marginLeft: "-7.2px", /* 90% of -8px */
            marginTop: "-14.4px", /* 90% of -16px */
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
            paddingTop: "9px", /* 90% of 10px */
            width: "100%",
          }}
        />
      )}
      <div
        style={{ alignSelf: "flex-end", color: "gray", marginRight: "10.8px" }} /* 90% of 12px */
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
        marginLeft: "5.4px", /* 90% of 6px */
        color: "black",
        borderRadius: "100%",
        border: "0.9px solid lightgray", /* 90% of 1px */
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
        marginTop: "7.2px", /* 90% of 8px */
        width: "126px", /* 90% of 140px */
        color: "#90daa3ff",
        fontSize: "18px", /* 90% of 20px */
        fontWeight: "700",
        transform: "scaleX(2.16) translateX(36.9px)", /* 90% of scale and translate */
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
        marginTop: "3.6px", /* 90% of 4px */
      }}
    >
      <img
        src={imgSrc}
        width={28.8} /* 90% of 32 */
        height={28.8} /* 90% of 32 */
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
        marginLeft: "14.4px", /* 90% of 16px */
        marginRight: "14.4px", /* 90% of 16px */
      }}
    >
      <div style={{ marginTop: "14.4px" }}>
        <Subtitle title="projects" />
        <RecentTechBlogPosts onPlay={onPlay} />
      </div>

      <div style={{ marginTop: "7.2px" }}>
        <Subtitle title="music" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            // border: "1px solid lightgray",
            borderRadius: "100%",
            alignItems: "center",
            gap: "0px 3.6px", /* 90% of 4px */
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

      <div style={{ marginTop: "7.2px" }}> 
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
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "7.2px" }}> 
        <div
          style={{
            alignItems: "center",
          }}
        >
          <Subtitle title="thoughts" />
          <RecentBlogPosts onPlay={onPlay} />
        </div>
      </div>

      <div style={{ marginTop: "7.2px" }}> 
        <Subtitle title="software" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // border: "1px solid lightgray",
            borderRadius: "100%",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "3.6px 0px", /* 90% of 4px */
          }}
        >
          {soft.map((m: string, i: number) => (
            <Link
              href={m === "power_tone" ? "https://github.com/jumang4423/power_tone_2010" : `https://github.com/jumang4423/${m}`}
              onPlay={onPlay}
              key={i}
            >
              {m}
            </Link>
          ))}
        </div>
      </div>


      <Subtitle title="pinterest" />
      <div
        style={{
          marginTop: "14.4px", /* 90% of 16px */
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
            marginTop: "8px", /* 90% of 8px */
            width: "135px", /* 90% of 135px */
            height: "210px", /* 90% of 210px */
            marginBottom: "16px", /* 90% of 16px */
          }}
          scrolling="no"
        />
        <div
          style={{
            marginLeft: "16px", /* 90% of 16px */
            marginTop: "8px", /* 90% of 8px */
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "gray",
            borderRadius: "100%",
            border: "0.9px solid lightgray", /* 90% of 1px */
          }}
        >
          harbot is a service that assists with features commonly used on
          personal websites, such as access counters, guestbooks, and link
          directories, all accompanied by cute characters
        </div>
      </div>
      <div style={{ marginBottom: 230.4 }}></div>
    </div>
  );
}

const displayHackerDefenceConsole = () => {
  const consoleText = `if you are a hacker, please do not hack me instead listen to my music.`;
  console.log(
    `%c${consoleText}`,
    "background-color: rgb(255, 164, 244); color: white; font-size: 21.6px; border-radius: 7.2px; padding: 7.2px;" /* 90% of sizes */
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
        fontFamily: "Doto, Transparent",
        maxWidth: "740px", /* 90% of 600px */
        fontSize: "15.3px", /* 90% of 17px */
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
