/**
 * Company domain entity
 * @fileoverview Core business rules and validation for Company
 */

/**
 * Company entity class
 */
export class Company {
  constructor({
    id,
    name,
    domain,
    industry,
    size,
    status = 'pending',
    hrContact,
    verification = { status: 'pending', verifiedAt: null, method: 'manual_review' },
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  }) {
    this.id = id;
    this.name = name;
    this.domain = domain;
    this.industry = industry;
    this.size = size;
    this.status = status;
    this.hrContact = hrContact;
    this.verification = verification;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    
    this.validate();
  }

  /**
   * Validates company data according to business rules
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name || this.name.trim().length < 2) {
      throw new Error('Company name must be at least 2 characters long');
    }
    
    if (!this.domain || !this.isValidDomain(this.domain)) {
      throw new Error('Invalid company domain');
    }
    
    if (!this.hrContact || !this.hrContact.email || !this.isValidEmail(this.hrContact.email)) {
      throw new Error('Valid HR contact email is required');
    }
    
    if (!['pending', 'verified', 'rejected'].includes(this.status)) {
      throw new Error('Invalid company status');
    }
  }

  /**
   * Validates domain format
   * @param {string} domain - Domain to validate
   * @returns {boolean} Whether domain is valid
   */
  isValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(domain);
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
   * Verifies the company
   * @param {string} method - Verification method used
   */
  verify(method = 'manual_review') {
    this.verification = {
      status: 'verified',
      verifiedAt: new Date().toISOString(),
      method
    };
    this.status = 'verified';
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Rejects the company verification
   * @param {string} reason - Reason for rejection
   */
  reject(reason) {
    this.verification = {
      status: 'rejected',
      verifiedAt: new Date().toISOString(),
      method: 'manual_review',
      reason
    };
    this.status = 'rejected';
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Updates company information
   * @param {Object} updates - Fields to update
   */
  update(updates) {
    const allowedFields = ['name', 'industry', 'size', 'hrContact'];
    
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        this[field] = updates[field];
      }
    });
    
    this.updatedAt = new Date().toISOString();
    this.validate();
  }

  /**
   * Converts company to plain object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      domain: this.domain,
      industry: this.industry,
      size: this.size,
      status: this.status,
      hrContact: this.hrContact,
      verification: this.verification,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

/**
 * Company status enumeration
 */
export const CompanyStatus = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};

/**
 * Verification methods enumeration
 */
export const VerificationMethod = {
  DOMAIN_VERIFICATION: 'domain_verification',
  MANUAL_REVIEW: 'manual_review',
  DOCUMENT_UPLOAD: 'document_upload'
};
