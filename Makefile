.PHONY: build push build-dir

# Parameter Variables
STACK_NAME=voolu-dev
REGION=eu-west-2
DOMAIN_NAME=dev.voolu.io
FRONTEND_SSL_CERT=arn:aws:acm:us-east-1:726426517603:certificate/487dc58d-c452-423c-82c0-2c4bf4647deb
GATEWAY_DOMAIN=discover.dev.voolu.io
GATEWAY_SSL_CERT=arn:aws:acm:us-east-1:726426517603:certificate/73bb511c-9607-452e-a08d-a90f753545dd
TCP_SERVICE_IMAGE=726426517603.dkr.ecr.eu-west-2.amazonaws.com/py-gateway:0.2.32

# Don't edit directly
TEMPLATE_BUCKET=$(STACK_NAME)-templates
FRAGMENT_BUCKET=$(STACK_NAME)-fragments

build:
	docker build -t $(TCP_SERVICE_IMAGE) .

run:
	docker run --cpus 0.25 --network host -it $(TCP_SERVICE_IMAGE)

push: build
	docker push $(TCP_SERVICE_IMAGE)

fragment-bucket:
	# Create bucket for templates (TODO: add SSL certificate creation to this step and rename as follows)
	aws --region $(REGION) cloudformation deploy --no-fail-on-empty-changeset \
		--template-file infrastructure/template-bucket.yml --capabilities CAPABILITY_IAM --stack-name $(TEMPLATE_BUCKET) \
		--parameter-overrides TemplateBucket=$(TEMPLATE_BUCKET) FragmentBucket=$(FRAGMENT_BUCKET)

build-dir:
	# Create local deployment fragments
	mkdir -p ./build/infrastructure
	mkdir -p ./build/pip-modules/python
	mkdir -p ./build/service-layer/python
	rsync -a ./venv/lib ./build/pip-modules/python
	rsync -a ./services ./build/service-layer/python

package:
	# Build lambda-layers stack
	aws --region $(REGION) cloudformation package --output-template-file ./build/infrastructure/lambda-layers.yml --s3-bucket $(FRAGMENT_BUCKET) --template-file infrastructure/lambda-layers.yml
	aws --region $(REGION) cloudformation package --output-template-file ./build/infrastructure/tcp-gateway.yml --s3-bucket $(FRAGMENT_BUCKET) --template-file infrastructure/tcp-gateway.yml
	aws --region $(REGION) cloudformation package --output-template-file ./build/infrastructure/http-gateway.yml --s3-bucket $(FRAGMENT_BUCKET) --template-file infrastructure/http-gateway.yml
	aws --region $(REGION) cloudformation package --output-template-file ./build/infrastructure/dashboard.yml --s3-bucket $(FRAGMENT_BUCKET) --template-file infrastructure/dashboard.yml
	aws --region $(REGION) cloudformation package --output-template-file ./build/infrastructure/health-check.yml --s3-bucket $(FRAGMENT_BUCKET) --template-file infrastructure/health-check.yml

	# Sync infra folder with template bucket
	aws s3 sync ./build/infrastructure s3://$(TEMPLATE_BUCKET)

deploy:
	# Deploy main stack
	aws --region $(REGION) cloudformation deploy --no-fail-on-empty-changeset --template-file infrastructure/stack.yml \
 											   --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM \
											   --stack-name $(STACK_NAME) --parameter-overrides BucketUrl="https://s3.amazonaws.com/$(TEMPLATE_BUCKET)" \
											   WebsiteDomainName=$(DOMAIN_NAME) \
											   WebsiteCertArn=$(FRONTEND_SSL_CERT) \
											   GatewayDomainName=$(GATEWAY_DOMAIN) \
											   GatewayCertArn=$(GATEWAY_SSL_CERT) \
											   TCPServiceImage=$(TCP_SERVICE_IMAGE) \
											   TCPPort=222

frontend:
	# Build dashboard and upload to s3
	bash -c 'cd ./dashboard/spa && SKIP_PREFLIGHT_CHECK=true npm run build'
	aws s3 sync --acl public-read --sse --delete ./dashboard/spa/build s3://$(DOMAIN_NAME)/

deploy-all:
	make push
	make fragment-bucket
	make build-dir
	make package
	make deploy

clean:
	rm -rf build/*