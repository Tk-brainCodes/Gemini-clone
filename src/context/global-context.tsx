import { ReactNode, createContext, useState } from "react";
import runChat from "@/config/gemini";

interface ContextProps {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  onSent: (prompt: string) => void;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  recentPrompt: string;
  showResult: boolean;
  loading: boolean;
  resultData: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  newChatScreen: () => void;
}

export const Context = createContext<ContextProps | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const typingEffect = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + (prev ? " " : "") + nextWord);
    }, 75 * index);
  };

  const newChatScreen = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt: string) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;

    if (prompt !== undefined) {
      response = await runChat(input);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

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
        return `<pre style="background-color: #f0f4f9; border-radius: 10px; max-height: 300px; width: 600px; padding: 20px; display: block; overflow-y: auto; overflow-x: auto;" class="no-scrollbar"><style>.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }</style><code class="language-${lang}" style="word-wrap: break-word;" data-prismjs-copy="Copy">${code}</code></pre><br>`;
      }
    );

    // Add line breaks before and after words wrapped in asterisks
    const chatResponseWithLineBreaks = chatResponseWithCodeBlocks.replace(
      /\*([^*]+)\*/g,
      (_, word) => {
        return `<br>${word}<br>`;
      }
    );

    // Replace inline code with <code> tags
    const chatResponseWithInlineCode = chatResponseWithLineBreaks.replace(
      /`([^`]+)`/g,
      `<code style="padding: 2px; background-color:  #f0f4f9; text-align center; border-radius: 3px;">$1</code>`
    );

    const splitResultResponse = chatResponseWithInlineCode.split(" ");

    for (let i = 0; i < splitResultResponse.length; i++) {
      const nextWord = splitResultResponse[i];
      typingEffect(i, nextWord + "");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue: ContextProps = {
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
    newChatScreen,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
