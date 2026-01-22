// Gmail Integration for sending supply orders
// Uses Replit's Gmail connector

import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings?.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    console.log('Using cached access token');
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  console.log('REPLIT_CONNECTORS_HOSTNAME:', hostname);
  
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  console.log('Token type:', process.env.REPL_IDENTITY ? 'repl' : process.env.WEB_REPL_RENEWAL ? 'depl' : 'none');

  if (!xReplitToken) {
    console.error('X_REPLIT_TOKEN not found');
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  if (!hostname) {
    console.error('REPLIT_CONNECTORS_HOSTNAME not set');
    throw new Error('REPLIT_CONNECTORS_HOSTNAME not configured');
  }

  try {
    const url = 'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail';
    console.log('Fetching connection from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    });
    
    const data = await response.json();
    console.log('Connection response status:', response.status);
    console.log('Connection items count:', data.items?.length || 0);
    
    connectionSettings = data.items?.[0];
    
    if (!connectionSettings) {
      console.error('No Gmail connection found in response');
      throw new Error('Gmail not connected - no connection settings found');
    }
    
    const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

    if (!accessToken) {
      console.error('No access token in connection settings');
      console.error('Available settings keys:', Object.keys(connectionSettings?.settings || {}));
      throw new Error('Gmail not connected - no access token found');
    }
    
    console.log('Successfully obtained access token');
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

interface OrderItem {
  itemId: string;
  itemName: string;
  groupId: string;
  groupName: string;
}

function generateEmailBody(items: OrderItem[], orderId: string): string {
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.groupName]) {
      acc[item.groupName] = [];
    }
    acc[item.groupName].push(item);
    return acc;
  }, {} as Record<string, OrderItem[]>);

  // Get app URL for the link
  const appUrl = process.env.REPLIT_DEV_DOMAIN 
    ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
    : process.env.REPLIT_DEPLOYMENT_URL 
    ? `https://${process.env.REPLIT_DEPLOYMENT_URL}`
    : 'https://body-shop-supply-hub.replit.app';

  let html = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #f59e0b; border-bottom: 3px solid #f59e0b; padding-bottom: 15px; margin-top: 0;">
            Supply Order Request
          </h1>
          <div style="background: #fff8e6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #666; margin: 0;">
              <strong>Order ID:</strong> ${orderId}<br>
              <strong>Date:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          <h2 style="color: #333; margin-bottom: 15px;">Items Requested:</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
  `;

  for (const [groupName, groupItems] of Object.entries(grouped)) {
    html += `
      <tr style="background: #f59e0b;">
        <td style="padding: 12px 15px; font-weight: bold; color: white; font-size: 16px;">
          ${groupName}
        </td>
      </tr>
    `;
    for (const item of groupItems) {
      // Show full item name: "Group - Variant" or just "Item" for single items
      const displayName = groupName === item.itemName ? item.itemName : `${groupName} - ${item.itemName}`;
      html += `
        <tr style="background: white;">
          <td style="padding: 12px 15px 12px 25px; border-bottom: 1px solid #eee; font-size: 15px;">
            <span style="color: #333;">${displayName}</span>
          </td>
        </tr>
      `;
    }
  }

  html += `
          </table>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
            <span style="font-size: 18px; color: #92400e;">
              <strong>Total Items: ${items.length}</strong>
            </span>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/body-shop" 
               style="display: inline-block; background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              View Supply Hub
            </a>
          </div>
          
          <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; text-align: center; margin-bottom: 0;">
            This order was submitted from the Body Shop Supply Hub application.<br>
            <a href="${appUrl}" style="color: #f59e0b;">${appUrl}</a>
          </p>
        </div>
      </body>
    </html>
  `;

  return html;
}

function createEmailMessage(to: string, subject: string, htmlBody: string): string {
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    htmlBody
  ].join('\r\n');

  return Buffer.from(message).toString('base64url');
}

export async function sendOrderEmail(
  items: OrderItem[], 
  orderId: string, 
  managerEmail?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('Attempting to send email for order:', orderId);
    const gmail = await getUncachableGmailClient();
    console.log('Gmail client obtained successfully');
    
    // Use manager email from parameter or environment variable
    // Note: We cannot use gmail.users.getProfile() because the connection only has gmail.send scope
    const recipientEmail = managerEmail || process.env.MANAGER_EMAIL;
    
    if (!recipientEmail) {
      throw new Error('MANAGER_EMAIL environment variable not configured. Please set it in your secrets.');
    }

    console.log('Sending email to:', recipientEmail);
    const subject = `Supply Order #${orderId.slice(0, 8)} - ${items.length} items requested`;
    const htmlBody = generateEmailBody(items, orderId);
    const rawMessage = createEmailMessage(recipientEmail, subject, htmlBody);

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage
      }
    });

    console.log('Email sent successfully:', response.data.id);
    
    return { 
      success: true, 
      messageId: response.data.id || undefined 
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
}
