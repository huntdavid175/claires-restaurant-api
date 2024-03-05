import { Request, Response } from "express";
import AWS from "aws-sdk";

const imageUpload = async (req: Request, res: Response) => {
  const file = req.file;
  const date = Date.now();
  const aws_access_key = process.env.AWS_ACCESS_KEY;
  const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;

  const s3 = new AWS.S3({
    accessKeyId: aws_access_key,
    secretAccessKey: aws_secret_access_key,
    region: "us-east-2",
  });

  const params = {
    Bucket: "claire-pizza-bucket",
    Key: `image-${date}`,
    Body: file?.buffer,
    ContentType: file?.mimetype,
  };

  try {
    const response = await s3.upload(params).promise();
    console.log(response);

    console.log("Image uploaded successfully to S3 bucket");
    res
      .status(200)
      .json({ message: "success", data: { imageUrl: response.Location } });
  } catch (error) {
    console.log(error);
    console.log("Something bad happened while uploading");
    res.status(403).json({ message: "Coulnd't process image" });
  }
};

export { imageUpload };
