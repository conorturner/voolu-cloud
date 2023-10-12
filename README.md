# Voolu Cloud

- CloudFront distribution `app.voolu.io`
- Lambda Layer

## CF Stacks

Plan is to use cloudformation nested stacks to allow for resource growth and separation of concerns.

- stack.yml
    - Top level deployment
- cloudfront.yml
    - Contains cloudfront resources
- ws-gateway.yml
    - Websocket resources
- http-gateway.yml
    - HTTP api resources
- dashboard.yml
    - Frontend buckets
    - REST API resources
    
## Deployment pipeline

1. Deploy stacks under 'test' environment. (separate bucket folder for each envs yml template files).
2. Run 'e2e' test suite.
3. Deploy to production.

## Gateway

### Websocket `/ws-gateway`

- API
- Lambda function WS handler 

### HTTP `/http-gateway`

- Serverless RestAPI
- Lambda function HTTP handler

## Dashboard


### Frontend `/`

- Bucket for compiled frontend

### API `/api`

- Serverless RestAPI
- Lambda function HTTP handler
- S3Bucket for database 

## Services

- Services are modules shared between all functions at deploy time.
- Each service has AWS Resources associated with it.

### Auth

- S3Bucket for database

### Files

- S3Bucket for data storage 
- S3Bucket for database storage