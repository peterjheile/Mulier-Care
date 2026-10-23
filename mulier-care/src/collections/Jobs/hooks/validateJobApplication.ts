import {
  APIError,
  type CollectionBeforeValidateHook,
} from 'payload'

function relationshipID(value: unknown): string | number | null {
  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }

  if (value && typeof value === 'object' && 'id' in value) {
    const id = value.id

    if (typeof id === 'string' || typeof id === 'number') {
      return id
    }
  }

  return null
}

export const validateJobApplication: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create' || !data) return data

  const formID = relationshipID(data.form)
  const jobID = relationshipID(data.job)

  if (formID == null) {
    throw new APIError('Please select a valid application form.', 400)
  }

  if (jobID == null) {
    // Internal lookup only: no job documents are returned to the applicant.
    const linkedJobs = await req.payload.find({
      collection: 'jobs',
      req,
      overrideAccess: true,
      depth: 0,
      limit: 1,
      pagination: false,
      where: {
        applicationForm: { equals: formID },
      },
    })

    if (linkedJobs.docs.length > 0) {
      throw new APIError(
        'Please submit this application from an opportunity page.',
        400,
      )
    }

    // Ordinary contact forms can still submit without a job.
    return data
  }

  const result = await req.payload.find({
    collection: 'jobs',
    req,
    overrideAccess: true,
    draft: false,
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      and: [
        { id: { equals: jobID } },
        { _status: { equals: 'published' } },
        { isOpen: { equals: true } },
        { applicationForm: { equals: formID } },
      ],
    },
  })

  const job = result.docs[0]

  if (!job) {
    throw new APIError(
      'This opportunity is unavailable or its application form has changed. Please reload the opportunity page.',
      400,
    )
  }

  data.job = job.id
  data.jobTitle = job.title

  return data
}