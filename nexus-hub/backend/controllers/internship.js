const Internship = require('../models/Internship');

// Get all approved internships
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ isApproved: true, isMarkAsComplete: false });
    res.status(200).json(internships);
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single internship by ID
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.status(200).json(internship);
  } catch (error) {
    console.error('Error fetching internship:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search internships by query parameters
exports.searchInternships = async (req, res) => {
  try {
    const { query, location } = req.query;
    let searchQuery = { isApproved: true, isMarkAsComplete: false };
    
    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (location && location !== 'All') {
      searchQuery.location = location;
    }
    
    const internships = await Internship.find(searchQuery);
    res.status(200).json(internships);
  } catch (error) {
    console.error('Error searching internships:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Track when a student clicks to apply (optional analytics)
exports.trackApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findById(id);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    
    // Return the Google Form link for redirection
    res.status(200).json({ 
      googleFormLink: internship.googleFormLink,
      title: internship.title,
      company: internship.company
    });
  } catch (error) {
    console.error('Error tracking application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};