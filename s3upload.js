const s3 = require('s3-node-client');
const AWS = require('aws-sdk');

const cf = new AWS.CloudFront();
const client = s3.createClient({
    s3Options: {
        credentials: new AWS.SharedIniFileCredentials(),   
        region: "eu-central-1",
    }
});
const params = {
    localDir: "./dist",
    deleteRemoved: true, // default false, whether to remove s3 objects
    s3Params: {
        Bucket: process.argv[2],
        // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
    distId: process.argv[3] // that have no corresponding local file.
};
const uploader = client.uploadDir(params);
uploader.on('error', function (err) {
    console.error("unable to sync:", err.stack);
});
uploader.on('progress', function () {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function () {
    console.log("done uploading");
    invalidate();
});

function invalidate() {
    if (!params.distId) {
        console.log('No distribution id supplied.');
        return;
    }
    cf.createInvalidation({
        DistributionId: params.distId,
        InvalidationBatch: {
            CallerReference: Date.now().toString(),
            Paths: {
                Quantity: 1,
                Items: ["/*"]
            }
        }
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Distribution successfully invalidated');
        }
    });
};