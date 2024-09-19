import Stripe from "stripe";
import { Config } from "@netlify/functions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export default async (req: Request) => {
  const body = await req.text();

  const { lineItems } = JSON.parse(body);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:8888/checkout",
      cancel_url: "http://localhost:8888",
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const config: Config = {
  path: "/api/*",
};
