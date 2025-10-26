/**
 * Mock adapters for external services
 * @fileoverview Mock implementations of all external API integrations
 */

import { tryWithFallback } from '../utils/rollback.js'

/**
 * LinkedIn API Mock Adapter
 */
export async function callLinkedInAPI(endpoint, payload) {
  return tryWithFallback('linkedin', endpoint, payload, async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock LinkedIn profile data
    const mockProfile = {
      id: 'linkedin_' + Date.now(),
      firstName: 'John',
      lastName: 'Smith',
      headline: 'Senior Software Engineer at TechCorp',
      summary: 'Passionate software engineer with 5+ years of experience...',
      industry: 'Information Technology and Services',
      location: 'San Francisco Bay Area',
      profilePicture: 'https://via.placeholder.com/150',
      connections: 500,
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'TechCorp Solutions',
          duration: '2 years',
          description: 'Leading development of React applications...'
        }
      ],
      education: [
        {
          school: 'University of California',
          degree: 'Bachelor of Science in Computer Science',
          year: '2018'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']
    }
    
    return mockProfile
  })
}

/**
 * GitHub API Mock Adapter
 */
export async function callGitHubAPI(endpoint, payload) {
  return tryWithFallback('github', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const mockProfile = {
      id: 'github_' + Date.now(),
      login: 'johnsmith',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      bio: 'Full-stack developer passionate about clean code',
      avatar_url: 'https://via.placeholder.com/150',
      public_repos: 45,
      followers: 120,
      following: 80,
      created_at: '2018-03-15T10:00:00Z',
      repositories: [
        {
          name: 'react-training-app',
          description: 'Training management application built with React',
          language: 'JavaScript',
          stars: 25,
          forks: 8
        }
      ],
      languages: ['JavaScript', 'Python', 'TypeScript', 'Go'],
      contributions: {
        total: 1250,
        thisYear: 180
      }
    }
    
    return mockProfile
  })
}

/**
 * Credly API Mock Adapter
 */
export async function callCredlyAPI(endpoint, payload) {
  return tryWithFallback('credly', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const mockBadges = [
      {
        id: 'badge_001',
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        issueDate: '2023-06-15',
        imageUrl: 'https://via.placeholder.com/100',
        description: 'Validates technical expertise in developing and maintaining applications on AWS'
      },
      {
        id: 'badge_002',
        name: 'React Professional',
        issuer: 'Meta',
        issueDate: '2023-03-20',
        imageUrl: 'https://via.placeholder.com/100',
        description: 'Demonstrates proficiency in React development'
      }
    ]
    
    return mockBadges
  })
}

/**
 * ORCID API Mock Adapter
 */
export async function callORCIDAPI(endpoint, payload) {
  return tryWithFallback('orcid', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 700))
    
    const mockProfile = {
      id: 'orcid_0000-0000-0000-0001',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      works: [
        {
          title: 'Advanced React Patterns for Enterprise Applications',
          type: 'journal-article',
          publicationDate: '2023-08-15',
          journal: 'Journal of Software Engineering',
          doi: '10.1000/182'
        }
      ],
      affiliations: [
        {
          name: 'TechCorp Solutions',
          role: 'Senior Software Engineer',
          startDate: '2022-01-01'
        }
      ]
    }
    
    return mockProfile
  })
}

/**
 * YouTube API Mock Adapter
 */
export async function callYouTubeAPI(endpoint, payload) {
  return tryWithFallback('youtube', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 900))
    
    const mockChannel = {
      id: 'youtube_channel_001',
      title: 'John Smith - Tech Tutorials',
      description: 'Educational content about software development',
      subscriberCount: 2500,
      videoCount: 45,
      viewCount: 125000,
      videos: [
        {
          title: 'React Hooks Deep Dive',
          views: 15000,
          likes: 450,
          publishedAt: '2023-09-10'
        }
      ]
    }
    
    return mockChannel
  })
}

/**
 * Crossref API Mock Adapter
 */
export async function callCrossrefAPI(endpoint, payload) {
  return tryWithFallback('crossref', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockPublications = [
      {
        doi: '10.1000/182',
        title: 'Advanced React Patterns for Enterprise Applications',
        authors: ['John Smith', 'Jane Doe'],
        journal: 'Journal of Software Engineering',
        publicationDate: '2023-08-15',
        citations: 12
      }
    ]
    
    return mockPublications
  })
}

/**
 * Gemini AI API Mock Adapter
 */
export async function callGeminiAPI(endpoint, payload) {
  return tryWithFallback('gemini', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    const mockAnalysis = {
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      experienceLevel: 'Senior',
      specialization: 'Full-stack Development',
      valueProposition: 'Experienced full-stack developer with strong cloud expertise and modern framework knowledge',
      recommendations: [
        'Consider advanced cloud certifications',
        'Explore microservices architecture',
        'Develop leadership skills for team lead role'
      ],
      confidence: 0.92
    }
    
    return mockAnalysis
  })
}

/**
 * SendPulse API Mock Adapter
 */
export async function callSendPulseAPI(endpoint, payload) {
  return tryWithFallback('sendpulse', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const mockResponse = {
      success: true,
      messageId: 'msg_' + Date.now(),
      status: 'sent',
      recipient: payload.email,
      template: payload.template || 'welcome'
    }
    
    return mockResponse
  })
}

/**
 * SendGrid API Mock Adapter
 */
export async function callSendGridAPI(endpoint, payload) {
  return tryWithFallback('sendgrid', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const mockResponse = {
      success: true,
      messageId: 'sg_' + Date.now(),
      status: 'queued',
      recipient: payload.to,
      subject: payload.subject
    }
    
    return mockResponse
  })
}

/**
 * Skills Engine Mock Adapter
 */
export async function callSkillsEngine(endpoint, payload) {
  return tryWithFallback('skillsEngine', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const mockSkills = {
      normalizedSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      skillCategories: {
        'Frontend': ['JavaScript', 'React'],
        'Backend': ['Node.js', 'Python'],
        'Cloud': ['AWS']
      },
      skillLevels: {
        'JavaScript': 'Advanced',
        'React': 'Advanced',
        'Node.js': 'Intermediate',
        'Python': 'Intermediate',
        'AWS': 'Intermediate'
      },
      recommendations: [
        'Learn TypeScript for better JavaScript development',
        'Explore GraphQL for API development',
        'Consider Docker for containerization'
      ]
    }
    
    return mockSkills
  })
}

/**
 * Marketplace API Mock Adapter
 */
export async function callMarketplaceAPI(endpoint, payload) {
  return tryWithFallback('marketplace', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockCourses = [
      {
        id: 'course_001',
        title: 'Advanced React Patterns',
        instructor: 'Alex Rodriguez',
        duration: '8 hours',
        price: 199,
        rating: 4.8,
        students: 1250
      }
    ]
    
    return mockCourses
  })
}

/**
 * Assessment API Mock Adapter
 */
export async function callAssessmentAPI(endpoint, payload) {
  return tryWithFallback('assessment', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const mockAssessment = {
      id: 'assessment_001',
      score: 85,
      maxScore: 100,
      skills: ['JavaScript', 'React', 'Node.js'],
      recommendations: [
        'Focus on advanced JavaScript concepts',
        'Practice React performance optimization'
      ],
      completedAt: new Date().toISOString()
    }
    
    return mockAssessment
  })
}

/**
 * Content Studio API Mock Adapter
 */
export async function callContentStudioAPI(endpoint, payload) {
  return tryWithFallback('contentStudio', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 700))
    
    const mockContent = {
      id: 'content_001',
      title: 'React Hooks Tutorial',
      type: 'video',
      duration: '45 minutes',
      status: 'published',
      views: 2500,
      createdAt: '2023-10-01T00:00:00Z'
    }
    
    return mockContent
  })
}

/**
 * HR Reporting API Mock Adapter
 */
export async function callHRReportingAPI(endpoint, payload) {
  return tryWithFallback('hrReporting', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const mockReport = {
      id: 'report_001',
      type: 'training_completion',
      period: '2024-Q1',
      data: {
        totalEmployees: 150,
        completedTrainings: 120,
        completionRate: 0.8,
        averageScore: 85
      },
      generatedAt: new Date().toISOString()
    }
    
    return mockReport
  })
}

/**
 * DevLab API Mock Adapter
 */
export async function callDevLabAPI(endpoint, payload) {
  return tryWithFallback('devLab', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockProject = {
      id: 'project_001',
      name: 'Training Management System',
      status: 'active',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      teamSize: 5,
      progress: 75
    }
    
    return mockProject
  })
}

/**
 * Learning Analytics API Mock Adapter
 */
export async function callLearningAnalyticsAPI(endpoint, payload) {
  return tryWithFallback('learningAnalytics', endpoint, payload, async () => {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const mockAnalytics = {
      id: 'analytics_001',
      period: '30d',
      metrics: {
        totalLearningHours: 450,
        averageCompletionTime: 14,
        skillImprovement: 0.15,
        engagementScore: 4.2
      },
      trends: {
        learningHours: '+12%',
        completionRate: '+8%',
        satisfaction: '+5%'
      }
    }
    
    return mockAnalytics
  })
}

export default {
  callLinkedInAPI,
  callGitHubAPI,
  callCredlyAPI,
  callORCIDAPI,
  callYouTubeAPI,
  callCrossrefAPI,
  callGeminiAPI,
  callSendPulseAPI,
  callSendGridAPI,
  callSkillsEngine,
  callMarketplaceAPI,
  callAssessmentAPI,
  callContentStudioAPI,
  callHRReportingAPI,
  callDevLabAPI,
  callLearningAnalyticsAPI
}
