import React, { useState, useEffect } from "react";
// import "../MyStudingStyles/AllCourses.css";
import { IoSearch } from "react-icons/io5";
import "../MyStudingStyles/MyStuding.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Img1 from "../assets/MyList/Img1.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import ReminderModal from "./ReminderModel";
import { FaRegClock } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useLocation, Link, useNavigate } from "react-router-dom";
import api from "../lib/api";


const MyStudying = () => {
  const [search, setSearch] = useState("");
  //! this usestate is for the active item in the sidebar
  const [activeItem, setActiveItem] = useState("All Courses");

  const [showModal, setShowModal] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [time, setTime] = useState(0); // seconds
  const [running, setRunning] = useState(false);

  // API data states
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [progressData, setProgressData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  
  // My Lists states
  const [customLists, setCustomLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [showAddToListMenu, setShowAddToListMenu] = useState(null); // courseId for which menu is open
  
  // Archived courses state (stored in localStorage)
  const [archivedCourseIds, setArchivedCourseIds] = useState([]);

  const location = useLocation(); // 👈 get state
  const navigate = useNavigate(); 

  // Load reminders from localStorage on mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('learningReminders');
    if (savedReminders) {
      try {
        const parsed = JSON.parse(savedReminders);
        setReminders(parsed);
      } catch (e) {
        console.error('Error loading reminders:', e);
        setReminders([]);
      }
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    if (reminders.length >= 0) {
      localStorage.setItem('learningReminders', JSON.stringify(reminders));
    }
  }, [reminders]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  // useEffect(() => {
  //   let interval;
  //   if (running) {
  //     interval = setInterval(() => {
  //       setTime((prev) => prev + 1);
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [running]);

  // // Helper function to normalize course ID (handle both string and object IDs)
  const normalizeCourseId = (courseId) => {
    if (!courseId) return null;
    return courseId.toString();
  };

  // Load custom lists from localStorage on mount
  useEffect(() => {
    const savedLists = localStorage.getItem('myCustomLists');
    if (savedLists) {
      try {
        const parsed = JSON.parse(savedLists);
        // Normalize all course IDs in lists
        const normalizedLists = parsed.map(list => ({
          ...list,
          courseIds: list.courseIds.map(id => normalizeCourseId(id)).filter(Boolean)
        }));
        setCustomLists(normalizedLists);
      } catch (e) {
        console.error('Error loading custom lists:', e);
        setCustomLists([]);
      }
    }
  }, []);

  // Save custom lists to localStorage whenever they change
  useEffect(() => {
    if (customLists.length >= 0) {
      localStorage.setItem('myCustomLists', JSON.stringify(customLists));
    }
  }, [customLists]);

  // Load archived courses from localStorage on mount
  useEffect(() => {
    const savedArchived = localStorage.getItem('archivedCourses');
    if (savedArchived) {
      try {
        const parsed = JSON.parse(savedArchived);
        // Normalize all archived course IDs
        const normalizedIds = parsed.map(id => normalizeCourseId(id)).filter(Boolean);
        setArchivedCourseIds(normalizedIds);
      } catch (e) {
        console.error('Error loading archived courses:', e);
        setArchivedCourseIds([]);
      }
    }
  }, []);

  // Save archived courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('archivedCourses', JSON.stringify(archivedCourseIds));
  }, [archivedCourseIds]);

  // Load cached enrollment data from localStorage on mount (for immediate display)
  useEffect(() => {
    const cachedEnrollments = localStorage.getItem('cachedEnrollments');
    const cachedCourses = localStorage.getItem('cachedCourses');
    const cachedWishlist = localStorage.getItem('cachedWishlist');
    
    if (cachedEnrollments && cachedCourses) {
      try {
        const parsedEnrollments = JSON.parse(cachedEnrollments);
        const parsedCourses = JSON.parse(cachedCourses);
        setEnrollments(parsedEnrollments);
        setCourses(parsedCourses);
        // Don't set loading to false here - let API call complete to get fresh data
      } catch (e) {
        console.error('Error loading cached enrollment data:', e);
      }
    }
    
    if (cachedWishlist) {
      try {
        const parsed = JSON.parse(cachedWishlist);
        setWishlistItems(parsed);
      } catch (e) {
        console.error('Error loading cached wishlist:', e);
      }
    }
  }, []);

  // Save enrollment data to localStorage whenever it changes
  useEffect(() => {
    if (enrollments.length > 0) {
      localStorage.setItem('cachedEnrollments', JSON.stringify(enrollments));
    }
  }, [enrollments]);

  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem('cachedCourses', JSON.stringify(courses));
    }
  }, [courses]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlistItems.length > 0) {
      localStorage.setItem('cachedWishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  // Fetch data from APIs
  useEffect(() => {
    fetchData();
  }, []);

  // Close add to list menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddToListMenu && !event.target.closest('.all-courses-course-card')) {
        setShowAddToListMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAddToListMenu]);

  // Refresh data function (can be called manually if needed)
  const refreshData = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user's enrolled courses with pagination support
      try {
        const enrollmentsRes = await api.get('/enrollments', {
          params: {
            page: 1,
            limit: 100, // Get all enrollments
          }
        });
        
        // Handle both paginated and non-paginated responses
        const enrollmentsData = Array.isArray(enrollmentsRes.data.data) 
          ? enrollmentsRes.data.data 
          : enrollmentsRes.data.data?.data || enrollmentsRes.data.data || [];
        
        // Merge with cached data to ensure nothing is lost
        const cachedEnrollments = localStorage.getItem('cachedEnrollments');
        let mergedEnrollments = enrollmentsData;
        if (cachedEnrollments) {
          try {
            const cached = JSON.parse(cachedEnrollments);
            // Create a map of existing enrollments by course ID
            const existingMap = new Map();
            enrollmentsData.forEach(env => {
              const courseId = env.course?._id || env.course || env._id;
              if (courseId) existingMap.set(courseId.toString(), env);
            });
            // Add any cached enrollments that aren't in the API response
            cached.forEach(cachedEnv => {
              const courseId = cachedEnv.course?._id || cachedEnv.course || cachedEnv._id;
              if (courseId && !existingMap.has(courseId.toString())) {
                mergedEnrollments.push(cachedEnv);
              }
            });
          } catch (e) {
            console.error('Error merging cached enrollments:', e);
          }
        }
        
        setEnrollments(mergedEnrollments);

        // Map enrollments to courses format for UI
        const mappedCourses = mergedEnrollments
          .filter(enrollment => enrollment.course) // Filter out enrollments without course data
          .map(enrollment => {
            const course = enrollment.course || {};
            const category = course.category || {};
            
            // Handle mentor - could be populated object or just ID
            let instructorName = 'Unknown Instructor';
            if (course.mentor) {
              if (typeof course.mentor === 'object' && course.mentor.name) {
                instructorName = course.mentor.name;
              } else if (typeof course.mentor === 'string') {
                // If mentor is just an ID, we'll show Unknown for now
                instructorName = 'Unknown Instructor';
              }
            }
            
            // Handle category - could be populated object or just ID
            let categoryName = 'General';
            if (category) {
              if (typeof category === 'object' && category.name) {
                categoryName = category.name;
              } else if (typeof category === 'string') {
                categoryName = 'General';
              }
            }
            
            const courseId = course._id || enrollment._id;
            return {
              id: normalizeCourseId(courseId), // Normalize ID for consistency
              title: course.title || 'Untitled Course',
              instructor: instructorName,
              progress: Math.round(enrollment.progress || 0),
              category: categoryName,
              image: course.thumbnail || Img1,
              completed: enrollment.completed || false,
              lastAccessedAt: enrollment.lastAccessedAt || enrollment.updatedAt || enrollment.createdAt,
              course: course, // Keep full course object for additional data
              enrollment: enrollment, // Keep enrollment for progress tracking
            };
          });
        
        // Merge with cached courses to preserve any that might be missing
        const cachedCourses = localStorage.getItem('cachedCourses');
        if (cachedCourses) {
          try {
            const cached = JSON.parse(cachedCourses);
            const existingIds = new Set(mappedCourses.map(c => c.id?.toString()));
            cached.forEach(cachedCourse => {
              if (cachedCourse.id && !existingIds.has(cachedCourse.id.toString())) {
                mappedCourses.push(cachedCourse);
              }
            });
          } catch (e) {
            console.error('Error merging cached courses:', e);
          }
        }
        
        setCourses(mappedCourses);
      } catch (enrollmentError) {
        console.error('Error fetching enrollments:', enrollmentError);
        const errorMessage = enrollmentError.response?.data?.message || enrollmentError.message || 'Failed to load enrollments';
        
        // Check if it's an authentication error
        if (enrollmentError.response?.status === 401) {
          setError('Please log in to view your enrolled courses.');
        } else if (enrollmentError.response?.status === 404) {
          // 404 is okay - just means no enrollments yet
          setEnrollments([]);
          setCourses([]);
        } else {
          setError(`Error loading courses: ${errorMessage}`);
          setEnrollments([]);
          setCourses([]);
        }
      }

      // Fetch wishlist
      try {
        const wishlistRes = await api.get('/wishlist');
        const wishlistData = wishlistRes.data.data?.wishlist || {};
        const allWishlistItems = [
          ...(wishlistData.courses || []),
          ...(wishlistData.contests || [])
        ];
        
        // Merge with cached wishlist to ensure nothing is lost
        const cachedWishlist = localStorage.getItem('cachedWishlist');
        if (cachedWishlist && allWishlistItems.length > 0) {
          try {
            const cached = JSON.parse(cachedWishlist);
            const existingIds = new Set(allWishlistItems.map(item => item._id?.toString()));
            cached.forEach(cachedItem => {
              if (cachedItem._id && !existingIds.has(cachedItem._id.toString())) {
                allWishlistItems.push(cachedItem);
              }
            });
          } catch (e) {
            console.error('Error merging cached wishlist:', e);
          }
        }
        
        setWishlistItems(allWishlistItems);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        // Don't clear wishlist on error - keep cached data
        const cachedWishlist = localStorage.getItem('cachedWishlist');
        if (cachedWishlist) {
          try {
            const cached = JSON.parse(cachedWishlist);
            setWishlistItems(cached);
          } catch (e) {
            setWishlistItems([]);
          }
        } else {
          setWishlistItems([]);
        }
      }

      // Fetch user progress
      try {
        const progressRes = await api.get('/progress');
        setProgressData(progressRes.data.data?.progress || null);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setProgressData(null);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again.');
      setCourses([]);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.openReminder) {
      console.log(location.state?.openReminder)
      setActiveItem("Learning Tools");
      setShowModal(true); // 👈 auto open modal
    }
  }, [location.state]);



  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
  };

  const handleSaveReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  // Helper functions for progress stats
  const getStreakWeeks = () => {
    if (!progressData) return 0;
    return Math.floor(progressData.currentStreak / 7);
  };

  const getStreakDays = () => {
    if (!progressData) return 0;
    return progressData.currentStreak % 7;
  };

  const getStreakDisplay = () => {
    const weeks = getStreakWeeks();
    const days = getStreakDays();
    if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    }
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  const getTodayProgress = () => {
    if (!progressData) return { minutes: 0, visits: 0 };
    const today = new Date().setHours(0, 0, 0, 0);
    const lastVisit = progressData.lastVisitDate
      ? new Date(progressData.lastVisitDate).setHours(0, 0, 0, 0)
      : null;

    return {
      minutes: progressData.weeklyStats?.currentWeek?.totalMinutes || 0,
      visits: lastVisit === today ? 1 : 0
    };
  };

  // My Lists functions
  const createNewList = () => {
    if (!newListName.trim()) {
      alert('Please enter a list name');
      return;
    }
    
    const newList = {
      id: Date.now().toString(),
      name: newListName.trim(),
      courseIds: [],
      createdAt: new Date().toISOString(),
    };
    
    setCustomLists([...customLists, newList]);
    setNewListName("");
    setShowCreateListModal(false);
    setSelectedListId(newList.id);
    setActiveItem("My Lists");
  };

  const deleteList = (listId) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      setCustomLists(customLists.filter(list => list.id !== listId));
      if (selectedListId === listId) {
        setSelectedListId(null);
      }
    }
  };

  const addCourseToList = (courseId, listId) => {
    const normalizedId = normalizeCourseId(courseId);
    if (!normalizedId) return;
    
    setCustomLists(customLists.map(list => {
      if (list.id === listId) {
        // Normalize existing IDs in the list
        const normalizedListIds = list.courseIds.map(id => normalizeCourseId(id)).filter(Boolean);
        if (!normalizedListIds.includes(normalizedId)) {
          return { ...list, courseIds: [...normalizedListIds, normalizedId] };
        }
      }
      return list;
    }));
  };

  const removeCourseFromList = (courseId, listId) => {
    const normalizedId = normalizeCourseId(courseId);
    if (!normalizedId) return;
    
    setCustomLists(customLists.map(list => {
      if (list.id === listId) {
        // Normalize IDs for comparison
        const normalizedListIds = list.courseIds.map(id => normalizeCourseId(id)).filter(Boolean);
        return { ...list, courseIds: normalizedListIds.filter(id => id !== normalizedId) };
      }
      return list;
    }));
  };

  const getCoursesInList = (listId) => {
    const list = customLists.find(l => l.id === listId);
    if (!list) return [];
    
    // Normalize list IDs and course IDs for comparison
    const normalizedListIds = list.courseIds.map(id => normalizeCourseId(id)).filter(Boolean);
    
    return courses.filter(course => {
      const courseId = normalizeCourseId(course.id);
      return courseId && normalizedListIds.includes(courseId);
    });
  };

  // Archive/Unarchive functions
  const archiveCourse = (courseId) => {
    const normalizedId = normalizeCourseId(courseId);
    if (normalizedId && !archivedCourseIds.includes(normalizedId)) {
      setArchivedCourseIds([...archivedCourseIds, normalizedId]);
    }
  };
  


  const unarchiveCourse = (courseId) => {
    const normalizedId = normalizeCourseId(courseId);
    if (normalizedId) {
      setArchivedCourseIds(archivedCourseIds.filter(id => id !== normalizedId));
    }
  };

  const isCourseArchived = (courseId) => {
    const normalizedId = normalizeCourseId(courseId);
    return normalizedId ? archivedCourseIds.includes(normalizedId) : false;
  };

  // Filter courses based on active tab and search
  const getFilteredCourses = () => {
    let filtered = [];
    
    if (activeItem === "Wishlist") {
      filtered = wishlistItems.map(item => ({
        id: item._id,
        title: item.title || 'Untitled',
        instructor: item.mentor?.name || item.mentor || 'Unknown',
        progress: 0,
        category: item.category?.name || item.category || 'General',
        image: item.thumbnail || Img1,
        course: item, // Keep full course object
      }));
    } else if (activeItem === "My Lists" && selectedListId) {
      filtered = getCoursesInList(selectedListId);
    } else if (activeItem === "Archived") {
      // Show only archived courses
      filtered = courses.filter(course => {
        const courseId = normalizeCourseId(course.id);
        return courseId && isCourseArchived(courseId);
      });
    } else if (activeItem === "All Courses") {
      // Show courses that are NOT archived
      filtered = courses.filter(course => {
        const courseId = normalizeCourseId(course.id);
        return courseId && !isCourseArchived(courseId);
      });
    } else {
      filtered = courses;
    }

    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(course => {
        const title = (course.title || '').toLowerCase();
        const instructor = (course.instructor || '').toLowerCase();
        const category = (course.category || '').toLowerCase();
        return title.includes(searchLower) || 
               instructor.includes(searchLower) || 
               category.includes(searchLower);
      });
    }

    return filtered;
  };

  const menuItems = [
    "All Courses",
    "My Lists",
    "Wishlist",
    "Archived",
    "Learning Tools",
  ];

  return (
    <div className="my-list-container">
      <h2 className="page-title">My Studying</h2>

      <div className="my-list-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <span className="sidebar-title">Catalog</span>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item}
                className={activeItem === item ? "active" : ""}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Section */}
        <main className="main-content">
          {/* Search Bar */}

          {activeItem !== "Archived" && activeItem !== "Learning Tools" && (
            <div className="search-bar">
              <div className=" my-list-search flex items-center justify-center  ">
                <IoSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search my courses"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div>
                <button>Search</button>
              </div>
            </div>
          )}
          <div>
            {(activeItem === "All Courses" ||
              activeItem === "Wishlist" ||
              activeItem === "Archived") && (
              <div className="flex gap-4">
                <div>
                  {/* Filters */}
                  <div className="filters">
                    <div className="filters-selector">
                      <select>
                        <option>Recently Accessed</option>
                        <option value="Title A-Z">Title A-Z</option>
                        <option value="Recently Enrolled">
                          Recently Enrolled
                        </option>
                        <option value="Title A-Z">Title A-Z</option>
                      </select>
                      <select>
                        <option>Categories</option>
                        <option value={"Favourite"}>Favourite</option>
                        <option value={"All categories"}>All categories</option>
                        <option value={"Development"}>Development</option>
                        <option value={"IT & Software"}>IT & Software</option>
                        <option value={"Archived"}>Archived</option>
                      </select>
                      <select>
                        <option>Progress</option>
                        <option value={"Completed"}>Completed</option>
                        <option value={"Not Started"}>Not Started</option>
                      </select>
                      <select>
                        <option>Instructors</option>
                        <option value={"AI Science"}>AI Science</option>
                        <option value={"AI Science Team"}>
                          AI Science Team
                        </option>
                        <option value={"Skillify Tech"}>Skillify Tech</option>
                      </select>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="11"
                      viewBox="0 0 10 11"
                      fill="none"
                    >
                      <path
                        d="M7.64948 8.74115L4.99948 6.08698L2.34948 8.74115L1.75781 8.14948L4.41198 5.49948L1.75781 2.84948L2.34948 2.25781L4.99948 4.91198L7.64948 2.26198L8.23698 2.84948L5.58698 5.49948L8.23698 8.14948L7.64948 8.74115Z"
                        fill="#F91100"
                      />
                    </svg>
                  </div>

                  {/* * Courses Grid */}
                  <div className="all-courses-courses-grid">
                    {loading ? (
                      <div className="flex justify-center items-center py-10">
                        <p>Loading courses...</p>
                      </div>
                    ) : error ? (
                      <div className="flex flex-col justify-center items-center py-10">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                          onClick={refreshData}
                        >
                          Retry
                        </button>
                      </div>
                    ) : getFilteredCourses().length === 0 ? (
                      <div className="flex flex-col justify-center items-center py-10">
                        <p className="text-gray-600 mb-4">
                          {activeItem === "Wishlist" ? "No items in your wishlist" :
                            activeItem === "Archived" ? "No archived courses" :
                              search.trim() ? "No courses match your search" :
                              "No courses enrolled. Start learning by enrolling in a course!"}
                        </p>
                        {activeItem === "Wishlist" && (
                          <button
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => (window.location.href = "/courses/allCourses")}
                          >
                            Browse more courses
                          </button>
                        )}
                        {activeItem === "All Courses" && !search.trim() && (
                          <button
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => (window.location.href = "/courses/allCourses")}
                          >
                            Browse Courses
                          </button>
                        )}
                      </div>
                    ) : (
                      getFilteredCourses().map((course) => {
                        // Determine course route - use course ID
                        const courseId = course.course?._id || course.id;
                        const courseRoute = courseId ? `/coursecatalog/${courseId}/` : '#';
                        
                        return (
                          <div key={course.id} className="all-courses-course-card relative">
                            {activeItem === "Archived" && (
                              <div className="absolute top-2 left-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
                                📦 Archived
                              </div>
                            )}
                            <Link 
                              to={courseRoute}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                              className="block"
                            >
                              <div className="all-courses-course-header">
                              <div className="all-courses-course-thumb">
                                <div className="progress-circle">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="34"
                                    height="33"
                                    viewBox="0 0 34 33"
                                    fill="none"
                                  >
                                    <path
                                      d="M33.4389 16.4987C33.4389 25.5762 26.0801 32.935 17.0026 32.935C7.92516 32.935 0.566406 25.5762 0.566406 16.4987C0.566406 7.42125 7.92516 0.0625 17.0026 0.0625C26.0801 0.0625 33.4389 7.42125 33.4389 16.4987ZM3.85365 16.4987C3.85365 23.7607 9.74065 29.6477 17.0026 29.6477C24.2646 29.6477 30.1516 23.7607 30.1516 16.4987C30.1516 9.23675 24.2646 3.34975 17.0026 3.34975C9.74065 3.34975 3.85365 9.23675 3.85365 16.4987Z"
                                      fill="url(#paint0_linear_2540_7297)"
                                      fillOpacity="0.3"
                                    />
                                    <path
                                      d="M17.0667 0.0619412C13.5957 0.0484479 10.2096 1.13414 7.39358 3.1634C4.57758 5.19267 2.47629 8.06133 1.39087 11.3582C0.305448 14.6552 0.291624 18.2111 1.35138 21.5163C2.41114 24.8216 4.49006 27.7065 7.2902 29.7576C10.0903 31.8087 13.4679 32.9207 16.9389 32.9342C20.4099 32.9476 23.796 31.862 26.612 29.8327C29.428 27.8034 31.5293 24.9348 32.6147 21.6378C33.7001 18.3409 33.714 14.785 32.6542 11.4798L29.5239 12.4834C30.3717 15.1276 30.3607 17.9724 29.4923 20.6099C28.624 23.2474 26.943 25.5423 24.6902 27.1658C22.4374 28.7892 19.7284 29.6577 16.9517 29.6469C14.1749 29.6361 11.4728 28.7466 9.23272 27.1057C6.99261 25.4648 5.32947 23.1569 4.48166 20.5127C3.63386 17.8685 3.64492 15.0237 4.51325 12.3862C5.38159 9.74867 7.06262 7.45374 9.31542 5.83033C11.5682 4.20692 14.2771 3.33837 17.0539 3.34916L17.0667 0.0619412Z"
                                      fill="url(#paint1_linear_2540_7297)"
                                    />
                                    <defs>
                                      <linearGradient
                                        id="paint0_linear_2540_7297"
                                        x1="38.1232"
                                        y1="39.0985"
                                        x2="0.566405"
                                        y2="-3.71783"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop
                                          offset="0.528846"
                                          stopColor="#0C316E"
                                        />
                                        <stop offset="1" stopColor="#0288E7" />
                                      </linearGradient>
                                      <linearGradient
                                        id="paint1_linear_2540_7297"
                                        x1="-5.51475"
                                        y1="-4.71021"
                                        x2="37.1553"
                                        y2="33.0127"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop
                                          offset="0.528846"
                                          stopColor="#0C316E"
                                        />
                                        <stop offset="1" stopColor="#0288E7" />
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </div>
                                <span className="all-courses-progress-circle">
                                  {course.progress}%
                                </span>
                              </div>
                              <div className="relative">
                                <BsThreeDotsVertical 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowAddToListMenu(showAddToListMenu === course.id ? null : course.id);
                                  }}
                                  className="cursor-pointer"
                                />
                                 {showAddToListMenu === course.id && (
                                   <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                                     <div className="py-1">
                                       {/* Archive/Unarchive Option */}
                                       {activeItem !== "Archived" && (
                                         <button
                                           onClick={(e) => {
                                             e.stopPropagation();
                                             archiveCourse(course.id);
                                             setShowAddToListMenu(null);
                                           }}
                                           className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                                         >
                                           <span>📦</span>
                                           <span>Archive Course</span>
                                         </button>
                                       )}
                                       {activeItem === "Archived" && (
                                         <button
                                           onClick={(e) => {
                                             e.stopPropagation();
                                             unarchiveCourse(course.id);
                                             setShowAddToListMenu(null);
                                           }}
                                           className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                                         >
                                           <span>📤</span>
                                           <span>Unarchive Course</span>
                                         </button>
                                       )}
                                       
                                       {/* Add to List Section */}
                                       {activeItem !== "Archived" && (
                                         <>
                                           <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-t border-b">
                                             Add to List
                                           </div>
                                           {customLists.length === 0 ? (
                                             <div className="p-3 text-sm text-gray-600">
                                               <p className="mb-2">No lists yet</p>
                                               <button
                                                 onClick={(e) => {
                                                   e.stopPropagation();
                                                   setShowAddToListMenu(null);
                                                   setShowCreateListModal(true);
                                                 }}
                                                 className="text-blue-600 hover:underline text-xs"
                                               >
                                                 Create a list first
                                               </button>
                                             </div>
                                           ) : (
                                             customLists.map((list) => {
                                               const courseId = normalizeCourseId(course.id);
                                               const normalizedListIds = list.courseIds.map(id => normalizeCourseId(id)).filter(Boolean);
                                               const isInList = courseId && normalizedListIds.includes(courseId);
                                               return (
                                                 <button
                                                   key={list.id}
                                                   onClick={(e) => {
                                                     e.stopPropagation();
                                                     if (isInList) {
                                                       removeCourseFromList(course.id, list.id);
                                                     } else {
                                                       addCourseToList(course.id, list.id);
                                                     }
                                                     setShowAddToListMenu(null);
                                                   }}
                                                   className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center justify-between"
                                                 >
                                                   <span>{list.name}</span>
                                                   {isInList && <span className="text-blue-600">✓</span>}
                                                 </button>
                                               );
                                             })
                                           )}
                                         </>
                                       )}
                                     </div>
                                   </div>
                                 )}
                              </div>
                            </div>
                            <div className="all-course-image">
                              <img
                                src={
                                  course.image ||
                                  "https://via.placeholder.com/250x150?text=Course+Image"
                                }
                                alt={course.title}
                              />
                            </div>
                            <h6 className="course-title">{course.title}</h6>
                            <div className="course-instructor flex items-center justify-flex-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M5.92432 5.25342C6.88583 5.25342 7.66529 4.47396 7.66529 3.51245C7.66529 2.55094 6.88583 1.77148 5.92432 1.77148C4.96281 1.77148 4.18335 2.55094 4.18335 3.51245C4.18335 4.47396 4.96281 5.25342 5.92432 5.25342Z"
                                  fill="#1E1E1E"
                                />
                                <path
                                  d="M9.40406 8.51914C9.40406 9.60071 9.40406 10.4777 5.92212 10.4777C2.44019 10.4777 2.44019 9.60071 2.44019 8.51914C2.44019 7.43756 3.99922 6.56055 5.92212 6.56055C7.84502 6.56055 9.40406 7.43756 9.40406 8.51914Z"
                                  fill="#1E1E1E"
                                />
                              </svg>
                              <p className="instructor-name">{course.instructor}</p>
                            </div>
                            <span className="all-courses-continue-badge">
                              <p>
                                {activeItem === "Archived" ? "View Course" : "Continue Course"}
                              </p>
                            </span>
                            </Link>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <aside className="right-sidebar">
                  <div className="streak-card">
                    <div className="svg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="47"
                        viewBox="0 0 48 47"
                        fill="none"
                      >
                        <path
                          d="M25.6293 42.693C31.7511 41.467 39.6667 37.0627 39.6667 25.675C39.6667 15.3135 32.082 8.41233 26.6281 5.24178C25.4159 4.53678 24 5.46308 24 6.86328V10.4431C24 13.267 22.8132 18.4214 19.5154 20.5657C17.8313 21.6604 16.01 20.0213 15.8063 18.0238L15.6379 16.3827C15.4421 14.4753 13.4994 13.318 11.9758 14.4812C9.23613 16.5668 6.375 20.2289 6.375 25.6731C6.375 39.5988 16.7326 43.0827 21.9105 43.0827C22.2133 43.0827 22.5293 43.0729 22.8583 43.0533C20.3007 42.8359 16.1667 41.2497 16.1667 36.1188C16.1667 32.1042 19.0944 29.3919 21.319 28.0701C21.9183 27.7176 22.6174 28.1778 22.6174 28.873V30.0284C22.6174 30.9097 22.9601 32.2903 23.7728 33.2342C24.6933 34.3035 26.0425 33.1833 26.1502 31.7772C26.1855 31.3346 26.632 31.0526 27.0158 31.2759C28.2711 32.0102 29.875 33.5769 29.875 36.1188C29.875 40.1295 27.664 41.9742 25.6293 42.693Z"
                          fill="url(#paint0_linear_2265_7494)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2265_7494"
                            x1="23.0208"
                            y1="5"
                            x2="23.0208"
                            y2="43.0827"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#F9A21E" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="streak-card-content">
                      <h4> {loading ? 'Loading...' : getStreakDisplay()}</h4>
                      <p>Streak</p>
                    </div>
                  </div>
                  <div className="progress-card">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="72"
                      height="73"
                      viewBox="0 0 72 73"
                      fill="none"
                    >
                      <path
                        d="M71.8249 36.3669C71.8249 56.1746 55.7676 72.2319 35.9599 72.2319C16.1523 72.2319 0.0949707 56.1746 0.0949707 36.3669C0.0949707 16.5593 16.1523 0.501953 35.9599 0.501953C55.7676 0.501953 71.8249 16.5593 71.8249 36.3669ZM7.26797 36.3669C7.26797 52.2131 20.1138 65.0589 35.9599 65.0589C51.8061 65.0589 64.6519 52.2131 64.6519 36.3669C64.6519 20.5208 51.8061 7.67495 35.9599 7.67495C20.1138 7.67495 7.26797 20.5208 7.26797 36.3669Z"
                        fill="#EBEBF0"
                      />
                      <path
                        d="M56.3141 6.83723C62.5069 11.1058 67.201 17.2133 69.7325 24.2959C72.264 31.3785 72.5047 39.0777 70.4207 46.3046C68.3366 53.5315 64.0332 59.9203 58.1192 64.5674C52.2051 69.2145 44.9798 71.8847 37.465 72.2003C29.9502 72.5159 22.5264 70.461 16.2435 66.3262C9.96063 62.1914 5.13668 56.186 2.45394 49.1593C-0.228797 42.1326 -0.634534 34.4403 1.29411 27.1704C3.22276 19.9005 7.38818 13.4209 13.2012 8.64804L17.753 14.1918C13.1025 18.0101 9.7702 23.1938 8.22728 29.0097C6.68436 34.8256 7.00895 40.9795 9.15514 46.6008C11.3013 52.2222 15.1605 57.0265 20.1868 60.3344C25.2131 63.6422 31.1522 65.2861 37.164 65.0336C43.1758 64.7811 48.9561 62.645 53.6873 58.9273C58.4186 55.2096 61.8613 50.0986 63.5285 44.317C65.1958 38.5355 65.0032 32.3761 62.978 26.7101C60.9528 21.044 57.1975 16.158 52.2433 12.7432L56.3141 6.83723Z"
                        fill="#0288E7"
                      />
                      <path
                        d="M59.1667 36.3669C59.1667 49.1836 48.7767 59.5737 35.9599 59.5737C23.1432 59.5737 12.7532 49.1836 12.7532 36.3669C12.7532 23.5502 23.1432 13.1602 35.9599 13.1602C48.7767 13.1602 59.1667 23.5502 59.1667 36.3669ZM19.7152 36.3669C19.7152 45.3386 26.9882 52.6116 35.9599 52.6116C44.9316 52.6116 52.2047 45.3386 52.2047 36.3669C52.2047 27.3952 44.9316 20.1222 35.9599 20.1222C26.9882 20.1222 19.7152 27.3952 19.7152 36.3669Z"
                        fill="#0C316E"
                      />
                    </svg>
                    <div className="progress-card-content">
                      <div className="flex items-center justify-between gap-1">
                        <h4>{loading ? '...' : getTodayProgress().minutes}/{progressData?.dailyStudyGoal || 30} </h4>
                        <div>Course Min</div>
                      </div>

                      <div className="flex items-center justify-cnter gap-1">
                        <p className="font-bold text-2xl">{loading ? '...' : getTodayProgress().visits}/1 </p>
                        <div>visit</div>
                      </div>

                      <div className="flex items-center justify-between gap-1 flex-col">
                        <h6>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}</h6>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-card">
                    <div className="schedule-card-header">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M5.96499 3.71484C5.28659 3.89653 4.66799 4.25364 4.17138 4.75024C3.67478 5.24685 3.31768 5.86545 3.13599 6.54384M18.035 3.71484C18.7134 3.89653 19.332 4.25364 19.8286 4.75024C20.3252 5.24685 20.6823 5.86545 20.864 6.54384"
                          stroke="#0C316E"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 20.5781C14.1217 20.5781 16.1566 19.7353 17.6569 18.235C19.1571 16.7347 20 14.6999 20 12.5781C20 10.4564 19.1571 8.42156 17.6569 6.92127C16.1566 5.42098 14.1217 4.57813 12 4.57812C9.87827 4.57813 7.84344 5.42098 6.34315 6.92127C4.84285 8.42156 4 10.4564 4 12.5781C4 14.6999 4.84285 16.7347 6.34315 18.235C7.84344 19.7353 9.87827 20.5781 12 20.5781ZM13 8.57812C13 8.31291 12.8946 8.05855 12.7071 7.87102C12.5196 7.68348 12.2652 7.57812 12 7.57812C11.7348 7.57812 11.4804 7.68348 11.2929 7.87102C11.1054 8.05855 11 8.31291 11 8.57812V12.3281C11 13.0181 11.56 13.5781 12.25 13.5781H15C15.2652 13.5781 15.5196 13.4728 15.7071 13.2852C15.8946 13.0977 16 12.8433 16 12.5781C16 12.3129 15.8946 12.0586 15.7071 11.871C15.5196 11.6835 15.2652 11.5781 15 11.5781H13V8.57812Z"
                          fill="#0C316E"
                        />
                      </svg>
                      <h4 > Scheduling Study Time</h4>
                    </div>

                    <div className="schedule-card-content">
                      <span>Learning a little each day adds up. </span>
                    </div>

                    <button>Start Timer</button>
                  </div>

                  {/* <div className="card">
      <div className="icon">⏰</div>
      <h2>Scheduling Study Time</h2>
      <p>Learning A Little Each Day Adds Up.</p>

      <h3>{Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}</h3>

      {!running ? (
        <button onClick={handleStart}>Start Timer</button>
      ) : (
        <button onClick={handleStop}>Stop Timer</button>
      )}
      <button onClick={handleReset}>Reset</button>
                      </div> */}
                </aside>
              </div>
            )}

            {activeItem === "My Lists" && (
              <div className="my-lists">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">My Lists</h3>
                    <p className="text-gray-600">Organize and access your courses faster!</p>
                  </div>
                  <button
                    onClick={() => setShowCreateListModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <IoIosAddCircleOutline size={20} />
                    Create New List
                  </button>
                </div>

                {customLists.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">You haven't created any lists yet.</p>
                    <button
                      onClick={() => setShowCreateListModal(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Create Your First List
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* List Selector */}
                    <div className="flex gap-2 flex-wrap mb-6">
                      {customLists.map((list) => (
                        <div
                          key={list.id}
                          className={`px-4 py-2 rounded-lg cursor-pointer border-2 transition-all ${
                            selectedListId === list.id
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                          }`}
                          onClick={() => setSelectedListId(list.id)}
                        >
                          <div className="flex items-center gap-2">
                            <span>{list.name}</span>
                            <span className="text-xs opacity-75">
                              ({list.courseIds.length})
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteList(list.id);
                              }}
                              className="ml-2 hover:text-red-600"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Courses in Selected List */}
                    {selectedListId ? (
                      <div>
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {customLists.find(l => l.id === selectedListId)?.name || 'List'} Courses
                          </h4>
                          <p className="text-sm text-gray-600">
                            {getCoursesInList(selectedListId).length} course(s) in this list
                          </p>
                        </div>

                        {getCoursesInList(selectedListId).length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 mb-4">This list is empty.</p>
                            <p className="text-sm text-gray-500 mb-4">
                              Go to "All Courses" to add courses to this list.
                            </p>
                            <button
                              onClick={() => setActiveItem("All Courses")}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Browse Courses
                            </button>
                          </div>
                        ) : (
                          <div className="all-courses-courses-grid">
                            {getFilteredCourses().map((course) => {
                              const courseId = course.course?._id || course.id;
                              const courseRoute = courseId ? `/coursecatalog/${courseId}/` : '#';
                              
                              return (
                                <Link
                                  to={courseRoute}
                                  key={course.id}
                                  className="all-courses-course-card"
                                  style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                  <div className="all-courses-course-header">
                                    <div className="all-courses-course-thumb">
                                      <div className="progress-circle">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="34"
                                          height="33"
                                          viewBox="0 0 34 33"
                                          fill="none"
                                        >
                                          <path
                                            d="M33.4389 16.4987C33.4389 25.5762 26.0801 32.935 17.0026 32.935C7.92516 32.935 0.566406 25.5762 0.566406 16.4987C0.566406 7.42125 7.92516 0.0625 17.0026 0.0625C26.0801 0.0625 33.4389 7.42125 33.4389 16.4987ZM3.85365 16.4987C3.85365 23.7607 9.74065 29.6477 17.0026 29.6477C24.2646 29.6477 30.1516 23.7607 30.1516 16.4987C30.1516 9.23675 24.2646 3.34975 17.0026 3.34975C9.74065 3.34975 3.85365 9.23675 3.85365 16.4987Z"
                                            fill="url(#paint0_linear_2540_7297)"
                                            fillOpacity="0.3"
                                          />
                                          <path
                                            d="M17.0667 0.0619412C13.5957 0.0484479 10.2096 1.13414 7.39358 3.1634C4.57758 5.19267 2.47629 8.06133 1.39087 11.3582C0.305448 14.6552 0.291624 18.2111 1.35138 21.5163C2.41114 24.8216 4.49006 27.7065 7.2902 29.7576C10.0903 31.8087 13.4679 32.9207 16.9389 32.9342C20.4099 32.9476 23.796 31.862 26.612 29.8327C29.428 27.8034 31.5293 24.9348 32.6147 21.6378C33.7001 18.3409 33.714 14.785 32.6542 11.4798L29.5239 12.4834C30.3717 15.1276 30.3607 17.9724 29.4923 20.6099C28.624 23.2474 26.943 25.5423 24.6902 27.1658C22.4374 28.7892 19.7284 29.6577 16.9517 29.6469C14.1749 29.6361 11.4728 28.7466 9.23272 27.1057C6.99261 25.4648 5.32947 23.1569 4.48166 20.5127C3.63386 17.8685 3.64492 15.0237 4.51325 12.3862C5.38159 9.74867 7.06262 7.45374 9.31542 5.83033C11.5682 4.20692 14.2771 3.33837 17.0539 3.34916L17.0667 0.0619412Z"
                                            fill="url(#paint1_linear_2540_7297)"
                                          />
                                          <defs>
                                            <linearGradient
                                              id="paint0_linear_2540_7297"
                                              x1="38.1232"
                                              y1="39.0985"
                                              x2="0.566405"
                                              y2="-3.71783"
                                              gradientUnits="userSpaceOnUse"
                                            >
                                              <stop offset="0.528846" stopColor="#0C316E" />
                                              <stop offset="1" stopColor="#0288E7" />
                                            </linearGradient>
                                            <linearGradient
                                              id="paint1_linear_2540_7297"
                                              x1="-5.51475"
                                              y1="-4.71021"
                                              x2="37.1553"
                                              y2="33.0127"
                                              gradientUnits="userSpaceOnUse"
                                            >
                                              <stop offset="0.528846" stopColor="#0C316E" />
                                              <stop offset="1" stopColor="#0288E7" />
                                            </linearGradient>
                                          </defs>
                                        </svg>
                                      </div>
                                      <span className="all-courses-progress-circle">
                                        {course.progress}%
                                      </span>
                                    </div>
                                    <BsThreeDotsVertical />
                                  </div>
                                  <div className="all-course-image">
                                    <img
                                      src={course.image || "https://via.placeholder.com/250x150?text=Course+Image"}
                                      alt={course.title}
                                    />
                                  </div>
                                  <h6 className="course-title">{course.title}</h6>
                                  <div className="course-instructor flex items-center justify-flex-start">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                    >
                                      <path
                                        d="M5.92432 5.25342C6.88583 5.25342 7.66529 4.47396 7.66529 3.51245C7.66529 2.55094 6.88583 1.77148 5.92432 1.77148C4.96281 1.77148 4.18335 2.55094 4.18335 3.51245C4.18335 4.47396 4.96281 5.25342 5.92432 5.25342Z"
                                        fill="#1E1E1E"
                                      />
                                      <path
                                        d="M9.40406 8.51914C9.40406 9.60071 9.40406 10.4777 5.92212 10.4777C2.44019 10.4777 2.44019 9.60071 2.44019 8.51914C2.44019 7.43756 3.99922 6.56055 5.92212 6.56055C7.84502 6.56055 9.40406 7.43756 9.40406 8.51914Z"
                                        fill="#1E1E1E"
                                      />
                                    </svg>
                                    <p className="instructor-name">{course.instructor}</p>
                                  </div>
                                  <span className="all-courses-continue-badge">
                                    <p>Continue Course</p>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 mb-4">Select a list to view its courses</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Create List Modal */}
                {showCreateListModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
                      <h3 className="text-xl font-bold mb-4">Create New List</h3>
                      <input
                        type="text"
                        placeholder="Enter list name"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && createNewList()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            setShowCreateListModal(false);
                            setNewListName("");
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={createNewList}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist and Archived content is rendered inside the shared grid above */}

            {activeItem == "Learning Tools" && (
              <div>
                <div className="learning-tools">
                  <>Studying reminders </>

                  <div className="text">
                    Studying a little each day adds up. Research shows that
                    students who make learning a habit are more likely to reach
                    their goals. Set time aside to learn and get reminders using
                    your learning scheduler.
                  </div>

                  <div className="add-reminder">
                    <button onClick={() => setShowModal(true)}>
                      <IoIosAddCircleOutline />
                      Add Reminder
                    </button>
                  </div>
                </div>
              </div>
            )}



            {/* Show reminders after setup */}

            {activeItem == "Learning Tools" && (
              <div className="reminders">
                <div className="reminders-list">
                  {reminders.map((r, i) => (
                    <div key={i} className="reminder-card">
                      <div className="reminder-card1">
                        <h5 className="reminder-title">
                          <div>Studying reminders</div>
                        </h5>
                        <div className="reminder-actions">
                          {/* Time + Frequency */}
                          <div className="reminder-pill">
                            <FaRegClock className="pill-icon" />
                            <div className="reminder-time flex items-center justify-center gap-1 ">
                              <span>{r.time || "12:00 AM"}</span>
                              <span>{r.frequency}</span>
                            </div>
                          </div>

                          {/* Calendar Button */}
                          <div className="reminder-pill">
                            {r.calendar === "Google" && <FcGoogle size={20} />}
                            {r.calendar === "Apple" && <FaApple size={20} />}
                            {r.calendar === "Outlook" && (
                              <SiMicrosoftoutlook size={20} color="#0072C6" />
                            )}
                            <span>
                              {r.calendar
                                ? `Add To ${r.calendar} Calendar`
                                : "No Calendar Selected"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Course Info */}
                      <h5 className="reminder-course">
                        <p>
                          <strong>Course:</strong>{" "}
                          {r.course || "No Course Attached"}
                        </p>
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show modal when state is true */}
            {showModal && (
              <ReminderModal
                onClose={() => setShowModal(false)}
                onSave={handleSaveReminder}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyStudying;
