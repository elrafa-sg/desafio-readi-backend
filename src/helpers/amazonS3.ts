import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET } from '../config'

class AmazonS3 {
    static async saveFile (fileName: string, fileStream: any): Promise<string> {
        try {
            const s3client = new S3Client({
                credentials: {
                    accessKeyId: AWS_ACCESS_KEY_ID,
                    secretAccessKey: AWS_SECRET_ACCESS_KEY
                },
                region: AWS_REGION
            })

            const params = {
                Bucket: AWS_S3_BUCKET,
                Key: `${Date.now().toString()}-${fileName}`,
                Body: fileStream
            }

            const savedFile = await s3client.send(new PutObjectCommand(params))

            console.log('savedFile', savedFile)

            return 'savedFile'
        }
        catch (err) {
            console.log('erro saveFile ', err)
            return 'err.message'
        }
    }
}

export { AmazonS3 }