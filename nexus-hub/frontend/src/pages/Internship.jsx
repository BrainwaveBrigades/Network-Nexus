import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  MapPin, 
  Clock, 
  User,
  Phone,
  Mail,
  Building,
  Calendar,
  Briefcase,
  X,
  Filter,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import axios from 'axios';

// API base URL - should come from environment variables in production
const API_URL = 'http://localhost:5002/api';

const Internship = () => {
  // State for internships data
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [locationFilter, setLocationFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  // Locations for filter (will be dynamically populated)
  const [locations, setLocations] = useState(['All']);

  // Calculate pagination
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const currentInternships = filteredInternships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fetch internships from API
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/internships`);
        
        // Extract unique locations for the filter
        const uniqueLocations = ['All', ...new Set(response.data.map(item => item.location || item.mode))];
        setLocations(uniqueLocations);
        
        setInternships(response.data);
        setFilteredInternships(response.data);
      } catch (err) {
        console.error('Error fetching internships:', err);
        setError('Failed to load internships. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Filter internships based on search query and location
  useEffect(() => {
    const results = internships.filter(internship => {
      const matchesSearch = 
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        internship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = locationFilter === 'All' || 
                              internship.location === locationFilter || 
                              internship.mode === locationFilter;
      
      return matchesSearch && matchesLocation;
    });
    
    setFilteredInternships(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, locationFilter, internships]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle location filter change
  const handleLocationChange = (location) => {
    setLocationFilter(location);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    // Handle different date formats (DD/MM/YYYY or ISO)
    let date;
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      date = new Date(`${year}-${month}-${day}`);
    } else {
      date = new Date(dateString);
    }
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Handle apply click
  const handleApplyClick = async (internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  // Handle application submission (redirect to Google Form)
  const handleRedirectToGoogleForm = async () => {
    try {
      if (!selectedInternship) return;
      
      // Track the application click (optional)
      const response = await axios.post(`${API_URL}/internships/${selectedInternship._id}/apply`);
      
      // Close the modal
      setIsModalOpen(false);
      
      // Redirect to the Google Form in a new tab
      window.open(selectedInternship.googleFormLink, '_blank');
    } catch (err) {
      console.error('Error handling application:', err);
      // Still try to redirect even if tracking fails
      if (selectedInternship && selectedInternship.googleFormLink) {
        window.open(selectedInternship.googleFormLink, '_blank');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
            Internship Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore internship opportunities posted by our alumni network. Gain real-world experience and jumpstart your career with these valuable opportunities.
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
                placeholder="Search internships by title, company, or keywords..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Location Filter */}
            <div className="flex-shrink-0">
              <div className="relative inline-block text-left w-full md:w-auto">
                <div className="flex items-center">
                  <Filter size={18} className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Location:</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleLocationChange(location)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        locationFilter === location
                          ? 'bg-primary-color text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton Loaders
            Array.from({ length: 6 }).map((_, index) => (
              <InternshipCardSkeleton key={index} />
            ))
          ) : currentInternships.length > 0 ? (
            // Internship Cards
            currentInternships.map((internship, index) => (
              <InternshipCard 
                key={internship._id} 
                internship={internship} 
                delay={index}
                onApply={() => handleApplyClick(internship)}
                formatDate={formatDate}
              />
            ))
          ) : (
            // No results
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Briefcase size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No internships found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2 max-w-full overflow-x-auto py-2 px-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
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

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && selectedInternship && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Apply for Internship</h3>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="px-6 py-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-lg text-gray-900 mb-1">{selectedInternship.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{selectedInternship.company} • {selectedInternship.location || selectedInternship.mode}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <Clock size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Duration: {selectedInternship.duration}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Deadline: {formatDate(selectedInternship.deadline)}</span>
                    </div>
                    
                    {selectedInternship.stipend && (
                      <div className="flex items-start">
                        <Building size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Stipend: {selectedInternship.stipend}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h5 className="font-medium text-gray-800 mb-2">About the Internship:</h5>
                    <p className="text-sm text-gray-600">{selectedInternship.description}</p>
                  </div>
                  
                  {selectedInternship.prerequisites && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-800 mb-2">Prerequisites:</h5>
                      <p className="text-sm text-gray-600">{selectedInternship.prerequisites}</p>
                    </div>
                  )}
                  
                  {selectedInternship.requiredSkills?.length > 0 && (
                    <div className="mb-6">
                      <h5 className="font-medium text-gray-800 mb-2">Required Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedInternship.requiredSkills.map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h5 className="font-medium text-blue-800 mb-2">Posted by:</h5>
                    <p className="text-sm text-gray-700">{selectedInternship.alumniName}</p>
                    <p className="text-sm text-gray-600">{selectedInternship.alumniPosition} at {selectedInternship.alumniCompany}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      To apply for this internship, you will be redirected to a Google Form where you can submit your application.
                    </p>
                    
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRedirectToGoogleForm}
                        className="px-4 py-2 bg-primary-color text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                      >
                        Apply Now
                        <ExternalLink size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Internship Card Component
const InternshipCard = ({ internship, delay, onApply, formatDate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all"
    >
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-primary-color">
              Internship
            </span>
            <span className="text-xs text-gray-500">Deadline: {formatDate(internship.deadline)}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {internship.title}
          </h3>
          
          <div className="flex items-center text-gray-700 text-sm mb-3">
            <Building size={15} className="mr-1 text-gray-500" />
            <span>{internship.company}</span>
          </div>

          {/* Required Skills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {internship.requiredSkills?.map((skill, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <MapPin size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{internship.location || internship.mode}</span>
          </div>
          
          <div className="flex items-start">
            <Clock size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{internship.duration} • {internship.stipend}</span>
          </div>

          {internship.limit && (
            <div className="flex items-start">
              <CheckCircle size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Positions: {internship.limit}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {internship.description}
        </p>
        
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(internship.alumniName)}`} alt={internship.alumniName}/>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{internship.alumniName}</h4>
              <p className="text-xs text-gray-500">{internship.alumniPosition}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onApply}
          className="w-full py-2 px-4 bg-primary-color text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
};

// Skeleton loader for internship cards
const InternshipCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md p-6">
    <div className="flex justify-between mb-4">
      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse"></div>
    </div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
    
    <div className="space-y-3 mb-4">
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/5 animate-pulse"></div>
    </div>
    
    <div className="space-y-2 mb-6">
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
    </div>
    
    <div className="border-t border-gray-100 pt-4 mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
    
    <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
  </div>
);

export default Internship;