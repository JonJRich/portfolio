---
layout: case-study
title: "Class-level insights when every student’s experience is unique"
description: "I led the discovery and design of a reimagined Insights page that took the results of personalised homeworks and gave teachers a class-level overview of where they excelled and where they struggled."
home_dek: "Working with education leads to take a homework Insights page that offered little real insight and make it part of teachers’ weekly routine, with weekly reach up from 22% to 30%."
product: "Sparx Science"
product_icon: /assets/images/icons/sparx-science.png
permalink: /work/sparx-science-insights/
case_study_type: long
featured: false
order: 2
placeholders: false
ground: "#DCEBE8"
accent: "#2F7D76"
image: /assets/images/Insights-Hero.webp
image_alt: "The new Sparx Science Insights page for a week 12 homework, listing each topic with a first-time correct bar, coloured by how well the class did, above the Key Flashcards."
image_caption: "The new Insights page. Every topic in the homework, how the class got on first time, and a quick read on where to look next."
role: "Senior product designer"
year: "2026"
skills:
  - Product design
  - Data design
  - Discovery
reading_time: "6 min read"
summary: >
  Over 4 weeks I led the design of a major iteration of Sparx Science’s Insights page to help teachers achieve greater impact post homework hand-in.
points:
  - "**The Sparx Science team**, including the education lead and senior product owner, worked with me to define the problem and understand users’ needs before designing a solution."
  - "**Personalised homework, aggregated.** You can never guarantee how many of the class will see the same question, yet every homework still gets top-level, actionable insights."
  - "**5.4% → 7.2%** of homeworks where teachers engaged significantly with the page, roughly doubling in every matched week of the autumn term."
  - "**More Hand-in visitors went on to Insights** in the first 5 weeks of autumn term, year on year: Sparx Science 41% → 44%, and Sparx Maths 27% → 39%, where the page was subsequently implemented."
spine_title: "Sparx Science"
spine_color: "#2F7D76"
spine_ink: "#F1F5F3"
related: balena
---

<section class="chapter chapter--plain" id="overview" markdown="1">

<p class="section-kicker">Overview</p>

## Giving teachers the pulse of a homework in an instant

Sparx Science delivers personalised, achievable homework to students in over 1,300 schools. Across a class no two students will have the same set of questions, a dream for ensuring every learner is given work at their level, a nightmare for teachers trying to read the pulse of their class.

My design for the reimagined Insights page aggregated student performance up to a topic level, supported by carefully designed thresholds to maintain confidence in the data, so that teachers could see in an instant where their focus needed to go.

{% include split.html
  src="/assets/images/Insights-hand-in_nudge.webp"
  alt="The Hand-in page with a banner under the week picker reading: Chemistry, Atomic number and mass number, 45% of questions correct first time, with a button to Insights."
  caption="The Hand-in nudge. Your class’s weakest topic, one click away from the page teachers already check every week."
  text="Alongside the topic insights, the redesign also brought in Key Questions and Key Flashcards, and later a nudge from Hand-in pointing teachers to their class’s weakest topic."
%}

</section>

<section class="chapter chapter--tint" id="problem" markdown="1">

<p class="section-kicker">Problem</p>

## Teachers visited, but didn’t act

Since launch, the Insights page had only ever shown one thing: 5 questions that students\* in the class struggled with.

<p class="footnote">*The nature of personalised homework means that some of those 5 questions may have only been seen by a handful of students, enough to give teachers a starter to use in their next lesson, not enough to make any confident adjustments to their teaching.</p>

What we had was an Insights page that failed to deliver any true insight.

{% include pair.html
  src_a="/assets/images/Insights-Old.webp"
  alt_a="The old Insights page, the Follow-up Five, showing a short list of questions the class struggled with."
  caption_a="The before. The Follow-up Five: 5 tricky questions, which sometimes meant 5 questions only a couple of students had actually seen."
  src_b="/assets/images/Insights-Hero.webp"
  alt_b="The new Insights page, with first-time correct bars for every topic in the homework."
  caption_b="The after. Topics first, so one tricky question doesn’t shout louder than it should."
%}

Internally it was well known that this page received the least traffic of the 3 main ones required to check homework each week (the other two are Planner and Hand-in).

However, whilst only 8.7% of all homeworks had any interaction, typically 20% to 35% of active teachers opened Insights each week, while 85% to 93% checked Hand-in. The gap I saw was between the visit and the action.

The goal became clear: design a page that teachers engage with, not just glance at.

</section>

<section class="chapter chapter--plain" id="design" markdown="1">

<p class="section-kicker">Design</p>

## How I made class-level insights visible

This wasn’t the first time the team had looked at iterating on the Insights page, but every time it was discussed it hit the same problem: if only 5 students see a question, but they all get it wrong, is that a signal to act, or just noise?

At first, when I suggested topics, the same issue was raised. But our senior product owner’s analysis of the numbers showed that within a handful of answers the first-time correct percentage was within a few points of its final value, and by around 20 it was unlikely to change at all.

In reality, as the homework is completed throughout the week, confidence in the topic insights increases, to the point that for most classes, by the time it’s due, the majority of topics have a high level of confidence.

Why first-time correct rate? This was chosen with the education lead because it shows knowledge the student already held, not knowledge recovered after feedback. It’s the share of question attempts on a topic that were answered correctly the first time.

This data gave the team confidence that we could implement class-level insights, so it became my job to make sure the differing levels of confidence were clear to the user.

{% capture key_decision %}
*The topic insights were going to live at the top of the page, the first thing a teacher sees, and designed to give them a picture of how a class performed each week.*

The challenge was that in the same instant they got a temperature check of the class, they also needed to get the confidence level of each piece of data.

After testing several versions I landed on the following:

- **No confidence (5 answers or fewer):** “Not enough question attempts on this topic”, no bar.
- **Low confidence (6 to 25 answers):** a faded bar, with a tooltip reading “only N answered”.
- **High confidence (more than 25 answers):** a solid bar.

{% include figure.html
  src="/assets/images/Insights-thresholds.webp"
  alt="The topic table for one homework showing all 3 states: solid bars, a faded bar with its tooltip open, and a topic with no bar and a note that there are not enough question attempts."
  caption="All 3 states in one homework. Solid bars you can trust, faded ones that are still settling, and a polite “not enough question attempts” when there’s nothing worth saying yet."
  layout="wide"
%}

My first version simply locked a topic’s data until it reached about 20 answers. It was safe, but it meant teachers could see nothing at all until then. So I added a middle state: show the data, but make it obvious it isn’t settled yet.

That was the real tension in the design: how much to give teachers early, so it can inform their teaching, against how much to hold back so they don’t act on misleading numbers.
{% endcapture %}

{% include callout.html label="Key decision" title="Making data confidence visible to the user" body=key_decision glow=true %}

</section>

<section class="chapter chapter--tint" id="results" markdown="1">

<p class="section-kicker">Results</p>

## The metrics look good, but is the new feature driving it?

### What teachers said

<ul class="stats">
  <li><span class="stat-num" data-long>13% → 44%</span><span class="stat-label">of feedback posts that were praise</span></li>
  <li><span class="stat-num" data-long>37% → 12%</span><span class="stat-label">of feedback posts that were negative, from launch</span></li>
</ul>

{% include pullquote.html text="“Really good at spotting the weakness as well as how many people in the class struggled with the different skill sets required for topics.”" cite="Maths teacher, on the shared Insights page" %}

### Reach

Weekly reach for active teachers:

<ul class="stats">
  <li><span class="stat-num" data-long>22% → 30%</span><span class="stat-label">Sparx Science, an 8pt step around the June launch</span></li>
  <li><span class="stat-num" data-long>21% → 30%</span><span class="stat-label">Sparx Maths, about 9pt up from autumn 2025 to autumn 2026</span></li>
</ul>

Hand-in visitors who also visited Insights, first 5 weeks of autumn term, year on year:

<ul class="stats">
  <li><span class="stat-num" data-long>41% → 44%</span><span class="stat-label">Sparx Science, a 3pt increase</span></li>
  <li><span class="stat-num" data-long>27% → 39%</span><span class="stat-label">Sparx Maths, a 12pt increase</span></li>
</ul>

Reach went up in both products, most clearly in Maths, where the starting point was weakest. What wasn’t clear from these high-level metrics is how teachers’ behaviour changed on the page. Were they more engaged? If so, with what features?

### Depth

<ul class="stats">
  <li><span class="stat-num" data-long>14.7% → 20.6%</span><span class="stat-label">of Sparx Science visits with a deliberate action, a 5.9pt increase</span></li>
</ul>

This number was taken from my own analysis of our data sets and page events, and shows a positive increase in deliberate action (largely clicks, rather than hovers, on the page’s elements).

However, when I dug a little deeper, the biggest drivers were Key Questions (33% of sessions) and Key Flashcards (21%), with clicks on the topic summary a distant third (11%).

<ul class="stats stats--compact">
  <li><span class="stat-num">33%</span><span class="stat-label">of sessions used Key Questions</span></li>
  <li><span class="stat-num">21%</span><span class="stat-label">used Key Flashcards</span></li>
  <li><span class="stat-num">11%</span><span class="stat-label">clicked the topic summary</span></li>
  <li><span class="stat-num">48%</span><span class="stat-label">hovered over a topic bar</span></li>
</ul>

That could point to the topic summary being ignored, but I don’t think the data can say that. The topic summary is designed to be read, not clicked: teachers hover over a bar to see its detail, and they did so in 48% of sessions. Hovers aren’t counted as deliberate action, because the data can’t tell someone reading from a mouse passing over.

So is the new feature driving the results? Honestly, we can’t tell yet, and that’s a lesson in itself.

</section>

<section class="chapter chapter--ink" id="reflection" markdown="1">

<p class="section-kicker">Reflection</p>

## Ship it so you can measure it

This project shipped earlier this year, and since then I’ve had time to gather the data, and reflect on what we’ve learned.

The top-level metrics show a good increase in visits to the page, and teachers are doing more on it once they arrive. Feedback has turned too, with praise rising from 13% of posts to 44%. What I can’t show is how much of that comes from the topic-level insights, because teachers read them by hovering, and we weren’t measuring that.

Taking in the teacher feedback we’ve received since launch, they want more detail at both ends of the spectrum. They want to be able to zoom out and see topic-level performance across whole terms, whilst also wanting to be able to drill down at question level to better target groups of individual students.

Both are viable next steps. But the bigger lesson is how we ship them. The April release, Topic Insights, the Hand-in nudge and the Maths rollout all landed within a few months of each other, which is exactly why I can’t untangle what drove the results.

Next time I’d roll out one decision at a time, with the tracking in place first, so every design decision can be measured on its own.

</section>
