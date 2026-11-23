---
layout: case-study
title: "2 sets of guidelines is worse than none"
description: "I led the design and implementation of balena’s token-based design system, giving engineers, product and marketing one trusted source of truth while the business grew fast."
home_title: "Shoring up the design of a rapidly scaling product"
home_dek: "Bringing design order and consistency to a product growing 25% year on year, which hit 10 million ARR while I was there."
permalink: /work/balena/
case_study_type: long
featured: false
order: 3
placeholders: false
ground: "#DDF0F8"
accent: "#48C0ED"
accent_text: "#1B6E93"
image: /assets/images/balena-Hero.webp
image_alt: "balenaCloud fleet summary for balena-cloud, listing devices, online and offline status, and releases."
image_caption: "balenaCloud, where a lot of our customers spent their whole working day. One fleet, 21 devices, 5,174 releases and counting."
role: "Senior product designer"
year: "2024"
skills:
  - Design systems
  - Product design
  - Brand
reading_time: "5 min read"
summary: >
  As senior product designer, I led design across all of balena’s digital platforms, from the flagship web app balenaCloud to balenaHub and the marketing site, whilst ensuring the brand was consistent throughout.
points:
  - "**Project and design lead** on the design system, leading a cross-discipline team to evolve the brand from a product-first perspective, and to build a token-based system to support the whole product portfolio."
  - "**ARR grew more than 25%** year on year, all during a period of rapid acceleration."
spine_title: "balena"
spine_color: "#56646C"
spine_ink: "#F1F3F2"
related: sparx-assessments
---

<section class="chapter chapter--plain" id="overview" markdown="1">

<p class="section-kicker">Overview</p>

## Power users don’t forgive inconsistency

balena’s platform lets businesses remotely deploy, manage and update industrial IoT devices. Customers ranged from a single device to fleets of more than 100,000. Everything from crypto miners to EV charging networks, renewables and CO2 monitoring. For many of them, the balenaCloud dashboard was where they spent their whole working day.

{% include figure.html
  src="/assets/images/balena-1.webp"
  alt="balenaCloud device page for a device named klutchell, with status, resource meters, and live service logs."
  caption="A single device in balenaCloud. Status, CPU, memory, temperature and a firehose of live logs, all on one screen. Power users live here."
  layout="wide"
%}

Everyone at balena, me included, did regular support shifts. It meant I saw first-hand how customers used the product, and where it let them down.

{% include split.html
  src="/assets/images/balena-2.webp"
  alt="balenaHub, the IoT marketplace, with a keyword filter and device list on the left and a grid of community-built blocks on the right."
  caption="balenaHub, rebuilt from scratch on the design system. Find a project, hit deploy, done."
  text="Alongside it sat balenaHub, a sister site that I redesigned from scratch using the design system, where the community shares IoT projects that anyone can deploy through balenaCloud, or join as an open fleet without even needing an account."
%}

</section>

<section class="chapter chapter--tint" id="problem" markdown="1">

<p class="section-kicker">Problem</p>

## 2 sets of guidelines is worse than none

When I joined balena, it was clear that even within a single product the UI varied widely. Even when components looked the same, they were often built completely differently, which meant wildly different user experiences.

I led the team through a full audit of the product. It showed the extent of the problem, and something more useful. balena didn’t lack design guidelines; it had 2 sets. Nobody was confident either was accurate, and there was no documentation at all. So every time someone hit a component they weren’t sure how to build, they asked for guidance, and often got a different answer depending on who they asked.

That varying guidance was the real problem the design system had to solve.

</section>

<section class="chapter chapter--plain" id="design" markdown="1">

<p class="section-kicker">Design</p>

## Design the system for the people who build with it

{% capture key_decision %}
Mapping who would use the design system put front-end engineers at its centre, with the product and design teams around them. That decided what we built first: not a designer’s component library, but specifications and design tokens engineers could trust and use directly.

{% include pair.html
  src_a="/assets/images/balena-tokens-text.webp"
  alt_a="A token table for text colours, listing variants and roles with a swatch, token name, description, CSS variable and hex value for each."
  caption_a="Text tokens. A name, a job description, the variable to use and the value, so nobody has to guess."
  src_b="/assets/images/balena-tokens-border.webp"
  alt_b="A token table for border colour roles: info, success, warning and danger, each with its token, description, variable and value."
  caption_b="Border roles for messages and states. Same format every time, straight into the code."
%}

We shipped the tokens as an NPM package, and the engineers were quickly on board. The design team won too: we could create and update tokens in one place and watch the change flow through the products.

We very nearly went for a documentation-heavy, Storybook-first option, but that would have served designers first and delayed getting tokens into engineers’ hands.
{% endcapture %}

{% include callout.html label="Key decision" title="Front-end engineers as the core users" body=key_decision glow=true %}

### Getting a fast-moving team on board

Creating the design system was, in many ways, the easy part. Getting a fast-moving, engineering-led team to adopt it was always going to be the challenge. To help it take flight, I did the following:

- involved the whole team from the start, listening to their feedback and workshopping solutions together
- built for the core users first, so the system served their needs before anyone else’s
- communicated the vision at every opportunity: team chat, company-wide meetings, even a dedicated presentation
- got leadership buy-in early, by showing how it brought stability to the product ahead of growth

{% include pullquote.html text="“He worked well with the team, earning their respect through his steady and thoughtful approach to design.”" cite="Konstantinos Mouzakis, co-CEO, balena" %}

</section>

<section class="chapter chapter--tint" id="solution" markdown="1">

<p class="section-kicker">Solution</p>

## One source of truth for everything design

design.balena.io brought UI and UX guidelines together in a single, easy-to-update site. It became the single source of truth for all things design, and useful well beyond the design team.

{% include figure.html
  src="/assets/images/balena-design-site.webp"
  alt="The welcome page of design.balena.io, with navigation for foundations, design tokens, colours, typography and components, and an introduction to what a design system is."
  caption="design.balena.io. One place to look, and one answer, whoever you are and whatever you’re building."
  layout="wide"
%}

Underneath sat a foundation layer: a base palette of colours, from which we defined a semantic layer for each product and website. That allowed variation between touchpoints while making sure everything came from the same source. From the marketing site right through to balenaCloud.

{% include pair.html
  src_a="/assets/images/balena-3.webp"
  alt_a="The base colour palette in rows of graded swatches, beside a table of status colour tokens and examples of buttons built from them."
  caption_a="The foundations. One base palette, with semantic tokens for things like status built on top."
  src_b="/assets/images/balena-token-anatomy.webp"
  alt_b="A diagram of design token anatomy: color.bg.accent.strong.hover, labelled as category, property, attribute, modifier and a planned state level."
  caption_b="Token anatomy. Every token follows the same structure, so you can read what it does without any extra context."
%}

</section>

<section class="chapter chapter--plain" id="results" markdown="1">

<p class="section-kicker">Results</p>

## Adopted fast, by the people it was built for

The front-end team adopted the system quickly. It went into the balena blog and key patterns in the balenaCloud dashboard, and it started an alignment between product and marketing that carried on after I left.

<ul class="stats">
  <li><span class="stat-num">25%+</span><span class="stat-label">ARR growth year on year while the system landed</span></li>
</ul>

It landed during a period of rapid growth, with ARR up more than 25% year on year. I can’t claim the design system caused that growth, but it meant the product could grow without the UI fragmenting further.

{% include pullquote.html text="“Jon played a key role in developing our brand to better reflect our product and culture, and subsequently contributed towards standardizing our branding guidelines and UI style guide, which brought much-needed consistency to our design efforts.”" cite="Konstantinos Mouzakis, co-CEO, balena" %}

</section>

<section class="chapter chapter--ink" id="reflection" markdown="1">

<p class="section-kicker">Reflection</p>

## The system was the easy part

Looking back, the design and the tokens were the straightforward part. The work that mattered was people: finding the system’s real users, and taking the whole company with us.

If I did it again, I’d set measures from day one. The original problem, people getting different answers to the same question, was measurable: component coverage, time to build a feature, design-related bugs.

</section>
