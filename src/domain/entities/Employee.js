/**
 * Employee domain entity
 * @fileoverview Core business rules and validation for Employee
 */

/**
 * Employee entity class
 */
export class Employee {
  constructor({
    id,
    companyId,
    personalInfo,
    profile = {},
    enrichment = {
      lastEnriched: null,
      sources: [],
      relevanceScore: 0,
      valueProposition: ''
    },
    status = 'active',
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  }) {
    this.id = id;
    this.companyId = companyId;
    this.personalInfo = personalInfo;
    this.profile = profile;
    this.enrichment = enrichment;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    
    this.validate();
  }

  /**
   * Validates employee data according to business rules
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.id) {
      throw new Error('Employee ID is required');
    }
    
    if (!this.companyId) {
      throw new Error('Company ID is required');
    }
    
    if (!this.personalInfo || !this.personalInfo.email || !this.isValidEmail(this.personalInfo.email)) {
      throw new Error('Valid employee email is required');
    }
    
    if (!this.personalInfo.firstName || !this.personalInfo.lastName) {
      throw new Error('Employee first and last name are required');
    }
    
    if (!['active', 'inactive', 'pending'].includes(this.status)) {
      throw new Error('Invalid employee status');
    }
    
    if (this.enrichment.relevanceScore < 0 || this.enrichment.relevanceScore > 1) {
      throw new Error('Relevance score must be between 0 and 1');
    }
  }

  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Enriches employee profile with external data
   * @param {Object} enrichmentData - Data from external sources
   * @param {Array<string>} sources - Sources used for enrichment
   */
  enrich(enrichmentData, sources = []) {
    this.profile = {
      ...this.profile,
      ...enrichmentData
    };
    
    this.enrichment = {
      lastEnriched: new Date().toISOString(),
      sources: [...new Set([...this.enrichment.sources, ...sources])],
      relevanceScore: this.calculateRelevanceScore(),
      valueProposition: this.generateValueProposition()
    };
    
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Calculates relevance score based on profile completeness
   * @returns {number} Relevance score between 0 and 1
   */
  calculateRelevanceScore() {
    const profileFields = [
      'bio', 'skills', 'certifications', 'education', 'experience',
      'linkedinUrl', 'githubUrl'
    ];
    
    const completedFields = profileFields.filter(field => 
      this.profile[field] && 
      (Array.isArray(this.profile[field]) ? this.profile[field].length > 0 : this.profile[field].trim().length > 0)
    );
    
    return completedFields.length / profileFields.length;
  }

  /**
   * Generates value proposition based on skills and experience
   * @returns {string} Generated value proposition
   */
  generateValueProposition() {
    const skills = this.profile.skills || [];
    const experience = this.profile.experience || '';
    const position = this.personalInfo.position || '';
    
    if (skills.length === 0) {
      return `${position} with ${experience} of experience`;
    }
    
    const topSkills = skills.slice(0, 3).join(', ');
    return `${position} with expertise in ${topSkills} and ${experience} of experience`;
  }

  /**
   * Updates employee profile
   * @param {Object} updates - Fields to update
   */
  updateProfile(updates) {
    const allowedFields = ['personalInfo', 'profile'];
    
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        this[field] = { ...this[field], ...updates[field] };
      }
    });
    
    this.updatedAt = new Date().toISOString();
    this.validate();
  }

  /**
   * Adds skills to employee profile
   * @param {Array<string>} newSkills - Skills to add
   */
  addSkills(newSkills) {
    const currentSkills = this.profile.skills || [];
    this.profile.skills = [...new Set([...currentSkills, ...newSkills])];
    this.enrichment.relevanceScore = this.calculateRelevanceScore();
    this.enrichment.valueProposition = this.generateValueProposition();
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Gets employee's skill level for a specific skill
   * @param {string} skill - Skill to check
   * @returns {string} Skill level (beginner, intermediate, advanced, expert)
   */
  getSkillLevel(skill) {
    // This would typically be determined by assessments or self-reporting
    // For now, return a default level
    return 'intermediate';
  }

  /**
   * Converts employee to plain object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      companyId: this.companyId,
      personalInfo: this.personalInfo,
      profile: this.profile,
      enrichment: this.enrichment,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

/**
 * Employee status enumeration
 */
export const EmployeeStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
};

/**
 * Enrichment sources enumeration
 */
export const EnrichmentSource = {
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  CREDLY: 'credly',
  ORCID: 'orcid',
  YOUTUBE: 'youtube',
  CROSSREF: 'crossref',
  GEMINI: 'gemini'
};
