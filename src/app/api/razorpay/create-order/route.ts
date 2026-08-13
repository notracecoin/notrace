import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || isNaN(Number(amount)) || Number(amount) < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay credentials not configured' }, { status: 500 });
    }

    const amountInPaise = Math.round(Number(amount) * 100);

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `notrace_donation_${Date.now()}`,
        notes: {
          purpose: 'notrace donation',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.description || 'Failed to create order' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      id: data.id,
      amount: data.amount,
      currency: data.currency,
      key: keyId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
