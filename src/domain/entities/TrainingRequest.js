/**
 * Training Request domain entity
 * @fileoverview Core business rules and validation for Training Request
 */

/**
 * Training Request entity class
 */
export class TrainingRequest {
  constructor({
    id,
    employeeId = null,
    companyId,
    type,
    title,
    description,
    skills = [],
    priority = 'medium',
    requestedBy,
    approvedBy = null,
    status = 'pending',
    requestedAt = new Date().toISOString(),
    approvedAt = null,
    scheduledFor = null,
    instructor = null
  }) {
    this.id = id;
    this.employeeId = employeeId;
    this.companyId = companyId;
    this.type = type;
    this.title = title;
    this.description = description;
    this.skills = skills;
    this.priority = priority;
    this.requestedBy = requestedBy;
    this.approvedBy = approvedBy;
    this.status = status;
    this.requestedAt = requestedAt;
    this.approvedAt = approvedAt;
    this.scheduledFor = scheduledFor;
    this.instructor = instructor;
    
    this.validate();
  }

  /**
   * Validates training request data according to business rules
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.id) {
      throw new Error('Training request ID is required');
    }
    
    if (!this.companyId) {
      throw new Error('Company ID is required');
    }
    
    if (!this.title || this.title.trim().length < 3) {
      throw new Error('Training title must be at least 3 characters long');
    }
    
    if (!this.description || this.description.trim().length < 10) {
      throw new Error('Training description must be at least 10 characters long');
    }
    
    if (!['personalized', 'group', 'instructor'].includes(this.type)) {
      throw new Error('Invalid training type');
    }
    
    if (!['low', 'medium', 'high', 'urgent'].includes(this.priority)) {
      throw new Error('Invalid priority level');
    }
    
    if (!['pending', 'approved', 'rejected', 'scheduled', 'completed', 'cancelled'].includes(this.status)) {
      throw new Error('Invalid training request status');
    }
    
    // For personalized training, employeeId is required
    if (this.type === 'personalized' && !this.employeeId) {
      throw new Error('Employee ID is required for personalized training');
    }
  }

  /**
   * Approves the training request
   * @param {string} approvedBy - ID of the person approving
   * @param {Object} instructor - Instructor assigned (optional)
   * @param {string} scheduledFor - Scheduled date/time
   */
  approve(approvedBy, instructor = null, scheduledFor = null) {
    this.approvedBy = approvedBy;
    this.approvedAt = new Date().toISOString();
    this.status = 'approved';
    
    if (instructor) {
      this.instructor = instructor;
    }
    
    if (scheduledFor) {
      this.scheduledFor = scheduledFor;
      this.status = 'scheduled';
    }
  }

  /**
   * Rejects the training request
   * @param {string} rejectedBy - ID of the person rejecting
   * @param {string} reason - Reason for rejection
   */
  reject(rejectedBy, reason) {
    this.approvedBy = rejectedBy;
    this.approvedAt = new Date().toISOString();
    this.status = 'rejected';
    this.rejectionReason = reason;
  }

  /**
   * Schedules the training
   * @param {string} scheduledFor - Scheduled date/time
   * @param {Object} instructor - Instructor assigned
   */
  schedule(scheduledFor, instructor) {
    if (this.status !== 'approved') {
      throw new Error('Only approved training requests can be scheduled');
    }
    
    this.scheduledFor = scheduledFor;
    this.instructor = instructor;
    this.status = 'scheduled';
  }

  /**
   * Marks training as completed
   */
  complete() {
    if (this.status !== 'scheduled') {
      throw new Error('Only scheduled training can be marked as completed');
    }
    
    this.status = 'completed';
    this.completedAt = new Date().toISOString();
  }

  /**
   * Cancels the training request
   * @param {string} cancelledBy - ID of the person cancelling
   * @param {string} reason - Reason for cancellation
   */
  cancel(cancelledBy, reason) {
    this.status = 'cancelled';
    this.cancelledBy = cancelledBy;
    this.cancelledAt = new Date().toISOString();
    this.cancellationReason = reason;
  }

  /**
   * Updates training request details
   * @param {Object} updates - Fields to update
   */
  update(updates) {
    const allowedFields = ['title', 'description', 'skills', 'priority'];
    
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        this[field] = updates[field];
      }
    });
    
    this.validate();
  }

  /**
   * Checks if training request can be modified
   * @returns {boolean} Whether request can be modified
   */
  canBeModified() {
    return ['pending', 'approved'].includes(this.status);
  }

  /**
   * Gets days until scheduled training
   * @returns {number|null} Days until training or null if not scheduled
   */
  getDaysUntilTraining() {
    if (!this.scheduledFor) {
      return null;
    }
    
    const now = new Date();
    const scheduled = new Date(this.scheduledFor);
    const diffTime = scheduled - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }

  /**
   * Converts training request to plain object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      employeeId: this.employeeId,
      companyId: this.companyId,
      type: this.type,
      title: this.title,
      description: this.description,
      skills: this.skills,
      priority: this.priority,
      requestedBy: this.requestedBy,
      approvedBy: this.approvedBy,
      status: this.status,
      requestedAt: this.requestedAt,
      approvedAt: this.approvedAt,
      scheduledFor: this.scheduledFor,
      instructor: this.instructor,
      rejectionReason: this.rejectionReason,
      cancellationReason: this.cancellationReason,
      completedAt: this.completedAt,
      cancelledAt: this.cancelledAt,
      cancelledBy: this.cancelledBy
    };
  }
}

/**
 * Training request types enumeration
 */
export const TrainingType = {
  PERSONALIZED: 'personalized',
  GROUP: 'group',
  INSTRUCTOR: 'instructor'
};

/**
 * Training request priorities enumeration
 */
export const TrainingPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

/**
 * Training request status enumeration
 */
export const TrainingStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};
