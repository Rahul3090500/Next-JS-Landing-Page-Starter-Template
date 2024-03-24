// pages/api/get-auth-url.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { client_id, client_secret, redirect_uris } = req.body;

    // Scopes required for authentication with YouTube
    const scopes: string[] = ['https://www.googleapis.com/auth/youtube.force-ssl'];

    const oauth2Client = new google.auth.OAuth2({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect_uris[0]
    });

    // Generate authentication URL
    const authUrl = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });

    // Send the authentication URL back to the client
    res.status(200).json({ authUrl });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
