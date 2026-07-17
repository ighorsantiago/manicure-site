# 💇 Nail salon — Website Template

A modular website template for small businesses, built with React, TypeScript, Vite, and Tailwind CSS. Part of the **Fábrica de Sites** project — a collection of reusable site blueprints designed for fast client deployment.

> 📌 **This is one of three templates in the collection:**
> - [barbearia-site](https://github.com/ighorsantiago/barbearia-site) — Barbershop template
> - [manicure-site](https://github.com/ighorsantiago/manicure-site) — Nail salon template
> - [ploter-site](https://github.com/ighorsantiago/ploter-site) — Print shop template (live case: [Ploter.com](https://ploter.com))

---

## 📱 About

The **Fábrica de Sites** approach uses a **single source of truth configuration pattern** — all client-specific content (business name, colors, contact info, services, opening hours) lives in a single config file. Switching clients requires minimal code changes.

**Key features:**
- Appointment booking flow
- Admin dashboard
- PIX payment module
- SEO-ready structure
- Google Search Console integration (Ploter.com case)
- Continuous deployment via Vercel

---

## 🛠 Tech Stack

- [React](https://react.dev/) 18 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) — deploy

---

## 🚀 Getting started

### Installation

```bash
# Clone the repository
git clone https://github.com/ighorsantiago/[repo-name].git

cd [repo-name]

npm install
```

### Running locally

```bash
npm run dev
```

### Customizing for a new client

All client-specific content is in `src/config/index.ts` (or equivalent config file). Update the following fields:

```typescript
export const config = {
  businessName: "Your Business Name",
  primaryColor: "#your-color",
  phone: "your-phone",
  address: "your-address",
  services: [...],
  openingHours: {...},
}
```

### Deploy

Connect the repository to [Vercel](https://vercel.com) for automatic deployments on every push.

---

## 👤 Author

**Ighor Santiago**

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/ighor-santiago/)
[![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat-square&logo=github)](https://github.com/ighorsantiago)
