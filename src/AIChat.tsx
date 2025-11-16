import AnimalesePlayer from "./AnimalesePlayer";
import { useState } from "react";
import { CohereClientV2 } from "cohere-ai";
import {
  Box,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Textarea,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { quantum } from "ldrs";
import { documents, SYSTEM_PROMPT } from "./system";
quantum.register();
const cohere_keys = [
  "KryHRXgAb4WY0XeyK5VWFP8d1iQlxX3ssgnzvEDR",
  "qwsL9bEqlz7s0P1VqL2cx0FemwnThg69lrrCUPIa",
  "H17WDkPcbTlroZGL05H3euhzz3D44MhpJhHt2LH7",
  "44YNhPFqIKNh6ovz6RkK9bq2fMk97uzBy78flevM",
  "GPcCjoFbEXhjRO7n7w2Hu5cM67W5TOcTLQo8enIC",
];
const get_cohere = () => {
  const cohere_key =
    cohere_keys[Math.floor(Math.random() * cohere_keys.length)];
  const cohere = new CohereClientV2({
    token: cohere_key,
  });
  return cohere;
};

interface Message {
  role: string;
  message: string;
}

const initMsg: Array<Message> = [];

const UserMessage: React.FC<{ message: Message; isUser: boolean }> = ({
  message,
  isUser,
}) => {
  const name = isUser ? "you" : "jumango";
  return (
    <Box
      color={"gray"}
      p={0.9} /* 90% of 1 */
      mt={0.45} /* 90% of 0.5 */
      borderRadius="100%"
      border="0.9px solid lightgray" /* 90% of 1px */
      display="inline-block"
      maxW="100%"
      ml="auto"
      lineHeight={0.9}
      flexDirection={"column"}
    >
      <div>
        {(`${name}: ` + message.message).split("\n").map((line, index) => (
          <Box key={index}>{line}</Box>
        ))}
      </div>
    </Box>
  );
};

function trimArray<T>(arr: T[], maxLen: number): T[] {
  if (arr.length > maxLen) {
    arr.splice(0, arr.length - maxLen);
  }
  return arr;
}

const AIChat = () => {
  const [userInput, setUserInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msgArr, setMsgArr] = useState(initMsg);
  const [latestAIResponse, setLatestAIResponse] = useState("");
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  const thisOnSubmit = async () => {
    if (userInput === "") {
      return;
    }
    setIsSubmitting(true);
    const userInputCP = structuredClone(userInput);
    setUserInput("");
    const msgPtr = structuredClone(trimArray(msgArr, 5));
    try {
      const cohere = get_cohere();
      const payload = {
        // command-r-plus alias was shut down on 2025-09-15; use current active model
        model: "command-a-03-2025",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...msgPtr.map((m) => ({
            role: m.role === "User" ? "user" : "assistant",
            content: m.message,
          })),
          { role: "user", content: userInputCP },
        ],
        documents: documents.map((doc: any) =>
          typeof doc === "string"
            ? doc
            : doc?.snippet || doc?.title
            ? `${doc?.title ?? ""} ${doc?.snippet ?? ""}`.trim()
            : JSON.stringify(doc)
        ),
      };

      msgPtr.push({
        role: "User",
        message: userInputCP,
      });
      setMsgArr(structuredClone(msgPtr));

      try {
        const stream = await cohere.chatStream(payload);
        for await (const chat of stream) {
          if (chat.type === "content-delta") {
            const textDelta = chat.delta?.message?.content?.text || "";
            if (msgPtr[msgPtr.length - 1].role !== "Chatbot") {
              msgPtr.push({
                role: "Chatbot",
                message: "",
              });
            }

            msgPtr[msgPtr.length - 1].message += textDelta;
            setLatestAIResponse(textDelta);
            setMsgArr(structuredClone(msgPtr));
          }
        }
      } catch (e) {
        console.error("chatStream failed, falling back to non-stream chat", e);
        const resp = await cohere.chat(payload);
        const fullText =
          resp.message?.content
            ?.map((c: any) => (c.type === "text" ? c.text : ""))
            .join("") || "";
        msgPtr.push({
          role: "Chatbot",
          message: fullText,
        });
        setLatestAIResponse(fullText);
        setMsgArr(structuredClone(msgPtr));
      }
    } catch (e) {
      console.error("jumango ai unavailable ;<", e);
      alert("jumango ai unavailable ;<");
    }
    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        marginTop: "14.4px", /* 90% of 16px */
        marginLeft: "14.4px", /* 90% of 16px */
        marginRight: "14.4px", /* 90% of 16px */
        marginBottom: "-3.6px", /* 90% of -4px */
      }}
    >
      <AnimalesePlayer text={latestAIResponse} lettersFile="/animalese.wav" />
      <Box>
        <InputGroup>
          <InputRightElement
            pointerEvents="auto"
            onClick={thisOnSubmit}
            hidden={userInput === ""}
          >
            {isSubmitting ? (
              <l-quantum size="16.2" speed="1.5" color={"black"} /> /* 90% of 18 */
            ) : (
              <ArrowForwardIcon />
            )}
          </InputRightElement>
          <Textarea
            focusBorderColor="gray.100"
            height={"auto"}
            onCompositionStart={startComposition}
            onCompositionEnd={endComposition}
            placeholder="ask jumango ai..."
            rows={Math.min(3, userInput.split("\n").length)} /* keep 3 rows max */
            h={"auto"}
            value={userInput}
            rounded={"2xl"} /* scale down rounding */
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (composing) {
                return;
              }

              if (e.key === "Enter" && (e.metaKey || e.ctrlKey || e.shiftKey)) {
                e.preventDefault();
                thisOnSubmit();
              }
            }}
          />
        </InputGroup>
      </Box>
      <Box mt={1.8}>
        {msgArr
          .map((c, index) => {
            return (
              <ScaleFade
                key={`${c.role}-${index}`}
                initialScale={0.81} /* 90% of 0.9 */
                in={true}
              >
                <UserMessage message={c} isUser={c.role === "User"} />
              </ScaleFade>
            );
          })
          .reverse()}
      </Box>
    </div>
  );
};

export default AIChat;
