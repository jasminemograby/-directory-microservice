import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Crown, Award, BookOpen, Star, Calendar, Clock, 
  Users, TrendingUp, Target, Zap, ArrowLeft, Edit, 
  CheckCircle, AlertCircle, Clock as ClockIcon, MapPin,
  GraduationCap, BarChart3, MessageSquare, Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

const TrainerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [trainer, setTrainer] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  // Mock trainer data with extended trainer-specific information
  const mockTrainers = [
    {
      id: 'trainer_001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '123-456-7890',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      team: 'Frontend',
      trainerType: 'internal',
      targetRole: 'Tech Lead in 6 months',
      bio: 'Experienced software engineer with 8+ years in frontend development. Passionate about teaching React, JavaScript, and modern web development practices.',
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS', 'HTML'],
      emergencyContact: {
        name: 'John Johnson',
        phone: '987-654-3210',
        relationship: 'Spouse'
      },
      address: {
        street: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'USA'
      },
      hireDate: '2020-03-15T08:00:00Z',
      lastLogin: '2024-07-21T10:30:00Z',
      coursesCompleted: 12,
      coursesInProgress: 1,
      
      // Trainer-specific data
      trainerProfile: {
        specialization: 'Frontend Development',
        experience: '8+ years',
        rating: 4.8,
        totalCourses: 15,
        totalStudents: 120,
        completionRate: 94,
        availability: 'Available',
        hourlyRate: '$150',
        languages: ['English', 'Spanish'],
        certifications: ['AWS Certified Developer', 'React Professional'],
        teachingStyle: 'Interactive, hands-on approach with real-world projects',
        preferredFormat: 'In-person and Virtual',
        maxClassSize: 25,
        averageRating: 4.8,
        totalReviews: 47
      },
      
      // Courses taught
      coursesTaught: [
        {
          id: 'course_001',
          title: 'Advanced React Patterns',
          category: 'Frontend Development',
          duration: '3 days',
          students: 24,
          rating: 4.9,
          status: 'completed',
          completionDate: '2024-06-15',
          nextScheduled: '2024-08-20'
        },
        {
          id: 'course_002',
          title: 'JavaScript Fundamentals',
          category: 'Programming',
          duration: '2 days',
          students: 18,
          rating: 4.7,
          status: 'completed',
          completionDate: '2024-05-10',
          nextScheduled: '2024-09-15'
        },
        {
          id: 'course_003',
          title: 'Modern CSS Techniques',
          category: 'Frontend Development',
          duration: '1 day',
          students: 15,
          rating: 4.6,
          status: 'in-progress',
          startDate: '2024-07-20',
          endDate: '2024-07-21'
        }
      ],
      
      // Schedule and availability
      schedule: {
        timezone: 'PST',
        workingHours: '9:00 AM - 6:00 PM',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        upcomingSessions: [
          {
            id: 'session_001',
            course: 'Modern CSS Techniques',
            date: '2024-07-22',
            time: '10:00 AM - 4:00 PM',
            location: 'Conference Room A',
            students: 15,
            status: 'confirmed'
          },
          {
            id: 'session_002',
            course: 'Advanced React Patterns',
            date: '2024-08-20',
            time: '9:00 AM - 5:00 PM',
            location: 'Virtual',
            students: 20,
            status: 'pending'
          }
        ]
      },
      
      // Reviews and feedback
      reviews: [
        {
          id: 'review_001',
          studentName: 'John Doe',
          rating: 5,
          comment: 'Sarah is an excellent instructor! Her explanations are clear and she provides great hands-on examples.',
          date: '2024-06-20',
          course: 'Advanced React Patterns'
        },
        {
          id: 'review_002',
          studentName: 'Jane Smith',
          rating: 4,
          comment: 'Very knowledgeable and patient. The course was well-structured and practical.',
          date: '2024-05-15',
          course: 'JavaScript Fundamentals'
        }
      ]
    },
    {
      id: 'trainer_002',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@example.com',
      phone: '098-765-4321',
      position: 'Data Science Lead',
      department: 'Engineering',
      team: 'Data Science',
      trainerType: 'external',
      targetRole: 'Principal Data Scientist',
      bio: 'Data science expert with 10+ years of experience in machine learning, Python, and big data technologies. External trainer available for specialized courses.',
      skills: ['Python', 'Machine Learning', 'Data Science', 'SQL', 'TensorFlow', 'Pandas'],
      emergencyContact: {
        name: 'Lisa Chen',
        phone: '111-222-3333',
        relationship: 'Spouse'
      },
      address: {
        street: '456 Data Drive',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA'
      },
      hireDate: '2019-01-10T09:00:00Z',
      lastLogin: '2024-07-21T11:00:00Z',
      coursesCompleted: 8,
      coursesInProgress: 2,
      
      trainerProfile: {
        specialization: 'Data Science & Machine Learning',
        experience: '10+ years',
        rating: 4.9,
        totalCourses: 25,
        totalStudents: 200,
        completionRate: 96,
        availability: 'Available',
        hourlyRate: '$200',
        languages: ['English', 'Mandarin'],
        certifications: ['AWS Machine Learning Specialty', 'Google Cloud Professional Data Engineer'],
        teachingStyle: 'Theory combined with practical implementation',
        preferredFormat: 'Virtual and Hybrid',
        maxClassSize: 20,
        averageRating: 4.9,
        totalReviews: 63
      },
      
      coursesTaught: [
        {
          id: 'course_004',
          title: 'Machine Learning Fundamentals',
          category: 'Data Science',
          duration: '5 days',
          students: 20,
          rating: 4.9,
          status: 'completed',
          completionDate: '2024-06-30',
          nextScheduled: '2024-09-10'
        },
        {
          id: 'course_005',
          title: 'Python for Data Analysis',
          category: 'Programming',
          duration: '3 days',
          students: 16,
          rating: 4.8,
          status: 'completed',
          completionDate: '2024-05-25',
          nextScheduled: '2024-08-25'
        }
      ],
      
      schedule: {
        timezone: 'PST',
        workingHours: '8:00 AM - 7:00 PM',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        upcomingSessions: [
          {
            id: 'session_003',
            course: 'Machine Learning Fundamentals',
            date: '2024-09-10',
            time: '9:00 AM - 5:00 PM',
            location: 'Virtual',
            students: 20,
            status: 'confirmed'
          }
        ]
      },
      
      reviews: [
        {
          id: 'review_003',
          studentName: 'Alex Rodriguez',
          rating: 5,
          comment: 'Mike is incredibly knowledgeable and makes complex ML concepts easy to understand.',
          date: '2024-07-01',
          course: 'Machine Learning Fundamentals'
        }
      ]
    }
  ];

  useEffect(() => {
    // Try to load from location state first (from navigation)
    if (location.state?.trainer) {
      setTrainer(location.state.trainer);
    } else {
      // If no trainer in state, try to load from localStorage or create mock data
      const savedEmployees = localStorage.getItem('companyEmployees');
      if (savedEmployees) {
        try {
          const employees = JSON.parse(savedEmployees);
          // Get trainer ID from URL params
          const trainerId = window.location.pathname.split('/').pop();
          const foundTrainer = employees.find(emp => emp.id === trainerId && (emp.trainerType === 'internal' || emp.trainerType === 'external'));
          if (foundTrainer) {
            // Enhance with trainer-specific data
            const enhancedTrainer = {
              ...foundTrainer,
              trainerProfile: {
                specialization: 'General Training',
                experience: '5+ years',
                rating: 4.5,
                totalCourses: 8,
                totalStudents: 60,
                completionRate: 90,
                availability: 'Available',
                hourlyRate: '$100',
                languages: ['English'],
                certifications: [],
                teachingStyle: 'Interactive and engaging',
                preferredFormat: 'In-person',
                maxClassSize: 20,
                averageRating: 4.5,
                totalReviews: 12
              },
              coursesTaught: [],
              schedule: {
                timezone: 'PST',
                workingHours: '9:00 AM - 5:00 PM',
                availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                upcomingSessions: []
              },
              reviews: []
            };
            setTrainer(enhancedTrainer);
          } else {
            // Use mock trainer data
            const mockTrainer = mockTrainers.find(t => t.id === trainerId) || mockTrainers[0];
            setTrainer(mockTrainer);
          }
        } catch (error) {
          console.error('Error parsing saved employees:', error);
          // Use mock trainer data as fallback
          const mockTrainer = mockTrainers.find(t => t.id === id) || mockTrainers[0];
          setTrainer(mockTrainer);
        }
      } else {
        // Use mock trainer data as fallback
        const mockTrainer = mockTrainers.find(t => t.id === id) || mockTrainers[0];
        setTrainer(mockTrainer);
      }
    }

    // Load company data
    if (location.state?.companyData) {
      setCompanyData(location.state.companyData);
    } else {
      const savedCompanyData = localStorage.getItem('companyData');
      if (savedCompanyData) {
        try {
          setCompanyData(JSON.parse(savedCompanyData));
        } catch (error) {
          console.error('Error parsing saved company data:', error);
        }
      }
    }
  }, [location.state, id]);

  const handleBackToEmployees = () => {
    navigate('/employees', { 
      state: { 
        companyData 
      } 
    });
  };

  const handleEditProfile = () => {
    navigate(`/employee/${trainer.id}/edit`, { 
      state: { 
        employee: trainer, 
        companyData 
      } 
    });
  };

  const getTrainerIcon = (type) => {
    switch (type) {
      case 'internal':
        return <Crown className="h-5 w-5" style={{ color: 'var(--accent-gold)' }} />
      case 'external':
        return <Award className="h-5 w-5" style={{ color: 'var(--primary-blue)' }} />
      default:
        return <User className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
    }
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'Available':
        return 'var(--success-green)'
      case 'Busy':
        return 'var(--accent-orange)'
      case 'Unavailable':
        return 'var(--error-red)'
      default:
        return 'var(--text-muted)'
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'var(--success-green)'
      case 'pending':
        return 'var(--accent-orange)'
      case 'cancelled':
        return 'var(--error-red)'
      default:
        return 'var(--text-muted)'
    }
  };

  if (!trainer) {
    return (
      <div className="trainer-profile-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading trainer profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trainer-profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="header-actions">
            <button 
              className="back-btn"
              onClick={handleBackToEmployees}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Employees
            </button>
            <button 
              className="edit-btn"
              onClick={handleEditProfile}
            >
              <Edit className="h-5 w-5" />
              Edit Profile
            </button>
          </div>
          
          <div className="header-content">
            <div className="trainer-info">
              <div className="trainer-avatar">
                {trainer.firstName[0]}{trainer.lastName[0]}
              </div>
              <div className="trainer-details">
                <h1>{trainer.firstName} {trainer.lastName}</h1>
                <p>{trainer.position} • {trainer.department}</p>
                <div className="trainer-type">
                  {getTrainerIcon(trainer.trainerType)}
                  <span>{trainer.trainerType === 'internal' ? 'Internal Trainer' : 'External Trainer'}</span>
                </div>
              </div>
            </div>
            
            <div className="trainer-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <Star className="h-6 w-6" style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{trainer.trainerProfile?.rating || 4.5}</div>
                  <div className="stat-label">Average Rating</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <BookOpen className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{trainer.trainerProfile?.totalCourses || 0}</div>
                  <div className="stat-label">Courses Taught</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Users className="h-6 w-6" style={{ color: 'var(--success-green)' }} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{trainer.trainerProfile?.totalStudents || 0}</div>
                  <div className="stat-label">Students Taught</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUp className="h-6 w-6" style={{ color: 'var(--primary-purple)' }} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{trainer.trainerProfile?.completionRate || 0}%</div>
                  <div className="stat-label">Completion Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <User className="h-4 w-4" />
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <BookOpen className="h-4 w-4" />
            Courses
          </button>
          <button 
            className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Calendar className="h-4 w-4" />
            Schedule
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <Star className="h-4 w-4" />
            Reviews
          </button>
          <button 
            className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="overview-grid">
                {/* Trainer Profile */}
                <div className="profile-card">
                  <div className="card-header">
                    <GraduationCap className="h-5 w-5" style={{ color: 'var(--primary-blue)' }} />
                    <h2>Trainer Profile</h2>
                  </div>
                  <div className="card-content">
                    <div className="profile-details">
                      <div className="detail-row">
                        <span className="detail-label">Specialization:</span>
                        <span className="detail-value">{trainer.trainerProfile?.specialization || 'General Training'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Experience:</span>
                        <span className="detail-value">{trainer.trainerProfile?.experience || '5+ years'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Availability:</span>
                        <span className="detail-value" style={{ color: getAvailabilityColor(trainer.trainerProfile?.availability) }}>
                          {trainer.trainerProfile?.availability || 'Available'}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Hourly Rate:</span>
                        <span className="detail-value">{trainer.trainerProfile?.hourlyRate || '$100'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Max Class Size:</span>
                        <span className="detail-value">{trainer.trainerProfile?.maxClassSize || 20} students</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Preferred Format:</span>
                        <span className="detail-value">{trainer.trainerProfile?.preferredFormat || 'In-person'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Certifications */}
                <div className="profile-card">
                  <div className="card-header">
                    <Zap className="h-5 w-5" style={{ color: 'var(--accent-green)' }} />
                    <h2>Skills & Certifications</h2>
                  </div>
                  <div className="card-content">
                    <div className="skills-section">
                      <h3>Technical Skills</h3>
                      <div className="skills-list">
                        {trainer.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    {trainer.trainerProfile?.certifications && trainer.trainerProfile.certifications.length > 0 && (
                      <div className="certifications-section">
                        <h3>Certifications</h3>
                        <div className="certifications-list">
                          {trainer.trainerProfile.certifications.map((cert, index) => (
                            <div key={index} className="certification-item">
                              <Award className="h-4 w-4" style={{ color: 'var(--accent-gold)' }} />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Teaching Style */}
                <div className="profile-card full-width">
                  <div className="card-header">
                    <Target className="h-5 w-5" style={{ color: 'var(--primary-purple)' }} />
                    <h2>Teaching Style & Approach</h2>
                  </div>
                  <div className="card-content">
                    <p className="teaching-description">
                      {trainer.trainerProfile?.teachingStyle || 'Interactive and engaging teaching approach focused on practical application of concepts.'}
                    </p>
                    
                    <div className="teaching-highlights">
                      <div className="highlight-item">
                        <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                        <span>Hands-on learning approach</span>
                      </div>
                      <div className="highlight-item">
                        <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                        <span>Real-world project examples</span>
                      </div>
                      <div className="highlight-item">
                        <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                        <span>Interactive Q&A sessions</span>
                      </div>
                      <div className="highlight-item">
                        <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                        <span>Personalized feedback</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="courses-content">
              <div className="courses-header">
                <h2>Courses Taught</h2>
                <div className="courses-stats">
                  <span className="stat-badge">
                    {trainer.coursesTaught?.length || 0} Total Courses
                  </span>
                  <span className="stat-badge">
                    {trainer.trainerProfile?.totalStudents || 0} Students
                  </span>
                </div>
              </div>
              
              <div className="courses-list">
                {trainer.coursesTaught && trainer.coursesTaught.length > 0 ? (
                  trainer.coursesTaught.map((course) => (
                    <div key={course.id} className="course-card">
                      <div className="course-header">
                        <div className="course-info">
                          <h3>{course.title}</h3>
                          <p className="course-category">{course.category}</p>
                        </div>
                        <div className="course-rating">
                          <Star className="h-4 w-4" style={{ color: 'var(--accent-gold)' }} />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      
                      <div className="course-details">
                        <div className="course-stat">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="course-stat">
                          <Users className="h-4 w-4" />
                          <span>{course.students} students</span>
                        </div>
                        <div className="course-stat">
                          <Calendar className="h-4 w-4" />
                          <span>{course.status === 'completed' ? 'Completed' : 'In Progress'}</span>
                        </div>
                      </div>
                      
                      {course.nextScheduled && (
                        <div className="course-schedule">
                          <Calendar className="h-4 w-4" />
                          <span>Next: {course.nextScheduled}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <BookOpen className="h-12 w-12" style={{ color: 'var(--text-muted)' }} />
                    <h3>No courses taught yet</h3>
                    <p>This trainer hasn't taught any courses yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="schedule-content">
              <div className="schedule-header">
                <h2>Schedule & Availability</h2>
                <button 
                  className="availability-btn"
                  onClick={() => setShowAvailabilityModal(true)}
                >
                  <Settings className="h-4 w-4" />
                  Manage Availability
                </button>
              </div>
              
              <div className="schedule-grid">
                <div className="schedule-card">
                  <div className="card-header">
                    <Clock className="h-5 w-5" style={{ color: 'var(--primary-blue)' }} />
                    <h3>Working Hours</h3>
                  </div>
                  <div className="card-content">
                    <div className="schedule-details">
                      <div className="schedule-item">
                        <span className="schedule-label">Timezone:</span>
                        <span className="schedule-value">{trainer.schedule?.timezone || 'PST'}</span>
                      </div>
                      <div className="schedule-item">
                        <span className="schedule-label">Hours:</span>
                        <span className="schedule-value">{trainer.schedule?.workingHours || '9:00 AM - 5:00 PM'}</span>
                      </div>
                      <div className="schedule-item">
                        <span className="schedule-label">Available Days:</span>
                        <span className="schedule-value">
                          {trainer.schedule?.availableDays?.join(', ') || 'Monday - Friday'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="schedule-card">
                  <div className="card-header">
                    <Calendar className="h-5 w-5" style={{ color: 'var(--success-green)' }} />
                    <h3>Upcoming Sessions</h3>
                  </div>
                  <div className="card-content">
                    {trainer.schedule?.upcomingSessions && trainer.schedule.upcomingSessions.length > 0 ? (
                      <div className="sessions-list">
                        {trainer.schedule.upcomingSessions.map((session) => (
                          <div key={session.id} className="session-item">
                            <div className="session-info">
                              <h4>{session.course}</h4>
                              <p>{session.date} • {session.time}</p>
                              <p>{session.location} • {session.students} students</p>
                            </div>
                            <div className="session-status">
                              <span 
                                className="status-badge"
                                style={{ color: getStatusColor(session.status) }}
                              >
                                {session.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <Calendar className="h-8 w-8" style={{ color: 'var(--text-muted)' }} />
                        <p>No upcoming sessions scheduled</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-header">
                <h2>Student Reviews</h2>
                <div className="reviews-summary">
                  <div className="rating-summary">
                    <Star className="h-6 w-6" style={{ color: 'var(--accent-gold)' }} />
                    <span className="rating-value">{trainer.trainerProfile?.averageRating || 4.5}</span>
                    <span className="rating-count">({trainer.trainerProfile?.totalReviews || 0} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="reviews-list">
                {trainer.reviews && trainer.reviews.length > 0 ? (
                  trainer.reviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            {review.studentName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="reviewer-details">
                            <h4>{review.studentName}</h4>
                            <p>{review.course}</p>
                          </div>
                        </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-4 w-4" 
                              style={{ 
                                color: i < review.rating ? 'var(--accent-gold)' : 'var(--text-muted)' 
                              }} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="review-content">
                        <p>{review.comment}</p>
                        <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <Star className="h-12 w-12" style={{ color: 'var(--text-muted)' }} />
                    <h3>No reviews yet</h3>
                    <p>This trainer hasn't received any reviews yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="analytics-content">
              <div className="analytics-header">
                <h2>Training Analytics</h2>
                <p>Performance metrics and insights</p>
              </div>
              
              <div className="analytics-grid">
                <div className="analytics-card">
                  <div className="card-header">
                    <TrendingUp className="h-5 w-5" style={{ color: 'var(--success-green)' }} />
                    <h3>Performance Metrics</h3>
                  </div>
                  <div className="card-content">
                    <div className="metrics-list">
                      <div className="metric-item">
                        <span className="metric-label">Average Rating:</span>
                        <span className="metric-value">{trainer.trainerProfile?.averageRating || 4.5}/5.0</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Completion Rate:</span>
                        <span className="metric-value">{trainer.trainerProfile?.completionRate || 90}%</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Total Students:</span>
                        <span className="metric-value">{trainer.trainerProfile?.totalStudents || 0}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Courses Taught:</span>
                        <span className="metric-value">{trainer.trainerProfile?.totalCourses || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="analytics-card">
                  <div className="card-header">
                    <BarChart3 className="h-5 w-5" style={{ color: 'var(--primary-blue)' }} />
                    <h3>Recent Activity</h3>
                  </div>
                  <div className="card-content">
                    <div className="activity-list">
                      <div className="activity-item">
                        <div className="activity-icon">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div className="activity-content">
                          <p>Completed "Advanced React Patterns" course</p>
                          <span className="activity-date">2 days ago</span>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="activity-icon">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="activity-content">
                          <p>Taught 24 students in JavaScript Fundamentals</p>
                          <span className="activity-date">1 week ago</span>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="activity-icon">
                          <Star className="h-4 w-4" />
                        </div>
                        <div className="activity-content">
                          <p>Received 5-star review from John Doe</p>
                          <span className="activity-date">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerProfilePage;
