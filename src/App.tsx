import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import "./App.css";
import "./font.css";
import hov_1 from "/hov_1.mp3";
import hov_2 from "/hov_2.mp3";
import hov_3 from "/hov_3.mp3";
const headerVideo = "/logo_b.mp4";

function Header() {
  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-12px",
        marginBottom: "-8px",
      }}
    >
      <motion.div
        className="header-video-container"
        initial={{ scaleX: 1.0, scaleY: 0 }}
        whileTap={{ scaleY: 0 }}
        animate={{
          scaleY: 1.0,
        }}
      >
        <video
          src={headerVideo}
          autoPlay
          loop
          playsInline
          muted
          width={500}
          style={{
            marginLeft: "-8px",
            marginTop: "4px",
            objectFit: "cover",
          }}
        />
      </motion.div>
      <div
        className="header-smartphone-container"
        style={{
          marginTop: "8px",
          marginLeft: "-32px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="/juma.png"
          style={{
            objectFit: "cover",
            width: "112%",
          }}
        />
      </div>
    </motion.div>
  );
}

function Link({
  children,
  href,
  onPlay,
}: {
  children: any;
  href: string;
  onPlay: () => void;
}) {
  return (
    <motion.a
      initial={{ scale: 1.0 }}
      whileHover={{ scale: 1.25 }}
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        marginLeft: "8px",
        backgroundColor: "rgb(255, 164, 244)",
        color: "white",
        textDecoration: "underline",
        fontWeight: "normal",
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
        marginTop: "8px",
      }}
    >
      <img src={imgSrc} width={32} height={32} />
      <Link href={href} onPlay={onPlay}>
        {title}
      </Link>
    </div>
  );
}

function Description() {
  const volume = 0.5;
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [play1] = useSound(hov_1, {
    volume,
    playbackRate,
  });
  const [play2] = useSound(hov_2, {
    volume,
    playbackRate,
  });
  const [play3] = useSound(hov_3, {
    volume,
    playbackRate,
  });
  const plays = [play1, play2, play3];
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

  const onPlay = () => {
    const randomPlay = plays[Math.floor(Math.random() * plays.length)];
    randomPlay();
    const randomRate = Math.random() * 3.0 + 0.1;
    setPlaybackRate(randomRate);
  };
  return (
    <div
      style={{
        marginLeft: "16px",
        marginRight: "16px",
      }}
    >
      <Subtitle title="about" />
      <div>
        jumango(@jumang4423) is a musician and hacker in Japan, making
        futuristic d/acc music and software
      </div>
      <div>
        regularly i experiment with new technologies and find ways to understand
        gen alpha
      </div>
      <div>
        <SoundCloudLinkCard
          href="https://etherscan.io/address/0x4bd46fe39b1630915687b4edd3de582c85c20bf9"
          title="0x4bd46fe3....85c20bf9"
          imgSrc="/ether.svg"
          onPlay={onPlay}
        />
      </div>
      <Subtitle title="sns" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>jumango's work is most audible via:</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "8px 0px",
          }}
        >
          <Link href="https://soundcloud.com/jumang4423/" onPlay={onPlay}>
            soundcloud
          </Link>
          ,
          <Link onPlay={onPlay} href="https://jumango.bandcamp.com/">
            bandcamp
          </Link>
          ,
          <Link onPlay={onPlay} href="https://github.com/jumang4423/">
            github
          </Link>
          ,
          <Link
            onPlay={onPlay}
            href="https://vrchat.com/home/user/usr_4b57f0ea-9bb7-4a9a-9f6c-42b3734c9ee3/"
          >
            vrchat
          </Link>
          <pre style={{ margin: "0px" }}>{" or"}</pre>
          <Link onPlay={onPlay} href="https://twitter.com/jumang4423/">
            x(twitter)
          </Link>
        </div>
      </div>
      <Subtitle title="releases" />
      available on soundcloud:
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0px 8px",
        }}
      >
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/2na"
          title="tuna"
          onPlay={onPlay}
          imgSrc="https://i1.sndcdn.com/artworks-TXubNLB7Erl1yJqy-DtAWSA-t500x500.jpg"
        />
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/lazydoll-away-jumango-remix"
          title="lazydoll away (remix)"
          onPlay={onPlay}
          imgSrc="https://i1.sndcdn.com/artworks-1PB8WApUghwg1BUx-V0V0DA-t500x500.jpg"
        />
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/twinkle"
          onPlay={onPlay}
          title="twinkle"
          imgSrc="https://i1.sndcdn.com/artworks-EPu65YpZOrOimCxH-xKyKhw-t500x500.jpg"
        />
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/frail"
          onPlay={onPlay}
          title="frail"
          imgSrc="https://i1.sndcdn.com/artworks-dzLoHPQgjDSU2a1m-2yoiIg-t500x500.jpg"
        />
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/trip"
          title="trip"
          imgSrc="https://i1.sndcdn.com/artworks-8Tz5URmo6iE8y0PL-JRLk4A-t500x500.jpg"
          onPlay={onPlay}
        />
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/blanket"
          onPlay={onPlay}
          title="blanket"
          imgSrc="https://i1.sndcdn.com/artworks-1byv2IPH6K2T7CJC-PYdCpQ-t500x500.jpg"
        />
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/loop"
          onPlay={onPlay}
          title="loop"
          imgSrc="https://i1.sndcdn.com/artworks-1PB8WApUghwg1BUx-V0V0DA-t500x500.jpg"
        />
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/me-by-jumango"
          onPlay={onPlay}
          title="me"
          imgSrc="https://i1.sndcdn.com/artworks-1PB8WApUghwg1BUx-V0V0DA-t500x500.jpg"
        />
        <SoundCloudLinkCard
          href="https://soundcloud.com/jumang4423/finally"
          onPlay={onPlay}
          title="finally"
          imgSrc="https://i1.sndcdn.com/artworks-1PB8WApUghwg1BUx-V0V0DA-t500x500.jpg"
        />
      </div>
      <Subtitle title="pinterest" />
      <div
        style={{
          marginTop: "8px",
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
          src="https://weep.page/harbot/"
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
            flexDirection: "column",
          }}
        >
          「Harbot」は、アクセスカウンターやゲストブック、リンク集といった個人ホームページでよく使われる機能を、可愛いキャラクターとともに支援するサービスだ。
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
  useEffect(() => {
    displayHackerDefenceConsole();
  }, []);
  return (
    <div
      style={{
        fontFamily: "Iosevka Aile Iaso, Transparent",
        maxWidth: "500px",
        fontSize: "18px",
      }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.xeiaso.net/static/css/iosevka/family.css"
      />
      <Header />
      <Description />
    </div>
  );
}

export default App;
