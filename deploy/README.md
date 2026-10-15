# VPS self-host on bolton (`promocard.liessum.dev`)

Static site in Docker (`node:22-alpine` build → `nginx:alpine`), published on loopback `127.0.0.1:8800`.
Host nginx terminates TLS and adds security headers (`/etc/nginx/snippets/promocard-headers.conf`).
Same pattern as `rliessum/flashcard-generator` `deploy/`: no webhook, no CI SSH; a 45s systemd timer polls `origin/main`.

| File | Role |
|---|---|
| `update.sh` | Root updater: flock, ls-remote, runuser git, compose build/up, `/version.json` health, rollback to `promocard:previous` |
| `promocard-update.service` / `.timer` | oneshot + 45s poll |
| `promocard-upstream.conf` | `promocard_app` → `127.0.0.1:8800` |
| `nginx-promocard.vhost.example` | Public vhost (promocard.liessum.dev) + Let's Encrypt paths |

Checkout `/opt/promocard`, image `promocard:latest`, state `/var/lib/promocard-update/`.

## Install (root)
```bash
git clone https://github.com/rliessum/promocard.git /opt/promocard && chown -R rliessum: /opt/promocard
cd /opt/promocard && S=$(git rev-parse HEAD) && GIT_SHA=$S docker compose up -d --build
curl -fsS http://127.0.0.1:8800/version.json
install -d /var/lib/promocard-update
install -m0644 deploy/promocard-update.{service,timer} /etc/systemd/system/
systemctl daemon-reload && systemctl enable --now promocard-update.timer
```

## Rollback
`docker tag promocard:previous promocard:latest && docker compose up -d` (container) · remove the vhost symlink + `nginx -t && systemctl reload nginx` (proxy).
