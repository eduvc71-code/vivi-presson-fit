const { Octokit } = require("@octokit/rest");

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const payload = JSON.parse(event.body);
        const { answers, priorities, timestamp } = payload;

        const date = new Date(timestamp);
        const dateStr = date.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
        const filename = `respuestas/${dateStr}.txt`;

        let content = `Cuestionario Vivi Presson Fit\nFecha: ${date.toLocaleString('es-ES')}\n==========================================\n\n`;

        const sections = [
            { name: "Tu negocio", range: [1, 4] },
            { name: "Página web", range: [5, 8] },
            { name: "Rutinas y programas online", range: [9, 15] },
            { name: "Citas y sesiones", range: [16, 20] },
            { name: "Instagram y redes sociales", range: [21, 25] },
            { name: "Instagram y mensajes", range: [26, 29] },
            { name: "Clientes y seguimiento", range: [30, 34] },
            { name: "Lo más importante", range: [35, 37] }
        ];

        const questionTexts = {
            1: "¿Cuáles son los servicios que ofreces actualmente?",
            2: "¿Qué servicio quieres impulsar o hacer crecer principalmente?",
            3: "¿Trabajas con paquetes, programas por semanas/meses o sesiones individuales?",
            4: "¿A qué tipo de cliente quieres llegar principalmente?",
            5: "¿Qué te gustaría conseguir con tu nueva página web?",
            6: "¿Qué quieres que pueda hacer una persona desde la web?",
            7: "¿Tienes logo, colores, fotografías y videos que quieras conservar?",
            8: "¿Hay alguna página web o estilo visual que te guste como referencia?",
            9: "¿Qué tipo de rutinas o programas quieres ofrecer online?",
            10: "¿Serán programas iguales para varios clientes, personalizados o ambos?",
            11: "¿Cómo entregas actualmente las rutinas a tus clientes?",
            12: "¿Qué material incluirá cada programa?",
            13: "¿Cuánto tiempo debería tener acceso una persona a cada programa?",
            14: "¿Quieres que el acceso a Google Drive sea automático?",
            15: "¿Cada cliente tendrá su propia carpeta privada?",
            16: "¿Qué tipos de citas necesitas manejar?",
            17: "¿Cómo coordinas actualmente los horarios con tus clientes?",
            18: "¿Quieres que reserven solos desde la página web?",
            19: "¿Quieres recordatorios automáticos antes de cada sesión?",
            20: "¿Qué plataforma prefieres para sesiones virtuales?",
            21: "¿Qué redes quieres manejar además de Instagram?",
            22: "¿Qué es lo que más trabajo te da al crear contenido?",
            23: "¿Grabarías varios videos en un solo día?",
            24: "¿Quieres que la IA ayude con edición, subtítulos, ideas?",
            25: "¿Quieres revisar y aprobar publicaciones antes?",
            26: "¿Qué preguntas recibes con mayor frecuencia por Instagram?",
            27: "¿Automatizar algunas respuestas de Instagram?",
            28: "¿Utilizar palabras clave en Reels y Stories?",
            29: "¿A dónde llevar a quien muestra interés?",
            30: "¿Cómo llevas el control de clientes actualmente?",
            31: "¿Te gustaría un solo lugar con toda la info de clientes?",
            32: "¿Avisos cuando queden pocas sesiones?",
            33: "¿Automatizar seguimiento de personas interesadas?",
            34: "¿Automatizar solicitud de testimonios?",
            35: "3 tareas que más tiempo te quitan",
            36: "¿Qué cosas prefieres seguir haciendo tú?",
            37: "¿Qué tendría que haber mejorado en 6 meses?"
        };

        sections.forEach(section => {
            content += `\n[${section.name.toUpperCase()}]\n`;
            content += '------------------------------------------\n';
               for (let i = section.range[0]; i <= section.range[1]; i++) {
                const ans = answers[i] || '(sin respuesta)';
                content += `\nResp.${i}.- ${questionTexts[i]}\n  → ${ans}\n`;
            }
        });

        content += `\n[PRIORIDADES 1-5]\n------------------------------------------\n`;
        Object.keys(priorities).forEach(key => {
            content += `  ${key}: ${priorities[key] || 'No especificado'}\n`;
        });

        content += `\n==========================================\nFin del cuestionario`;

        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

        await octokit.repos.createOrUpdateFileContents({
            owner: 'eduvc71-code',
            repo: 'vivi-presson-fit',
            path: filename,
            message: `Nueva respuesta: ${dateStr}`,
            content: Buffer.from(content).toString('base64'),
            committer: { name: 'Vivi Quiz', email: 'quiz@vivi.com' },
            author: { name: 'Vivi Quiz', email: 'quiz@vivi.com' }
        });

        return { statusCode: 200, body: JSON.stringify({ success: true, filename: filename }) };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
    }
};