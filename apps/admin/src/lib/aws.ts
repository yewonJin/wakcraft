import {
  S3Client,
  ListObjectsCommand,
  ListObjectsCommandInput,
  ListObjectsCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'

const awsAccessKey = process.env.MY_AWS_ACCESS_KEY as string
const awsSecretKey = process.env.MY_AWS_SECRET_KEY as string
const awsS3Bucket = process.env.MY_AWS_S3_BUCKET as string
const awsS3BucketRegion = process.env.MY_AWS_S3_BUCKET_REGION as string

export type AWSDirectory =
  | 'noobprohacker'
  | 'placement_test'
  | 'event_noobprohacker'

export const AWS_BASE_URL = 'https://wakcraft.s3.ap-northeast-2.amazonaws.com/'

// s3 클라이언트 연결
export const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
  region: awsS3BucketRegion,
})

export const listS3Objects = async (content: AWSDirectory, episode: number) => {
  const params: ListObjectsCommandInput = {
    Bucket: awsS3Bucket,
    Prefix: `${content}/${episode}/`,
  }

  const res = (await s3.send(
    new ListObjectsCommand(params),
  )) as ListObjectsCommandOutput
  return res
}

export const createS3Folder = async (
  content: AWSDirectory,
  episode: number,
) => {
  const params: PutObjectCommandInput = {
    Bucket: awsS3Bucket,
    Key: `${content}/${episode}/`,
    Body: '',
  }

  const res = await s3.send(new PutObjectCommand(params))
  return res
}

export const uploadS3Image = async (
  fileBuffer: Buffer,
  fileName: string,
  contentType: 'image/png' | 'image/webp',
  content: AWSDirectory,
  episode: number,
) => {
  const params: PutObjectCommandInput = {
    Bucket: awsS3Bucket,
    Key: `${content}/${episode}/${fileName}`,
    Body: fileBuffer,
    ACL: 'public-read',
    ContentType: contentType,
  }

  const res = await s3.send(new PutObjectCommand(params))
  return res
}
