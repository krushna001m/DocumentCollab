
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DocumentCard from "@/components/DocumentCard";

const MOCK_DOCUMENTS = [
  {
    id: "1",
    title: "Project Proposal",
    lastModified: "Today, 2:30 PM",
    collaborators: 3,
    previewText: "This project proposal outlines the key objectives and goals for the upcoming quarter. We aim to increase user engagement by implementing..."
  },
  {
    id: "2",
    title: "Meeting Notes",
    lastModified: "Yesterday, 10:15 AM",
    collaborators: 5,
    previewText: "Key points discussed: 1. Budget allocation for Q2, 2. New marketing initiatives, 3. Product roadmap updates..."
  },
  {
    id: "3", 
    title: "Marketing Strategy",
    lastModified: "Apr 28, 2025",
    collaborators: 2,
    previewText: "This document details our marketing approach for the next fiscal year. Our focus will be on expanding digital presence and leveraging..."
  },
  {
    id: "4",
    title: "Product Roadmap",
    lastModified: "Apr 25, 2025",
    collaborators: 4,
    previewText: "Q3 2025: Feature A launch, Q4 2025: Integration with Platform B, Q1 2026: Mobile app redesign..."
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredDocuments = MOCK_DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.previewText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-black md:text-5xl">
          Real-Time Collaborative
          <span className="block bg-gradient-to-r from-theme-orange to-theme-blue bg-clip-text text-transparent"> 
            Document Editor
          </span>
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
          Create, edit, and collaborate on documents in real-time with your team. 
          Experience seamless document editing with instant updates.
        </p>
        <Button 
          className="bg-theme-orange hover:bg-theme-orange/90"
          size="lg"
          onClick={() => navigate("/documents/new")}
        >
          Create New Document
        </Button>
      </div>
      
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-semibold">Your Documents</h2>
        <div className="flex items-center justify-between">
          <Input 
            className="max-w-sm"
            placeholder="Search documents..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline" className="border-theme-blue text-theme-blue hover:bg-theme-blue/10">
            Recent
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} {...doc} />
          ))
        ) : (
          <div className="col-span-full rounded-lg border border-dashed border-gray-300 p-12 text-center">
            <h3 className="mb-2 text-lg font-medium">No documents found</h3>
            <p className="mb-4 text-gray-500">
              {searchQuery ? "Try a different search term" : "Create a new document to get started"}
            </p>
            <Button onClick={() => navigate("/documents/new")}>
              Create Document
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
