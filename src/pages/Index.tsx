
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";

// Mock data for LLM models
const models = [
  {
    id: "1",
    title: "GPT-4",
    description: "Most capable GPT model, great for complex tasks requiring nuanced understanding",
    category: "Text Generation",
    provider: "OpenAI",
    pricing: "Premium",
    tags: ["reasoning", "creative", "analysis"]
  },
  {
    id: "2", 
    title: "Claude 3.5 Sonnet",
    description: "Anthropic's most intelligent model with strong reasoning and coding capabilities",
    category: "Text Generation", 
    provider: "Anthropic",
    pricing: "Premium",
    tags: ["reasoning", "coding", "analysis"]
  },
  {
    id: "3",
    title: "Gemini Pro",
    description: "Google's advanced multimodal AI model for text and image understanding",
    category: "Multimodal",
    provider: "Google", 
    pricing: "Free",
    tags: ["multimodal", "vision", "reasoning"]
  },
  {
    id: "4",
    title: "Llama 2 70B",
    description: "Meta's open-source large language model, great for general tasks",
    category: "Text Generation",
    provider: "Meta",
    pricing: "Free", 
    tags: ["open-source", "general", "reasoning"]
  },
  {
    id: "5",
    title: "DALL-E 3",
    description: "OpenAI's latest image generation model with improved prompt adherence",
    category: "Image Generation",
    provider: "OpenAI",
    pricing: "Premium",
    tags: ["image", "creative", "art"]
  },
  {
    id: "6", 
    title: "Midjourney",
    description: "Popular AI art generator known for artistic and creative image generation",
    category: "Image Generation",
    provider: "Midjourney",
    pricing: "Premium", 
    tags: ["image", "artistic", "creative"]
  },
  {
    id: "7",
    title: "Stable Diffusion XL",
    description: "Open-source image generation model with high-quality output",
    category: "Image Generation", 
    provider: "Stability AI",
    pricing: "Free",
    tags: ["image", "open-source", "customizable"]
  },
  {
    id: "8",
    title: "Whisper",
    description: "OpenAI's speech recognition model with high accuracy across languages",
    category: "Audio",
    provider: "OpenAI", 
    pricing: "Free",
    tags: ["audio", "transcription", "multilingual"]
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");

  // Get unique values for filters
  const categories = useMemo(() => [...new Set(models.map(model => model.category))], []);
  const providers = useMemo(() => [...new Set(models.map(model => model.provider))], []);
  const pricingOptions = useMemo(() => [...new Set(models.map(model => model.pricing))], []);

  // Filter models based on search and filters
  const filteredModels = useMemo(() => {
    return models.filter(model => {
      // Add null/undefined checks and ensure title is a string
      const title = model.title || "";
      const description = model.description || "";
      const category = model.category || "";
      const provider = model.provider || "";
      const pricing = model.pricing || "";
      
      // Search term matching with proper string conversion
      const matchesSearch = searchTerm === "" || 
        (typeof title === 'string' && title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof description === 'string' && description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter matching
      const matchesCategory = selectedCategory === "all" || category === selectedCategory;
      const matchesProvider = selectedProvider === "all" || provider === selectedProvider;
      const matchesPricing = selectedPricing === "all" || pricing === selectedPricing;

      return matchesSearch && matchesCategory && matchesProvider && matchesPricing;
    });
  }, [searchTerm, selectedCategory, selectedProvider, selectedPricing]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedProvider("all");
    setSelectedPricing("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            LLM Model Directory
          </h1>
          <p className="text-lg text-gray-600">
            Discover and compare the latest AI language models
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-gray-500" />
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  {providers.map(provider => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPricing} onValueChange={setSelectedPricing}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pricing</SelectItem>
                  {pricingOptions.map(pricing => (
                    <SelectItem key={pricing} value={pricing}>
                      {pricing}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredModels.length} of {models.length} models
          </p>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <Card key={model.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{model.title}</CardTitle>
                  <Badge variant={model.pricing === "Free" ? "secondary" : "default"}>
                    {model.pricing}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {model.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium">{model.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Provider:</span>
                    <span className="font-medium">{model.provider}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {model.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No models found matching your criteria.</p>
            <Button onClick={clearFilters} className="mt-4">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
