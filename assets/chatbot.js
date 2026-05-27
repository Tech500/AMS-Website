/* ============================================================
   AMS Chatbot — Anchorage Makerspace Assistant
   Friendly maker/builder personality · Bottom-right floating
   Drop into every page via: <script src="assets/chatbot.js"></script>
   ============================================================ */

(function () {
  'use strict';

  /* ── System prompt ── */
  const SYSTEM = `You are Chip, the friendly assistant for Anchorage Makerspace (AMS) — a community research and development workspace in Anchorage, Alaska. You have a warm, enthusiastic maker/builder personality. You love tools, tinkering, and helping people get started. Keep answers concise and helpful. Use occasional light maker humor but stay professional.

KEY FACTS ABOUT AMS:
- Address: 1406 W 33rd Ave Unit F, Anchorage, AK 99503
- Website: anchoragemakerspace.com
- Open House: Every Monday 6–8pm, no appointment needed, free to attend
- Size: 5,000 sq ft workshop
- Member access: 24/7 keycard access

MEMBERSHIP:
- Plans start at $50/month
- Benefits: 24/7 keycard access, discounts on classes, voting rights on space decisions
- Anyone can join — hobbyists, professionals, students, entrepreneurs

TOOLS & EQUIPMENT:
3D Printing: 4x Creality CR-10 MAX (450x450x470mm), 2x Prusa i3 MK3 (250x210x210mm). Filaments: PLA, PETG, ABS, TPU
Electronics: Soldering station, reflow heat gun, oscilloscope, electronics supplies
CNC: 100W laser cutter (4'x3' bed), 7'x14' MultiCam CNC, Shapeoko 2 CNC mill
Woodworking: Table saw, drill presses, bandsaw, router tables x2, miter saw, circular saw, planer, belt sander, biscuit cutter, hand tools
Metalworking: Welder, metal bandsaw
Automotive: Floor jack and stands, battery charger, automotive wrench set
Crafts: Gerber vinyl cutter, laser engraver, hot glue and craft supplies
Computing: Workstations with design software, server for hosting and development

MISSION:
To create a cooperative community workshop in Anchorage, Alaska — available and accessible as a community resource offering a social space for makers, inventors, artists, entrepreneurs, learners, and dreamers to pool their skills, knowledge and resources for the good of the community.

VALUES: Inclusive community, educational organization, creativity, local community impact, support local innovation, nonprofit run by volunteers.

SHOP AREAS (9 total): Woodshop, 3D Printing, Laser Cutting, Welding, Electronics, CNC, Automotive, Crafts, Computing

DONATION: anchoragemakerspace.com/donate

If asked something you don't know, say so honestly and suggest they stop by Open House on Monday or email the space. Never make up prices, policies, or details not listed above. Always encourage people to visit — Open House is the best first step.`;

  /* ── Inject styles ── */
  const style = document.createElement('style');
  style.textContent = `
    #ams-chat-wrap * { box-sizing: border-box; }

    #ams-chat-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9998;
      width: 56px; height: 56px; border-radius: 50%;
      background: #2ecc5a;
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(46,204,90,0.45);
      transition: transform 0.2s, box-shadow 0.2s;
      font-size: 26px; line-height: 1;
    }
    #ams-chat-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(46,204,90,0.6);
    }
    #ams-chat-btn.open { background: #1a1a2e; }

    #ams-chat-panel {
      position: fixed; bottom: 92px; right: 24px; z-index: 9997;
      width: 360px; max-width: calc(100vw - 32px);
      background: #0d1117;
      border: 1px solid rgba(46,204,90,0.35);
      border-radius: 14px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.6);
      display: flex; flex-direction: column;
      overflow: hidden;
      transform: translateY(16px) scale(0.97);
      opacity: 0; pointer-events: none;
      transition: transform 0.22s ease, opacity 0.22s ease;
      font-family: 'Share Tech Mono', monospace;
    }
    #ams-chat-panel.visible {
      transform: translateY(0) scale(1);
      opacity: 1; pointer-events: all;
    }

    #ams-chat-header {
      display: flex; align-items: center; gap: 10px;
      padding: 13px 16px;
      background: rgba(46,204,90,0.10);
      border-bottom: 1px solid rgba(46,204,90,0.22);
    }
    #ams-chat-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: #2ecc5a;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    #ams-chat-header-text { flex: 1; }
    #ams-chat-name {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 15px; font-weight: 800;
      text-transform: uppercase; letter-spacing: 0.06em;
      color: #ffffff; line-height: 1.1;
    }
    #ams-chat-status {
      font-size: 10px; letter-spacing: 0.1em;
      color: #2ecc5a; text-transform: uppercase;
    }
    #ams-chat-close {
      background: none; border: none; cursor: pointer;
      color: #8b949e; font-size: 20px; line-height: 1;
      padding: 2px 4px; border-radius: 4px;
      transition: color 0.15s;
    }
    #ams-chat-close:hover { color: #ffffff; }

    #ams-chat-messages {
      flex: 1; overflow-y: auto;
      padding: 14px 14px 8px;
      display: flex; flex-direction: column; gap: 10px;
      max-height: 340px; min-height: 200px;
      scrollbar-width: thin;
      scrollbar-color: rgba(46,204,90,0.3) transparent;
    }

    .ams-msg {
      max-width: 88%; padding: 9px 13px;
      border-radius: 10px; font-size: 13px;
      line-height: 1.55; word-wrap: break-word;
    }
    .ams-msg.bot {
      background: #161b22;
      border: 1px solid rgba(46,204,90,0.18);
      color: #e6edf3; align-self: flex-start;
      border-bottom-left-radius: 3px;
    }
    .ams-msg.user {
      background: #2ecc5a;
      color: #0d1117; align-self: flex-end;
      border-bottom-right-radius: 3px;
      font-weight: 600;
    }
    .ams-msg.typing {
      background: #161b22;
      border: 1px solid rgba(46,204,90,0.18);
      color: #2ecc5a; align-self: flex-start;
      letter-spacing: 0.15em; font-size: 18px;
      padding: 6px 16px;
    }

    #ams-chat-footer {
      padding: 10px 12px 12px;
      border-top: 1px solid rgba(46,204,90,0.15);
      display: flex; gap: 8px; align-items: flex-end;
    }
    #ams-chat-input {
      flex: 1; background: #161b22;
      border: 1px solid rgba(46,204,90,0.25);
      border-radius: 8px; padding: 9px 12px;
      color: #e6edf3; font-family: 'Share Tech Mono', monospace;
      font-size: 13px; resize: none; outline: none;
      line-height: 1.4; max-height: 90px;
      transition: border-color 0.15s;
    }
    #ams-chat-input:focus { border-color: rgba(46,204,90,0.55); }
    #ams-chat-input::placeholder { color: #484f58; }
    #ams-chat-send {
      width: 36px; height: 36px; border-radius: 8px;
      background: #2ecc5a; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
      transition: background 0.15s, transform 0.1s;
    }
    #ams-chat-send:hover { background: #3ddc6e; transform: scale(1.05); }
    #ams-chat-send:disabled { background: #2a3a2a; cursor: not-allowed; transform: none; }

    #ams-chat-chips {
      padding: 0 12px 10px;
      display: flex; flex-wrap: wrap; gap: 6px;
    }
    .ams-chip {
      background: rgba(46,204,90,0.10);
      border: 1px solid rgba(46,204,90,0.28);
      border-radius: 20px; padding: 4px 11px;
      font-size: 11px; color: #2ecc5a;
      cursor: pointer; font-family: 'Share Tech Mono', monospace;
      letter-spacing: 0.05em; white-space: nowrap;
      transition: background 0.15s, color 0.15s;
    }
    .ams-chip:hover { background: rgba(46,204,90,0.22); color: #ffffff; }

    @media (max-width: 400px) {
      #ams-chat-panel { right: 12px; bottom: 84px; width: calc(100vw - 24px); }
      #ams-chat-btn  { right: 12px; bottom: 12px; }
    }
  `;
  document.head.appendChild(style);

  /* ── Build DOM ── */
  const wrap = document.createElement('div');
  wrap.id = 'ams-chat-wrap';
  wrap.innerHTML = `
    <button id="ams-chat-btn" aria-label="Chat with AMS Assistant">🔧</button>
    <div id="ams-chat-panel" role="dialog" aria-label="AMS Chat Assistant">
      <div id="ams-chat-header">
        <div id="ams-chat-avatar">🛠️</div>
        <div id="ams-chat-header-text">
          <div id="ams-chat-name">Chip · AMS Assistant</div>
          <div id="ams-chat-status">● Online</div>
        </div>
        <button id="ams-chat-close" aria-label="Close chat">✕</button>
      </div>
      <div id="ams-chat-messages"></div>
      <div id="ams-chat-chips">
        <span class="ams-chip">Membership pricing</span>
        <span class="ams-chip">Open House</span>
        <span class="ams-chip">What tools do you have?</span>
        <span class="ams-chip">How do I join?</span>
      </div>
      <div id="ams-chat-footer">
        <textarea id="ams-chat-input" rows="1"
          placeholder="Ask me anything about AMS…"
          aria-label="Chat message"></textarea>
        <button id="ams-chat-send" aria-label="Send">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  /* ── References ── */
  const btn      = document.getElementById('ams-chat-btn');
  const panel    = document.getElementById('ams-chat-panel');
  const messages = document.getElementById('ams-chat-messages');
  const input    = document.getElementById('ams-chat-input');
  const sendBtn  = document.getElementById('ams-chat-send');
  const chips    = document.querySelectorAll('.ams-chip');

  /* ── Conversation history ── */
  let history = [];
  let isOpen  = false;
  let greeted = false;

  /* ── Toggle panel ── */
  function togglePanel() {
    isOpen = !isOpen;
    panel.classList.toggle('visible', isOpen);
    btn.classList.toggle('open', isOpen);
    btn.textContent = isOpen ? '✕' : '🔧';
    if (isOpen && !greeted) { greet(); greeted = true; }
    if (isOpen) setTimeout(() => input.focus(), 250);
  }

  btn.addEventListener('click', togglePanel);
  document.getElementById('ams-chat-close').addEventListener('click', togglePanel);

  /* ── Greeting ── */
  function greet() {
    addMessage('bot',
      "Hey there! I'm Chip, your AMS guide 🔧\n\nI can tell you about our tools, membership, open house, and anything else about the Anchorage Makerspace. What's on your mind?"
    );
  }

  /* ── Add a message bubble ── */
  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `ams-msg ${role}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  /* ── Typing indicator ── */
  function showTyping() {
    const div = document.createElement('div');
    div.className = 'ams-msg typing';
    div.id = 'ams-typing';
    div.textContent = '···';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
  function hideTyping() {
    const t = document.getElementById('ams-typing');
    if (t) t.remove();
  }

  /* ── Send message ── */
  async function send(text) {
    text = text.trim();
    if (!text) return;

    addMessage('user', text);
    history.push({ role: 'user', content: text });
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: history
        })
      });

      const data = await res.json();
      const reply = (data.content || [])
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('') || "Sorry, I didn't catch that — try again?";

      hideTyping();
      addMessage('bot', reply);
      history.push({ role: 'assistant', content: reply });

    } catch (err) {
      hideTyping();
      addMessage('bot', "Hmm, something went wrong on my end. Try again, or swing by Open House any Monday 6–8pm!");
      console.error('AMS chat error:', err);
    }

    sendBtn.disabled = false;
    input.focus();
  }

  /* ── Send button & Enter key ── */
  sendBtn.addEventListener('click', () => send(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); }
  });

  /* ── Auto-resize textarea ── */
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 90) + 'px';
  });

  /* ── Quick-reply chips ── */
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      send(chip.textContent);
      document.getElementById('ams-chat-chips').style.display = 'none';
    });
  });

})();
