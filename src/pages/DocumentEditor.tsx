
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextEditor from "@/components/TextEditor";

const DocumentEditor = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate fetching document
  useEffect(() => {
    const fetchDocument = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (id === "new") {
        setDocument({
          id: "new",
          title: "Untitled Document",
          content: "",
        });
      } else {
        // Mock documents
        const mockDocuments = {
          "1": {
            id: "1",
            title: "Project Proposal",
            content: `<h1>Project Proposal</h1><p>This is a project proposal for the upcoming quarter. We aim to:</p><ul><li>Increase user engagement</li><li>Implement new features</li><li>Improve performance</li></ul>`,
          },
          "2": {
            id: "2",
            title: "Meeting Notes",
            content: `<h1>Meeting Notes</h1><p>Date: April 29, 2025</p><h2>Key Points:</h2><ol><li>Budget allocation for Q2</li><li>New marketing initiatives</li><li>Product roadmap updates</li></ol>`,
          },
          "3": {
            id: "3",
            title: "Marketing Strategy",
            content: `<h1>Marketing Strategy</h1><p>This document details our marketing approach for the next fiscal year.</p><h2>Focus Areas:</h2><ul><li>Expanding digital presence</li><li>Leveraging partnerships</li><li>Content marketing</li></ul>`,
          },
          "4": {
            id: "4",
            title: "Product Roadmap",
            content: `<h1>Product Roadmap</h1><p>Our product development plan for the next year:</p><ul><li>Q3 2025: Feature A launch</li><li>Q4 2025: Integration with Platform B</li><li>Q1 2026: Mobile app redesign</li></ul>`,
          },
        };
        
        setDocument(mockDocuments[id as keyof typeof mockDocuments] || {
          id,
          title: "Unknown Document",
          content: "<p>This document could not be found.</p>",
        });
      }
      
      setIsLoading(false);
    };
    
    fetchDocument();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-theme-blue border-t-transparent"></div>
          <p>Loading document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="mx-auto max-w-5xl">
        <TextEditor
          initialContent={document.content}
          documentId={document.id}
          title={document.title}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
