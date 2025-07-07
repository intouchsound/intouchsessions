import { VercelRequest,VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

const notion=new Client({auth:process.env.NOTION_API_KEY});
const dbSession=process.env.NOTION_DB_SESSION!;
const dbOther=process.env.NOTION_DB_OTHER!;

export default async(req:VercelRequest,res:VercelResponse)=>{
  if(req.method!=='POST')return res.status(405).end();
  const d=req.body as Record<string,string>;
  const isSession=d.formType==='SESSION';
  const db=isSession?dbSession:dbOther;
  try{
    await notion.pages.create({
      parent:{database_id:db},
      properties:{
        'First Name':{title:[{text:{content:d.firstName}}]},
        'Last Name':{rich_text:[{text:{content:d.lastName}}]},
        'Email':{email:d.email},
        'Phone':{phone_number:d.phone||null},
        'Message':{rich_text:[{text:{content:d.message}}]},
        ...(isSession?{
          'Artist Name':{rich_text:[{text:{content:d.artistName}}]},
          'Social Links':{rich_text:[{text:{content:d.socialLinks}}]},
          'Previous Sets':{rich_text:[{text:{content:d.previousSets}}]}
        }:{})
      }
    });
    res.json({ok:true});
  }catch(e){
    res.status(500).json({error:'Notion insert failed'});
  }
};
