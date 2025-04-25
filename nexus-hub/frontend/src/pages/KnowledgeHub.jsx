import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  FileText, 
  Download, 
  Clock, 
  BookOpen, 
  User, 
  Filter 
} from 'lucide-react';

const KnowledgeHub = () => {
  // State for resources data
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock categories
  const categories = ['All', 'Notes', 'Papers', 'Projects', 'Research', 'Books'];

  // Mock departments
  const departments = ['All', 'CSE', 'AIML', 'ENTC', 'MECH', 'CIVIL'];

  // Calculate pagination
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const currentResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fetch resources from API/MongoDB (mocked for now)
  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchResources = async () => {
      try {
        // Mock data for demonstration
        const mockData = [
          {
            id: 1,
            title: 'Data Structures and Algorithms Notes',
            description: 'Comprehensive notes covering all DSA topics from basic to advanced',
            uploadedBy: 'Priya Sharma',
            uploadDate: '2023-11-15',
            category: 'Notes',
            department: 'CSE',
            fileSize: '2.4 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 2,
            title: 'Machine Learning Project Report',
            description: 'Final year project on predictive analysis using ML algorithms',
            uploadedBy: 'Rahul Patel',
            uploadDate: '2023-10-05',
            category: 'Projects',
            department: 'AIML',
            fileSize: '5.7 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 3,
            title: 'Previous Year Question Papers (2018-2022)',
            description: 'Collection of last 5 years question papers for Computer Science',
            uploadedBy: 'Amit Verma',
            uploadDate: '2023-09-20',
            category: 'Papers',
            department: 'CSE',
            fileSize: '8.3 MB',
            fileType: 'ZIP',
            downloadUrl: '#',
          },
          {
            id: 4,
            title: 'Web Development Frameworks Comparison',
            description: 'An analysis of popular frameworks like React, Angular and Vue',
            uploadedBy: 'Neha Gupta',
            uploadDate: '2023-08-15',
            category: 'Research',
            department: 'CSE',
            fileSize: '1.2 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 5,
            title: 'Introduction to Cloud Computing',
            description: 'A beginner\'s guide to understanding cloud services and deployment',
            uploadedBy: 'Sanjay Kumar',
            uploadDate: '2023-07-10',
            category: 'Notes',
            department: 'CSE',
            fileSize: '3.1 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 6,
            title: 'Artificial Intelligence: Concepts and Applications',
            description: 'Comprehensive book covering AI fundamentals and real-world applications',
            uploadedBy: 'Dr. Rajesh Singh',
            uploadDate: '2023-06-25',
            category: 'Books',
            department: 'AIML',
            fileSize: '12.5 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 7,
            title: 'Digital Signal Processing Notes',
            description: 'Detailed notes on DSP concepts and applications',
            uploadedBy: 'Vikram Reddy',
            uploadDate: '2023-05-15',
            category: 'Notes',
            department: 'ENTC',
            fileSize: '4.2 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 8,
            title: 'Thermodynamics Study Material',
            description: 'Complete study material for thermodynamics course',
            uploadedBy: 'Anjali Mehta',
            uploadDate: '2023-04-20',
            category: 'Notes',
            department: 'MECH',
            fileSize: '3.8 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 9,
            title: 'Structural Analysis Research Paper',
            description: 'Advanced research on structural analysis methods',
            uploadedBy: 'Rohan Desai',
            uploadDate: '2023-03-10',
            category: 'Research',
            department: 'CIVIL',
            fileSize: '2.9 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 10,
            title: 'Machine Design Project Report',
            description: 'Final year project on machine design optimization',
            uploadedBy: 'Karthik Nair',
            uploadDate: '2023-02-05',
            category: 'Projects',
            department: 'MECH',
            fileSize: '6.1 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 11,
            title: 'Computer Networks Lab Manual',
            description: 'Complete lab manual for computer networks course',
            uploadedBy: 'Sneha Patel',
            uploadDate: '2023-01-15',
            category: 'Notes',
            department: 'CSE',
            fileSize: '3.5 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 12,
            title: 'Embedded Systems Project',
            description: 'IoT based home automation system project report',
            uploadedBy: 'Arjun Sharma',
            uploadDate: '2022-12-20',
            category: 'Projects',
            department: 'ENTC',
            fileSize: '4.8 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 13,
            title: 'Environmental Engineering Notes',
            description: 'Comprehensive notes on environmental engineering concepts',
            uploadedBy: 'Priya Reddy',
            uploadDate: '2022-11-10',
            category: 'Notes',
            department: 'CIVIL',
            fileSize: '3.2 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 14,
            title: 'Deep Learning Research Paper',
            description: 'Advanced research on deep learning architectures',
            uploadedBy: 'Dr. Amit Kumar',
            uploadDate: '2022-10-05',
            category: 'Research',
            department: 'AIML',
            fileSize: '2.7 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          },
          {
            id: 15,
            title: 'Construction Management Book',
            description: 'Complete guide to modern construction management practices',
            uploadedBy: 'Prof. Rajesh Verma',
            uploadDate: '2022-09-15',
            category: 'Books',
            department: 'CIVIL',
            fileSize: '9.3 MB',
            fileType: 'PDF',
            downloadUrl: '#',
          }
        ];
        
        // Simulating network delay
        setTimeout(() => {
          setResources(mockData);
          setFilteredResources(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filter resources based on search query and category
  useEffect(() => {
    const results = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredResources(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, resources]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header with Back Button */}
      <div className="pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-color hover:text-indigo-700 transition-colors mb-6"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span>Back to Home</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-near-black mb-4">
            Knowledge Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Access valuable resources shared by alumni to enhance your learning experience and academic journey.
          </p>
        </motion.div>
      </div>
      
      {/* Main Content */}
      <main className="px-4 md:px-8 lg:px-16 pb-16 max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for resources..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex-shrink-0">
              <div className="relative inline-block text-left w-full md:w-auto">
                <div className="flex items-center">
                  <Filter size={18} className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Filter by:</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category
                          ? 'bg-primary-color text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton Loaders
            Array.from({ length: 6 }).map((_, index) => (
              <ResourceCardSkeleton key={index} />
            ))
          ) : currentResources.length > 0 ? (
            // Resource Cards
            currentResources.map((resource, index) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                delay={index} 
              />
            ))
          ) : (
            // No results
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <BookOpen size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === page
                      ? 'bg-primary-color text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Resource Card Component (integrated directly into the page)
const ResourceCard = ({ resource, delay }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all"
    >
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-primary-color">
            {resource.category}
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-xs text-gray-500">{resource.department}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-xs text-gray-500">{resource.fileType} • {resource.fileSize}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {resource.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <User size={14} className="mr-1" />
            <span>{resource.uploadedBy}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>{formatDate(resource.uploadDate)}</span>
          </div>
        </div>
        
        <a 
          href={resource.downloadUrl} 
          className="mt-4 inline-flex w-full items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-color hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color transition-colors"
        >
          <Download size={16} className="mr-2" />
          Download Resource
        </a>
      </div>
    </motion.div>
  );
};

// Skeleton loader for resource cards
const ResourceCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md">
    <div className="p-5">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
    </div>
  </div>
);

export default KnowledgeHub; 