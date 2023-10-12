import boto3

# some_binary_data = b'Here we have some data'
# more_binary_data = b'Here we have some more data'
#
# # Method 1: Object.put()
# s3 = boto3.resource('s3')
# object = s3.Object('my_bucket_name', 'my/key/including/filename.txt')
# object.put(Body=some_binary_data)

BUCKET_NAME = 'database-bucket-dev'


class S3Datastore:
    def __init__(self):
        self.s3 = boto3.client('s3')

    def put_object(self, key, data):
        self.s3.put_object(Bucket=BUCKET_NAME, Key=key, Body=data)

    def get_object(self, key):
        return self.s3.get_object(Bucket=BUCKET_NAME, Key=key)

    def list_objects(self, prefix):
        return self.s3.list_objects(
            Bucket=BUCKET_NAME,
            Prefix=prefix)

