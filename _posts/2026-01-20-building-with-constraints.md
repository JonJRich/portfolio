---
layout: post
title: "Building with Constraints"
date: 2026-01-20
categories: writing
---

## Why Constraints Matter

Working within constraints isn't a limitation—it's a design methodology. When you strip away the excess, what remains is essential.

In frontend development, we often chase the latest frameworks and patterns. But some of the most elegant solutions come from asking: **What can we remove?**

## The Power of Limitations

Consider these constraints:

- No shadows, only borders
- Maximum 2px border radius
- A single accent color
- Monospace typography throughout

These aren't arbitrary rules. They create a **design system** that's:

1. Consistent by default
2. Easy to maintain
3. Visually distinctive

## Code Example

Here's how constraints translate to CSS:

```css
:root {
  --border-width: 1px;
  --border-radius: 2px;
  --accent: #FF5C00;
}

.button {
  border: var(--border-width) solid;
  border-radius: var(--border-radius);
}

.button:active {
  transform: translateY(1px);
}
```

## Tactile Feedback

The `translateY(1px)` on active states creates a physical click effect. It's subtle, but it makes digital interfaces feel more **tangible**.

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

## Conclusion

Start with less. Add only what's necessary. The result is a codebase that's lighter, faster, and more intentional.
