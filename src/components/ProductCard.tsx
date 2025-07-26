import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ExternalLink, RefreshCw } from "lucide-react";

interface Product {
  id: string;
  url: string;
  name: string;
  price?: string;
  inStock: boolean;
  lastChecked: string;
}

interface ProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
  onRefresh: (id: string) => void;
  isRefreshing?: boolean;
}

export const ProductCard = ({ product, onRemove, onRefresh, isRefreshing }: ProductCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
          <Badge 
            variant={product.inStock ? "default" : "destructive"}
            className={product.inStock ? "bg-success text-success-foreground" : ""}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        {product.price && (
          <p className="text-xl font-bold text-primary">{product.price}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Last checked: {product.lastChecked}</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRefresh(product.id)}
            disabled={isRefreshing}
            className="flex-1"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Check Now
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(product.url, '_blank')}
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Product
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemove(product.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};