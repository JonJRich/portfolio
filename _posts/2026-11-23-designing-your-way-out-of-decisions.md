---
layout: post
title: "Designing your way out of decisions"
description: "Not every project is a success story. What 6 months leading Jellyfish, balena’s home-grown Slack and Notion in one, taught me about scope and strategy."
date: 2026-11-23
reading_time: "3 min read"
placeholders: false
image: /assets/images/Jellyfish-Hero.webp
image_alt: "Jellyfish, with a notifications inbox on the left, a list of mentions and threads, and an open thread of colleagues replying to each other."
image_caption: "Jellyfish, where the whole company talked every day. An inbox, threads, and a feed you could tune so notifications helped your day rather than hijacked it."
---

Designers love a success story, portfolios are full of them.

This isn’t one. Well, not entirely.

It’s about a product called Jellyfish, and the idea behind it was a big one. Knowledge and conversation have always lived in separate tools. Documents go stale in one, useful details get buried in the other. Could we build Slack and Notion as a single product?

At balena, a fully remote team of almost 100 people, we chose to do exactly that. The knowledge half was already in use by the time I arrived. I was brought in to lead the other half, spending 6 months as product owner and design lead, managing 6 engineers while designing the UX and UI across the whole product.

And I had a total blast.

When your users are your colleagues, research is only ever a message away. We learned that 80% of the team saw message notifications as crucial to the success of their day, while others found it a distraction. To keep everyone happy, and to avoid any backlash from our fellow balenistas, we built a feed people could tune for themselves.

{% include figure.html
  src="/assets/images/Jellyfish-detail.webp"
  alt="A Jellyfish improvement page for hardware testing, with summary, timeline and milestone tabs and a written specification beside the related threads."
  caption="The knowledge half. Specs, milestones and the threads about them, all in one place. The dream, at least."
  layout="wide"
%}

Then our chat tool, Flowdock, announced it was sunsetting.

In August.

It was July.

Overnight, Jellyfish went from “launching soon” with a comfortable timeline, to weekly meetings with leadership to report against an urgent and inflexible deadline. After a few frantic weeks, Jellyfish became the place the whole company talked every day. For a while that felt like we’d nailed it.

<blockquote>
  <p>“His ability to lead, particularly evident when he took charge of our internal communication tool at a crucial time, speaks about his commitment and capability.”</p>
  <footer>Konstantinos Mouzakis, co-CEO, balena</footer>
</blockquote>

But it soon became clear we’d bitten off more than we could chew. The product was huge, and the engineering stack we’d chosen couldn’t carry it. We were putting out more fires than we were building.

Jellyfish didn’t fail on the idea, or the design. It failed on technical limitations.

The hard part? You can’t just switch something like that off. A whole company relied on it, and we ran customer support through it too. So we had to unwind it, moving the messaging over to Zulip, keeping the documentation and support that worked, and designing our way back out again.

That meant sitting down with engineers and talking about work they’d poured hours and hours into. The hardest conversations of the project, and none of them were about pixels.

Those 6 months on Jellyfish taught me a lot.

Primarily, that good design can’t save a struggling product, but better product strategy can.

If I’d pushed to keep scope tighter, focused on delivering something that could reliably scale, and passed chat functions over to Zulip straight away, maybe Jellyfish would still be around today.
