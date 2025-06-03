import dotenv from 'dotenv';
dotenv.config();
export const api = { 
    startDownload : '/api/video/startDownload',
    downloadStatus : '/api/video/downloadStatus/', //JobId is needed
    combineStatus : '/api/video/combineStatus/', //id is needed - download id
    trimVideo : 'api/video/trim', //start and end time as query parameter
    trimStatus : 'api/video/trimStatus/', //trimId needed - not download id
    quality : 'api/video/quality' //?resolution=144p&aspectRatio=reels
}

export const BASE_URL = process.env.BACKEND_URL!;