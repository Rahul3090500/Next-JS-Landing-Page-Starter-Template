import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { client_id, client_secret, redirect_uris, code, youtubeUrl,payload } = req.body;

    const oauth2Client = new google.auth.OAuth2({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect_uris[0]
    });

    oauth2Client.getToken(code, async (err, token) => {
      if (err) {
        console.error('Error getting OAuth token:', err);
        return res.status(500).json({ error: 'Failed to authenticate' });
      }
      res.status(200).json({ message: 'Authentication response uploaded successfully',token:token });

      
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
