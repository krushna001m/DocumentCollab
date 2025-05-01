
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Save,
  Share
} from "lucide-react";

interface TextEditorProps {
  initialContent?: string;
  documentId?: string;
  title?: string;
}

const TextEditor = ({ initialContent = "", documentId, title = "Untitled Document" }: TextEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [documentTitle, setDocumentTitle] = useState(title);
  const [isSaving, setIsSaving] = useState(false);
  const [activeUsers, setActiveUsers] = useState([
    { name: "Jane Doe", initials: "JD", color: "bg-theme-blue" },
    { name: "John Smith", initials: "JS", color: "bg-green-500" }
  ]);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Simulate receiving real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate another user's cursor position with a blinking element
      if (editorRef.current && Math.random() > 0.7) {
        const cursor = document.createElement("span");
        cursor.className = "bg-green-500 animate-cursor-blink";
        cursor.style.width = "2px";
        cursor.style.height = "18px";
        cursor.style.position = "absolute";
        
        // Random position within editor
        const editorRect = editorRef.current.getBoundingClientRect();
        const x = Math.random() * (editorRect.width - 100) + 50;
        const y = Math.random() * (editorRect.height - 100) + 50;
        
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        
        editorRef.current.appendChild(cursor);
        
        setTimeout(() => {
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
        }, 2000);
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  const handleFormatCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };
  
  const saveDocument = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Document Saved",
        description: "Your document has been saved successfully.",
      });
    }, 1000);
  };
  
  const shareDocument = () => {
    toast({
      title: "Share Link Copied",
      description: "Document share link has been copied to clipboard.",
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          className="border-none bg-transparent px-0 text-3xl font-bold focus:outline-none focus:ring-0"
          placeholder="Untitled Document"
        />
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {activeUsers.map((user, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className={`border-2 border-white ${user.color}`}>
                      <AvatarFallback className="text-white">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <Badge className="bg-green-500">Live</Badge>
        </div>
      </div>
      
      <div className="mb-4 flex flex-wrap items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormatCommand('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormatCommand('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormatCommand('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-5 w-px bg-gray-300" />
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormatCommand('justifyLeft')}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormatCommand('justifyCenter')}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormatCommand('justifyRight')}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-5 w-px bg-gray-300" />
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormatCommand('insertUnorderedList')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleFormatCommand('insertOrderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline" 
            size="sm"
            className="border-theme-blue text-theme-blue hover:bg-theme-blue/10"
            onClick={shareDocument}
          >
            <Share className="mr-1 h-4 w-4" />
            Share
          </Button>
          <Button 
            size="sm"
            className="bg-theme-orange hover:bg-theme-orange/90"
            onClick={saveDocument}
            disabled={isSaving}
          >
            <Save className="mr-1 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
      
      <div
        ref={editorRef}
        className="editor-content flex-grow overflow-y-auto rounded-lg border bg-white shadow-sm"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TextEditor;
