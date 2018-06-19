BUCKET=;
aws s3 cp index.html s3://$BUCKET/index.html --acl public-read;
