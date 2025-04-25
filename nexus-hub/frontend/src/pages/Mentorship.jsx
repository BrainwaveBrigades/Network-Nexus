import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft,
  ChevronRight, 
  Search, 
  BookOpen,
  Clock, 
  User,
  Phone,
  Building,
  Calendar,
  Lightbulb,
  X,
  Filter,
  CheckCircle,
  Globe
} from 'lucide-react';
import { mentorshipService, applicationService } from '../services/api';

const Mentorship = () => {
  // State for mentorships data
  const [mentorships, setMentorships] = useState([]);
  const [filteredMentorships, setFilteredMentorships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    prn: '',
    department: '',
    studyYear: '',
    phone: '',
    justification: ''
  });
  const [validatePRN, setValidatePRN] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [departments, setDepartments] = useState(['All']);
  
  // Fetch mentorships from API
  const fetchMentorships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        department: departmentFilter,
        search: searchQuery
      };
      
      const response = await mentorshipService.getMentorships(currentPage, 3, filters);
      
      if (response.success) {
        setMentorships(response.data);
        setFilteredMentorships(response.data);
        setTotalPages(response.meta.pagination.pages);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch mentorships. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch departments for filter
  const fetchDepartments = async () => {
    try {
      const response = await mentorshipService.getDepartments();
      
      if (response.success) {
        setDepartments(['All', ...response.data]);
      }
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };
  
  // Initial data loading
  useEffect(() => {
    fetchDepartments();
  }, []);
  
  // Fetch mentorships when filters or pagination change
  useEffect(() => {
    fetchMentorships();
  }, [currentPage, departmentFilter, searchQuery]);
  
  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Handle department filter change
  const handleDepartmentChange = (department) => {
    setDepartmentFilter(department);
    setCurrentPage(1); // Reset to first page when department changes
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle apply click
  const handleApplyClick = (mentorship) => {
    setSelectedMentorship(mentorship);
    setFormSubmitted(false);
    setFormError(null);
    setFormData({
      fullName: '',
      prn: '',
      department: '',
      studyYear: '',
      phone: '',
      justification: ''
    });
    setValidatePRN(false);
    setIsModalOpen(true);
  };

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle PRN validation
  const handleValidatePRN = async () => {
    if (!formData.prn) {
      setFormError('Please enter a valid PRN');
      return;
    }
    
    try {
      setFormError(null);
      const response = await applicationService.validatePRN(formData.prn);
      
      if (response.success) {
        // Auto-fill student details
        setFormData(prev => ({
          ...prev,
          fullName: response.data.fullName,
          department: response.data.department,
          studyYear: response.data.studyYear,
          phone: response.data.phone
        }));
        setValidatePRN(true);
      } else {
        setFormError(response.message || 'Invalid PRN. Please check and try again.');
      }
    } catch (err) {
      setFormError('Failed to validate PRN. Please try again.');
      console.error(err);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePRN) {
      setFormError('Please validate your PRN first');
      return;
    }
    
    // Simple validation
    if (!formData.justification) {
      setFormError('Please explain why you want to join this mentorship program');
      return;
    }
    
    try {
      setFormError(null);
      
      const response = await applicationService.applyToMentorship(
        selectedMentorship.id, 
        {
          prn: formData.prn,
          justification: formData.justification
        }
      );
      
      if (response.success) {
        setFormSubmitted(true);
        // Refresh mentorships to update the counts
        fetchMentorships();
      } else {
        setFormError(response.message || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      setFormError('An error occurred while submitting your application.');
      console.error(err);
    }
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
            Mentorship Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Connect with experienced alumni who can guide you through your academic and career journey. Get personalized advice and support from professionals in your field of interest.
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
                placeholder="Search mentorship programs by keyword..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Department Filter */}
            <div className="flex-shrink-0">
              <div className="relative inline-block text-left w-full md:w-auto">
                <div className="flex items-center">
                  <Filter size={18} className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Department:</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {departments.map((department) => (
                    <button
                      key={department}
                      onClick={() => handleDepartmentChange(department)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        departmentFilter === department
                          ? 'bg-primary-color text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {department}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Mentorships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton Loaders
            Array.from({ length: 3 }).map((_, index) => (
              <MentorshipCardSkeleton key={index} />
            ))
          ) : filteredMentorships.length > 0 ? (
            // Mentorship Cards
            filteredMentorships.map((mentorship, index) => (
              <MentorshipCard 
                key={mentorship.id} 
                mentorship={mentorship} 
                delay={index}
                onApply={() => handleApplyClick(mentorship)}
                formatDate={formatDate}
              />
            ))
          ) : (
            // No results
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Lightbulb size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No mentorship programs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              {/* Previous/Left Button */}
              <button
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              
              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      currentPage === page
                        ? 'bg-primary-color text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              {/* Next/Right Button */}
              <button
                onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMentorship && (
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
                <h3 className="text-xl font-semibold text-gray-900">Apply for Mentorship</h3>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="px-6 py-4">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4"
                    >
                      <CheckCircle size={32} className="text-green-600" />
                    </motion.div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h4>
                    <p className="text-gray-600 mb-6">
                      Your application for "{selectedMentorship.title}" has been submitted successfully. 
                      The alumni mentor will review your application and contact you soon.
                    </p>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-primary-color text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg text-gray-900 mb-1">{selectedMentorship.title}</h4>
                      <p className="text-sm text-gray-600">Mentor: {selectedMentorship.fullName} • {selectedMentorship.jobPosition}</p>
                    </div>
                    
                    {formError && (
                      <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                        {formError}
                      </div>
                    )}
                    
                    <form onSubmit={handleFormSubmit}>
                      {/* PRN with Validation Button */}
                      <div className="mb-4">
                        <label htmlFor="prn" className="block text-sm font-medium text-gray-700 mb-1">
                          PRN (Permanent Registration Number) *
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            id="prn"
                            name="prn"
                            type="text"
                            value={formData.prn}
                            onChange={handleFormChange}
                            disabled={validatePRN}
                            className={`flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent ${
                              validatePRN ? 'bg-gray-100' : ''
                            }`}
                            required
                          />
                          <button
                            type="button"
                            disabled={validatePRN}
                            onClick={handleValidatePRN}
                            className={`px-3 py-2 rounded-md text-sm ${
                              validatePRN
                                ? 'bg-green-100 text-green-700'
                                : 'bg-primary-color text-white hover:bg-indigo-700'
                            }`}
                          >
                            {validatePRN ? 'Verified' : 'Verify'}
                          </button>
                        </div>
                        {validatePRN && (
                          <p className="text-xs text-green-600 mt-1">
                            PRN verified successfully
                          </p>
                        )}
                      </div>
                      
                      {/* Auto-filled fields (read-only after PRN validation) */}
                      <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          readOnly
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <input
                          id="department"
                          name="department"
                          type="text"
                          value={formData.department}
                          readOnly
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="studyYear" className="block text-sm font-medium text-gray-700 mb-1">
                          Study Year
                        </label>
                        <input
                          id="studyYear"
                          name="studyYear"
                          type="text"
                          value={formData.studyYear}
                          readOnly
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          readOnly
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                      </div>
                      
                      {/* Justification */}
                      <div className="mb-6">
                        <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-1">
                          Justification for Seeking Mentorship *
                        </label>
                        <textarea
                          id="justification"
                          name="justification"
                          rows={4}
                          value={formData.justification}
                          onChange={handleFormChange}
                          disabled={!validatePRN}
                          className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent ${
                            !validatePRN ? 'bg-gray-100' : ''
                          }`}
                          placeholder="Explain why you're interested in this mentorship program and what you hope to achieve..."
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!validatePRN}
                          className={`px-4 py-2 rounded-md ${
                            validatePRN
                              ? 'bg-primary-color text-white hover:bg-indigo-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          } transition-colors`}
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mentorship Card Component
const MentorshipCard = ({ mentorship, delay, onApply, formatDate }) => {
  // Generate DiceBear avatar URL based on fullName
  const avatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(mentorship.fullName)}`;
  
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
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-primary-color">
              Mentorship
            </span>
            <span className="text-xs text-gray-500">Date: {mentorship.date}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {mentorship.title}
          </h3>
          
          <div className="flex items-center text-gray-700 text-sm mb-3">
            <BookOpen size={15} className="mr-1 text-gray-500" />
            <span>{mentorship.department}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <User size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{mentorship.targetAudience}</span>
          </div>
          
          <div className="flex items-start">
            <Calendar size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">Study Year: {mentorship.studyYear}</span>
          </div>

          <div className="flex items-start">
            <CheckCircle size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">Applications: {mentorship.limit}</span>
          </div>

          <div className="flex items-start">
            <Globe size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">Mode: {mentorship.mode}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {mentorship.description}
        </p>
        
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img 
                src={avatarUrl}
                alt={mentorship.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40?text=Mentor";
                }}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{mentorship.fullName}</h4>
              <p className="text-xs text-gray-500">{mentorship.jobPosition} at {mentorship.companyName}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onApply}
          className="w-full py-2 px-4 bg-primary-color text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          Apply for Mentorship
        </button>
      </div>
    </motion.div>
  );
};

// Skeleton loader for mentorship cards
const MentorshipCardSkeleton = () => (
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

export default Mentorship;