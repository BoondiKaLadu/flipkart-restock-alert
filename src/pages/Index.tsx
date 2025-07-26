import { useState } from "react";
import { ProductUrlInput } from "@/components/ProductUrlInput";
import { ProductCard } from "@/components/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  url: string;
  name: string;
  price?: string;
  inStock: boolean;
  lastChecked: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  const { toast } = useToast();

  const extractProductName = (url: string): string => {
    try {
      const urlParts = url.split('/');
      const productPart = urlParts.find(part => part.includes('-p-'));
      if (productPart) {
        return productPart.split('-p-')[0].replace(/-/g, ' ');
      }
      return "Flipkart Product";
    } catch {
      return "Flipkart Product";
    }
  };

  const addProduct = (url: string) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      url,
      name: extractProductName(url),
      inStock: false, // Default to out of stock
      lastChecked: new Date().toLocaleString(),
    };
    
    setProducts(prev => [...prev, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Product Removed",
      description: "Product removed from watchlist",
    });
  };

  const refreshProduct = async (id: string) => {
    setRefreshingId(id);
    
    // Simulate API call
    setTimeout(() => {
      setProducts(prev => prev.map(p => 
        p.id === id 
          ? { 
              ...p, 
              lastChecked: new Date().toLocaleString(),
              inStock: Math.random() > 0.7 // Random stock status for demo
            }
          : p
      ));
      setRefreshingId(null);
      
      const product = products.find(p => p.id === id);
      if (product) {
        toast({
          title: "Stock Check Complete",
          description: `${product.name} is ${Math.random() > 0.7 ? 'in stock' : 'still out of stock'}`,
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Bell className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Flipkart Stock Notifier</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get notified instantly when your desired products come back in stock on Flipkart
          </p>
        </div>

        {/* Add Product Form */}
        <div className="flex justify-center">
          <ProductUrlInput onAddProduct={addProduct} />
        </div>

        {/* Products List */}
        {products.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Watching {products.length} Product{products.length !== 1 ? 's' : ''}</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRemove={removeProduct}
                  onRefresh={refreshProduct}
                  isRefreshing={refreshingId === product.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">No Products Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Add your first Flipkart product URL above to start getting stock notifications!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;