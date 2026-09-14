# Flame & Feast — Production Hosting & Deployment Guide

This full-stack Next.js 14 application is configured for universal hosting across **cPanel**, **Linux VPS (Ubuntu/Debian)**, **Docker containers**, and **Cloud Platforms**.

---

## 🚀 Option 1: cPanel Hosting (Setup Node.js App)

Most cPanel hosts provide the **"Setup Node.js App"** (CloudLinux / cPanel Application Manager) feature.

### Step-by-Step cPanel Deployment:
1. **Prepare Files**:
   - Run `npm run build` locally or upload the project zip file to your cPanel File Manager (e.g. into `/home/username/flame-and-feast`).
2. **Open cPanel > "Setup Node.js App"**:
   - Click **Create Application**.
   - **Node.js Version**: Select `20.x` or `22.x` or `18.x`.
   - **Application Mode**: `Production`.
   - **Application Root**: `flame-and-feast` (or your folder name).
   - **Application URL**: Your domain (e.g., `yourdomain.com` or `order.yourdomain.com`).
   - **Application Startup File**: `server.js`.
3. **Environment Variables**:
   - In the cPanel Node.js app settings, add:
     - `DATABASE_URL`: `file:./dev.db`
     - `ADMIN_PASSWORD`: `your_secure_password`
     - `PORT`: (Managed by cPanel or default `3000`)
4. **Install Dependencies & Seed Database**:
   - Click **Run NPM Install** in cPanel.
   - Click **Enter Virtual Environment** command in SSH / cPanel Terminal and run:
     ```bash
     npx prisma generate
     npx prisma db push
     node scripts/seed.mjs
     ```
5. **Start Application**:
   - Click **Restart Application** in cPanel.
   - Your website is now live!

---

## 🖥️ Option 2: VPS Hosting (Ubuntu / Nginx + PM2)

For hosting on DigitalOcean, AWS EC2, Linode, or Hetzner:

### 1. Install Node.js, PM2 & Nginx:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
sudo npm install -g pm2
```

### 2. Clone & Build:
```bash
cd /var/www
git clone <your-repository-url> flame-and-feast
cd flame-and-feast
npm install
npx prisma generate
npx prisma db push
node scripts/seed.mjs
npm run build
```

### 3. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Configure Nginx Reverse Proxy (`/etc/nginx/sites-available/flamefeast`):
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/flamefeast /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Enable Free SSL with Certbot:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🐳 Option 3: Docker Deployment

To build and run with Docker:
```bash
docker build -t flame-and-feast .
docker run -d -p 3000:3000 --name flame-feast-app --restart always flame-and-feast
```

---

## 🔑 Default Credentials & Admin Access
- **Admin Portal**: `https://yourdomain.com/admin`
- **Default Password**: `admin123` (Change this in `.env` under `ADMIN_PASSWORD`)
- **Customer Hotline**: `16588` (Configurable in `.env`)
