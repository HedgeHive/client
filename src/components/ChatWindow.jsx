import Message from "./Message";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const messages = [
    { id: 1, sender: "user", text: "Can you send 0.0002 ETH to ******** address, please" },
    { id: 2, sender: "bot", text: "Sure, sign tx in your wallet" }
  ];

  return (
    <div className="w-[500px] bg-black rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">LineUp</h2>
        <div className="bg-gray-800 px-3 py-1 rounded-lg text-sm">0xA...4sZ</div>
      </div>

      <div className="h-80 overflow-y-auto p-2">
        {messages.map((msg) => (
          <Message key={msg.id} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
}
