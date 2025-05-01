
import { FileText, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface DocumentCardProps {
  id: string;
  title: string;
  lastModified: string;
  collaborators: number;
  previewText: string;
}

const DocumentCard = ({
  id,
  title,
  lastModified,
  collaborators,
  previewText,
}: DocumentCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/documents/${id}`);
  };

  return (
    <Card 
      className="document-card cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-theme-blue" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <Badge variant="outline" className="bg-theme-blue/10 text-theme-blue">
            Document
          </Badge>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-gray-600">{previewText}</p>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 px-6 py-3">
        <div className="flex w-full items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3.5 w-3.5" />
            <span>{lastModified}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3.5 w-3.5" />
            <span>{collaborators} collaborators</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
