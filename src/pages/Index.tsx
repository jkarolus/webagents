import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const [modalityFilter, setModalityFilter] = useState('all');
  const [strategyFilter, setStrategyFilter] = useState('all');
  const [multiLLMFilter, setMultiLLMFilter] = useState('all');
  const [benchmarkFilter, setBenchmarkFilter] = useState('all');
  const [venueFilter, setVenueFilter] = useState('all');
  const [modalitiesFinalFilter, setModalitiesFinalFilter] = useState('all');
  const [llmComplexityFinalFilter, setLlmComplexityFinalFilter] = useState('all');
  const [overallFinalFilter, setOverallFinalFilter] = useState('all');

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
      
      const matchesYear = yearFilter === 'all' || item.publicationYear === yearFilter;
      const matchesModel = modelFilter === 'all' || item.models.includes(modelFilter);
      const matchesModality = modalityFilter === 'all' || item.inputModality.includes(modalityFilter);
      const matchesStrategy = strategyFilter === 'all' || item.strategies.includes(strategyFilter);
      const matchesMultiLLM = multiLLMFilter === 'all' || item.multiLLM === multiLLMFilter;
      const matchesBenchmark = benchmarkFilter === 'all' || item.benchmarksUsed.includes(benchmarkFilter);
      const matchesVenue = venueFilter === 'all' || item.venue === venueFilter;
      const matchesModalitiesFinal = modalitiesFinalFilter === 'all' || item.modalitiesFinal === modalitiesFinalFilter;
      const matchesLlmComplexityFinal = llmComplexityFinalFilter === 'all' || item.llmComplexityFinal === llmComplexityFinalFilter;
      const matchesOverallFinal = overallFinalFilter === 'all' || item.overallFinal === overallFinalFilter;

      return matchesSearch && matchesYear && matchesModel && matchesModality && 
             matchesStrategy && matchesMultiLLM && matchesBenchmark && matchesVenue &&
             matchesModalitiesFinal && matchesLlmComplexityFinal && matchesOverallFinal;
    });
  }, [searchTerm, yearFilter, modelFilter, modalityFilter, strategyFilter, multiLLMFilter, 
      benchmarkFilter, venueFilter, modalitiesFinalFilter, llmComplexityFinalFilter, overallFinalFilter]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setYearFilter('all');
    setModelFilter('all');
    setModalityFilter('all');
    setStrategyFilter('all');
    setMultiLLMFilter('all');
    setBenchmarkFilter('all');
    setVenueFilter('all');
    setModalitiesFinalFilter('all');
    setLlmComplexityFinalFilter('all');
    setOverallFinalFilter('all');
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Web Agents Research Database</h1>
          <p className="text-lg text-gray-600">Discover and filter through cutting-edge web agent research papers</p>
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
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any year" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any year</SelectItem>
                  {uniqueYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <Select value={modelFilter} onValueChange={setModelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any model" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any model</SelectItem>
                  {uniqueModels.map(model => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Input Modality</label>
              <Select value={modalityFilter} onValueChange={setModalityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any modality" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any modality</SelectItem>
                  {uniqueModalities.map(modality => (
                    <SelectItem key={modality} value={modality}>{modality}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Strategy</label>
              <Select value={strategyFilter} onValueChange={setStrategyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any strategy" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any strategy</SelectItem>
                  {uniqueStrategies.map(strategy => (
                    <SelectItem key={strategy} value={strategy}>{strategy}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Multi-LLM</label>
              <Select value={multiLLMFilter} onValueChange={setMultiLLMFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="True">True</SelectItem>
                  <SelectItem value="False">False</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benchmark</label>
              <Select value={benchmarkFilter} onValueChange={setBenchmarkFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any benchmark" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any benchmark</SelectItem>
                  {uniqueBenchmarks.map(benchmark => (
                    <SelectItem key={benchmark} value={benchmark}>{benchmark}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
              <Select value={venueFilter} onValueChange={setVenueFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any venue" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any venue</SelectItem>
                  {uniqueVenues.map(venue => (
                    <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modalities Final</label>
              <Select value={modalitiesFinalFilter} onValueChange={setModalitiesFinalFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any rating</SelectItem>
                  {uniqueModalitiesFinal.map(rating => (
                    <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LLM Complexity Final</label>
              <Select value={llmComplexityFinalFilter} onValueChange={setLlmComplexityFinalFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any rating</SelectItem>
                  {uniqueLlmComplexityFinal.map(rating => (
                    <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Final</label>
              <Select value={overallFinalFilter} onValueChange={setOverallFinalFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Any rating</SelectItem>
                  {uniqueOverallFinal.map(rating => (
                    <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
