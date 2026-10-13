// 사용법: node render.mjs explainer|motion
// 페이지의 window.setT(t)로 프레임을 하나씩 그려 PNG로 저장한 뒤 ffmpeg로 mp4를 만든다.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const name = process.argv[2];
if (!['explainer', 'motion'].includes(name)) throw new Error('explainer 또는 motion 을 지정하세요');
const dir = path.dirname(fileURLToPath(import.meta.url));
const frames = path.join(process.env.FRAMES_DIR ?? '/tmp/frames', name);
rmSync(frames, { recursive: true, force: true });
mkdirSync(frames, { recursive: true });

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('file://' + path.join(dir, `${name}.html`));
const { dur, fps } = await page.evaluate(() => ({ dur: window.DURATION, fps: window.FPS }));
const n = dur * fps;
for (let i = 0; i < n; i++) {
  await page.evaluate((t) => window.setT(t), i / fps);
  await page.screenshot({ path: path.join(frames, `f${String(i).padStart(4, '0')}.png`) });
}
await browser.close();

const out = path.join(dir, `${name}.mp4`);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, 'f%04d.png'),
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-movflags', '+faststart', out], { stdio: 'inherit' });
console.log('생성:', out, `${dur}s @${fps}fps`);
