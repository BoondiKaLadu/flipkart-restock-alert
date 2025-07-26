import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductUrlInputProps {
  onAddProduct: (url: string) => void;
}

export const ProductUrlInput = ({ onAddProduct }: ProductUrlInputProps) => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a Flipkart product URL",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes("flipkart.com")) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Flipkart product URL",
        variant: "destructive",
      });
      return;
    }

    onAddProduct(url.trim());
    setUrl("");
    toast({
      title: "Product Added",
      description: "We'll notify you when it's back in stock!",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Product to Watch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter Flipkart product URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
};