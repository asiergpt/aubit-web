import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, apellidos, email, telefono, asunto, mensaje } = req.body;

  if (!nombre || !email || !asunto) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const sql = neon(process.env.DATABASE_URL);

  await sql`
    INSERT INTO contacto_servicios (nombre, apellidos, email, telefono, asunto, mensaje)
    VALUES (${nombre}, ${apellidos || ''}, ${email}, ${telefono || null}, ${asunto}, ${mensaje || null})
  `;

  return res.status(200).json({ ok: true });
}
