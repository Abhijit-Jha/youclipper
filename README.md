# YouClipper 🎬

<div align="center">

**The Ultimate YouTube Video Clipping Tool**

_Why Share a Whole Video? Clip What Counts._

[![GitHub stars](https://img.shields.io/github/stars/Abhijit-Jha/youclipper)](https://github.com/Abhijit-Jha/youclipper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter Follow](https://img.shields.io/twitter/follow/youclipper?style=social)](https://X.com/youclipper)

[⭐ Star on GitHub](https://github.com/Abhijit-Jha/youclipper) • [Follow on X](https://X.com/youclipper)

</div>

## 📋 Table of Contents

- [🌟 What is YouClipper?](#-what-is-youclipper)
- [🎯 Who can use YouClipper?](#-who-can-use-youclipper)
- [🎥 Live Demo](#-live-demo)
- [💝 Show Your Support](#-show-your-support)
- [🏠 Ready to Self-Host? Let's Get Started!](#-ready-to-self-host-lets-get-started)
- [🚀 What You'll Need First](#-what-youll-need-first)
- [🔧 Setting Up Your Services](#-setting-up-your-services)
  - [1. Getting Your Redis Connection](#1-getting-your-redis-connection)
  - [2. Obtaining Your YouTube API Key](#2-obtaining-your-youtube-api-key)
  - [3. Setting Up MongoDB](#3-setting-up-mongodb)
- [🎯 Frontend Setup](#-frontend-setup)
- [🛠️ Server Setup](#️-server-setup)
- [🎉 You're All Set to Clip!](#-youre-all-set-to-clip)
- [🎯 How YouClipper Works](#-how-youclipper-works-its-that-simple)
- [🔥 Tech Stack That Powers YouClipper](#-tech-stack-that-powers-youclipper)
- [📝 Keep These in Mind](#-keep-these-in-mind)
- [🤝 Join Our Community](#-join-our-community)
- [📄 License](#-license)

## 🌟 What is YouClipper?

Ever felt like sharing just that one perfect moment from a YouTube video, instead of the whole thing? **YouClipper** makes that super easy.

This powerful open-source platform helps you transform any long-form YouTube content into precise, professional clips — perfect for **reels, memes, educational highlights, or promotion.** Just paste a URL, pick your segment, select quality, and instantly get clean, watermark-free clips ready to share.

**Want to grow your audience and increase reach?** Use **YouClipper** to create short clips that promote your long videos effectively — whether you're showing **spiritual insights, sharing truth, gaming highlights, music edits, fitness tips, memes to spread smiles, or anything in between.**

**Snip. Share. Shine.** With YouClipper, you empower your creativity and maximize your content's impact by making every second count.

---

## 🎯 Who can use YouClipper?

- 🎥 **Content Creators** – Repurpose long videos into short viral reels
- 🧠 **Educators** – Highlight key parts from lectures or tutorials
- 🎮 **Gamers** – Clip and share your best moves
- 😂 **Meme Lords** – Cut, remix, and go viral

---

## 🎥 Live Demo

<div align="center">

### See YouClipper in Action! 🚀

<video width="100%" max-width="800" controls poster="">
  <source src="https://fra.cloud.appwrite.io/v1/storage/buckets/684040130030e9d7fa71/files/6846ba77003a73ee9d3a/view?project=683da6570006cdf22e69&mode=admin" type="video/mp4">
  Your browser does not support the video tag.
</video>
[VIDEO IS NOT SUPPORTED IN GITHUB]

_Watch how easy it is to create perfect clips from any YouTube video_

**🎬 [Direct Video Link](https://fra.cloud.appwrite.io/v1/storage/buckets/684040130030e9d7fa71/files/6846ba77003a73ee9d3a/view?project=683da6570006cdf22e69&mode=admin)** - Click to open in new tab

### 🌐 Try It Live

Try YouClipper [live](https://www.youclipper.xyz/)

</div>

---

## 💝 Show Your Support

## 🚀 Loving what you see?

Your support fuels our mission to keep building **amazing open-source tools** that empower creators and developers around the world. Every star, follow, and share helps more than you know! 🌍✨

- 🌟 [**Star this repository**](https://github.com/Abhijit-Jha/youClipper) — It means the world to us and shows your love!
- 🛠️ [**Check out the backend repo**](https://github.com/Abhijit-Jha/you-clipper-backend) — Built with care for performance & scalability.
- 🐦 [**Follow us on Twitter**](https://X.com/youclipper) — Stay up to date with features, fixes, and cool tips.
- 💼 [**Connect on LinkedIn**](https://linkedin.com/in/abhijit-jha1) — Say hi to the creator and share your feedback or ideas!
- 📣 **Tell your friends** — Because great tools are even better when shared.

> Together, we clip better. ❤️✂️

---

## 🏠 Ready to Self-Host? Let's Get Started!

Want to run YouClipper on your own infrastructure? Perfect! Follow this comprehensive guide to get your instance up and running.

## 🚀 What You'll Need First

Before diving in, make sure you have these essentials ready:

- 🧠 **Redis Client** – Powers our lightning-fast queue management.
- 📺 **YouTube API Key** – Enables seamless YouTube integration.
- 🗄️ **MongoDB Connection** – Handles all your data storage needs.
- 🛡️ [**Appwrite**](https://appwrite.io) _(optional)_ – Used for authentication and backend services. You can skip or remove this if you're self-hosting without Appwrite.
- 🧰 **Node.js (v16+)** and **npm** – The foundation of our tech stack.

---

## 🔧 Setting Up Your Services

### 1. Getting Your Redis Connection

Redis is the backbone of our queue system. Here's where you can get started:

**Cloud Options (Recommended for beginners):**

- **[Railway](https://railway.app)** – Deploy Redis in seconds with their intuitive interface
- **[Upstash](https://upstash.com)** – Serverless Redis that scales automatically
- **[AWS ElastiCache](https://aws.amazon.com/elasticache/)** – Enterprise-grade Redis from Amazon

**Self-Hosted:**

- **[Redis Official](https://redis.io)** – Download and run on your own servers

💡 **Pro Tip:** Store your Redis connection URL in environment variables and never hardcode credentials!

### 2. Obtaining Your YouTube API Key

This key unlocks the power of YouTube's data for your clips:

1. Head to the [**Google Cloud Console**](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services → Library**
4. Search for and enable **YouTube Data API v3**
5. Go to **APIs & Services → Credentials**
6. Click **Create Credentials** and select **API Key**

🔒 **Security First:** Keep your API key secure and use environment variables in production!

### 3. Setting Up MongoDB

Your data deserves a reliable home. Choose your preferred option:

#### Option A: MongoDB Atlas (Perfect for Starters)

1. Visit [**MongoDB Atlas**](https://www.mongodb.com/cloud/atlas)
2. Sign up and create your first project
3. Deploy a **free tier cluster** (perfect for testing)
4. Click **Connect** and grab your connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

#### Option B: Local MongoDB with Docker (For Developers)

```bash
# Spin up MongoDB locally
docker run --name youclipper-mongo -d -p 27017:27017 mongo
```

Then use this connection string:

```env
MONGODB_URI=mongodb://localhost:27017/youClipper
```

---

## 🎯 Frontend Setup

Follow these steps to set up the frontend application:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abhijit-Jha/youclipper
   cd youclipper
   ```

2. **Create a `.env` file:**
   Set up your environment variables by copying the example file:

   ```bash
   cp .env.example .env
   ```

   You can find the `.env.example` file [here](https://github.com/Abhijit-Jha/youclipper/blob/master/.env.example).
   Update the values in `.env` with your actual credentials and configuration.

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

✅ **Frontend running at: http://localhost:3000**
Your application should now be accessible in your browser.

---

## 🛠️ Server Setup

Now let's power up the engine behind YouClipper:

> 📦 **Need the backend code?** Find it at [youclipperbe repository](https://github.com/Abhijit-Jha/you-clipper-backend)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abhijit-Jha/you-clipper-backend
   cd you-clipper-backend
   ```

2. **Create a `.env` file:**
   Set up your environment variables by copying the example file:

   ```bash
   cp .env.example .env
   ```

   You can find the `.env.example` file [here](https://github.com/Abhijit-Jha/you-clipper-backend/blob/master/.env.example).
   Update the values in `.env` with your actual credentials and configuration.

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm run start-server
   ```

✅ **Backend running at: http://localhost:3001**

---

## 🎉 You're All Set to Clip!

Congratulations! YouClipper is now running smoothly on your machine:

- **🎨 Frontend Interface:** http://localhost:3000
- **⚙️ Backend API:** http://localhost:3001

**Ready to create your first clip?** Let's see how it works!

---

## 🎯 How YouClipper Works (It's That Simple!)

### Step 1: **Instant Access**

Sign in with your Google account – no lengthy forms, just one click and you're in!

### Step 2: **Drop That URL**

Paste any YouTube video URL and watch the magic begin.

### Step 3: **Perfect Your Selection**

Use our intuitive drag interface to select exactly the moments that matter – whether it's a tutorial highlight, a gaming achievement, or the perfect meme material.

### Step 4: **Choose Your Quality**

From 144p for quick shares to crystal-clear HD for professional use – you decide the quality that fits your needs.

### Step 5: **Download & Share**

Get your clean, watermark-free clip instantly and share it with the world!

---

## 🔥 Tech Stack That Powers YouClipper

- **🎥 Video Processing:** yt-dlp, FFmpeg, ffmpeg-static
- **⚡ Queue Management:** BullMQ, Redis
- **🎨 Frontend:** Next.js, Tailwind CSS, ShadCN UI
- **🔧 Backend:** Node.js, Express
- **🗄️ Database:** MongoDB
- **🔐 Authentication:** Next Auth, Google OAuth

---

## 📝 Keep These in Mind

- ✅ Make sure your **Redis server** is running before starting the application.
- 🔒 **Never commit API keys** or secrets to version control — use environment variables (`.env.local`, etc.) instead.
- 🔄 Both the **frontend and backend** must be running for full functionality.
- 🏗️ If you're doing **self-hosting**, you can safely **remove the Appwrite-related parts** from the codebase.

---

## 🤝 Join Our Community

YouClipper thrives because of amazing people like you! Here's how you can contribute:

**🌟 Show Support:**

- Star our repository to help others discover YouClipper
- Share it with fellow creators and developers

**🛠️ Get Involved:**

- Fork the project and submit pull requests
- Report bugs and suggest exciting new features
- Improve our documentation (every bit helps!)
- Share your ideas and feedback

**🎯 Development Workflow:**
Check out [CONTRIBUTING.md](https://github.com/Abhijit-Jha/youclipper/blob/master/CONTRIBUTING.md)
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-new-feature`
3. Commit your changes: `git commit -m 'Add amazing new feature'`
4. Push to your branch: `git push origin feature/amazing-new-feature`
5. Open a Pull Request and let's make YouClipper even better!

---

## 📄 License

This project is released under the MIT License – see the [LICENSE](LICENSE) file for complete details.

---

<div align="center">

**⭐ Found YouClipper helpful? Star the repo to show your love! ⭐**

**Crafted with ❤️ by [Abhijit Jha](https://github.com/Abhijit-Jha)**

_© 2025 YouClipper. Empowering creators worldwide._

</div>
