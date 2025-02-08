
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Image, FileText, Mic, Smile } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [searchId, setSearchId] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (searchId.length !== 8) {
      toast.error("Please enter a valid 8-character Hush ID");
      return;
    }
    toast.success("Friend request sent!");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
    toast.success("Message sent!");
  };

  return (
    <Layout>
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Enter 8-character Hush ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value.toUpperCase())}
            maxLength={8}
            className="font-mono"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Find
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4 mb-4 overflow-auto">
          <div className="flex flex-col gap-4">
            <div className="self-end max-w-[80%] bg-secondary text-secondary-foreground p-3 rounded-lg">
              Hey! How are you?
            </div>
            <div className="self-start max-w-[80%] bg-accent/10 p-3 rounded-lg">
              I'm doing great, thanks for asking!
            </div>
          </div>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <div className="flex-1 flex gap-2 bg-white rounded-lg p-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button variant="ghost" size="icon" type="button">
              <Image className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" type="button">
              <FileText className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" type="button">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" type="button">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Index;
