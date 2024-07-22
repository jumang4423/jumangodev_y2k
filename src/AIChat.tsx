import AnimalesePlayer from "./AnimalesePlayer";
import { useState } from "react";
import { CohereClient } from "cohere-ai";
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
  const cohere = new CohereClient({
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
      color={"black"}
      p={1}
      mt={1}
      borderRadius="100%"
      border="1px solid lightgray"
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

    const w_system = [
      {
        role: "System",
        message: SYSTEM_PROMPT,
      },
      ...msgPtr,
    ];
    try {
      const cohere = get_cohere();
      const stream = await cohere.chatStream({
        model: "command-r-plus",
        message: userInputCP,
        chatHistory: w_system,
        documents: documents,
      });
      msgPtr.push({
        role: "User",
        message: userInputCP,
      });
      setMsgArr(structuredClone(msgPtr));

      for await (const chat of stream) {
        if (chat.eventType === "text-generation") {
          if (msgPtr[msgPtr.length - 1].role !== "Chatbot") {
            msgPtr.push({
              role: "Chatbot",
              message: "",
            });
          }

          msgPtr[msgPtr.length - 1].message += chat.text;
          setLatestAIResponse(chat.text);
          setMsgArr(structuredClone(msgPtr));
        }
      }
    } catch {
      alert("jumango ai unavailable ;<");
    }
    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        marginTop: "24px",
        marginLeft: "16px",
        marginRight: "16px",
        marginBottom: "-4px",
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
              <l-quantum size="18" speed="1.5" color={"black"} />
            ) : (
              <ArrowForwardIcon />
            )}
          </InputRightElement>
          <Textarea
            focusBorderColor="gray.200"
            height={"auto"}
            onCompositionStart={startComposition}
            onCompositionEnd={endComposition}
            placeholder="ask to jumango ai..."
            rows={Math.min(3, userInput.split("\n").length)}
            h={"auto"}
            value={userInput}
            rounded={"2xl"}
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
      <Box mt={2}>
        {msgArr
          .map((c, index) => {
            return (
              <ScaleFade
                key={`${c.role}-${index}`}
                initialScale={0.9}
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
