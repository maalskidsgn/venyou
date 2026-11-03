#!/usr/bin/env bash
# EINMALIG auf dem Server als root ausführen:
#   bash /opt/venyou/werkzeuge/autodeploy-einrichten.sh
# Legt Deploy-Schlüssel (nur Lesen), SSH-Alias und systemd-Timer an.
set -euo pipefail
[ -f /root/.ssh/venyou_deploy ] || ssh-keygen -q -t ed25519 -N "" -C venyou-deploy -f /root/.ssh/venyou_deploy
grep -q "Host github-venyou" /root/.ssh/config 2>/dev/null || printf "\nHost github-venyou\n  HostName github.com\n  User git\n  IdentityFile /root/.ssh/venyou_deploy\n  IdentitiesOnly yes\n" >> /root/.ssh/config
ssh-keyscan -t ed25519 github.com 2>/dev/null >> /root/.ssh/known_hosts
cp /opt/venyou/werkzeuge/autodeploy.sh /usr/local/bin/venyou-autodeploy.sh && chmod +x /usr/local/bin/venyou-autodeploy.sh
printf "[Unit]\nDescription=VENYOU Auto-Deploy von GitHub\n[Service]\nType=oneshot\nExecStart=/usr/local/bin/venyou-autodeploy.sh\n" > /etc/systemd/system/venyou-autodeploy.service
printf "[Unit]\nDescription=VENYOU Auto-Deploy alle 2 Minuten\n[Timer]\nOnBootSec=2min\nOnUnitActiveSec=2min\n[Install]\nWantedBy=timers.target\n" > /etc/systemd/system/venyou-autodeploy.timer
systemctl daemon-reload && systemctl enable --now venyou-autodeploy.timer
echo; echo "Diesen öffentlichen Schlüssel bei GitHub eintragen (Repo → Settings → Deploy keys, nur Lesen):"; echo; cat /root/.ssh/venyou_deploy.pub
