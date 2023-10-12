# Infrastructure

## Deployment process

1. Deploy bucket for cloudformation templates (this is only done once per stack name, as it never changes).
2. Upload template files to S3 (may need to run cloudformation package first).
3. Generate template URLs from bucket name and file names.
4. Deploy central stack with template names passed as parameters.

