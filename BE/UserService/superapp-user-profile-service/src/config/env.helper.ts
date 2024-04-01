export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
console.log("NODE_ENV--->",env);
const envFile =
  env === 'development'? '.env.aws_dev'
    : env === 'qa'? '.env.aws_qa':
      env === 'stg'? '.env.aws_stg': 
    env === 'production'?'.env.aws_prod':'.env';
  
  return `${dest}/${envFile}`;
}