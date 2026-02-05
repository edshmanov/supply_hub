
import nodemailer from 'nodemailer';

// Email interface
interface OrderItem {
  itemId: string;
  itemName: string;
  groupId: string;
  groupName: string;
}

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'edshmanov@gmail.com', // Sender
    pass: 'uoto syoc vffz ocan',   // App Password
  },
});

function generateEmailBody(items: OrderItem[], orderId: string): string {
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.groupName]) {
      acc[item.groupName] = [];
    }
    acc[item.groupName].push(item);
    return acc;
  }, {} as Record<string, OrderItem[]>);

  // Determine the environment URL
  // In local development it's localhost, in production it could be different
  // We try to approximate it or default to localhost
  const appUrl = 'http://localhost:3000';

  let html = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #f59e0b; border-bottom: 3px solid #f59e0b; padding-bottom: 15px; margin-top: 0;">
              Built Right Company Order
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
          </div>
        </body>
      </html>
    `;

  return html;
}

export async function sendOrderEmail(
  items: OrderItem[],
  orderId: string,
  managerEmail?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('Attempting to send email for order:', orderId);

    // Hardcoded recipient for reliability as requested (User's email for testing)
    const recipientEmail = 'edshmanov@gmail.com';

    console.log('Sending email to:', recipientEmail);
    // Updated subject as requested
    const subject = `Built Right Company Order #${orderId.slice(0, 8)} - ${items.length} items`;
    const htmlBody = generateEmailBody(items, orderId);

    const info = await transporter.sendMail({
      from: '"Built Right Company" <edshmanov@gmail.com>', // sender address
      to: recipientEmail, // list of receivers
      subject: subject, // Subject line
      html: htmlBody, // html body
    });

    console.log('Email sent successfully:', info.messageId);

    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}

