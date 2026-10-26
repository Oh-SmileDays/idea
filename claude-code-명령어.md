# Claude Code 명령어 모음

> 외울 필요 없음! 입력창에 `/`만 치면 명령어 목록이 뜨고, 그냥 말로 요청해도 됨.

## 기본 사용 팁

| 방법 | 설명 |
|---|---|
| `/` 입력 | 사용 가능한 명령어 목록 + 설명 표시 (`/codex` 까지 치면 Codex 것만) |
| 말로 요청 | "Codex한테 검토 시켜줘" 처럼 말해도 알아서 실행 |
| ↑ 방향키 | 이전에 입력한 명령 다시 불러오기 |
| `Ctrl+C` 두 번 | Claude Code 종료 |

⚠️ Claude Code 입력창(`>`)에서는 명령어 앞에 **슬래시 `/`** 를 꼭 붙이기 (`login` ❌ → `/login` ✅)

## 설치 / 로그인 (PC 터미널)

```bash
npm install -g @anthropic-ai/claude-code   # Claude Code 설치 (Node.js 18 이상 필요)
claude                                     # Claude Code 실행
```

| 명령어 | 하는 일 |
|---|---|
| `/login` | 로그인 ("OAuth token revoked" 오류가 뜨면 이것) |
| `/logout` | 로그아웃 |
| `/help` | 도움말 |
| `/clear` | 대화 내용 초기화 |

## Codex 플러그인 설치 (순서대로)

```
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

→ 마지막에 GPT 계정으로 로그인하면 끝.

## Codex 플러그인 명령어

| 명령어 | 하는 일 |
|---|---|
| `/codex:review` | 지금까지 고친 코드를 Codex가 검토 ⭐ 자주 씀 |
| `/codex:adversarial-review` | 설계·접근 방식까지 깐깐하게 반박하며 검토 |
| `/codex:rescue` | 막힌 문제를 Codex에게 넘겨 조사·수정 ⭐ 자주 씀 |
| `/codex:status` | 진행 중 / 최근 Codex 작업 보기 |
| `/codex:result` | 끝난 작업의 결과 보기 |
| `/codex:cancel` | 진행 중인 작업 취소 |
| `/codex:transfer` | 현재 대화를 Codex로 넘겨서 이어 하기 |
| `/codex:setup` | 설치 상태 확인 |

## 리뷰 게이트 (선택 사항)

Claude가 작업을 끝내기 직전에 Codex가 자동으로 검토하고, 문제가 있으면 Claude가 고칠 때까지 못 끝내게 막는 기능.

```
/codex:setup --enable-review-gate    # 켜기
/codex:setup --disable-review-gate   # 끄기
```

⚠️ 둘이 수정↔검토를 반복하면서 사용량이 빠르게 소진될 수 있음 → 평소엔 끄고, 필요할 때 `/codex:review` 로 직접 검토 추천.
