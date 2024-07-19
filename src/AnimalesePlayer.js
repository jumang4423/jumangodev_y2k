import { useEffect, useRef } from "react";
import { toRomaji } from "wanakana";

function processText(text) {
  let words = text.split(" ");
  let processedWords = words.map((word) => {
    const word2 = toRomaji(word);
    return word2.substring(0, 2);
  });
  return processedWords.join(" ");
}

const AnimalesePlayer = ({ text, lettersFile }) => {
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    async function loadBuffer(url) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      );
      return audioBuffer;
    }

    async function playAnimalese() {
      const audioBuffer = await loadBuffer(lettersFile);

      let startTime = audioContextRef.current.currentTime;
      const processedText = processText(text.toUpperCase());
      for (const character of processedText) {
        if (character >= "A" && character <= "Z") {
          const letterIndex = character.charCodeAt(0) - "A".charCodeAt(0);
          const letterDuration = audioBuffer.duration / 26;

          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioBuffer;

          const rnd = Math.random() * 0.5;
          const rndPitch = 1.2 + rnd;
          source.playbackRate.value = rndPitch;

          const gainNode = audioContextRef.current.createGain();
          gainNode.gain.value = 0.25; // Change this value to control the volume (range: 0.0 to 1.0)

          // Connect the source to the gainNode and the gainNode to the destination
          source.connect(gainNode);
          gainNode.connect(audioContextRef.current.destination);

          source.start(startTime, letterIndex * letterDuration, letterDuration);
          startTime += 0.04;
        } else {
          startTime += 0.01;
        }
      }
    }

    if (text) {
      playAnimalese();
    }
  }, [text, lettersFile]);

  return null;
};

export default AnimalesePlayer;
