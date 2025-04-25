const mongoose = require('mongoose');
const Details = require('../models/Details');

const getHallOfFame = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 6, 
      department = 'All', 
      search = '',
      hallOfFameStatus = 'all'
    } = req.query;

    // Base query - ensure we only get alumni with hallOfFame status
    const query = {
      hallOfFame: { $exists: true, $ne: '' }
    };

    // Department filter
    if (department && department !== 'All') {
      query.department = department.toUpperCase();
    }

    // Search filter
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { jobPosition: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { specialAchievements: { $regex: search, $options: 'i' } }
      ];
    }

    // Hall of Fame status filter
    if (hallOfFameStatus && hallOfFameStatus !== 'all') {
      query.hallOfFame = hallOfFameStatus;
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      select: 'fullName department passOutYear jobPosition companyName hallOfFame specialAchievements profilePhoto',
      sort: { 
        // Sort featured alumni first, then by passOutYear
        hallOfFame: -1, // 'featured' comes before 'notable' in alphabetical sort
        passOutYear: -1 
      },
      lean: true
    };

    const result = await Details.paginate(query, options);

    // Ensure we always return the requested number of items per page
    // by making additional queries if needed
    if (result.docs.length < options.limit && result.totalDocs > options.limit) {
      const additionalNeeded = options.limit - result.docs.length;
      const additionalQuery = { ...query, _id: { $nin: result.docs.map(doc => doc._id) } };
      
      const additionalResults = await Details.find(additionalQuery)
        .select(options.select)
        .sort(options.sort)
        .limit(additionalNeeded)
        .lean();
      
      result.docs = [...result.docs, ...additionalResults];
    }

    const response = {
      alumni: result.docs,
      pagination: {
        totalItems: result.totalDocs,
        totalPages: Math.ceil(result.totalDocs / options.limit),
        currentPage: result.page,
        itemsPerPage: result.limit,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching Hall of Fame:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch Hall of Fame data',
      error: error.message 
    });
  }
};

module.exports = { getHallOfFame };
