import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  Calendar,
  Clock, 
  MapPin,
  Tag,
  Users,
  ChevronDown,
  Filter,
  CheckCircle,
  X
} from 'lucide-react';

const Events = () => {
  // State for events data
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('All');

  // Mock event types for filter
  const eventTypes = ['All', 'Workshop', 'Webinar', 'Conference', 'Meetup', 'Hackathon'];

  // Fetch events from API/MongoDB (mocked for now)
  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchEvents = async () => {
      try {
        // In a real app, this would be a fetch call to your MongoDB backend
        // const response = await fetch('/api/events');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = [
          {
            id: 1,
            title: 'Web Development Workshop',
            description: 'Learn modern web development techniques with React and Node.js. Build a full-stack application from scratch and deploy it to the cloud.',
            date: '2023-06-15',
            time: '10:00 AM - 4:00 PM',
            location: 'College Auditorium',
            type: 'Workshop',
            capacity: 50,
            registered: 32,
            organizer: {
              name: 'Vikram Shah',
              role: 'Senior Developer at Microsoft',
              contact: 'vikram.s@gmail.com',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952'
          },
          {
            id: 2,
            title: 'AI in Healthcare Webinar',
            description: 'Discover how artificial intelligence is transforming healthcare. Learn about real-world applications, current research, and future prospects.',
            date: '2023-06-22',
            time: '6:00 PM - 8:00 PM',
            location: 'Online (Zoom)',
            type: 'Webinar',
            capacity: 200,
            registered: 125,
            organizer: {
              name: 'Dr. Priya Mehta',
              role: 'AI Researcher at IBM',
              contact: 'priya.m@outlook.com',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef'
          },
          {
            id: 3,
            title: 'Annual Engineering Conference',
            description: 'Join us for the annual engineering conference featuring keynote speakers from top tech companies, research presentations, and networking opportunities.',
            date: '2023-07-10',
            time: '9:00 AM - 6:00 PM',
            location: 'Grand Hotel Convention Center',
            type: 'Conference',
            capacity: 300,
            registered: 210,
            organizer: {
              name: 'Dr. Rajesh Kumar',
              role: 'Head of Engineering Department',
              contact: 'rajesh.k@university.edu',
              avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
            },
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
          },
          {
            id: 4,
            title: 'Alumni Networking Meetup',
            description: 'Connect with fellow alumni in an informal setting. Share experiences, exchange ideas, and build valuable professional connections.',
            date: '2023-06-30',
            time: '7:00 PM - 10:00 PM',
            location: 'Café Connections',
            type: 'Meetup',
            capacity: 40,
            registered: 28,
            organizer: {
              name: 'Anjali Desai',
              role: 'Alumni Association President',
              contact: 'anjali.d@gmail.com',
              avatar: 'https://randomuser.me/api/portraits/women/36.jpg'
            },
            image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269'
          },
          {
            id: 5,
            title: 'Hack for Innovation 2023',
            description: 'A 24-hour hackathon to develop innovative solutions for real-world problems. Work in teams, present your ideas, and compete for exciting prizes!',
            date: '2023-07-22',
            time: 'Starts 9:00 AM (24 hours)',
            location: 'Engineering Building',
            type: 'Hackathon',
            capacity: 100,
            registered: 86,
            organizer: {
              name: 'Rahul Verma',
              role: 'CTO at TechSolutions',
              contact: 'rahul.v@techsolutions.com',
              avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
            },
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'
          },
          {
            id: 6,
            title: 'Mobile App Development Workshop',
            description: 'Hands-on workshop on building cross-platform mobile applications using Flutter. Learn UI design, state management, and deployment strategies.',
            date: '2023-07-05',
            time: '11:00 AM - 5:00 PM',
            location: 'Computer Lab 3',
            type: 'Workshop',
            capacity: 30,
            registered: 17,
            organizer: {
              name: 'Neha Sharma',
              role: 'Mobile Developer at Google',
              contact: 'neha.s@gmail.com',
              avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
            },
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692'
          }
        ];
        
        // Simulating network delay
        setTimeout(() => {
          setEvents(mockData);
          setFilteredEvents(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search query and type
  useEffect(() => {
    const results = events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'All' || event.type === typeFilter;
      
      return matchesSearch && matchesType;
    });
    
    setFilteredEvents(results);
  }, [searchQuery, typeFilter, events]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (type) => {
    setTypeFilter(type);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle register click
  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setFormSubmitted(false);
    setFormError(null);
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

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // In a real app, this would be a fetch call to your MongoDB backend
    // const response = await fetch('/api/event-registrations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     eventId: selectedEvent.id,
    //     ...formData
    //   })
    // });
    
    // Simulate successful submission
    setTimeout(() => {
      setFormSubmitted(true);
      // Reset form data
      setFormData({
        fullName: '',
        email: '',
        phone: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
            Events and Workshops
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover upcoming events, workshops, and webinars organized by our alumni network. Enhance your skills, expand your knowledge, and connect with industry professionals.
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
                placeholder="Search events by title, description or location..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Type Filter */}
            <div className="flex-shrink-0">
              <div className="relative inline-block text-left w-full md:w-auto">
                <div className="flex items-center">
                  <Filter size={18} className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Event Type:</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        typeFilter === type
                          ? 'bg-primary-color text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton Loaders
            Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))
          ) : filteredEvents.length > 0 ? (
            // Event Cards
            filteredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                delay={index}
                onRegister={() => handleRegisterClick(event)}
                formatDate={formatDate}
              />
            ))
          ) : (
            // No results
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Calendar size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
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
                <h3 className="text-xl font-semibold text-gray-900">Register for Event</h3>
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
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Registration Successful!</h4>
                    <p className="text-gray-600 mb-6">
                      You have successfully registered for "{selectedEvent.title}". 
                      We'll send you a confirmation email with all the details.
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
                      <h4 className="font-semibold text-lg text-gray-900 mb-1">{selectedEvent.title}</h4>
                      <p className="text-sm text-gray-600">{formatDate(selectedEvent.date)} • {selectedEvent.time}</p>
                      <p className="text-sm text-gray-600 mt-1">{selectedEvent.location}</p>
                    </div>
                    
                    {formError && (
                      <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                        {formError}
                      </div>
                    )}
                    
                    <form onSubmit={handleFormSubmit}>
                      {/* Full Name */}
                      <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                          required
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                          required
                        />
                      </div>
                      
                      {/* Phone */}
                      <div className="mb-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
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
                          className="px-4 py-2 bg-primary-color text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Confirm Registration
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

// Event Card Component (integrated directly into the page)
const EventCard = ({ event, delay, onRegister, formatDate }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col"
    >
      {/* Event Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={`${event.image}?q=80&w=800&auto=format&fit=crop`}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/800x400?text=${event.type}`;
          }}
        />
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-primary-color">
              <Tag size={12} className="mr-1" />
              {event.type}
            </span>
            <span className="text-xs text-gray-500 flex items-center">
              <Users size={14} className="mr-1" />
              {event.registered}/{event.capacity}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <Calendar size={14} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-start">
              <Clock size={14} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{event.time}</span>
            </div>
            
            <div className="flex items-start">
              <MapPin size={14} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{event.location}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4 flex-grow">
          <p className={`text-gray-600 text-sm ${expanded ? '' : 'line-clamp-3'}`}>
            {event.description}
          </p>
          {event.description.length > 150 && (
            <button 
              onClick={toggleExpand} 
              className="text-primary-color hover:text-indigo-700 text-sm mt-1 flex items-center transition-colors"
            >
              {expanded ? 'Show less' : 'Read more'}
              <ChevronDown size={14} className={`ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
        
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
              <img 
                src={event.organizer.avatar} 
                alt={event.organizer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/32?text=Organizer";
                }}
              />
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-900">{event.organizer.name}</h4>
              <p className="text-xs text-gray-500">{event.organizer.role}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onRegister}
          className="w-full py-2 px-4 bg-primary-color text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
          disabled={event.registered >= event.capacity}
        >
          {event.registered >= event.capacity ? 'Event Full' : 'Register Now'}
        </button>
      </div>
    </motion.div>
  );
};

// Skeleton loader for event cards
const EventCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md">
    <div className="h-48 bg-gray-200 animate-pulse"></div>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      
      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/5 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>
      
      <div className="border-t border-gray-100 pt-4 mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
          <div>
            <div className="h-3 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
    </div>
  </div>
);

export default Events; 