document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const assistantRoot = document.getElementById('afya-assistant-root');
    if (assistantRoot) return;

    const style = document.createElement('style');
    style.textContent = `
        #afya-assistant-root {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 9999;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        #afya-assistant-button {
            width: 64px;
            height: 64px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(135deg, #d72638, #ef4444);
            color: #ffffff;
            font-size: 1.7rem;
            box-shadow: 0 18px 40px rgba(215, 38, 56, 0.35);
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        #afya-assistant-button:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 24px 48px rgba(215, 38, 56, 0.42);
        }

        #afya-assistant-panel {
            position: absolute;
            right: 0;
            bottom: 78px;
            width: min(360px, calc(100vw - 28px));
            background: rgba(255,255,255,0.96);
            border: 1px solid rgba(148,163,184,0.2);
            border-radius: 24px;
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.18);
            overflow: hidden;
            transform: translateY(12px);
            opacity: 0;
            pointer-events: none;
            transition: all 0.25s ease;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
        }

        #afya-assistant-root.open #afya-assistant-panel {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        .afya-assistant-header {
            background: linear-gradient(135deg, #0f172a, #1f2d3d);
            color: white;
            padding: 16px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .afya-assistant-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 800;
            letter-spacing: 0.03em;
        }

        .afya-assistant-brand .badge {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            background: rgba(255, 255, 255, 0.12);
            font-size: 1rem;
        }

        .assistant-close {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
        }

        .assistant-chat {
            padding: 16px;
            max-height: 320px;
            overflow-y: auto;
            background: #f8fafc;
        }

        .assistant-message {
            display: flex;
            margin-bottom: 12px;
        }

        .assistant-message.user {
            justify-content: flex-end;
        }

        .assistant-message.bot {
            justify-content: flex-start;
        }

        .bubble {
            max-width: 85%;
            padding: 10px 12px;
            border-radius: 14px;
            font-size: 0.92rem;
            line-height: 1.5;
        }

        .assistant-message.user .bubble {
            background: linear-gradient(135deg, #d72638, #ef4444);
            color: white;
            border-bottom-right-radius: 6px;
        }

        .assistant-message.bot .bubble {
            background: white;
            color: #1f2937;
            border: 1px solid rgba(148,163,184,0.18);
            border-bottom-left-radius: 6px;
        }

        .assistant-quick-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 0 16px 16px;
            background: #f8fafc;
        }

        .quick-chip {
            border: 1px solid rgba(215, 38, 56, 0.2);
            background: rgba(215, 38, 56, 0.06);
            color: #7f1d1d;
            padding: 8px 10px;
            border-radius: 999px;
            font-size: 0.76rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .quick-chip:hover {
            background: rgba(215, 38, 56, 0.12);
        }

        .assistant-form {
            display: flex;
            gap: 8px;
            padding: 12px 16px 16px;
            background: #fff;
            border-top: 1px solid rgba(148,163,184,0.18);
        }

        .assistant-form input {
            flex: 1;
            border: 1px solid rgba(148,163,184,0.3);
            border-radius: 12px;
            padding: 12px 14px;
            font: inherit;
            font-size: 0.92rem;
            outline: none;
        }

        .assistant-form button {
            border: none;
            border-radius: 12px;
            padding: 11px 14px;
            background: linear-gradient(135deg, #d72638, #ef4444);
            color: white;
            cursor: pointer;
            font-weight: 700;
        }

        .voice-toggle {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            border: 1px solid rgba(148,163,184,0.3);
            background: #f8fafc;
            color: #0f172a;
            cursor: pointer;
            font-size: 1.1rem;
        }

        .voice-toggle.listening {
            background: #dc2626;
            color: white;
            border-color: #dc2626;
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.42); }
            70% { box-shadow: 0 0 0 14px rgba(220, 38, 38, 0); }
            100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }

        @media (max-width: 600px) {
            #afya-assistant-root {
                right: 12px;
                bottom: 12px;
            }
        }
    `;
    document.head.appendChild(style);

    const assistantRoot = document.createElement('div');
    assistantRoot.id = 'afya-assistant-root';
    assistantRoot.innerHTML = `
        <div id="afya-assistant-panel">
            <div class="afya-assistant-header">
                <div class="afya-assistant-brand">
                    <span class="badge">✦</span>
                    <span>AFYA Assistant</span>
                </div>
                <button class="assistant-close" type="button" aria-label="Close assistant">×</button>
            </div>

            <div class="assistant-chat" aria-live="polite" id="assistant-chat"></div>

            <div class="assistant-quick-actions">
                <button type="button" class="quick-chip">About AFYA</button>
                <button type="button" class="quick-chip">Donate</button>
                <button type="button" class="quick-chip">Sickle cell</button>
                <button type="button" class="quick-chip">Contact</button>
            </div>

            <div class="assistant-form">
                <button type="button" class="voice-toggle" aria-label="Use voice input">🎙️</button>
                <input id="assistant-input" type="text" placeholder="Ask AFYA anything..." aria-label="Ask AFYA anything" />
                <button type="button" id="assistant-send">Send</button>
            </div>
        </div>

        <button id="afya-assistant-button" type="button" aria-label="Open AFYA assistant">💬</button>
    `;

    document.body.appendChild(assistantRoot);

    const panel = assistantRoot;
    const button = document.getElementById('afya-assistant-button');
    const closeBtn = document.querySelector('.assistant-close');
    const chatBox = document.getElementById('assistant-chat');
    const input = document.getElementById('assistant-input');
    const sendBtn = document.getElementById('assistant-send');
    const voiceBtn = document.querySelector('.voice-toggle');
    const quickButtons = document.querySelectorAll('.quick-chip');

    function pushMessage(role, text) {
        const wrapper = document.createElement('div');
        wrapper.className = `assistant-message ${role}`;

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = text;

        wrapper.appendChild(bubble);
        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getReply(question) {
        const q = question.toLowerCase();

        if (q.includes('donat')) {
            return 'You can support AFYA by visiting the donation page and giving towards sickle cell awareness, emergency response, screening, and patient support across Uganda.';
        }

        if (q.includes('contact') || q.includes('reach') || q.includes('call') || q.includes('email')) {
            return 'Please use the Contact page on our website to get in touch with AFYA. We are also committed to helping families with care guidance and community support.';
        }

        if (q.includes('sickle') || q.includes('condition')) {
            return 'Sickle cell disease is a blood disorder that affects the shape and flexibility of red blood cells. It can lead to pain crises, fatigue, and complications that require proper medical care, hydration, and monitoring.';
        }

        if (q.includes('about') || q.includes('who') || q.includes('afya')) {
            return 'AFYA Sickle Cell Foundation is a community-driven organisation focused on education, advocacy, care support, and clinical partnerships to improve the lives of people affected by sickle cell disease in Uganda.';
        }

        if (q.includes('support') || q.includes('help')) {
            return 'AFYA supports families through health education, advocacy, care coordination, and partnerships with trusted clinical providers to improve early care and long-term wellbeing.';
        }

        if (q.includes('anabel')) {
            return 'Anabel Esther is a major source of inspiration for AFYA. Her story reflects the strength, resilience, and hope of sickle cell warriors and their families.';
        }

        if (q.includes('family') || q.includes('nanyonjo') || q.includes('kittengo')) {
            return 'AFYA was founded through the personal journey of Nanyonjo Noeline and her family, especially as they supported their daughter Anabel through the realities of sickle cell disease.';
        }

        return 'I can help with AFYA’s mission, donations, contact information, sickle cell awareness, and family support guidance. You can also ask about our programs or how to get involved.';
    }

    function speakText(text) {
        if (!('speechSynthesis' in window)) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.lang = 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    function sendQuery(rawQuestion) {
        const question = rawQuestion.trim();
        if (!question) return;

        pushMessage('user', question);
        const reply = getReply(question);
        setTimeout(() => {
            pushMessage('bot', reply);
            speakText(reply);
        }, 250);
    }

    function togglePanel() {
        panel.classList.toggle('open');
    }

    button.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', () => panel.classList.remove('open'));

    sendBtn.addEventListener('click', () => {
        sendQuery(input.value);
        input.value = '';
        input.focus();
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendQuery(input.value);
            input.value = '';
        }
    });

    quickButtons.forEach((buttonItem) => {
        buttonItem.addEventListener('click', () => {
            const label = buttonItem.textContent.trim();
            sendQuery(label);
        });
    });

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const voiceBtnEl = voiceBtn;
    let recognition = null;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            voiceBtnEl.classList.add('listening');
            voiceBtnEl.setAttribute('aria-label', 'Listening...');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            sendQuery(transcript);
            input.value = '';
        };

        recognition.onend = () => {
            voiceBtnEl.classList.remove('listening');
            voiceBtnEl.setAttribute('aria-label', 'Use voice input');
        };

        voiceBtnEl.addEventListener('click', () => {
            if (voiceBtnEl.classList.contains('listening')) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        voiceBtnEl.disabled = true;
        voiceBtnEl.title = 'Voice input is not available in this browser';
    }

    pushMessage('bot', 'Hello! I’m AFYA Assistant. I can help with care support, donation info, sickle cell awareness, and how to get involved.');
});
