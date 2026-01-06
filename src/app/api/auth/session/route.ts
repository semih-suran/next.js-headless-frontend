import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AuthServerService } from '@/features/auth/services/authServer';

const SESSION_DURATION = 60 * 60 * 24; 

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const cookieStore = await cookies();

    if (action === 'login') {
      const { email, password } = body;
      
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and password are required' }, 
          { status: 400 }
        );
      }

      const tokenData = await AuthServerService.login(email, password);
      
      if (!tokenData) {
        return NextResponse.json(
          { error: 'Invalid credentials' }, 
          { status: 401 }
        );
      }

      cookieStore.set('shopify_customer_token', tokenData.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_DURATION,
      });

      return NextResponse.json({ success: true, expiresAt: tokenData.expiresAt });
    }
    if (action === 'logout') {
      const token = cookieStore.get('shopify_customer_token')?.value;

      if (token) {
        await AuthServerService.logout(token);
      }

      cookieStore.delete('shopify_customer_token');

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Session API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;
  
  return NextResponse.json({ 
    isLoggedIn: !!token 
  });
}