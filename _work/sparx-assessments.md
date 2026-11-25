---
layout: case-study
title: "GCSEs are a big deal, teachers go the extra mile, so did we"
description: "I led the design of a national benchmarking dashboard for GCSE mocks, giving teachers the data they need to make confident decisions, backed by a user experience shaped by weekly testing."
home_title: "Empowering teachers through data"
home_dek: "Designing a platform for schools to enter and assess their key GCSE mock data, with 53,965 students’ marks entered for the first national mock."
product: "Sparx Assessments"
product_icon: /assets/images/icons/sparx-assessments.png
permalink: /work/sparx-assessments/
case_study_type: long
featured: true
order: 1
placeholders: false
ground: "#E6E1F2"
accent: "#2D236D"
image: /assets/images/Assessments-Hero.webp
image_alt: "Sparx Assessments home screen showing weekly exam-style revision, a GCSE mock card, and a Year 11 revision list."
image_caption: "Sparx Assessments, the morning after a mock. Mock 2 is open, revision’s ready to go, and the next job is always the first thing you see."
role: "Senior product designer"
year: "2025"
skills:
  - Product strategy
  - Prototyping
  - User research
reading_time: "12 min read"
summary: >
  As senior product designer, I owned the design and shaped key product discussions, such as the positioning of the product within the Sparx Learning portfolio, for the newly formed Sparx Assessments.
points:
  - "**6 months** from discovery and decision mapping to final implementation: 2 months of discovery and stakeholder planning, then 4 months to design and build."
  - "**A scrum team** of a senior product owner (SPO) and 6 software engineers, working directly with senior leadership, Sparx’s CEO and education leads."
  - "**53,965 students** across **406 schools** had their marks entered for the first Sparx National Mock. **88%** teacher satisfaction, and **63.8%** of heads of department said they’d be very disappointed to lose it."
spine_title: "Sparx Assessments"
spine_color: "#2D236D"
spine_ink: "#F3F1EA"
related: sparx-science-insights
---

<section class="chapter chapter--plain" markdown="1">

{% include pullquote.html
  lead="When we first walked a Year 11 maths lead through the newly launched GCSE Mock Report, she said “love” 8 times in a matter of minutes."
  text="“Everyone’s going to love this because my analysis is pretty much done… I love it.”"
  cite="Mrs G., maths lead and Year 11 teacher"
%}

</section>

<section class="chapter chapter--tint" id="overview" markdown="1">

<p class="section-kicker">Overview</p>

## Teachers get all the GCSE mock data they need, in one place

Sparx Assessments, once an experimental feature within Sparx Maths, was transformed into a standalone product in its own right.

At its core the product offers teachers greater visibility of students’ GCSE mock performance, providing crucial indicators such as students who may need to change tier, and the grade conversion they need to achieve their target grade. A focus on robust and accessible reporting gives teachers confidence when making key decisions.

{% include figure.html
  src="/assets/images/Assessments-4.webp"
  alt="The My actions tab for a GCSE mock: key actions with counts for tier of entry, students not yet at grade 4 and attendance, then marks entered and tier of entry graphs. A potential summer attainment panel sits over the left edge."
  caption="The after. My actions is the first thing a teacher sees once marks are in: the 3 things worth acting on up top, tier of entry underneath, and the summer attainment tool poking in from the side."
  layout="wide"
%}

{% include split.html
  src="/assets/images/Assessments-5.webp"
  alt="The Comparison tab, showing 406 schools and 53,965 students in the Sparx National GCSE Mock 1, with a cumulative grades bar chart comparing the school to the national cohort."
  caption="The Comparison tab. 406 schools, 53,965 students, one bar chart that tells you how your lot are doing against everyone else."
  text="In addition to this, teachers are able to compare performance to a national cohort of almost 54,000 students exclusive to Sparx: the very same students who will be taking their GCSE exams that year."
%}

{% include split.html
  src="/assets/images/Assessments-2.webp"
  alt="Assessment overview for an Edexcel Higher paper, with 5 key milestones: enter marks, results, GCSE reports, fix-up and national comparison, and a progress table of marks entered per paper."
  caption="Every assessment gets an overview with 5 milestones, from entering marks all the way round to fix-up and the national comparison."
  text="To close the loop, teachers are also able to set any questions a student struggled on, as additional work within their Sparx Maths Homework. Building targeted practice into already established habits."
  flip=true
%}

{% include pullquote.html text="“They like particularly the QLAs and then being able to have that meaningful fix-up… they really value being able to have that sort of automated for them so that they’re not having to generate those individual tasks… some of the aspects of it are so slick.”" cite="Mrs D., trust lead" %}

</section>

<section class="chapter chapter--plain" id="discovery" markdown="1">

<p class="section-kicker">Discovery</p>

## Helping the team see a clear direction

My role in the early stages of this project was to walk senior stakeholders through complicated and tangled product decisions to a coherent and considered destination.

{% include pullquote.html text="Do we build a standalone product, or one interdependent with Sparx Maths? What features and functionality does it need, and when? All this and more had to be decided." %}

When the team inherited the project, we had a clear signal from teachers that a relatively small and obscure feature in Sparx Maths used by 48 schools had positive feedback and engagement. But it also had complicated user flows built within an existing product.

{% include figure.html
  src="/assets/images/Assessments-6.webp"
  alt="The original assessments page inside Sparx Maths, listing Year 7 baseline and term assessments under current and previous academic years."
  caption="The before. Assessments lived a few clicks deep inside Sparx Maths. 48 schools found it and liked it, but you really had to know where to look."
  layout="wide"
%}

One thing was evident: if we were going to roll this out to a larger pilot we had to have a clear approach.

I mapped out 3 options:

1. Grow it inside Maths
2. Pull it out entirely
3. Land somewhere in the middle

I presented the pros and cons of each, including the business strategy for standing alone: two years of development needs a price tag. Kept inside Maths, it becomes a free feature schools won’t pay extra for. I used information architecture and process maps, then took the CEO and head of education through the trade-offs.

From this the team were able to see a clear path forward to build a standalone product.

{% capture year_in_life %}
One thing that became obvious early on was that what we knew about teachers using our homework product didn’t translate to how they would use an assessments offering. Gone was the weekly cadence, replaced with crunch periods directly after mock assessments and a steady ramp up to the end of the year.

To understand this at the level of granularity required to make confident decisions, I worked closely with the education lead to build out personas for key roles of GCSE teachers, and plotted their direct involvement over the course of a year.

{% include pair.html
  src_a="/assets/images/Assessments-12.webp"
  alt_a="A FigJam board titled Pencil portraits with 3 personas: Priya the strategist, Sarah the planner and Marek the practitioner. Sarah’s card is enlarged, asking what their number 1 job related to mocks is."
  caption_a="Pencil portraits. Priya the strategist, Sarah the planner and Marek the practitioner, each with a very different job to do when mocks roll round."
  src_b="/assets/images/Assessments-13.webp"
  alt_b="A FigJam timeline titled Teacher’s perspective, with sticky notes plotted across the year and a zoomed-in Mock 1 section covering disrupted teaching, marking and results day."
  caption_b="A year in the life, sticky by sticky. Spoiler: it’s not a weekly habit, it’s a mad dash after every mock."
%}

It changed who we were designing for. Not a teacher checking in every week, but one who might not open the product for a month, then need answers fast in the days after a mock. That pushed us to put the most time-sensitive actions front and centre rather than burying them in reports, and to lean on patterns teachers already knew from Sparx Maths, so there was little to relearn each time they came back.
{% endcapture %}

{% include callout.html label="Research" title="Working with education leads to map a year in the life of a Year 11 teacher" body=year_in_life %}

</section>

<section class="chapter chapter--tint" id="design" markdown="1">

<p class="section-kicker">Design</p>

## Shaping a product that could be delivered in 4 months

With the direction set and a deadline on the horizon, it was essential I designed a product that we could be confident would succeed, and that limited the amount of late-stage changes that would derail engineering time.

### Wireframes first to surface fundamental UX decisions

With only 4 months to design and build, it would have been very easy to rush straight into high-fidelity designs, an approach common with the more established products in the company. However, doing that would have risked fundamental UX decisions being overshadowed by conversations about primary button colours and drop shadows.

To mitigate this, I designed the complete user experience as wireframes first and prototyped key user journeys. This meant that stakeholders were able to walk through the product and see the underlying structure, and potential issues, clearly.

{% include figure.html
  src="/assets/images/Assessments-messy-middle.webp"
  alt="A greyscale wireframe of a sitting results marksheet, surrounded by colour-coded sticky notes: purple for page purpose, green for the data it needs, yellow for to-dos and orange for open questions."
  caption="The messy middle. The marksheet wireframe mid-thought, grey boxes on purpose, with stickies for what’s settled, what’s still to do and the questions nobody had answered yet."
  layout="text"
%}

{% include figure.html
  src="/assets/images/Assessments-wireframe-proto.gif"
  alt="An animated wireframe prototype of setting up an assessment: choosing the assessment, then the classes, then the papers."
  caption="A quick spin through setting up an assessment in the wireframe prototype. Pick the assessment, pick the classes, pick the papers. Job done."
  layout="wide"
  fit="natural"
  w="960"
  h="450"
%}

### Building out a first-phase design system

With the wireframes unlocking key product decisions, it was my job to put some meat on the bones. As part of my early discovery work it had been decided that Sparx Assessments would be a top-level product within the portfolio, and as such needed its own brand. With the logo covered by the company’s brand designer, I worked closely with them to translate it into a design system, one that balanced feeling unique, whilst also maintaining its place as part of the Sparx Learning portfolio.

{% include figure.html
  src="/assets/images/Assessments-7.webp"
  alt="The first-phase Sparx Assessments homepage, with cards to set a first assessment and set revision, and an assessment resources panel listing term papers and marksheets."
  caption="The first-phase homepage, where the new brand met the design system. Recognisably Sparx, but very much its own thing."
  layout="wide"
%}

{% capture key_decision %}
With a wealth of data in the product, not just students’ results but their tier, gender and pupil premium information, it would have been easy to swamp teachers with information. The obvious route, and one the data made very tempting, was to show it all: every grade, every breakdown, every filter. Choosing not to came with a cost. Teachers would see less on the first screen, and we had to be confident the subset we chose was the right one.

Working directly with education leads, I identified the most time-sensitive and actionable information after GCSE mock assessments. This resulted in the decision to have graphs that only showed a subset of the students, the ones that most needed to be considered for a tier change, a decision no teacher takes lightly.

{% include figure.html
  src="/assets/images/Assessments-10.webp"
  alt="The potential summer attainment panel over a faded My actions tab, showing a single stacked bar of students who could convert to a grade 4 or above, with a key of grade groups that can be shown or hidden."
  caption="Potential summer attainment. Just the students who could realistically make a grade 4, not the whole year group."
  layout="wide"
%}

But this wasn’t just about giving an overview. To make this information actionable, teachers had to be able to go and have conversations with individual students. To ensure this happened with as little friction as possible, every graph could be clicked on to reveal the students it represented.

{% include figure.html
  src="/assets/images/Assessments-1.webp"
  alt="A grade distribution chart with a pop-up list of the 12 female students at grade 4, showing their class, tier, mark and grade."
  caption="Click a bar, get the names. Here it’s the 12 girls sitting on a grade 4, so the next conversation is already lined up."
  layout="wide"
%}

{% include pullquote.html text="“I particularly like the class grade distribution… because then I can again by clicking on it specifically see which pupils.”" cite="Mrs D., trust lead" %}
{% endcapture %}

{% include callout.html label="Key decision" title="Surfacing the most actionable data up front" body=key_decision glow=true %}

</section>

<section class="chapter chapter--plain" id="validation" markdown="1">

<p class="section-kicker">Validation</p>

## Testing to make the unknowns known

With a product launching the first week of September, and a user base that would be on holiday from mid-July, testing early and often was not just best practice but essential to de-risking the roll-out.

Building an automated user testing pipeline using Make meant that I was able to ensure we had a steady stream of sessions each week, and as the deadline and the summer holidays got closer it was easy to ramp this up to a peak of 25 sessions in a single week.

### Key learnings

**Learning:** Even though it was a new product, our users had developed a lot of very sticky habits from Sparx Maths, and expected Assessments to behave in exactly the same way.

**Design adjustment:** We adjusted key UX patterns to align not just closely, but exactly, with Sparx Maths. For instance, matching the onward journey for table cells – clicking the student name took you to their details, clicking a completion bar would take you through to the breakdown, even on the same row.

**Learning:** Teachers have specific and differing mental models for revision and assessments. They *assign* revision to a class, whereas they *set* a class an assessment.

**Design adjustment:** To make the product feel natural and intuitive to the users we ordered the same wizard flow differently for revision and assessments. For revision the teacher selects the class first, and then the revision package. For assessments, the teacher selects the assessment first.

{% include figure.html
  src="/assets/images/Assessments-3.webp"
  alt="The set up assessment wizard, on the Students step with Year 11 classes to tick, and on the Papers step with the assessment type, exam board, tier and papers chosen."
  caption="Set up assessment. Assessment first, then students, because that’s how teachers think about it. Revision does it the other way round, and that’s on purpose."
  layout="wide"
%}

{% include pullquote.html text="“Okay, that was easy. That was really easy.”" cite="Mrs A., head of maths, on setting an assessment" %}

### Testing alongside building

Testing didn’t wait for design to be finished. It ran alongside the build, so what we learned went straight into the backlog. Each week I took the findings from that week’s sessions, agreed priorities with the SPO, and turned them into tickets and design tweaks the engineers could pick up straight away. Because the big structural decisions had already been settled in wireframes, almost all of these changes were small adjustments rather than rework.

{% capture ai_in_action %}
As user testing progressed, it soon became clear that the SPO and I, the two people consistently in the sessions, were being exposed to a wealth of insights that no summary could do justice.

Armed with transcripts and recordings from every session, along with my testing plans and subsequent notes, I fed this all into a single NotebookLM notebook. The result gave the entire team a way to directly query the testing sessions for themselves, and get answers grounded in what teachers actually said and did.

{% include figure.html
  src="/assets/images/Assessments-8.webp"
  alt="A NotebookLM notebook titled Sparx Assessments User Testing, with teacher interview transcripts as sources, a written summary and suggested questions."
  caption="The research library. 27 sources, one search box, and no more “can you remind me what that teacher said?”"
  layout="wide"
%}

It was used far and wide. Engineers used it to gather extra context for the decisions behind the tickets they were working on. Senior stakeholders were able to stay abreast of key themes and investigate pertinent ones further.
{% endcapture %}

{% include callout.html label="AI in action" title="Building a queryable research library for the whole team" body=ai_in_action %}

</section>

<section class="chapter chapter--tint" id="results" markdown="1">

<p class="section-kicker">Results</p>

## What the numbers tell us

Come September, Sparx Assessments went live and teachers arrived at school ready for a new academic year and a new product. To understand how the product was truly being used, and whether it would be considered a success, you had to look at the data.

### School engagement

The success of the product relied on schools uploading their marks for the mock assessments. It was only with this data that we could produce the national comparison report that was to be a key selling point when the product went to market. So school engagement was key.

<ul class="stats">
  <li><span class="stat-num">92%</span><span class="stat-label">of schools entered marks for Mock 1</span></li>
  <li><span class="stat-num">84%</span><span class="stat-label">of schools entered marks for Mock 2</span></li>
</ul>

Whilst we would have loved to have reached 100% for both these figures, we were aware of legitimate reasons that even schools in our pilot wouldn’t be able to:

- Custom papers not being included meant that schools that were particularly vigilant about cheating, and created their own assessments, could not be included.
- A portion of schools only did a single mock exam in the school year, which can be seen in the drop-off from Mock 1 to 2.

Digging a little deeper, excluding these known exceptions brought the figure up to over 95% for both mocks.

{% include pullquote.html text="“I really preferred it… The fact that it moves on automatically made it so much faster.”" cite="Mr K., head of maths, on entering marks" %}

### Senior teacher engagement

We’ve seen significant correlation in our established products between senior teacher engagement and product renewals, and whilst not yet a paid-for product, it was important that the right staff members were seeing value.

<ul class="stats">
  <li><span class="stat-num">98%</span><span class="stat-label">of schools had their mock report viewed by a senior teacher within 7 days of it becoming available</span></li>
  <li><span class="stat-num">88%</span><span class="stat-label">satisfaction from teachers who entered marks, collected through a post-data-entry survey</span></li>
</ul>

The high level of senior teacher engagement showed not only that the product worked from a design point of view, but that the product offering in itself was compelling to senior staff members. Whilst self-reported, and by no means conclusive, the satisfaction rate also paints a picture of a positive product experience.

### Product–market fit

At the end of the pilot year we surveyed heads of department in engaged schools to answer the question that mattered most: would they actually miss it?

<ul class="stats">
  <li><span class="stat-num">75%</span><span class="stat-label">of heads of department responded, 301 of 402</span></li>
  <li><span class="stat-num">63.8%</span><span class="stat-label">said they’d be very disappointed if they could no longer use Sparx Assessments</span></li>
  <li><span class="stat-num">298</span><span class="stat-label">of the 301 committed to the 2026/27 pilot</span></li>
</ul>

The Sean Ellis test puts the bar for product–market fit at 40% of users saying they’d be very disappointed without a product. We cleared it comfortably. Just as telling, all but 3 heads of department chose to carry on into a second year, the closest thing we had to a renewal while the product was still free.

The impact is starting to show in results too. One trust lead told us that across their schools, grade 4+ was up 9% and grade 5+ up 7%. That’s their figure, not ours, and a lot more than one product goes into a GCSE result, but it’s exactly the kind of outcome Sparx Assessments was built to support.

{% include pullquote.html text="“It’s a great product and I know that my schools are absolutely loving it… that assessment package has been transformational… I think you’re saving teachers a massive workload.”" cite="Mrs T., trust director of maths" %}

</section>

<section class="chapter chapter--ink" id="reflection" markdown="1">

<p class="section-kicker">Reflection</p>

## A success in scoping and execution, with the evidence to back it up

Looking back on the project now, the early decisions that I guided stakeholders through paid dividends. There were no major changes during the build of the product, and extensive user testing meant that when it launched in September we had caught the vast majority of the UX and UI gotchas.

However, with such a large and complex launch our success measures existed only at a high level. Did schools upload marks? Did senior teachers engage with the reporting? If I were to go through the process again I would pay additional attention to the decisions that were made, and consciously assign them metrics that would quantitatively show where we got them right, and highlight areas where we may have got them wrong.

As it is, strong engagement, a product–market fit score well past the benchmark and nearly every school choosing to stay on give a very positive, if coarse-grained, picture of success. What they can’t tell me is which individual decisions made the difference, and that’s what I’d measure next time.

</section>
