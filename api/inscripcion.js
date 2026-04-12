import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, email, telefono, evento } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const sql = neon(process.env.DATABASE_URL);

  await sql`
    INSERT INTO inscripcion_eventos (nombre, email, telefono, evento)
    VALUES (${nombre}, ${email}, ${telefono || null}, ${evento || 'Soberanía Financiera — Junio 2026'})
  `;

  return res.status(200).json({ ok: true });
}
