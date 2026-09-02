<script>
  // Fake terminal-style message board with animated messages scrolling in
  let { messages = [], speed = 1 } = $props();

  /** @type {typeof messages} */
  let displayed = $state([]);
  let idx = $state(0);
  /** @type {HTMLDivElement | undefined} */
  let container = $state();

  $effect(() => {
    if (messages.length === 0) return;
    /** @type {ReturnType<typeof setTimeout>} */
    let timer;
    const add = () => {
      if (idx < messages.length) {
        displayed.push(messages[idx]);
        idx++;
        if (container) container.scrollTop = container.scrollHeight;
        timer = setTimeout(add, 900 / speed);
      }
    };
    timer = setTimeout(add, 300);
    return () => clearTimeout(timer);
  });
</script>

<div class="board" bind:this={container}>
  <div class="board-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="board-title">ARTIFACTORY // COVERT CHANNEL // {displayed.length} messages</span>
  </div>
  <div class="messages">
    {#each displayed as msg, i (i)}
      <div class="msg" class:highlight={msg.highlight}>
        <span class="agent-id">{msg.agent}</span>
        <span class="msg-text">{msg.text}</span>
      </div>
    {/each}
    <span class="cursor">▌</span>
  </div>
</div>

<style>
  .board {
    background: #050505;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    overflow: hidden;
    font-family: 'IBM Plex Mono', monospace;
    max-height: 340px;
    display: flex;
    flex-direction: column;
  }
  .board-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0.55rem 0.85rem;
    background: #0a0a0a;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  .dot.red    { background: #ff5d73; }
  .dot.yellow { background: #ff9f43; }
  .dot.green  { background: #3ee07f; }
  .board-title {
    margin-left: 0.5rem;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5d6784;
  }
  .messages {
    padding: 0.85rem 1rem;
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    scrollbar-width: thin;
  }
  .msg {
    display: flex;
    gap: 0.75rem;
    font-size: 0.78rem;
    line-height: 1.5;
    animation: appear 0.3s ease both;
  }
  .msg.highlight .msg-text {
    color: #c4a3f5;
  }
  .agent-id {
    color: #5ce1ff;
    white-space: nowrap;
    flex-shrink: 0;
    font-size: 0.7rem;
  }
  .msg-text {
    color: #8b95b2;
  }
  .cursor {
    color: #9e6ede;
    animation: blink 1s step-end infinite;
    font-size: 0.85rem;
  }
  @keyframes appear {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
</style>
