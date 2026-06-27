import { useState } from "react";

const menuItems = [
  { name: "Margherita Clásica", desc: "Mozzarella fresca, albahaca, salsa de tomate San Marzano", price: "32.000", tag: "Favorita" },
  { name: "Pepperoni al Fuego", desc: "Pepperoni artesanal, mozzarella fundida, orégano fresco", price: "36.000", tag: null },
  { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmesano y fontina", price: "40.000", tag: "Especial" },
  { name: "Prosciutto e Rúgula", desc: "Jamón serrano, rúgula silvestre, lascas de parmesano", price: "42.000", tag: null },
  { name: "Vegetariana del Huerto", desc: "Champiñones, pimentón, cebolla caramelizada, aceitunas", price: "35.000", tag: null },
  { name: "Diavola Picante", desc: "Salami picante, jalapeños, mozzarella, aceite de chile", price: "38.000", tag: "Picante" },
];

const reviews = [
  { name: "Carolina M.", text: "La mejor pizza que hemos probado en la ciudad. El ambiente es como estar en la casa de la abuela italiana.", stars: 5 },
  { name: "Andrés R.", text: "El horno de leña hace toda la diferencia. La masa crujiente por fuera y suave por dentro. Volveremos.", stars: 5 },
  { name: "Familia Gómez", text: "Lugar perfecto para ir con niños. Cálido, acogedor y las porciones son generosas.", stars: 4 },
];

const C = {
  espresso: "#3B2316",
  nogal: "#7A4B2A",
  miel: "#C4893B",
  ladrillo: "#B5432A",
  pergamino: "#F5ECD7",
  harina: "#EDE3CC",
  albahaca: "#5A6B3C",
  oro: "#D4A44C",
  textoClaro: "#F5ECD7",
  textoOscuro: "#2D2118",
  borde: "#D6CBAF",
};

function Stars({ count }) {
  return (
    <span style={{ color: C.oro, fontSize: 16, letterSpacing: 2 }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function PizzeriaLanding() {
  const [activeNav, setActiveNav] = useState("inicio");

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: C.textoOscuro, background: C.pergamino, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        background: C.espresso,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ color: C.miel, fontSize: 24, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>La Leña</span>
          <span style={{ color: C.pergamino, fontSize: 11, opacity: 0.7, letterSpacing: 2, textTransform: "uppercase" }}>Pizzería</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["inicio", "menú", "nosotros", "reservar"].map(item => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: activeNav === item ? C.miel : "rgba(245,236,215,0.7)",
                fontSize: 13, fontWeight: 500, textTransform: "capitalize",
                borderBottom: activeNav === item ? `2px solid ${C.miel}` : "2px solid transparent",
                paddingBottom: 4, transition: "all 0.2s",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.espresso} 0%, ${C.nogal} 100%)`,
        padding: "80px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, ${C.pergamino} 40px, ${C.pergamino} 41px),
                            repeating-linear-gradient(0deg, transparent, transparent 40px, ${C.pergamino} 40px, ${C.pergamino} 41px)`,
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <p style={{ color: C.miel, fontSize: 13, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
            Desde 1998 · Horno de leña
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: C.pergamino,
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.1,
            margin: "0 0 16px",
          }}>
            Donde la masa<br/>se hace con alma
          </h1>
          <p style={{ color: "rgba(245,236,215,0.75)", fontSize: 16, lineHeight: 1.6, marginBottom: 32, maxWidth: 440, margin: "0 auto 32px" }}>
            Pizza artesanal horneada en leña de roble, con ingredientes frescos y la receta que nos dejó la Nonna.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: C.ladrillo, color: C.textoClaro,
              padding: "14px 36px", borderRadius: 6, border: "none",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>
              Reservar mesa
            </button>
            <button style={{
              background: "transparent", color: C.pergamino,
              padding: "14px 36px", borderRadius: 6,
              border: `1.5px solid rgba(245,236,215,0.35)`,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>
              Ver el menú
            </button>
          </div>
        </div>
      </section>

      {/* ─── FEATURES BAR ─── */}
      <section style={{
        background: C.harina,
        display: "flex", justifyContent: "center", flexWrap: "wrap",
        gap: 40, padding: "28px 24px",
        borderBottom: `1px solid ${C.borde}`,
      }}>
        {[
          { icon: "🔥", label: "Horno de leña a 450°C" },
          { icon: "🌿", label: "Ingredientes orgánicos" },
          { icon: "⏱️", label: "Masa fermentada 48h" },
          { icon: "👨‍🍳", label: "Receta familiar" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>{f.icon}</span>
            <span style={{ fontSize: 13, color: C.nogal, fontWeight: 500 }}>{f.label}</span>
          </div>
        ))}
      </section>

      {/* ─── MENÚ ─── */}
      <section style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: C.albahaca, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
            Nuestras pizzas
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: C.espresso, fontSize: 32, fontWeight: 700, margin: 0,
          }}>
            El menú de la casa
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {menuItems.map((item, i) => (
            <div key={i} style={{
              background: C.harina,
              borderRadius: 12,
              padding: "20px 20px 16px",
              border: `1px solid ${C.borde}`,
              position: "relative",
              transition: "box-shadow 0.2s",
            }}>
              {item.tag && (
                <span style={{
                  position: "absolute", top: 12, right: 12,
                  background: item.tag === "Picante" ? C.ladrillo : C.albahaca,
                  color: C.textoClaro,
                  fontSize: 10, fontWeight: 600,
                  padding: "3px 10px", borderRadius: 20,
                  textTransform: "uppercase", letterSpacing: 0.5,
                }}>
                  {item.tag}
                </span>
              )}
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.espresso, fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>
                {item.name}
              </h3>
              <p style={{ fontSize: 13, color: C.nogal, lineHeight: 1.5, margin: "0 0 12px" }}>
                {item.desc}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: C.ladrillo }}>
                  ${item.price}
                </span>
                <button style={{
                  background: C.espresso, color: C.textoClaro,
                  fontSize: 12, fontWeight: 500,
                  padding: "6px 16px", borderRadius: 6,
                  border: "none", cursor: "pointer",
                }}>
                  Ordenar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NOSOTROS ─── */}
      <section style={{ background: C.espresso, padding: "60px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: C.miel, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
            Nuestra historia
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: C.pergamino, fontSize: 30, fontWeight: 700, margin: "0 0 20px",
          }}>
            Una tradición que se saborea
          </h2>
          <p style={{ color: "rgba(245,236,215,0.7)", fontSize: 15, lineHeight: 1.8, margin: "0 0 32px" }}>
            En 1998, la abuela Lucía trajo de Nápoles más que una receta: trajo la forma de reunirse alrededor de una mesa,
            compartir pan caliente y sentir que estás en casa. Tres generaciones después, seguimos amasando con las mismas manos,
            el mismo horno de leña y el mismo amor por cada pizza que sale.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            {[
              { num: "26", label: "Años de tradición" },
              { num: "12k+", label: "Pizzas al mes" },
              { num: "4.8", label: "Estrellas Google" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.miel, fontSize: 36, fontWeight: 700 }}>{s.num}</div>
                <div style={{ color: "rgba(245,236,215,0.6)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESEÑAS ─── */}
      <section style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{ color: C.albahaca, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
            Lo que dicen nuestros clientes
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: C.espresso, fontSize: 28, fontWeight: 700, margin: 0,
          }}>
            Cada pizza cuenta una historia
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              background: C.harina, borderRadius: 12, padding: 20,
              border: `1px solid ${C.borde}`,
            }}>
              <Stars count={r.stars} />
              <p style={{ fontSize: 14, color: C.nogal, lineHeight: 1.6, margin: "12px 0", fontStyle: "italic" }}>
                "{r.text}"
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.espresso, margin: 0 }}>— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA RESERVAR ─── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.ladrillo} 0%, #9A3822 100%)`,
        padding: "48px 24px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: C.pergamino, fontSize: 28, fontWeight: 700, margin: "0 0 12px",
        }}>
          ¿Listo para sentirte en casa?
        </h2>
        <p style={{ color: "rgba(245,236,215,0.8)", fontSize: 15, margin: "0 0 24px" }}>
          Reserva tu mesa y deja que el aroma del horno te reciba.
        </p>
        <button style={{
          background: C.pergamino, color: C.ladrillo,
          padding: "14px 40px", borderRadius: 6, border: "none",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          letterSpacing: 0.5,
        }}>
          Reservar ahora
        </button>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        background: C.espresso,
        padding: "40px 24px 24px",
        color: "rgba(245,236,215,0.5)",
        fontSize: 13,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 12 }}>
              <span style={{ color: C.miel, fontSize: 20, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>La Leña</span>
              <span style={{ color: C.pergamino, fontSize: 10, opacity: 0.5, letterSpacing: 2, textTransform: "uppercase" }}>Pizzería</span>
            </div>
            <p style={{ lineHeight: 1.6 }}>Donde cada pizza se hace con el corazón y se hornea con tradición.</p>
          </div>
          <div>
            <h4 style={{ color: C.miel, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Horario</h4>
            <p style={{ lineHeight: 1.8 }}>Lun – Jue: 12:00 – 22:00<br/>Vie – Sáb: 12:00 – 00:00<br/>Domingo: 12:00 – 21:00</p>
          </div>
          <div>
            <h4 style={{ color: C.miel, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Contacto</h4>
            <p style={{ lineHeight: 1.8 }}>📍 Calle del Horno 42, Centro<br/>📞 (+57) 310 456 7890<br/>✉️ hola@lalena.co</p>
          </div>
        </div>
        <div style={{ maxWidth: 900, margin: "32px auto 0", borderTop: `1px solid rgba(245,236,215,0.1)`, paddingTop: 16, textAlign: "center", fontSize: 12 }}>
          © 2026 La Leña Pizzería · Hecho con masa madre y mucho cariño
        </div>
      </footer>
    </div>
  );
}
