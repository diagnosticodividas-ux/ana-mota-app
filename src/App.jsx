import { useState } from "react";

const C = {
  bg: "#0C0B09",
  surface: "#141310",
  surfaceAlt: "#1C1A17",
  border: "#2C2820",
  borderLight: "#3A3530",
  gold: "#C9A96E",
  goldLight: "#E8D5A8",
  goldDim: "#8A7248",
  text: "#F2EDE4",
  textSec: "#A09880",
  textMuted: "#6A6358",
  green: "#7DAE8A",
  rose: "#C4857A",
  blue: "#7A9BB5",
  purple: "#9B8FB5",
};

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; font-family: 'DM Sans', sans-serif; color: ${C.text}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
  .serif { font-family: 'Cormorant Garamond', serif; }
  .fade-in { animation: fadeIn 0.35s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .gold-pulse { animation: goldPulse 3s ease-in-out infinite; }
  @keyframes goldPulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
  button { font-family: 'DM Sans', sans-serif; }
`;

const NAV = [
  { id: "dashboard", icon: "◈", label: "Dashboard" },
  { id: "content", icon: "◉", label: "Central de Conteúdo" },
  { id: "reels", icon: "▶", label: "Sistema de Reels" },
  { id: "stories", icon: "◌", label: "Sistema de Stories" },
  { id: "growth", icon: "↑", label: "Crescimento" },
  { id: "conversion", icon: "◆", label: "Conversão" },
  { id: "organization", icon: "▦", label: "Organização" },
  { id: "visual", icon: "◎", label: "Sistema Visual" },
  { id: "flows", icon: "∿", label: "Fluxos & Metas" },
  { id: "architecture", icon: "⬡", label: "Arquitetura" },
];

const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: 12, padding: "20px 24px", ...style
  }}>{children}</div>
);

const Tag = ({ children, color = C.goldDim }) => (
  <span style={{
    display: "inline-block", padding: "2px 10px", borderRadius: 20,
    fontSize: 11, letterSpacing: "0.08em", fontWeight: 500,
    background: `${color}22`, color, border: `1px solid ${color}44`
  }}>{children}</span>
);

const Pill = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "6px 16px", borderRadius: 20,
    border: `1px solid ${active ? C.gold : C.border}`,
    background: active ? `${C.gold}18` : "transparent",
    color: active ? C.gold : C.textSec,
    cursor: "pointer", fontSize: 12, letterSpacing: "0.05em",
    transition: "all 0.2s"
  }}>{children}</button>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 28 }}>
    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 300, color: C.text, letterSpacing: "0.02em", lineHeight: 1.2 }}>{children}</h2>
    {sub && <p style={{ color: C.textSec, marginTop: 6, fontSize: 13, letterSpacing: "0.04em" }}>{sub}</p>}
    <div style={{ width: 40, height: 1, background: C.gold, marginTop: 12, opacity: 0.6 }} />
  </div>
);

const ProgressBar = ({ value, color = C.gold, label }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ color: C.textSec, fontSize: 12 }}>{label}</span>
      <span style={{ color: C.gold, fontSize: 12 }}>{value}%</span>
    </div>}
    <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}CC)`, borderRadius: 2 }} />
    </div>
  </div>
);

const CheckItem = ({ children, done }) => {
  const [checked, setChecked] = useState(done || false);
  return (
    <div onClick={() => setChecked(!checked)} style={{
      display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0",
      borderBottom: `1px solid ${C.border}`, cursor: "pointer", userSelect: "none"
    }}>
      <div style={{
        minWidth: 18, height: 18, borderRadius: 4,
        border: `1.5px solid ${checked ? C.gold : C.borderLight}`,
        background: checked ? `${C.gold}22` : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: 1, transition: "all 0.2s"
      }}>
        {checked && <span style={{ color: C.gold, fontSize: 10 }}>✓</span>}
      </div>
      <span style={{ color: checked ? C.textMuted : C.text, fontSize: 13, textDecoration: checked ? "line-through" : "none", lineHeight: 1.5 }}>{children}</span>
    </div>
  );
};

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
const Dashboard = () => {
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  const weekContent = [
    { day: "Seg", type: "Reel", status: "done", topic: "Extrajudicial" },
    { day: "Ter", type: "Stories", status: "done", topic: "Bastidores" },
    { day: "Qua", type: "Reel", status: "pending", topic: "Superendividamento" },
    { day: "Qui", type: "Carrossel", status: "pending", topic: "Metamorfose" },
    { day: "Sex", type: "Reel", status: "empty", topic: "" },
    { day: "Sáb", type: "Stories", status: "empty", topic: "" },
    { day: "Dom", type: "—", status: "rest", topic: "" },
  ];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 32 }}>
        <p style={{ color: C.textMuted, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{today}</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, letterSpacing: "0.02em" }}>
          Olá, <em style={{ color: C.gold, fontStyle: "italic" }}>Ana Carla.</em>
        </h1>
        <p style={{ color: C.textSec, marginTop: 8, fontSize: 14 }}>
          Sua marca está em construção real. Continue — cada post conta.
        </p>
      </div>

      {/* DOIS PERFIS */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {[
          { handle: "@advanacarlamota", seg: "246", posts: "112", views: "4.1k", foco: "Advogados em transição", color: C.gold },
          { handle: "@raio.x.endividamento", seg: "—", posts: "—", views: "—", foco: "Clientes com dívidas", color: C.blue },
        ].map((p, i) => (
          <Card key={i} style={{ flex: 1, borderTop: `2px solid ${p.color}` }}>
            <div style={{ color: p.color, fontSize: 13, fontWeight: 500, marginBottom: 10 }}>{p.handle}</div>
            <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
              <div><div style={{ color: C.text, fontSize: 22, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>{p.seg}</div><div style={{ color: C.textMuted, fontSize: 10 }}>seguidores</div></div>
              <div><div style={{ color: C.text, fontSize: 22, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>{p.posts}</div><div style={{ color: C.textMuted, fontSize: 10 }}>posts</div></div>
              <div><div style={{ color: C.text, fontSize: 22, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>{p.views}</div><div style={{ color: C.textMuted, fontSize: 10 }}>views/mês</div></div>
            </div>
            <Tag color={p.color}>{p.foco}</Tag>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, marginBottom: 24 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <span style={{ color: C.textSec, fontSize: 12, letterSpacing: "0.08em" }}>CALENDÁRIO DA SEMANA</span>
            <Tag color={C.goldDim}>@advanacarlamota</Tag>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
            {weekContent.map((d) => (
              <div key={d.day} style={{
                background: d.status === "done" ? `${C.green}18` : d.status === "pending" ? `${C.gold}12` : C.surfaceAlt,
                border: `1px solid ${d.status === "done" ? C.green + "44" : d.status === "pending" ? C.gold + "33" : C.border}`,
                borderRadius: 8, padding: "10px 8px", textAlign: "center"
              }}>
                <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 6 }}>{d.day}</div>
                <div style={{ fontSize: 11, color: d.status === "done" ? C.green : d.status === "pending" ? C.gold : C.textMuted, fontWeight: 500, marginBottom: 4 }}>{d.type}</div>
                {d.status === "done" && <div style={{ color: C.green, fontSize: 14 }}>✓</div>}
                {d.status === "pending" && <div style={{ color: C.gold, fontSize: 10 }}>●</div>}
                {d.status === "rest" && <div style={{ color: C.textMuted, fontSize: 10 }}>—</div>}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ color: C.textSec, fontSize: 12, letterSpacing: "0.08em", marginBottom: 16 }}>TAREFAS DE HOJE</div>
          <CheckItem>Gravar Reel — tema superendividamento (@raio.x)</CheckItem>
          <CheckItem done>Responder DMs e comentários</CheckItem>
          <CheckItem>Postar 4 Stories sequência planejada</CheckItem>
          <CheckItem done>Atualizar banco de hooks</CheckItem>
          <CheckItem>Checar leads do Hotmart (Raio-X)</CheckItem>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <div style={{ color: C.textSec, fontSize: 12, letterSpacing: "0.08em", marginBottom: 18 }}>METAS DO MÊS</div>
          <ProgressBar label="Seguidores @advanacarlamota (meta: 400)" value={62} />
          <ProgressBar label="Reels publicados (meta: 12)" value={42} color={C.green} />
          <ProgressBar label="Vendas Raio-X via Hotmart" value={35} color={C.blue} />
          <ProgressBar label="Leads Mentoria Metamorfose" value={55} color={C.purple} />
        </Card>

        <Card>
          <div style={{ color: C.textSec, fontSize: 12, letterSpacing: "0.08em", marginBottom: 16 }}>SEUS PRODUTOS ATIVOS</div>
          {[
            { nome: "Raio-X do Endividamento", tipo: "Produto digital", link: "go.hotmart.com/I105978519D", cor: C.gold },
            { nome: "Mentoria Metamorfose Lucrativa", tipo: "Mentoria individual/grupo", link: "tinyurl.com/4umcmzx8", cor: C.purple },
          ].map((p, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.cor }} />
                <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{p.nome}</span>
              </div>
              <div style={{ color: C.textMuted, fontSize: 11, marginLeft: 14 }}>{p.tipo}</div>
              <div style={{ color: p.cor, fontSize: 10, marginLeft: 14, marginTop: 2, opacity: 0.8 }}>{p.link}</div>
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.08em", marginBottom: 10 }}>DIAGNÓSTICO DO PERFIL</div>
            <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}22`, borderRadius: 8, padding: 12 }}>
              <p style={{ color: C.textSec, fontSize: 12, lineHeight: 1.7 }}>
                ✦ Post mais engajado: depoimento de mentorada (22 curtidas)<br />
                ✦ Melhor formato: narrativa pessoal ("Deixa eu te contar...")<br />
                ✦ Oportunidade: stories com gradiente colorido destoam da identidade premium
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── CENTRAL DE CONTEÚDO ─────────────────────────────────────────────────────
const Content = () => {
  const [tab, setTab] = useState("hooks");

  const hooks = [
    { hook: "Eu era advogada do contencioso. Audiências, processos, prazo correndo, cliente ligando às 22h. Um dia decidi mudar.", type: "Narrativa", platform: "@advanacarlamota" },
    { hook: "A maioria das causas pode ser resolvida SEM processo judicial. Você sabia disso?", type: "Autoridade", platform: "@advanacarlamota" },
    { hook: "O maior erro de quem tem dívida não é gastar demais. É não saber o que está no seu contrato.", type: "Emocional", platform: "@raio.x" },
    { hook: "Advogado, você se sabota sem perceber. E eu vou te mostrar como.", type: "Provocação", platform: "@advanacarlamota" },
    { hook: "Chega de sofrer calado. Faça seu diagnóstico estratégico e descubra seus direitos.", type: "Conversão", platform: "@raio.x" },
    { hook: "Você pode ter uma advocacia lucrativa sem depender de processos. Vou te provar.", type: "Autoridade", platform: "@advanacarlamota" },
    { hook: "Em 2023, mais de 1 milhão de inventários foram resolvidos em cartório. O extrajudicial é o futuro.", type: "Dados", platform: "@advanacarlamota" },
    { hook: "80 milhões de processos aguardam julgamento. Por que o seu cliente esperaria anos sendo que existe outra saída?", type: "Dados", platform: "@advanacarlamota" },
  ];

  const calendar = [
    { day: "Seg", format: "Reel", perfil: "@advanacarlamota", theme: "Narrativa pessoal — a virada", type: "Conexão" },
    { day: "Ter", format: "Stories 4x", perfil: "ambos", theme: "Rotina real + bastidores", type: "Presença" },
    { day: "Qua", format: "Reel", perfil: "@raio.x", theme: "Superendividamento — dado + emoção", type: "Conversão" },
    { day: "Qui", format: "Carrossel", perfil: "@advanacarlamota", theme: "Metamorfose Lucrativa — como funciona", type: "Autoridade" },
    { day: "Sex", format: "Reel", perfil: "@advanacarlamota", theme: "Liberdade profissional — lifestyle", type: "Inspiração" },
    { day: "Sáb", format: "Stories", perfil: "ambos", theme: "Depoimento mentorada + CTA suave", type: "Prova Social" },
  ];

  return (
    <div className="fade-in">
      <SectionTitle sub="Conteúdo estratégico para @advanacarlamota e @raio.x.endividamento">Central de Conteúdo</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {["hooks", "temas", "calendario", "cta", "storytelling"].map(t => (
          <Pill key={t} active={tab === t} onClick={() => setTab(t)}>
            {t === "hooks" ? "Banco de Hooks" : t === "temas" ? "Temas Estratégicos" : t === "calendario" ? "Calendário Editorial" : t === "cta" ? "CTAs" : "Storytelling"}
          </Pill>
        ))}
      </div>

      {tab === "hooks" && (
        <div>
          <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}22`, borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
            <p style={{ color: C.textSec, fontSize: 12, lineHeight: 1.7 }}>
              ✦ Hooks extraídos do seu próprio conteúdo que já funcionou — adaptados e refinados para o tom premium da marca.
            </p>
          </div>
          {hooks.map((h, i) => (
            <div key={i} style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
                <Tag color={h.type === "Emocional" || h.type === "Narrativa" ? C.rose : h.type === "Autoridade" || h.type === "Dados" ? C.gold : h.type === "Conversão" ? C.green : C.blue}>{h.type}</Tag>
                <Tag color={C.textMuted}>{h.platform}</Tag>
              </div>
              <p style={{ color: C.text, fontSize: 14, lineHeight: 1.6 }}>"{h.hook}"</p>
            </div>
          ))}
        </div>
      )}

      {tab === "temas" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { title: "A Virada Profissional", desc: "Narrativa de saída do contencioso para o extrajudicial — sua história real é o maior ativo", icon: "∿", color: C.gold, perfil: "@advanacarlamota" },
            { title: "Advocacia Extrajudicial", desc: "Desmistificar, educar, mostrar o modelo — cartório, inventário, família, imobiliário", icon: "⚖", color: C.blue, perfil: "@advanacarlamota" },
            { title: "Metamorfose Lucrativa", desc: "Como outros advogados podem replicar o mesmo modelo com mentoria estruturada", icon: "◆", color: C.purple, perfil: "@advanacarlamota" },
            { title: "Raio-X do Endividamento", desc: "Conteúdo jurídico acessível para quem tem dívida: contratos, direitos, saída real", icon: "◈", color: C.rose, perfil: "@raio.x" },
            { title: "Superendividamento", desc: "Dados reais, histórias humanas, empoderamento jurídico sem juridiquês", icon: "◎", color: C.green, perfil: "@raio.x" },
            { title: "Liberdade Profissional", desc: "Rotina real, qualidade de vida, bastidores — a vida que a advocacia extrajudicial permite", icon: "◌", color: C.goldLight, perfil: "ambos" },
          ].map((t, i) => (
            <Card key={i} style={{ borderLeft: `3px solid ${t.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <span style={{ color: t.color, fontSize: 14, fontWeight: 500 }}>{t.title}</span>
              </div>
              <p style={{ color: C.textSec, fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>{t.desc}</p>
              <Tag color={C.textMuted}>{t.perfil}</Tag>
            </Card>
          ))}
        </div>
      )}

      {tab === "calendario" && (
        <div>
          <p style={{ color: C.textSec, fontSize: 13, marginBottom: 20 }}>Estrutura editorial semanal para os dois perfis simultaneamente.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {calendar.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 18px" }}>
                <span style={{ color: C.gold, fontFamily: "'Cormorant Garamond',serif", fontSize: 18, width: 30 }}>{c.day}</span>
                <Tag color={c.format.includes("Stories") ? C.purple : c.format === "Reel" ? C.blue : C.green}>{c.format}</Tag>
                <Tag color={C.textMuted}>{c.perfil}</Tag>
                <span style={{ color: C.text, fontSize: 13, flex: 1 }}>{c.theme}</span>
                <Tag color={C.goldDim}>{c.type}</Tag>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "cta" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { cta: "Me manda uma mensagem se isso faz sentido pra você.", type: "Conversa", context: "Final de Reel", perfil: "ambos" },
            { cta: "Quer entender como o Raio-X do Endividamento funciona? Link na bio.", type: "Conversão", context: "Reels @raio.x", perfil: "@raio.x" },
            { cta: "Se você é advogado e quer entender como estruturei isso, me chama.", type: "Mentoria", context: "Reels @adv", perfil: "@advanacarlamota" },
            { cta: "Salva esse post. Você vai precisar dele.", type: "Engajamento", context: "Carrossel educativo", perfil: "ambos" },
            { cta: "Comenta aqui: você ainda trabalha com contencioso ou já migrou?", type: "Comunidade", context: "Narrativa pessoal", perfil: "@advanacarlamota" },
            { cta: "Você assinou, mas leu? Manda sua dúvida no direct.", type: "Diagnóstico", context: "@raio.x", perfil: "@raio.x" },
          ].map((c, i) => (
            <Card key={i}>
              <p style={{ color: C.text, fontSize: 14, lineHeight: 1.7, marginBottom: 10 }}>"{c.cta}"</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Tag color={C.gold}>{c.type}</Tag>
                <Tag color={C.textMuted}>{c.context}</Tag>
                <Tag color={C.blue}>{c.perfil}</Tag>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "storytelling" && (
        <div>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ color: C.gold, fontSize: 14, fontFamily: "'Cormorant Garamond',serif", marginBottom: 14 }}>ARCO NARRATIVO REAL — Ana Carla Mota</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { step: "01", title: "O antes", desc: "Contencioso, audiências, cliente às 22h, faturamento instável" },
                { step: "02", title: "A decisão", desc: "Um dia decidi mudar — o momento real da virada" },
                { step: "03", title: "A construção", desc: "Extrajudicial, digital, sem escritório físico empresarial" },
                { step: "04", title: "O resultado", desc: "Previsibilidade, liberdade, mentoria de outros advogados" },
              ].map((s) => (
                <div key={s.step} style={{ background: C.surfaceAlt, borderRadius: 8, padding: 14 }}>
                  <div style={{ color: C.gold, fontSize: 24, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>{s.step}</div>
                  <div style={{ color: C.text, fontSize: 12, fontWeight: 500, margin: "6px 0 4px" }}>{s.title}</div>
                  <div style={{ color: C.textSec, fontSize: 11, lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div style={{ color: C.gold, fontSize: 14, fontFamily: "'Cormorant Garamond',serif", marginBottom: 14 }}>ESTRUTURA DO SEU MELHOR POST (185 views)</div>
            <p style={{ color: C.textSec, fontSize: 12, lineHeight: 1.7, marginBottom: 14 }}>
              O Reel "Deixa eu te contar uma coisa / Eu era advogada do contencioso..." é o seu template ideal. Use essa estrutura em variações:
            </p>
            {[
              { phase: "Abertura sem rodeios", ex: "'Eu era advogada do contencioso.' — direto, pessoal, sem introdução" },
              { phase: "Dor específica e real", ex: "Audiências. Processos. Prazo correndo. Cliente ligando às 22h." },
              { phase: "O dado emocional", ex: "Faturamento instável. Liberdade zero." },
              { phase: "A virada curta", ex: "Um dia decidi mudar." },
              { phase: "O convite", ex: "Me conta nos comentários como é a sua realidade." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.gold, fontSize: 12, minWidth: 20 }}>{i + 1}.</span>
                <div>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{s.phase}: </span>
                  <span style={{ color: C.textSec, fontSize: 12, fontStyle: "italic" }}>{s.ex}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

// ─── SISTEMA DE REELS ─────────────────────────────────────────────────────────
const Reels = () => {
  const [selected, setSelected] = useState(0);
  const models = [
    {
      title: "Reel de Narrativa Pessoal",
      type: "Storytelling",
      duration: "30–50s",
      perfil: "@advanacarlamota",
      cor: C.gold,
      structure: [
        { phase: "Hook (0–3s)", desc: "Primeira frase pessoal, sem introdução", example: "'Eu era advogada do contencioso. Um dia decidi mudar.'" },
        { phase: "Dor Real (3–15s)", desc: "Lista rítmica das dores — frases curtas, poderosas", example: "Audiências. Processos. Cliente às 22h. Liberdade zero." },
        { phase: "Virada (15–30s)", desc: "O que mudou e como — breve e concreto", example: "Migrei pro extrajudicial. Sem escritório físico. Com previsibilidade." },
        { phase: "CTA Natural (30–50s)", desc: "Pergunta aberta, sem vender", example: "'Me conta: você ainda está no contencioso?'" },
      ],
      tips: ["Câmera parada, olho direto — como uma conversa", "Voz calma, pausas entre as frases curtas", "Fundo neutro ou mesa real de trabalho", "CapCut: legenda automática, cortes secos, sem música ou instrumental baixo"],
    },
    {
      title: "Reel Jurídico Moderno",
      type: "Educacional",
      duration: "25–40s",
      perfil: "@raio.x.endividamento",
      cor: C.blue,
      structure: [
        { phase: "Dado de impacto (0–3s)", desc: "Número ou fato jurídico que surpreende", example: "'80 milhões de processos aguardam julgamento no judiciário.'" },
        { phase: "Contextualização (3–15s)", desc: "Por que isso importa para a pessoa que está assistindo", example: "Tom acessível — falar com quem tem dívida, não com advogados" },
        { phase: "Solução jurídica (15–30s)", desc: "O que o extrajudicial ou o diagnóstico resolve", example: "'A saída existe. E tem nome jurídico.'" },
        { phase: "CTA de serviço (30–40s)", desc: "Convite direto para o Raio-X", example: "'Link na bio. Faça seu diagnóstico estratégico.'" },
      ],
      tips: ["Estética do @raio.x: escuro + dourado, sofisticado", "Roupas: preto ou azul-marinho com acessório dourado", "Fundo: simples, sem distrações", "Evitar juridiquês — falar com o cliente, não com o colega"],
    },
    {
      title: "Reel de Prova Social",
      type: "Depoimento",
      duration: "20–35s",
      perfil: "@advanacarlamota",
      cor: C.purple,
      structure: [
        { phase: "Contexto (0–5s)", desc: "Apresenta a mentorada ou resultado brevemente", example: "'Essa advogada entrou na mentoria sem saber como cobrar. Olha o que ela me contou.'" },
        { phase: "Depoimento (5–25s)", desc: "Print ou fala real da mentorada — autenticidade acima de tudo", example: "Confiança para atuar no extrajudicial, conhecimento, autoridade" },
        { phase: "Conexão (25–30s)", desc: "Conecta o resultado ao potencial de quem assiste", example: "'Isso pode ser você. Me manda mensagem.'" },
      ],
      tips: ["Seu melhor post tem 22 curtidas — template validado", "Mostre o print real do depoimento (sem edição forçada)", "Hashtag: #MetamorfoseLucrativa", "Tom de gratidão genuína, não de celebração exagerada"],
    },
  ];

  const m = models[selected];

  return (
    <div className="fade-in">
      <SectionTitle sub="Estruturas baseadas no seu conteúdo que já gerou resultado">Sistema de Reels</SectionTitle>
      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        {models.map((mod, i) => <Pill key={i} active={selected === i} onClick={() => setSelected(i)}>{mod.title}</Pill>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ color: m.cor, fontSize: 22, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, marginBottom: 8 }}>{m.title}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Tag color={C.blue}>{m.type}</Tag>
                  <Tag color={C.green}>{m.duration}</Tag>
                  <Tag color={m.cor}>{m.perfil}</Tag>
                </div>
              </div>
            </div>
            {m.structure.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: i < m.structure.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ minWidth: 8, height: 8, background: m.cor, borderRadius: "50%", marginTop: 6, opacity: 0.7 }} />
                <div>
                  <div style={{ color: C.goldLight, fontSize: 12, fontWeight: 500, marginBottom: 4 }}>{s.phase}</div>
                  <div style={{ color: C.text, fontSize: 13, marginBottom: 4, lineHeight: 1.5 }}>{s.desc}</div>
                  <div style={{ color: C.textMuted, fontSize: 12, fontStyle: "italic" }}>{s.example}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 14 }}>ORIENTAÇÕES DE PRODUÇÃO</div>
            {m.tips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: m.cor, fontSize: 10, marginTop: 4 }}>●</span>
                <span style={{ color: C.text, fontSize: 13, lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 14 }}>ORIENTAÇÃO CAPCUT</div>
            {["Proporção: 9:16 (vertical)", "Legenda: fonte limpa, tamanho médio, centralizada", "Cortes: secos — sem transições animadas", "Música: instrumental ambient ou silêncio", "Filtro: natural, temperatura quente", "Thumbnail: frame do rosto + texto em serif"].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                <span style={{ color: C.goldDim }}>→</span>
                <span style={{ color: C.textSec }}>{tip}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ─── SISTEMA DE STORIES ───────────────────────────────────────────────────────
const Stories = () => {
  const [seq, setSeq] = useState(0);
  const sequences = [
    {
      name: "Sequência de Presença",
      frames: [
        { n: 1, type: "Abertura", desc: "Foto real da rotina — café, mesa, bastidores sem filtro" },
        { n: 2, type: "Conteúdo", desc: "1 insight jurídico ou de posicionamento em texto simples" },
        { n: 3, type: "Humanização", desc: "Algo pessoal e leve — filho, pet, momento de pausa" },
        { n: 4, type: "Interação", desc: "Caixinha: 'O que te trava na advocacia hoje?'" },
      ]
    },
    {
      name: "Sequência do @raio.x",
      frames: [
        { n: 1, type: "Dado de impacto", desc: "Estatística ou informação jurídica sobre dívida" },
        { n: 2, type: "Humanização", desc: "Relato breve de um caso real (sem identificar cliente)" },
        { n: 3, type: "Solução", desc: "O que o Raio-X do Endividamento entrega" },
        { n: 4, type: "CTA direto", desc: "'Link na bio. Faça seu diagnóstico agora.'" },
      ]
    },
    {
      name: "Sequência de Venda Natural",
      frames: [
        { n: 1, type: "Identificação", desc: "Dor específica de advogados em transição" },
        { n: 2, type: "Prova Social", desc: "Print do depoimento real da mentorada" },
        { n: 3, type: "Apresentação", desc: "Mentoria Metamorfose Lucrativa — o que é, como funciona" },
        { n: 4, type: "CTA humano", desc: "'Me chama no direct se quiser entender mais.'" },
      ]
    },
  ];

  const s = sequences[seq];

  return (
    <div className="fade-in">
      <SectionTitle sub="Sistema de stories estratégicos para os dois perfis">Sistema de Stories</SectionTitle>

      <div style={{ background: `${C.rose}10`, border: `1px solid ${C.rose}33`, borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
        <p style={{ color: C.textSec, fontSize: 12, lineHeight: 1.7 }}>
          ⚠ <strong style={{ color: C.rose }}>Oportunidade identificada:</strong> seus stories atuais usam gradientes coloridos (verde/azul/laranja) que contrastam com a identidade premium da marca. Recomenda-se migrar para fundo escuro ou neutro + texto em creme/dourado, alinhado com a estética do @raio.x.endividamento.
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        {sequences.map((s, i) => <Pill key={i} active={seq === i} onClick={() => setSeq(i)}>{s.name}</Pill>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {s.frames.map((f) => (
          <Card key={f.n} style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
            <div style={{ color: C.gold, fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, marginBottom: 8 }}>{String(f.n).padStart(2, "0")}</div>
            <Tag color={C.goldDim}>{f.type}</Tag>
            <p style={{ color: C.text, fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>{f.desc}</p>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 14 }}>NOVA ESTÉTICA DE STORIES RECOMENDADA</div>
          {[
            { item: "Fundo", val: "Escuro (#141310) ou creme (#F2EDE4)" },
            { item: "Tipografia", val: "Serif elegante ou sans-serif leve" },
            { item: "Cor do texto", val: "Branco, creme ou dourado (#C9A96E)" },
            { item: "Evitar", val: "Gradientes coloridos, fontes decorativas, efeitos chamativos" },
            { item: "Mood", val: "Calmo, sofisticado, verdadeiro" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ color: C.textMuted, fontSize: 12, minWidth: 90 }}>{r.item}</span>
              <span style={{ color: C.text, fontSize: 12 }}>{r.val}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 14 }}>ROTINA DIÁRIA DE STORIES</div>
          {[
            { time: "8h", action: "1–2 stories presença / rotina real" },
            { time: "12h", action: "Story de conteúdo ou informação jurídica" },
            { time: "16h", action: "Interação — caixinha ou enquete simples" },
            { time: "19h", action: "Encerramento + CTA natural (produto ou conversa)" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: `1px solid ${C.border}`, alignItems: "center" }}>
              <span style={{ color: C.gold, fontSize: 13, fontFamily: "'Cormorant Garamond',serif", minWidth: 36 }}>{r.time}</span>
              <span style={{ color: C.text, fontSize: 13 }}>{r.action}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ─── CRESCIMENTO ──────────────────────────────────────────────────────────────
const Growth = () => (
  <div className="fade-in">
    <SectionTitle sub="Estratégia orgânica real — de 246 para 1k e além">Sistema de Crescimento</SectionTitle>

    <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}22`, borderRadius: 10, padding: "14px 18px", marginBottom: 24 }}>
      <p style={{ color: C.textSec, fontSize: 13, lineHeight: 1.7 }}>
        ✦ Com 246 seguidores e 4.1k views/mês, você está no <strong style={{ color: C.gold }}>estágio de tração</strong> — o mais importante. A consistência agora tem retorno exponencial. Seu post mais engajado (185 views, 7 curtidas) tem taxa de engajamento de ~3% — acima da média do Instagram.
      </p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
      <Card>
        <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 16 }}>FREQUÊNCIA IDEAL SEMANAL</div>
        {[
          { format: "Reels @advanacarlamota", qty: "3", priority: "Alta", color: C.blue },
          { format: "Reels @raio.x", qty: "2", priority: "Alta", color: C.rose },
          { format: "Stories (ambos)", qty: "4–6/dia", priority: "Alta", color: C.purple },
          { format: "Carrossel @advanacarlamota", qty: "1", priority: "Média", color: C.gold },
          { format: "Depoimento mentorada", qty: "1–2/mês", priority: "Média", color: C.green },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color }} />
              <span style={{ color: C.text, fontSize: 12 }}>{f.format}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: C.gold, fontSize: 13, fontFamily: "'Cormorant Garamond',serif" }}>{f.qty}</span>
              <Tag color={f.priority === "Alta" ? C.green : C.gold}>{f.priority}</Tag>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 16 }}>O QUE ESTÁ FUNCIONANDO (manter)</div>
        {[
          { item: "Narrativa pessoal no Reel", resultado: "185 views, melhor alcance" },
          { item: "Depoimento de mentorada", resultado: "22 curtidas — maior engajamento" },
          { item: "Conteúdo jurídico com dado", resultado: "Autoridade + compartilhamento" },
          { item: "Tom de conversa, não de aula", resultado: "Conexão e identificação real" },
        ].map((f, i) => (
          <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ color: C.goldLight, fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{f.item}</div>
            <div style={{ color: C.textSec, fontSize: 12 }}>{f.resultado}</div>
          </div>
        ))}
        <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginTop: 14, marginBottom: 10 }}>O QUE AJUSTAR</div>
        {[
          { item: "Estética dos stories", ajuste: "Migrar gradientes coloridos para fundo escuro/neutro" },
          { item: "Frequência de Reels", ajuste: "Aumentar de 1 para 3/semana progressivamente" },
        ].map((f, i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ color: C.rose, fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{f.item}</div>
            <div style={{ color: C.textSec, fontSize: 12 }}>{f.ajuste}</div>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

// ─── CONVERSÃO ────────────────────────────────────────────────────────────────
const Conversion = () => (
  <div className="fade-in">
    <SectionTitle sub="Funil real com os dois produtos — Raio-X e Metamorfose Lucrativa">Sistema de Conversão</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
      <Card>
        <div style={{ color: C.gold, fontSize: 16, fontFamily: "'Cormorant Garamond',serif", marginBottom: 16 }}>Produto 1 — Raio-X do Endividamento</div>
        {[
          { label: "Perfil", value: "@raio.x.endividamento" },
          { label: "Formato", value: "Diagnóstico jurídico estratégico" },
          { label: "Link", value: "go.hotmart.com/I105978519D" },
          { label: "CTA principal", value: "Link na bio + stories diretos" },
          { label: "Público", value: "Pessoas com dívidas, contratos abusivos" },
          { label: "Próximo passo", value: "Contato direto com a advogada" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ color: C.textMuted, fontSize: 12, minWidth: 100 }}>{r.label}</span>
            <span style={{ color: r.label === "Link" ? C.gold : C.text, fontSize: 12 }}>{r.value}</span>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ color: C.purple, fontSize: 16, fontFamily: "'Cormorant Garamond',serif", marginBottom: 16 }}>Produto 2 — Mentoria Metamorfose Lucrativa</div>
        {[
          { label: "Perfil", value: "@advanacarlamota" },
          { label: "Formato", value: "Mentoria individual ou grupo" },
          { label: "Link", value: "tinyurl.com/4umcmzx8" },
          { label: "CTA principal", value: "Direct + stories de depoimento" },
          { label: "Público", value: "Advogados em transição para extrajudicial" },
          { label: "Resultado entregue", value: "Confiança, posicionamento, lucro" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ color: C.textMuted, fontSize: 12, minWidth: 100 }}>{r.label}</span>
            <span style={{ color: r.label === "Link" ? C.purple : C.text, fontSize: 12 }}>{r.value}</span>
          </div>
        ))}
      </Card>
    </div>

    <Card>
      <div style={{ color: C.gold, fontSize: 14, fontFamily: "'Cormorant Garamond',serif", marginBottom: 18 }}>Funil Orgânico — Os Dois Perfis</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { step: "Topo", label: "Descoberta", desc: "Reel de narrativa ou dado jurídico atrai seguidor qualificado. Ele não te conhecia.", color: C.blue },
          { step: "Meio", label: "Confiança", desc: "Stories diários + depoimentos constroem autoridade e proximidade. Ele passa a te acompanhar.", color: C.purple },
          { step: "Fundo", label: "Conversão", desc: "CTA no direct, link do Hotmart ou mensagem no WhatsApp. Ele compra ou agenda.", color: C.gold },
        ].map((f, i) => (
          <div key={i} style={{ background: C.surfaceAlt, borderRadius: 10, padding: 16, borderTop: `2px solid ${f.color}` }}>
            <Tag color={f.color} style={{ marginBottom: 10 }}>{f.step}</Tag>
            <div style={{ color: C.text, fontSize: 14, fontWeight: 500, margin: "10px 0 6px" }}>{f.label}</div>
            <div style={{ color: C.textSec, fontSize: 12, lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── ORGANIZAÇÃO ──────────────────────────────────────────────────────────────
const Organization = () => (
  <div className="fade-in">
    <SectionTitle sub="Produção em lote, checklists e gestão de dois perfis simultâneos">Sistema de Organização</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
      <Card>
        <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 16 }}>CHECKLIST DE GRAVAÇÃO</div>
        <CheckItem>Roteiro ou tópicos escritos (não decorados)</CheckItem>
        <CheckItem>Iluminação: janela lateral ou ring light suave</CheckItem>
        <CheckItem>Fundo: neutro, mesa real ou ambiente da rotina</CheckItem>
        <CheckItem>Roupa: preto, azul-marinho ou creme (identidade)</CheckItem>
        <CheckItem>3+ takes por vídeo para ter opção de escolha</CheckItem>
        <CheckItem>Hook testado em voz alta antes de gravar</CheckItem>
        <CheckItem>Definir: @advanacarlamota ou @raio.x?</CheckItem>
      </Card>
      <Card>
        <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 16 }}>CHECKLIST DE POSTAGEM</div>
        <CheckItem>Legenda revisada com CTA claro</CheckItem>
        <CheckItem>Hashtags corretas para o perfil e tema</CheckItem>
        <CheckItem>Thumbnail escolhida (frame do rosto + expressão)</CheckItem>
        <CheckItem>Horário: 18h–21h (melhor janela)</CheckItem>
        <CheckItem>Stories de apoio gravados para o mesmo dia</CheckItem>
        <CheckItem>Compartilhar nos stories após postar</CheckItem>
        <CheckItem>Responder primeiros comentários em 30 min</CheckItem>
      </Card>
    </div>

    <Card>
      <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 18 }}>PRODUÇÃO EM LOTE — MODELO SEMANAL (2 PERFIS)</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          {
            title: "Bloco de Planejamento", time: "Segunda — 1h", color: C.gold,
            steps: ["Revisar métricas da semana anterior", "Definir 3 Reels @advana + 2 @raio.x", "Escrever estrutura de cada vídeo", "Programar stories dos dois perfis"],
          },
          {
            title: "Bloco de Gravação", time: "Quarta — 2–3h", color: C.blue,
            steps: ["Gravar Reels @advanacarlamota (3)", "Gravar Reels @raio.x.endividamento (2)", "Fotografar bastidores para stories", "Registrar depoimentos se houver"],
          },
          {
            title: "Bloco de Edição e Postagem", time: "Quinta + Sexta — 2h", color: C.purple,
            steps: ["Editar todos os Reels no CapCut", "Escrever legendas com CTAs certos", "Agendar posts (Buffer ou manual)", "Atualizar banco de ideias"],
          },
        ].map((b, i) => (
          <div key={i} style={{ background: C.surfaceAlt, borderRadius: 10, padding: 18, borderTop: `2px solid ${b.color}` }}>
            <div style={{ color: b.color, fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{b.title}</div>
            <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 14 }}>{b.time}</div>
            {b.steps.map((s, j) => (
              <div key={j} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                <span style={{ color: b.color, opacity: 0.6 }}>{j + 1}.</span>
                <span style={{ color: C.textSec }}>{s}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── SISTEMA VISUAL ───────────────────────────────────────────────────────────
const Visual = () => {
  const palette = [
    { name: "Fundo Principal", hex: "#0D0C0A", desc: "@raio.x — fundo escuro elegante" },
    { name: "Ouro Elegante", hex: "#C9A96E", desc: "Acento dominante de autoridade" },
    { name: "Champagne", hex: "#E8D5A8", desc: "Textos e detalhes premium" },
    { name: "Creme Texto", hex: "#F2EDE4", desc: "Texto principal em fundos escuros" },
    { name: "Cinza Quente", hex: "#6A6358", desc: "Texto secundário e detalhes" },
    { name: "Off-white", hex: "#FAF7F2", desc: "Fundo de stories e carrosséis" },
  ];

  return (
    <div className="fade-in">
      <SectionTitle sub="Identidade visual unificada para os dois perfis da marca">Sistema Visual</SectionTitle>
      <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}22`, borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
        <p style={{ color: C.textSec, fontSize: 12, lineHeight: 1.7 }}>
          ✦ <strong style={{ color: C.gold }}>Referência visual identificada:</strong> o @raio.x.endividamento já tem identidade premium consolidada (escuro + dourado + serif). O @advanacarlamota deve convergir para esse mesmo universo visual.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 18 }}>PALETA DA MARCA (baseada no @raio.x)</div>
          {palette.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: p.hex, border: `1px solid ${C.border}`, flexShrink: 0 }} />
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>{p.hex} · {p.desc}</div>
              </div>
            </div>
          ))}
        </Card>

        <div>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 16 }}>TIPOGRAFIA DA MARCA</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: C.text, marginBottom: 4 }}>Cormorant Garamond</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>Títulos · Display · Elegância · Já usada no @raio.x</div>
            </div>
            <div style={{ height: 1, background: C.border, margin: "12px 0" }} />
            <div>
              <div style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", color: C.text, marginBottom: 4 }}>DM Sans — Corpo e Legenda</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>Textos corridos · Stories · Interface</div>
            </div>
          </Card>
          <Card>
            <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 14 }}>DIRETRIZES DO FEED</div>
            {["Alternância: fundo escuro + foto real com boa iluminação", "Thumbnails: fundo escuro ou neutro com texto serif em creme", "Sem filtros coloridos ou saturados", "Temperatura de cor quente e consistente", "Roupas: preto, azul-marinho, creme — nunca estampas chamativas", "Acessórios dourados como elemento de autoridade"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.gold, fontSize: 10, marginTop: 3 }}>◈</span>
                <span style={{ color: C.textSec, fontSize: 12 }}>{item}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ─── FLUXOS & METAS ───────────────────────────────────────────────────────────
const Flows = () => {
  const [view, setView] = useState("daily");
  return (
    <div className="fade-in">
      <SectionTitle sub="Fluxos operacionais e metas reais baseadas no momento atual da marca">Fluxos & Metas</SectionTitle>
      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        {["daily", "weekly", "monthly", "goals"].map(v => (
          <Pill key={v} active={view === v} onClick={() => setView(v)}>
            {v === "daily" ? "Fluxo Diário" : v === "weekly" ? "Fluxo Semanal" : v === "monthly" ? "Fluxo Mensal" : "Metas & Gamificação"}
          </Pill>
        ))}
      </div>

      {view === "daily" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { time: "7h30", action: "Checar dashboard — tarefas do dia + métricas", cat: "Organização" },
            { time: "8h", action: "1–2 stories de presença — rotina real (ambos perfis)", cat: "Stories" },
            { time: "9h", action: "Bloco de produção — gravar ou editar conteúdo", cat: "Criação" },
            { time: "12h", action: "Story de conteúdo jurídico ou bastidor", cat: "Stories" },
            { time: "14h", action: "Interação — responder DMs e comentários (30 min)", cat: "Engajamento" },
            { time: "16h", action: "Story de interação — caixinha ou enquete", cat: "Stories" },
            { time: "18h–21h", action: "Horário ideal de postagem (Reels e Carrosséis)", cat: "Postagem" },
            { time: "20h", action: "Story de encerramento + CTA do produto do dia", cat: "Conversão" },
            { time: "21h", action: "Anotar ideias do dia + atualizar banco de hooks", cat: "Análise" },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 18px" }}>
              <span style={{ color: C.gold, fontFamily: "'Cormorant Garamond',serif", fontSize: 16, minWidth: 50 }}>{f.time}</span>
              <span style={{ color: C.text, fontSize: 13, flex: 1 }}>{f.action}</span>
              <Tag color={C.textMuted}>{f.cat}</Tag>
            </div>
          ))}
        </div>
      )}

      {view === "weekly" && (
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { day: "Segunda", focus: "Planejamento", actions: ["Revisar semana anterior", "Definir conteúdo dos 2 perfis", "Escrever roteiros dos Reels", "Programar stories da semana"] },
              { day: "Terça", focus: "Interação", actions: ["Responder todos os DMs", "Engajar contas do nicho jurídico", "Stories de conexão", "Atualizar banco de ideias"] },
              { day: "Quarta", focus: "Gravação", actions: ["Gravar 3 Reels @advanacarlamota", "Gravar 2 Reels @raio.x", "Fotos para stories e feed", "Registrar bastidores"] },
              { day: "Quinta", focus: "Edição", actions: ["Editar todos os Reels CapCut", "Escrever legendas com CTA", "Escolher thumbnails", "Agendar ou organizar por ordem"] },
              { day: "Sexta", focus: "Conversão", actions: ["Story com CTA direto (Raio-X ou Mentoria)", "Follow-up leads ativos", "Revisão de métricas semanais", "Reel de lifestyle se possível"] },
              { day: "Sábado", focus: "Presença leve", actions: ["Stories descontraídos / humanização", "Engajamento orgânico", "Curadoria de referências visuais"] },
              { day: "Domingo", focus: "Descanso", actions: ["Sem produção obrigatória", "Anotar insights da semana", "Recarga criativa"] },
            ].map((d, i) => (
              <div key={i} style={{ background: C.surfaceAlt, borderRadius: 8, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ color: C.gold, fontSize: 14, fontFamily: "'Cormorant Garamond',serif" }}>{d.day}</span>
                  <Tag color={C.goldDim}>{d.focus}</Tag>
                </div>
                {d.actions.map((a, j) => (
                  <div key={j} style={{ color: C.textSec, fontSize: 12, padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>{a}</div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      )}

      {view === "monthly" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { week: "Semana 1", theme: "Autoridade", actions: ["Reels técnicos: extrajudicial, cartório, família", "Carrossel: como funciona a mentoria", "Stories: bastidores profissionais reais"] },
            { week: "Semana 2", theme: "Conexão", actions: ["Reels de storytelling pessoal (a virada)", "Stories de rotina + humanização", "Caixinha: dúvidas sobre extrajudicial"] },
            { week: "Semana 3", theme: "Conversão", actions: ["Reel do Raio-X (dado + emoção + CTA)", "Stories com depoimento de mentorada", "Follow-up de leads ativos + DMs"] },
            { week: "Semana 4", theme: "Análise & Próximo Ciclo", actions: ["Revisão completa de métricas dos 2 perfis", "Definir metas do próximo mês", "Banco de ideias para o próximo ciclo"] },
          ].map((w, i) => (
            <Card key={i} style={{ borderLeft: `3px solid ${C.gold}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ color: C.gold, fontFamily: "'Cormorant Garamond',serif", fontSize: 18 }}>{w.week}</span>
                <Tag color={C.goldDim}>{w.theme}</Tag>
              </div>
              {w.actions.map((a, j) => (
                <div key={j} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.gold, opacity: 0.5 }}>→</span>
                  <span style={{ color: C.textSec, fontSize: 13 }}>{a}</span>
                </div>
              ))}
            </Card>
          ))}
        </div>
      )}

      {view === "goals" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
            {[
              { cat: "Crescimento", meta: "1.000 seguidores", prazo: "3 meses", atual: "246", color: C.blue, desc: "@advanacarlamota" },
              { cat: "Reels", meta: "12 Reels/mês", prazo: "Mensal", atual: "~4", color: C.green, desc: "ambos os perfis" },
              { cat: "Vendas", meta: "5 mentorias/mês", prazo: "Mensal", atual: "em andamento", color: C.gold, desc: "Metamorfose Lucrativa" },
            ].map((g, i) => (
              <Card key={i} style={{ textAlign: "center" }}>
                <Tag color={g.color}>{g.cat}</Tag>
                <div style={{ fontSize: 26, fontFamily: "'Cormorant Garamond',serif", color: g.color, margin: "12px 0 6px" }}>{g.meta}</div>
                <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 6 }}>Prazo: {g.prazo}</div>
                <div style={{ color: C.textSec, fontSize: 12 }}>Atual: <span style={{ color: C.text }}>{g.atual}</span></div>
                <div style={{ color: C.textMuted, fontSize: 10, marginTop: 4 }}>{g.desc}</div>
              </Card>
            ))}
          </div>
          <Card>
            <div style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.1em", marginBottom: 18 }}>GAMIFICAÇÃO — CONQUISTAS DA MARCA</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {[
                { badge: "🔥", title: "Sequência Ativa", desc: "7 dias consecutivos postando nos dois perfis" },
                { badge: "⭐", title: "Semana Completa", desc: "5 Reels + stories diários em uma semana" },
                { badge: "◆", title: "Conversão Real", desc: "3 leads diretos do Instagram em uma semana" },
                { badge: "∿", title: "Identidade Unificada", desc: "Stories com nova estética premium por 15 dias" },
              ].map((b, i) => (
                <div key={i} style={{ background: C.surfaceAlt, borderRadius: 10, padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{b.badge}</div>
                  <div style={{ color: C.gold, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{b.title}</div>
                  <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.5 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// ─── ARQUITETURA ──────────────────────────────────────────────────────────────
const Architecture = () => (
  <div className="fade-in">
    <SectionTitle sub="Arquitetura técnica, IA integrada e lógica operacional completa">Arquitetura do Sistema</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
      <Card>
        <div style={{ color: C.gold, fontSize: 16, fontFamily: "'Cormorant Garamond',serif", marginBottom: 16 }}>Stack Técnica Recomendada</div>
        {[
          { layer: "Frontend", tech: "React + Vite (este app)" },
          { layer: "Hospedagem", tech: "Vercel (deploy via GitHub — como já fazemos)" },
          { layer: "Banco de Dados", tech: "Supabase (gratuito até certo volume)" },
          { layer: "IA Integrada", tech: "Claude API (Anthropic)" },
          { layer: "Automações", tech: "Make (Integromat) — gratuito para começar" },
          { layer: "Agendamento", tech: "Buffer (plano gratuito: 3 canais)" },
          { layer: "Analytics", tech: "Instagram Insights (nativo, gratuito)" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ color: C.textMuted, fontSize: 12, minWidth: 100 }}>{s.layer}</span>
            <span style={{ color: C.text, fontSize: 12 }}>{s.tech}</span>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ color: C.gold, fontSize: 16, fontFamily: "'Cormorant Garamond',serif", marginBottom: 16 }}>IA Integrada — Funcionalidades</div>
        {[
          { func: "Geração de hooks", desc: "No tom da Ana Mota — sofisticado, humano, sem exagero" },
          { func: "Sugestão de legenda", desc: "Com CTA adaptado ao produto (Raio-X ou Mentoria)" },
          { func: "Roteiro de Reel", desc: "Baseado nos modelos que já funcionaram" },
          { func: "Diagnóstico semanal", desc: "Análise automática do que funcionou e o que ajustar" },
          { func: "Banco de ideias ativo", desc: "Sugere temas com base no histórico dos dois perfis" },
          { func: "Adaptação de conteúdo", desc: "Transforma um Reel do @adv para o @raio.x e vice-versa" },
        ].map((f, i) => (
          <div key={i} style={{ padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ color: C.goldLight, fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{f.func}</div>
            <div style={{ color: C.textSec, fontSize: 11 }}>{f.desc}</div>
          </div>
        ))}
      </Card>
    </div>

    <Card>
      <div style={{ color: C.gold, fontSize: 16, fontFamily: "'Cormorant Garamond',serif", marginBottom: 18 }}>Prompts Automatizados — Exemplos Reais</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { trigger: "Nova ideia de Reel adicionada", prompt: "Gere 3 variações de hook para o tema [X], no estilo da Ana Carla Mota: calmo, sofisticado, verdadeiro, sem exagero de marketing. Perfil: @advanacarlamota." },
          { trigger: "Reel do @raio.x sem legenda", prompt: "Escreva uma legenda para o Reel sobre [tema de dívida]. Tom: humano, acessível, empoderador. CTA final deve mencionar o Raio-X do Endividamento e o link na bio." },
          { trigger: "Revisão semanal (domingo)", prompt: "Analise esta semana: [dados]. O que funcionou, o que ajustar e 3 ideias de conteúdo para os dois perfis na próxima semana." },
          { trigger: "Reel do @adv → adaptar para @raio.x", prompt: "Adapte este conteúdo [texto] de advogados para o público do @raio.x.endividamento: pessoas com dívidas que precisam de solução jurídica acessível." },
        ].map((p, i) => (
          <div key={i} style={{ background: C.surfaceAlt, borderRadius: 10, padding: 16 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
              <Tag color={C.blue}>Gatilho</Tag>
              <span style={{ color: C.text, fontSize: 12, fontWeight: 500 }}>{p.trigger}</span>
            </div>
            <div style={{ background: C.bg, borderRadius: 6, padding: "10px 14px" }}>
              <span style={{ color: C.textSec, fontSize: 12, fontStyle: "italic", lineHeight: 1.7 }}>{p.prompt}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const screens = {
    dashboard: <Dashboard />,
    content: <Content />,
    reels: <Reels />,
    stories: <Stories />,
    growth: <Growth />,
    conversion: <Conversion />,
    organization: <Organization />,
    visual: <Visual />,
    flows: <Flows />,
    architecture: <Architecture />,
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg }}>

        {/* SIDEBAR */}
        <div style={{
          width: collapsed ? 58 : 230, flexShrink: 0, transition: "width 0.3s ease",
          background: C.surface, borderRight: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column", overflow: "hidden"
        }}>
          <div style={{ padding: collapsed ? "22px 14px" : "26px 22px", borderBottom: `1px solid ${C.border}` }}>
            {!collapsed ? (
              <>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: C.gold, fontWeight: 400, letterSpacing: "0.1em" }}>ANA MOTA</div>
                <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 3 }}>Business AI · Sistema Operacional</div>
                <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Tag color={C.goldDim}>@advanacarlamota</Tag>
                  <Tag color={C.blue}>@raio.x</Tag>
                </div>
              </>
            ) : (
              <div style={{ color: C.gold, fontSize: 14, textAlign: "center", fontFamily: "'Cormorant Garamond',serif" }}>AM</div>
            )}
          </div>

          <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
            {NAV.map(item => (
              <button key={item.id} onClick={() => setActive(item.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: collapsed ? "11px 18px" : "10px 22px",
                background: active === item.id ? `${C.gold}12` : "transparent",
                borderLeft: `2px solid ${active === item.id ? C.gold : "transparent"}`,
                border: "none", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                justifyContent: collapsed ? "center" : "flex-start"
              }}>
                <span style={{ color: active === item.id ? C.gold : C.textMuted, fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && (
                  <span style={{ color: active === item.id ? C.text : C.textSec, fontSize: 12, letterSpacing: "0.02em" }}>
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div style={{ padding: "14px 16px", borderTop: `1px solid ${C.border}` }}>
            <button onClick={() => setCollapsed(!collapsed)} style={{
              width: "100%", background: "transparent", border: `1px solid ${C.border}`,
              borderRadius: 6, padding: "8px", cursor: "pointer", color: C.textMuted, fontSize: 11
            }}>{collapsed ? "→" : "← Recolher"}</button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflow: "auto", padding: "36px 42px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 32, gap: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px" }}>
              <span style={{ color: C.gold, fontSize: 10 }} className="gold-pulse">●</span>
              <span style={{ color: C.textSec, fontSize: 11, letterSpacing: "0.06em" }}>Sistema Ativo</span>
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px" }}>
              <span style={{ color: C.textSec, fontSize: 11 }}>246 seguidores · </span>
              <span style={{ color: C.gold, fontSize: 11, fontFamily: "'Cormorant Garamond',serif" }}>em crescimento</span>
            </div>
          </div>

          {screens[active]}
        </div>
      </div>
    </>
  );
}
