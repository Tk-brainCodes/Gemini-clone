import { ReactNode, createContext, useState } from "react";
import runChat from "@/config/gemini";

export const Context = createContext({});

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // const delayPara = (index: number, nextWord: string) => {};

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const response = await runChat(input);

    // Replace ** with <strong>
    const responseArray = response.split("**");
    let newChatResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newChatResponse += responseArray[i];
      } else {
        newChatResponse += "<strong>" + responseArray[i] + "</strong>";
      }
    }

    // Replace * with <br><br>
    const chatResponseWithBold = newChatResponse.split("*").join("<br><br>");

    // Replace ##, ###, ####, etc. with corresponding <h2>, <h3>, <h4>, etc.
    const chatResponseWithHeadings = chatResponseWithBold.replace(
      /^(#+)\s(.*)$/gm,
      (_, hashes, content) => {
        const level = hashes.length;
        return `<h${level}>${content}</h${level}>`;
      }
    );

    // Replace "" with <ul> and <li> tags
    const chatResponseWithListItems = chatResponseWithHeadings.replace(
      /^\s*(\*|\d+\.)\s(.*)$/gm,
      (_, bullet, content) => {
        if (bullet === "*") {
          return `<li>${content}</li>`;
        } else {
          return `<li>${content}</li>`;
        }
      }
    );

    // Replace https links with <a> tags
    const chatResponseWithLinks = chatResponseWithListItems.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" style="color: blue;">$1</a>'
    );

    // Add code block for various programming languages with background color
    const chatResponseWithCodeBlocks = chatResponseWithLinks.replace(
      /```(\w+)\n?([\s\S]*?)```/g,
      (_, lang, code) => {
        code = code
          .trim()
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<pre style="background-color: #f0f4f9; border-radius: 40px; max-height: 300px; width: 600px; padding: 20px; display: block; overflow-y: auto; overflow-x: auto;"><code class="${lang}" style="word-wrap: break-word;">${code}</code></pre><br>`;
      }
    );

    // Add line breaks before and after words wrapped in asterisks
    const chatResponseWithLineBreaks = chatResponseWithCodeBlocks.replace(
      /\*([^*]+)\*/g,
      (_, word) => {
        return `<br>${word}<br>`;
      }
    );

    setResultData(chatResponseWithLineBreaks);

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
