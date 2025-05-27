
import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, BookOpen, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const data = [
  {
    title: "A Zero-Shot Language Agent",
    authors: "Li, Tao; Li, Gang; Deng, Zhiwei; Wang, Bryan; Li, Yang",
    publicationYear: "2023",
    models: ["FLAN-PaLM2 L"],
    inputModality: ["HTML"],
    strategies: ["staged planning", "structured self reflection"],
    multiLLM: "False",
    benchmarksUsed: ["MINIWOB++"],
    modalitiesFinal: "+",
    llmComplexityFinal: "+",
    overallFinal: "+",
    venue: "EMNLP",
    doi: "http://arxiv.org/abs/2305.16653"
  },
  {
    title: "AdaPlanner",
    authors: "Li, Tao; Li, Gang; Deng, Zhiwei; Wang, Bryan; Li, Yang",
    publicationYear: "2023",
    models: ["GPT-3.5", "text-davinci-003"],
    inputModality: ["HTML", "other"],
    strategies: ["self-refinement"],
    multiLLM: "True",
    benchmarksUsed: ["MiniWoB++"],
    modalitiesFinal: "0",
    llmComplexityFinal: "-",
    overallFinal: "0",
    venue: "arxiv",
    doi: "http://arxiv.org/abs/2305.16653"
  }
];

// Multi-select component
const MultiSelect = ({ 
  options, 
  selected, 
  onSelectionChange, 
  placeholder 
}: { 
  options: string[], 
  selected: string[], 
  onSelectionChange: (values: string[]) => void, 
  placeholder: string 
}) => {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter(item => item !== value));
    } else {
      onSelectionChange([...selected, value]);
    }
  };

  const removeItem = (value: string) => {
    onSelectionChange(selected.filter(item => item !== value));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {selected.map(item => (
                <Badge key={item} variant="secondary" className="text-xs">
                  {item}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item);
                    }}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2 bg-white border border-gray-200 shadow-lg z-50">
        <div className="space-y-2 max-h-60 overflow-auto">
          {options.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={selected.includes(option)}
                onCheckedChange={() => handleToggle(option)}
              />
              <label 
                htmlFor={option} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<string[]>([]);
  const [modelFilter, setModelFilter] = useState<string[]>([]);
  const [modalityFilter, setModalityFilter] = useState<string[]>([]);
  const [strategyFilter, setStrategyFilter] = useState<string[]>([]);
  const [multiLLMFilter, setMultiLLMFilter] = useState<string[]>([]);
  const [benchmarkFilter, setBenchmarkFilter] = useState<string[]>([]);
  const [venueFilter, setVenueFilter] = useState<string[]>([]);
  const [modalitiesFinalFilter, setModalitiesFinalFilter] = useState<string[]>([]);
  const [llmComplexityFinalFilter, setLlmComplexityFinalFilter] = useState<string[]>([]);
  const [overallFinalFilter, setOverallFinalFilter] = useState<string[]>([]);

  // Extract unique values for filter options
  const uniqueYears = [...new Set(data.map(item => item.publicationYear))].sort();
  const uniqueModels = [...new Set(data.flatMap(item => item.models))].sort();
  const uniqueModalities = [...new Set(data.flatMap(item => item.inputModality))].sort();
  const uniqueStrategies = [...new Set(data.flatMap(item => item.strategies))].sort();
  const uniqueBenchmarks = [...new Set(data.flatMap(item => item.benchmarksUsed))].sort();
  const uniqueVenues = [...new Set(data.map(item => item.venue))].sort();
  const uniqueModalitiesFinal = [...new Set(data.map(item => item.modalitiesFinal))].sort();
  const uniqueLlmComplexityFinal = [...new Set(data.map(item => item.llmComplexityFinal))].sort();
  const uniqueOverallFinal = [...new Set(data.map(item => item.overallFinal))].sort();

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.authors.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = yearFilter.length === 0 || yearFilter.includes(item.publicationYear);
      const matchesModel = modelFilter.length === 0 || modelFilter.some(model => item.models.includes(model));
      const matchesModality = modalityFilter.length === 0 || modalityFilter.some(modality => item.inputModality.includes(modality));
      const matchesStrategy = strategyFilter.length === 0 || strategyFilter.some(strategy => item.strategies.includes(strategy));
      const matchesMultiLLM = multiLLMFilter.length === 0 || multiLLMFilter.includes(item.multiLLM);
      const matchesBenchmark = benchmarkFilter.length === 0 || benchmarkFilter.some(benchmark => item.benchmarksUsed.includes(benchmark));
      const matchesVenue = venueFilter.length === 0 || venueFilter.includes(item.venue);
      const matchesModalitiesFinal = modalitiesFinalFilter.length === 0 || modalitiesFinalFilter.includes(item.modalitiesFinal);
      const matchesLlmComplexityFinal = llmComplexityFinalFilter.length === 0 || llmComplexityFinalFilter.includes(item.llmComplexityFinal);
      const matchesOverallFinal = overallFinalFilter.length === 0 || overallFinalFilter.includes(item.overallFinal);

      return matchesSearch && matchesYear && matchesModel && matchesModality && 
             matchesStrategy && matchesMultiLLM && matchesBenchmark && matchesVenue &&
             matchesModalitiesFinal && matchesLlmComplexityFinal && matchesOverallFinal;
    });
  }, [searchTerm, yearFilter, modelFilter, modalityFilter, strategyFilter, multiLLMFilter, 
      benchmarkFilter, venueFilter, modalitiesFinalFilter, llmComplexityFinalFilter, overallFinalFilter]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setYearFilter([]);
    setModelFilter([]);
    setModalityFilter([]);
    setStrategyFilter([]);
    setMultiLLMFilter([]);
    setBenchmarkFilter([]);
    setVenueFilter([]);
    setModalitiesFinalFilter([]);
    setLlmComplexityFinalFilter([]);
    setOverallFinalFilter([]);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case '+': return 'bg-green-100 text-green-800 border-green-200';
      case '0': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '-': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Web Agents Database</h1>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <button 
              onClick={clearAllFilters}
              className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by title or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
              <MultiSelect
                options={uniqueYears}
                selected={yearFilter}
                onSelectionChange={setYearFilter}
                placeholder="Select years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <MultiSelect
                options={uniqueModels}
                selected={modelFilter}
                onSelectionChange={setModelFilter}
                placeholder="Select models"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Input Modality</label>
              <MultiSelect
                options={uniqueModalities}
                selected={modalityFilter}
                onSelectionChange={setModalityFilter}
                placeholder="Select modalities"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Strategy</label>
              <MultiSelect
                options={uniqueStrategies}
                selected={strategyFilter}
                onSelectionChange={setStrategyFilter}
                placeholder="Select strategies"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Multi-LLM</label>
              <MultiSelect
                options={["True", "False"]}
                selected={multiLLMFilter}
                onSelectionChange={setMultiLLMFilter}
                placeholder="Select multi-LLM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benchmark</label>
              <MultiSelect
                options={uniqueBenchmarks}
                selected={benchmarkFilter}
                onSelectionChange={setBenchmarkFilter}
                placeholder="Select benchmarks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
              <MultiSelect
                options={uniqueVenues}
                selected={venueFilter}
                onSelectionChange={setVenueFilter}
                placeholder="Select venues"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modalities Final</label>
              <MultiSelect
                options={uniqueModalitiesFinal}
                selected={modalitiesFinalFilter}
                onSelectionChange={setModalitiesFinalFilter}
                placeholder="Select ratings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LLM Complexity Final</label>
              <MultiSelect
                options={uniqueLlmComplexityFinal}
                selected={llmComplexityFinalFilter}
                onSelectionChange={setLlmComplexityFinalFilter}
                placeholder="Select ratings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Final</label>
              <MultiSelect
                options={uniqueOverallFinal}
                selected={overallFinalFilter}
                onSelectionChange={setOverallFinalFilter}
                placeholder="Select ratings"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Results ({filteredData.length} of {data.length})
          </h3>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6">
          {filteredData.map((item, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900 mb-2">{item.title}</CardTitle>
                    <p className="text-sm text-gray-600 mb-3">{item.authors}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.publicationYear}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {item.venue}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getRatingColor(item.modalitiesFinal)} border`}>
                      Mod: {item.modalitiesFinal}
                    </Badge>
                    <Badge className={`${getRatingColor(item.llmComplexityFinal)} border`}>
                      LLM: {item.llmComplexityFinal}
                    </Badge>
                    <Badge className={`${getRatingColor(item.overallFinal)} border`}>
                      Overall: {item.overallFinal}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Models</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.models.map((model, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{model}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Input Modalities</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.inputModality.map((modality, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{modality}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Strategies</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.strategies.map((strategy, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">{strategy}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Benchmarks</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.benchmarksUsed.map((benchmark, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">{benchmark}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Multi-LLM</h4>
                    <Badge variant={item.multiLLM === "True" ? "default" : "secondary"} className="text-xs">
                      {item.multiLLM}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">DOI</h4>
                    <a 
                      href={item.doi} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-xs underline"
                    >
                      View Paper
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
